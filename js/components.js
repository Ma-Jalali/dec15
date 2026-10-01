/* DEC15 activity components. Each takes (activity data, context) and returns an element.
   Lessons only contain data; all behaviour lives here so a fix here fixes every lesson. */
(function () {
  var h = DEC.h, store = DEC.store, C = DEC.components;

  function checkRow(onCheck, onReset, label) {
    var fb = h('div', { 'aria-live': 'polite' });
    var check = h('button', { class: 'btn', type: 'button', onclick: function () { onCheck(fb); } }, label || 'Check answers');
    var reset = h('button', { class: 'btn quiet', type: 'button', onclick: function () { fb.innerHTML = ''; onReset(); } }, 'Try again');
    return { row: h('div', { class: 'row' }, check, reset), fb: fb };
  }
  function scoreMsg(fb, right, total, extra) {
    fb.innerHTML = '';
    var ok = right === total;
    fb.appendChild(h('div', { class: 'feedback ' + (ok ? 'ok' : 'no') },
      ok ? 'All ' + total + ' correct.' + (extra ? ' ' + extra : '') : right + ' of ' + total + ' correct. Read the reasons, change your answers, then check again.'));
  }

  /* ---------- prose: plain explanation ---------- */
  C.prose = function (a) { return h('div', { class: 'lead', html: a.html }); };

  /* ---------- custom html (diagrams) ---------- */
  C.html = function (a) { return h('div', { html: a.html }); };

  /* ---------- off-screen steps (paper, talk, walk) ---------- */
  C.steps = function (a) {
    return h('ol', { class: 'qlist' }, a.steps.map(function (s) { return h('li', { html: s }); }));
  };

  /* ---------- discussion card ---------- */
  C.discuss = function (a, ctx) {
    var box = h('div');
    box.appendChild(h('ol', { class: 'qlist' }, a.questions.map(function (q) { return h('li', { html: q }); })));
    if (a.frames) box.appendChild(h('div', { class: 'frames', 'aria-label': 'Useful language' }, a.frames.map(function (f) { return h('span', { class: 'frame' }, f); })));
    if (a.notes) box.appendChild(h('div', { class: 'field' }, h('label', { text: a.notes }), DEC.savedTextarea(ctx.key + ':notes', { label: a.notes })));
    if (a.models) {
      var shown = h('div');
      var btn = h('button', { class: 'btn ghost', type: 'button', onclick: function () {
        shown.innerHTML = ''; shown.appendChild(h('div', { class: 'model' }, h('strong', {}, 'Ideas to compare with: '), h('ul', {}, a.models.map(function (m) { return h('li', { html: m }); }))));
        btn.remove();
      } }, 'We have discussed. Show ideas to compare');
      box.appendChild(h('div', { class: 'row' }, btn)); box.appendChild(shown);
    }
    return box;
  };

  /* ---------- scenario choices (one best answer + reason) ---------- */
  C.scenarios = function (a, ctx) {
    var box = h('div');
    a.items.forEach(function (it, i) {
      var k = ctx.key + ':' + i, fb = h('div', { 'aria-live': 'polite' }), btns = [];
      function show(j) {
        btns.forEach(function (b, bi) { b.classList.toggle('picked', bi === j); b.classList.remove('ok', 'no'); });
        var ok = j === it.answer; btns[j].classList.add(ok ? 'ok' : 'no');
        fb.innerHTML = '';
        fb.appendChild(h('div', { class: 'feedback ' + (ok ? 'ok' : 'no'), html: (ok ? 'Yes. ' : 'Not quite. ') + (ok ? it.explain : (it.hint || 'Think about who decides and what must be acknowledged. Try another option.')) }));
      }
      it.options.forEach(function (o, j) {
        var b = h('button', { class: 'opt', type: 'button', onclick: function () { store.set(k, j); show(j); } }, o);
        btns.push(b);
      });
      box.appendChild(h('div', { class: 'scenario' }, h('p', { html: '<strong>' + (i + 1) + '.</strong> ' + it.q }), h('div', { class: 'opts' }, btns), fb));
      var saved = store.get(k, null); if (saved !== null) show(saved);
    });
    return box;
  };

  /* ---------- sort into categories ---------- */
  C.sort = function (a, ctx) {
    var box = h('div'), rows = [];
    var prev = a.compareWith ? store.get(ctx.lessonKey + ':' + a.compareWith + ':ans', {}) : null;
    var ans = store.get(ctx.key + ':ans', prev ? JSON.parse(JSON.stringify(prev)) : {});
    a.items.forEach(function (it, i) {
      var seg = h('div', { class: 'seg', role: 'group', 'aria-label': 'Choose a category' });
      var txt = h('span', { class: 'txt', html: it.text });
      var tag = h('span');
      var why = h('div', { class: 'item-why' });
      var row = h('div', { class: 'sort-item' }, h('div', {}, txt, tag), seg, why);
      a.bins.forEach(function (b) {
        var btn = h('button', { type: 'button', 'aria-pressed': ans[i] === b.id ? 'true' : 'false', onclick: function () {
          ans[i] = b.id; store.set(ctx.key + ':ans', ans);
          Array.prototype.forEach.call(seg.children, function (c) { c.setAttribute('aria-pressed', c === btn ? 'true' : 'false'); });
          row.classList.remove('ok', 'no'); why.innerHTML = ''; markChange();
        } }, b.label);
        seg.appendChild(btn);
      });
      function markChange() { tag.innerHTML = ''; if (prev && prev[i] && ans[i] && prev[i] !== ans[i]) tag.appendChild(h('span', { class: 'changed' }, 'changed')); }
      markChange();
      rows.push({ row: row, why: why, it: it, i: i });
      box.appendChild(row);
    });
    var cr = checkRow(function (fb) {
      var right = 0;
      rows.forEach(function (r) {
        var ok = ans[r.i] === r.it.answer; if (ok) right++;
        r.row.classList.toggle('ok', ok); r.row.classList.toggle('no', !ok);
        r.why.innerHTML = r.it.why ? (ok ? '' : '') + r.it.why : '';
      });
      scoreMsg(fb, right, rows.length);
    }, function () { rows.forEach(function (r) { r.row.classList.remove('ok', 'no'); r.why.innerHTML = ''; }); });
    if (a.noCheck) return box;
    box.appendChild(cr.row); box.appendChild(cr.fb);
    return box;
  };

  /* ---------- match each item to an option ---------- */
  C.match = function (a, ctx) {
    var box = h('div'), rows = [], ans = store.get(ctx.key, {});
    a.items.forEach(function (it, i) {
      var sel = h('select', { 'aria-label': 'Choose for item ' + (i + 1) }, h('option', { value: '' }, 'Choose...'),
        a.options.map(function (o) { return h('option', { value: o }, o); }));
      sel.value = ans[i] || '';
      var row = h('div', { class: 'match-row' }, h('div', { html: it.text }), sel);
      sel.addEventListener('change', function () { ans[i] = sel.value; store.set(ctx.key, ans); row.classList.remove('ok', 'no'); });
      rows.push({ row: row, sel: sel, it: it });
      box.appendChild(row);
    });
    var cr = checkRow(function (fb) {
      var right = 0;
      rows.forEach(function (r) { var ok = r.sel.value === r.it.answer; if (ok) right++; r.row.classList.toggle('ok', ok); r.row.classList.toggle('no', !ok); });
      scoreMsg(fb, right, rows.length, a.after || '');
    }, function () { rows.forEach(function (r) { r.row.classList.remove('ok', 'no'); }); });
    box.appendChild(cr.row); box.appendChild(cr.fb);
    return box;
  };

  /* ---------- gap fill with options ---------- */
  C.gapfill = function (a, ctx) {
    var box = h('div'), rows = [], ans = store.get(ctx.key, {});
    a.items.forEach(function (it, i) {
      var sel = h('select', { 'aria-label': 'Gap ' + (i + 1), style: 'width:auto;display:inline-block' }, h('option', { value: '' }, '...'), it.options.map(function (o) { return h('option', { value: o }, o); }));
      sel.value = ans[i] || '';
      var why = h('div', { class: 'item-why' });
      var row = h('div', { class: 'write-item' }, h('div', { class: 'prompt' }, (i + 1) + '. ', it.before + ' ', sel, ' ' + (it.after || '')), why);
      sel.addEventListener('change', function () { ans[i] = sel.value; store.set(ctx.key, ans); sel.style.background = ''; why.innerHTML = ''; });
      rows.push({ sel: sel, it: it, why: why }); box.appendChild(row);
    });
    var cr = checkRow(function (fb) {
      var right = 0;
      rows.forEach(function (r) { var ok = r.sel.value === r.it.answer; if (ok) right++; r.sel.style.background = ok ? 'var(--ok-bg)' : 'var(--no-bg)'; r.why.innerHTML = ok ? '' : (r.it.explain || ''); });
      scoreMsg(fb, right, rows.length);
    }, function () { rows.forEach(function (r) { r.sel.style.background = ''; r.why.innerHTML = ''; }); });
    box.appendChild(cr.row); box.appendChild(cr.fb);
    return box;
  };

  /* ---------- write first, then compare with a model ---------- */
  C.writeReveal = function (a, ctx) {
    var box = h('div');
    a.items.forEach(function (it, i) {
      var k = ctx.key + ':' + i, out = h('div');
      var btn = h('button', { class: 'btn ghost', type: 'button' }, a.revealLabel || 'Compare with a model');
      var ta = DEC.savedTextarea(k, { label: it.label || 'Your answer', placeholder: it.placeholder || 'Write your answer first.', onSave: upd, rows: it.rows });
      function upd() { btn.disabled = !DEC.isTeacher() && ta.value.trim().length < (a.minChars || 12); }
      ta.addEventListener('input', upd);
      btn.addEventListener('click', function () {
        out.innerHTML = '';
        out.appendChild(h('div', { class: 'model', html: '<strong>' + (a.modelLabel || 'Model') + ':</strong> ' + it.model }));
      });
      upd();
      box.appendChild(h('div', { class: 'write-item' },
        it.source ? h('div', { class: 'source-q', html: it.source }) : null,
        h('label', { html: it.prompt }), ta, h('div', { class: 'row' }, btn, a.minChars !== 0 ? h('span', { class: 'note-saved' }, 'Write something first. Saved on this laptop.') : null), out));
    });
    document.addEventListener('dec:mode', function () { box.querySelectorAll('textarea').forEach(function (t) { t.dispatchEvent(new Event('input')); }); });
    return box;
  };

  /* ---------- click words in a text ---------- */
  C.wordpick = function (a, ctx) {
    var box = h('div'), picked = store.get(ctx.key, []), btns = [];
    var p = h('p', { class: 'pick-text' });
    a.text.split(/(\s+)/).forEach(function (tok, i) {
      if (/^\s+$/.test(tok)) { p.appendChild(document.createTextNode(tok)); return; }
      var b = h('button', { class: 'w', type: 'button', 'aria-pressed': picked.indexOf(i) !== -1 ? 'true' : 'false', onclick: function () {
        var at = picked.indexOf(i); if (at === -1) picked.push(i); else picked.splice(at, 1);
        b.setAttribute('aria-pressed', at === -1 ? 'true' : 'false'); b.classList.remove('hit', 'miss'); store.set(ctx.key, picked);
      } }, tok);
      b.dataset.i = i; b.dataset.w = DEC.norm(tok); btns.push(b); p.appendChild(b);
    });
    box.appendChild(p);
    var targets = a.targets.map(DEC.norm);
    var cr = checkRow(function (fb) {
      var hit = 0, wrong = 0;
      btns.forEach(function (b) {
        var on = b.getAttribute('aria-pressed') === 'true', t = targets.indexOf(b.dataset.w) !== -1;
        b.classList.toggle('hit', on && t); b.classList.toggle('miss', on && !t);
        if (on && t) hit++; if (on && !t) wrong++;
      });
      var need = btns.filter(function (b) { return targets.indexOf(b.dataset.w) !== -1; }).length;
      fb.innerHTML = '';
      var ok = hit === need && wrong === 0;
      fb.appendChild(h('div', { class: 'feedback ' + (ok ? 'ok' : 'no'), html: ok ? (a.explain || 'Correct.') : 'You found ' + hit + ' of ' + need + (wrong ? ', and ' + wrong + ' word(s) are not needed' : '') + '. Look again.' }));
    }, function () { btns.forEach(function (b) { b.classList.remove('hit', 'miss'); }); });
    box.appendChild(cr.row); box.appendChild(cr.fb);
    return box;
  };

  /* ---------- paraphrase workspace with copy meter ---------- */
  C.paraphrase = function (a, ctx) {
    var box = h('div');
    a.items.forEach(function (it, i) {
      var k = ctx.key + ':' + i, meter = h('div', { class: 'meter', 'aria-live': 'polite' }), out = h('div');
      var ta = DEC.savedTextarea(k, { label: 'Your paraphrase', placeholder: 'Cover the source. Write the idea in your own words, then add the citation.', onSave: draw });
      ta.addEventListener('input', draw);
      function draw() {
        meter.innerHTML = '';
        if (!ta.value.trim()) return;
        var r = DEC.overlap(it.source, ta.value);
        var high = r.pct > 50 || r.runs.length > 0;
        meter.className = 'meter' + (high ? ' high' : '');
        meter.appendChild(h('div', {}, 'Same key words as the source: ' + r.pct + '%'));
        meter.appendChild(h('div', { class: 'track' }, h('div', { class: 'fill', style: 'width:' + Math.min(100, r.pct) + '%' })));
        if (r.runs.length) meter.appendChild(h('div', {}, 'Copied phrase: ', h('span', { class: 'copied' }, '"' + r.runs[0] + '..."'), '. Change the structure, not only single words.'));
        else if (r.pct > 50) meter.appendChild(h('div', {}, 'Many words are the same. Try synonyms and a different sentence structure.'));
        else meter.appendChild(h('div', {}, 'Good. Check the meaning is still the same as the source.'));
      }
      var btn = h('button', { class: 'btn ghost', type: 'button', onclick: function () { out.innerHTML = ''; out.appendChild(h('div', { class: 'model', html: '<strong>One possible paraphrase:</strong> ' + it.model })); } }, 'Compare with a model');
      box.appendChild(h('div', { class: 'write-item' }, h('div', { class: 'source-q', html: it.source + (it.cite ? ' <span class="note-saved">(' + it.cite + ')</span>' : '') }), ta, meter, h('div', { class: 'row' }, btn), out));
      draw();
    });
    return box;
  };

  /* ---------- note-taking table ---------- */
  C.notetable = function (a, ctx) {
    var tbl = h('table', { class: 'note' });
    tbl.appendChild(h('thead', {}, h('tr', {}, h('th', {}, 'Theme'), a.columns.map(function (c) { return h('th', { scope: 'col' }, c); }))));
    var body = h('tbody');
    a.themes.forEach(function (t, r) {
      body.appendChild(h('tr', {}, h('td', { class: 'theme' }, t), a.columns.map(function (c, ci) {
        return h('td', {}, DEC.savedTextarea(ctx.key + ':' + r + ':' + ci, { label: t + ', ' + c, placeholder: 'Paraphrased notes + (Author, year)' }));
      })));
    });
    tbl.appendChild(body);
    var box = h('div', {}, h('div', { class: 'tbl-wrap' }, tbl));
    if (a.sampleHtml) box.appendChild(h('div', { class: 'teacher-only' }, h('details', { class: 'why' }, h('summary', {}, 'Teacher sample table (show only after groups finish)'), h('div', { class: 'tbl-wrap', html: a.sampleHtml }))));
    return box;
  };

  /* ---------- form with sections (goals, outline) ---------- */
  C.form = function (a, ctx) {
    var box = h('div');
    a.sections.forEach(function (s) {
      var sec = h('div', { class: 'form-section' }, s.title ? h('h3', {}, s.title) : null);
      s.fields.forEach(function (f) {
        sec.appendChild(h('div', { class: 'field' }, h('label', { html: f.label }), f.hint ? h('div', { class: 'hint', html: f.hint }) : null,
          DEC.savedTextarea(ctx.key + ':' + f.id, { label: f.label.replace(/<[^>]+>/g, ''), input: f.short, placeholder: f.placeholder || '', rows: f.rows })));
      });
      box.appendChild(sec);
    });
    if (a.print) box.appendChild(h('div', { class: 'row' },
      h('button', { class: 'btn quiet', type: 'button', onclick: function () { window.print(); } }, 'Print or save as PDF'),
      h('span', { class: 'note-saved' }, 'Saved on this laptop as you type.')));
    return box;
  };

  /* ---------- self-check list ---------- */
  C.checklist = function (a, ctx) {
    var st = store.get(ctx.key, {});
    return h('div', {}, a.items.map(function (it, i) {
      var cb = h('input', { type: 'checkbox', id: ctx.key + i });
      cb.checked = !!st[i];
      cb.addEventListener('change', function () { st[i] = cb.checked; store.set(ctx.key, st); });
      return h('div', { class: 'check' }, cb, h('label', { for: ctx.key + i, html: it }));
    }));
  };

  /* ---------- position continuum ---------- */
  C.continuum = function (a, ctx) {
    var k = ctx.key, cur = store.get(k + ':pos', null), btns = [];
    var wrap = h('div', { class: 'continuum', role: 'group', 'aria-label': 'Choose your position' });
    a.options.forEach(function (o, i) {
      var b = h('button', { type: 'button', 'aria-pressed': cur === i ? 'true' : 'false', onclick: function () {
        cur = i; store.set(k + ':pos', i); btns.forEach(function (x, j) { x.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
      } }, o);
      btns.push(b); wrap.appendChild(b);
    });
    return h('div', {}, h('div', { class: 'cont-axis' }, h('span', {}, a.left), h('span', {}, a.right)), wrap,
      a.reasons ? a.reasons.map(function (r, i) { return h('div', { class: 'field' }, h('label', { html: r }), DEC.savedTextarea(k + ':r' + i, { input: true, label: r.replace(/<[^>]+>/g, '') })); }) : null);
  };

  /* ---------- YouTube video ---------- */
  C.video = function (a) {
    var m = DEC.media[a.media];
    if (!m) return h('div', { class: 'feedback no' }, 'Video not found: ' + a.media + '. Check data/media.js.');
    var frame = h('iframe', { src: 'https://www.youtube-nocookie.com/embed/' + m.youtubeId + (m.start ? '?start=' + m.start : ''), title: m.title, allow: 'accelerometer; encrypted-media; picture-in-picture; fullscreen', loading: 'lazy', referrerpolicy: 'strict-origin-when-cross-origin' });
    return h('div', {}, h('div', { class: 'video' }, frame), h('div', { class: 'media-meta' }, m.title + (m.duration ? ' (' + m.duration + ')' : '') + '. ', h('a', { href: 'https://www.youtube.com/watch?v=' + m.youtubeId, target: '_blank', rel: 'noopener' }, 'Open on YouTube')));
  };

  /* ---------- buttons that open protected texts ---------- */
  C.texts = function (a, ctx) {
    return h('div', { class: 'row', style: 'margin-top:0' }, a.texts.map(function (id) {
      var t = DEC.texts[id];
      return h('button', { class: 'btn quiet', type: 'button', onclick: function () { ctx.openText(id); } }, 'Open ' + (t ? t.short : id));
    }));
  };
})();
