/* DEC15 app shell: routing, navigation, teacher mode, timer, reading drawer. */
(function () {
  var h = DEC.h, store = DEC.store;
  var app = document.getElementById('app');
  var LABELS = { core: ['core', 'Core lesson'], exam: ['exam', 'Exam prep'], extra: ['extra', 'Extra'] };

  /* ---------- teacher mode: open the site with ?teacher in the address ---------- */
  var teacherAllowed = /[?&]teacher\b/.test(location.search) || store.get('ui:teacherAllowed', false);
  if (teacherAllowed) store.set('ui:teacherAllowed', true);
  function setTeacher(on) { document.body.classList.toggle('teacher', on); store.set('ui:teacher', on); document.dispatchEvent(new Event('dec:mode')); }
  function setProjection(on) { document.documentElement.classList.toggle('projection', on); store.set('ui:proj', on); }

  /* ---------- timer (top bar) ---------- */
  var timer = { left: 0, id: null };
  var timerOut = h('output', { 'aria-live': 'off' }, '--:--');
  var timerBtn = h('button', { class: 'chip-btn', type: 'button', onclick: function () { timer.id ? stopTimer() : startTimer(timer.left || timer.preset || 300); } }, 'Start');
  var timerBox = h('div', { class: 'timer', title: 'Stage timer' }, timerOut, timerBtn);
  function fmt(s) { var m = Math.floor(s / 60), r = s % 60; return m + ':' + (r < 10 ? '0' : '') + r; }
  function startTimer(sec) {
    stopTimer(); timer.left = sec; timerBox.classList.remove('done'); timerBtn.textContent = 'Pause'; timerOut.value = fmt(timer.left);
    timer.id = setInterval(function () {
      timer.left--; timerOut.value = fmt(Math.max(0, timer.left));
      if (timer.left <= 0) { stopTimer(); timerBox.classList.add('done'); timerOut.value = 'Time'; timer.left = 0; }
    }, 1000);
  }
  function stopTimer() { if (timer.id) clearInterval(timer.id); timer.id = null; timerBtn.textContent = timer.left ? 'Resume' : 'Start'; }
  function presetTimer(min) { stopTimer(); timer.preset = min * 60; timer.left = 0; timerBox.classList.remove('done'); timerOut.value = fmt(min * 60); timerBtn.textContent = 'Start'; }

  /* ---------- top bar ---------- */
  var crumbs = h('nav', { class: 'crumbs', 'aria-label': 'Breadcrumb' });
  var modeBtn = h('button', { class: 'chip-btn', type: 'button', 'aria-pressed': 'false', onclick: function () { var on = !document.body.classList.contains('teacher'); setTeacher(on); modeBtn.setAttribute('aria-pressed', String(on)); } }, 'Teacher view');
  var projBtn = h('button', { class: 'chip-btn', type: 'button', 'aria-pressed': 'false', onclick: function () { var on = !document.documentElement.classList.contains('projection'); setProjection(on); projBtn.setAttribute('aria-pressed', String(on)); } }, 'Large text');
  var top = h('header', { class: 'topbar' },
    h('a', { class: 'brand', href: '#/' }, h('span', { class: 'brand-mark', 'aria-hidden': 'true' }, '15'), DEC.course.code),
    crumbs,
    h('div', { class: 'top-actions' }, timerBox, projBtn, teacherAllowed ? modeBtn : null));
  document.body.insertBefore(top, app);

  /* ---------- reading drawer ---------- */
  var scrim = h('div', { class: 'scrim', onclick: closeText });
  var drawerTitle = h('h2'), drawerBody = h('div', { class: 'drawer-body' });
  var drawer = h('aside', { class: 'drawer', 'aria-hidden': 'true', role: 'dialog', 'aria-label': 'Source text' },
    h('div', { class: 'drawer-head' }, drawerTitle, h('button', { class: 'btn quiet', type: 'button', onclick: closeText }, 'Close')), drawerBody);
  document.body.appendChild(scrim); document.body.appendChild(drawer);
  function openText(id) {
    var t = DEC.texts[id]; if (!t) return;
    drawerTitle.textContent = t.title; drawerBody.innerHTML = '';
    drawerBody.appendChild(h('p', { class: 'cite' }, t.cite));
    var locked = t.locked && !store.get('unlock:' + id, false) && !DEC.isTeacher();
    if (locked) drawerBody.appendChild(h('div', { class: 'locked' }, h('p', {}, 'The transcript opens after you finish your handwritten notes.'), h('button', { class: 'btn', type: 'button', onclick: function () { store.set('unlock:' + id, true); openText(id); } }, 'I have finished my notes: open the transcript')));
    else t.paras.forEach(function (p) { var m = p.match(/^([A-Z])\.\s+([\s\S]*)$/); drawerBody.appendChild(h('div', { class: 'para' }, h('b', {}, m ? m[1] : ''), h('div', {}, m ? m[2] : p))); });
    if (!locked && t.figureNote) drawerBody.appendChild(h('p', { class: 'cite' }, t.figureNote));
    drawer.classList.add('open'); scrim.classList.add('open'); drawer.setAttribute('aria-hidden', 'false');
    drawer.querySelector('.drawer-head .btn').focus();
  }
  function closeText() { drawer.classList.remove('open'); scrim.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeText(); });

  /* ---------- helpers ---------- */
  function lessonMinutes(L) { return L.stages.reduce(function (s, x) { return s + (x.minutes || 0); }, 0); }
  function blockMinutes(L, b) { return L.stages.filter(function (s) { return s.block === b; }).reduce(function (s, x) { return s + x.minutes; }, 0); }
  function isDone(L, s) { return !!store.get(L.id + ':done:' + s.id, false); }
  function badgeEls(labels) { return (labels || []).map(function (l) { return h('span', { class: 'badge ' + LABELS[l][0] }, LABELS[l][1]); }); }

  function renderActivity(L, scope, a, idx) {
    var comp = DEC.components[a.type];
    var key = L.id + ':' + scope + ':' + (a.id || idx);
    var card = h('section', { class: 'act' + (a.offscreen ? ' offscreen' : '') });
    if (a.title) card.appendChild(h('h2', {}, h('span', {}, a.title), a.who ? h('span', { class: 'who' }, a.who) : null));
    if (a.howto) card.appendChild(h('p', { class: 'howto', html: a.howto }));
    card.appendChild(comp ? comp(a, { key: key, lessonKey: L.id, openText: openText }) : h('p', {}, 'Unknown activity type: ' + a.type));
    if (a.teacher) card.appendChild(h('div', { class: 'teacher-note', html: a.teacher }));
    // wire canvas links and transcript unlock buttons inside html content
    card.querySelectorAll('[data-canvas]').forEach(function (el) { var u = DEC.canvas[el.dataset.canvas]; if (u) el.appendChild(h('span', {}, ' (', h('a', { href: u, target: '_blank', rel: 'noopener' }, 'open on Canvas'), ')')); });
    card.querySelectorAll('[data-unlock]').forEach(function (b) { b.addEventListener('click', function () { store.set('unlock:' + b.dataset.unlock, true); openText(b.dataset.unlock); }); });
    return card;
  }

  /* ---------- rail ---------- */
  function rail(L, currentId) {
    var r = h('nav', { class: 'rail', 'aria-label': 'Lesson stages' },
      h('h2', {}, 'Week ' + L.week + ', Day ' + L.day),
      h('div', { class: 'total' }, 'About ' + Math.round(lessonMinutes(L) / 6) / 10 + ' hours. Bar height shows time.'));
    r.appendChild(h('a', { class: 'stage-link' + (currentId === 'overview' ? ' current' : ''), href: '#/' + L.id }, h('span', { class: 'bar' }), h('span', { class: 't' }, 'Overview')));
    var lastBlock = null;
    L.stages.forEach(function (s) {
      if (s.block !== lastBlock && s.id !== 'break') {
        var b = L.blocks.filter(function (x) { return x.id === s.block; })[0];
        r.appendChild(h('div', { class: 'block-label' }, b.title));
        lastBlock = s.block;
      }
      var cls = 'stage-link' + (s.id === currentId ? ' current' : '') + (isDone(L, s) ? ' done' : '');
      r.appendChild(h('a', { class: cls, href: '#/' + L.id + '/' + s.id, style: 'min-height:' + Math.max(34, s.minutes * 3.2) + 'px', 'aria-current': s.id === currentId ? 'step' : null },
        h('span', { class: 'bar', 'aria-hidden': 'true' }), h('span', { class: 't' }, s.title), h('span', { class: 'm' }, s.minutes + "'"), isDone(L, s) ? h('span', { class: 'sr' }, ' (done)') : null));
    });
    r.appendChild(h('div', { class: 'rail-foot' },
      h('a', { href: '#/' + L.id + '/extras' }, 'Extra activities (optional, at home)'),
      h('a', { href: '#/progress' }, 'My saved work')));
    return r;
  }

  /* ---------- pages ---------- */
  function journeySvg(L) {
    var x = 20, parts = '';
    var total = L.blocks.reduce(function (s, b) { return s + blockMinutes(L, b.id); }, 0);
    L.blocks.forEach(function (b, i) {
      var w = Math.round(440 * blockMinutes(L, b.id) / total);
      parts += '<rect x="' + x + '" y="40" width="' + (w - 6) + '" height="56" rx="4" fill="' + (i === 3 ? '#E64626' : '#FCEDE2') + '"/>' +
        '<text x="' + (x + 10) + '" y="64" font-weight="700" fill="' + (i === 3 ? '#fff' : '#B8361C') + '">' + b.id + '</text>' +
        '<text x="' + (x + 10) + '" y="85" font-size="13" fill="' + (i === 3 ? '#fff' : '#424242') + '">' + blockMinutes(L, b.id) + ' min</text>';
      x += w;
    });
    return '<svg class="journey" viewBox="0 0 500 140" role="img" aria-label="The day in four blocks, sized by time. Block D ends with your Essay 1 plan."><g font-family="Atkinson Hyperlegible, Arial" font-size="15">' + parts +
      '<path d="M20 112h440" stroke="#424242" stroke-width="1"/><circle cx="466" cy="112" r="6" fill="#E64626"/><text x="20" y="132" font-size="13" fill="#5F5F5F">Morning</text><text x="480" y="132" font-size="13" text-anchor="end" fill="#000" font-weight="700">Essay plan ready</text>' +
      '<text x="20" y="24" font-size="13" fill="#5F5F5F">Today, sized by time</text></g></svg>';
  }

  function overview(L) {
    var main = h('div', { class: 'main-inner' });
    main.appendChild(h('div', { class: 'hero' },
      h('div', {}, h('div', { class: 'kicker' }, 'Week ' + L.week + ', Day ' + L.day + '. ' + L.theme), h('h1', {}, L.title), h('p', {}, L.intro),
        h('div', { class: 'row' }, h('a', { class: 'btn', href: '#/' + L.id + '/' + L.stages[0].id }, 'Start the lesson'))),
      h('div', { html: journeySvg(L) })));
    main.appendChild(h('div', { class: 'outcomes' }, h('h2', { style: 'font-size:1.1rem' }, 'By the end of today you can...'), h('ul', {}, L.outcomes.map(function (o) { return h('li', {}, o); }))));
    main.appendChild(h('div', { class: 'block-cards' }, L.blocks.map(function (b) {
      var first = L.stages.filter(function (s) { return s.block === b.id; })[0];
      return h('a', { class: 'block-card', href: '#/' + L.id + '/' + first.id }, h('h3', {}, b.id + '. ' + b.title), h('div', {}, b.summary), h('div', { class: 'm' }, blockMinutes(L, b.id) + ' minutes'));
    })));
    var off = h('div', { class: 'teacher-only' }, h('div', { class: 'act' }, h('h2', {}, "Teacher's Book learning outcomes (original wording)"),
      Object.keys(L.officialOutcomes).map(function (k) { return h('div', {}, h('p', { style: 'margin:12px 0 4px' }, h('strong', {}, k)), h('ul', {}, L.officialOutcomes[k].map(function (o) { return h('li', {}, o); }))); })));
    main.appendChild(off);
    return main;
  }

  function stagePage(L, s) {
    var i = L.stages.indexOf(s), prev = L.stages[i - 1], next = L.stages[i + 1];
    var b = L.blocks.filter(function (x) { return x.id === s.block; })[0];
    var main = h('div', { class: 'main-inner' });
    main.appendChild(h('header', { class: 'stage-head' },
      h('div', { class: 'where' }, s.id === 'break' ? 'Break' : 'Block ' + b.id + ': ' + b.title),
      h('h1', { tabindex: '-1' }, s.title),
      h('div', { class: 'badges' }, badgeEls(s.labels), s.mode ? h('span', { class: 'badge mode' }, s.mode) : null, h('span', { class: 'badge mode' }, s.minutes + ' min'))));
    if (s.goal) main.appendChild(h('p', { class: 'goal' }, s.goal));
    s.activities.forEach(function (a, idx) { main.appendChild(renderActivity(L, s.id, a, idx)); });
    var doneKey = L.id + ':done:' + s.id;
    var doneBtn = h('button', { class: 'btn ' + (isDone(L, s) ? 'quiet' : 'ghost'), type: 'button', onclick: function () {
      store.set(doneKey, !isDone(L, s)); route();
    } }, isDone(L, s) ? 'Marked done (undo)' : 'Mark this stage done');
    main.appendChild(h('div', { class: 'stage-foot' },
      prev ? h('a', { class: 'btn quiet', href: '#/' + L.id + '/' + prev.id }, 'Back: ' + prev.title) : h('a', { class: 'btn quiet', href: '#/' + L.id }, 'Overview'),
      doneBtn,
      next ? h('a', { class: 'btn', href: '#/' + L.id + '/' + next.id, onclick: function () { store.set(doneKey, true); } }, 'Next: ' + next.title) : h('a', { class: 'btn', href: '#/' + L.id + '/extras' }, 'Extra activities')));
    presetTimer(s.minutes);
    return main;
  }

  function extrasPage(L) {
    var main = h('div', { class: 'main-inner' });
    main.appendChild(h('header', { class: 'stage-head' }, h('div', { class: 'where' }, 'Week ' + L.week + ', Day ' + L.day), h('h1', {}, 'Extra activities'),
      h('div', { class: 'badges' }, h('span', { class: 'badge extra' }, 'Optional, at home'))));
    main.appendChild(h('p', { class: 'goal' }, 'Not required. Each one says which skill it builds.'));
    L.extras.forEach(function (x) {
      main.appendChild(h('h2', { style: 'font-size:1.3rem;margin:32px 0 4px' }, x.title));
      main.appendChild(h('p', { class: 'howto' }, x.category + ', about ' + x.minutes + ' min. Builds: ' + x.target));
      x.activities.forEach(function (a, idx) { var c = renderActivity(L, 'x-' + x.id, a, idx); c.classList.add('extra-card'); main.appendChild(c); });
    });
    return main;
  }

  function progressPage() {
    var main = h('div', { class: 'main-inner' });
    main.appendChild(h('header', { class: 'stage-head' }, h('h1', {}, 'My saved work')));
    main.appendChild(h('p', { class: 'goal' }, 'Your answers are saved in this browser on this laptop only. If you change laptop or clear your browser, they will be gone. Print or save your goals and essay plan as PDF to keep a copy.'));
    Object.keys(DEC.lessons).forEach(function (id) {
      var L = DEC.lessons[id], done = L.stages.filter(function (s) { return isDone(L, s); }).length;
      main.appendChild(h('div', { class: 'act' }, h('h2', {}, 'Week ' + L.week + ', Day ' + L.day + ': ' + L.title),
        h('p', {}, done + ' of ' + L.stages.length + ' stages marked done.'),
        h('div', { class: 'row' }, h('a', { class: 'btn quiet', href: '#/' + id + '/b4' }, 'My goals'), h('a', { class: 'btn quiet', href: '#/' + id + '/d6' }, 'My essay plan'),
          h('button', { class: 'btn quiet', type: 'button', onclick: function () { if (confirm('Delete all saved answers for this lesson on this laptop?')) { store.clear(id + ':'); route(); } } }, 'Clear my answers'))));
    });
    return main;
  }

  function home() {
    var main = h('div', { class: 'main-inner' });
    main.appendChild(h('div', { class: 'hero', style: 'grid-template-columns:1fr' }, h('div', {}, h('div', { class: 'kicker' }, 'University of Sydney. Centre for English Teaching'), h('h1', {}, DEC.course.code + ' lessons'))));
    DEC.course.weeks.forEach(function (w) {
      main.appendChild(h('h2', { style: 'font-size:1.3rem;margin:24px 0 8px' }, 'Week ' + w.n + ': ' + w.theme));
      main.appendChild(h('div', { class: 'block-cards' }, w.days.map(function (d) {
        var ready = d.ready && DEC.lessons[d.id];
        return ready ? h('a', { class: 'block-card', href: '#/' + d.id }, h('h3', {}, d.label), h('div', {}, DEC.lessons[d.id].title))
          : h('div', { class: 'block-card', style: 'border-left-color:var(--line);color:var(--muted)' }, h('h3', { style: 'color:var(--muted)' }, d.label), h('div', {}, 'Coming soon'));
      })));
    });
    return main;
  }

  /* ---------- router: #/w2d5/c3 ---------- */
  function route() {
    closeText();
    var parts = location.hash.replace(/^#\/?/, '').split('/');
    var L = DEC.lessons[parts[0]];
    app.innerHTML = '';
    crumbs.innerHTML = '';
    if (parts[0] === 'progress') { app.appendChild(h('main', { class: 'main', id: 'main' }, progressPage())); app.className = ''; document.title = 'My saved work | DEC15'; return; }
    if (!L) { app.className = ''; app.appendChild(h('main', { class: 'main', id: 'main' }, home())); document.title = 'DEC15'; presetTimer(5); return; }
    var stageId = parts[1] || 'overview';
    var s = L.stages.filter(function (x) { return x.id === stageId; })[0];
    crumbs.appendChild(h('span', {}, h('a', { href: '#/' }, 'All lessons'), ' / ', h('a', { href: '#/' + L.id }, 'Week ' + L.week + ', Day ' + L.day), s ? ' / ' + s.title : ''));
    var content = stageId === 'extras' ? extrasPage(L) : s ? stagePage(L, s) : overview(L);
    app.className = 'shell';
    app.appendChild(rail(L, s ? s.id : stageId));
    app.appendChild(h('main', { class: 'main', id: 'main' }, content));
    document.title = (s ? s.title + ' | ' : '') + 'Week ' + L.week + ' Day ' + L.day + ' | DEC15';
    window.scrollTo(0, 0);
    var h1 = app.querySelector('.stage-head h1'); if (h1 && parts[1]) h1.focus({ preventScroll: true });
    var cur = app.querySelector('.rail .current'); if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: 'nearest' });
  }

  /* ---------- start ---------- */
  if (store.get('ui:teacher', false) && teacherAllowed) { setTeacher(true); modeBtn.setAttribute('aria-pressed', 'true'); }
  if (store.get('ui:proj', false)) { setProjection(true); projBtn.setAttribute('aria-pressed', 'true'); }
  window.addEventListener('hashchange', route);
  route();
})();
