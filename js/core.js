/* DEC15 core: shared helpers. Loaded first. */
window.DEC = window.DEC || {};
DEC.lessons = {};      // lesson files register here
DEC.components = {};   // activity renderers register here
DEC.texts = {};        // protected source texts register here

/* Build an element: h('div', {class:'x', onclick:fn}, child, child...) */
DEC.h = function (tag, attrs) {
  var el = document.createElement(tag);
  attrs = attrs || {};
  Object.keys(attrs).forEach(function (k) {
    var v = attrs[k];
    if (v === null || v === undefined || v === false) return;
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k === 'text') el.textContent = v;
    else if (k.indexOf('on') === 0 && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  });
  for (var i = 2; i < arguments.length; i++) DEC.append(el, arguments[i]);
  return el;
};
DEC.append = function (el, c) {
  if (c === null || c === undefined || c === false) return;
  if (Array.isArray(c)) { c.forEach(function (x) { DEC.append(el, x); }); return; }
  el.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
};

/* Normalize text for answer checking */
DEC.norm = function (s) { return String(s || '').toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim(); };

/* ---------- Saving ----------
   Phase 1: saves to this browser only (localStorage).
   Phase 2: replace the three functions below with Supabase calls. Nothing else needs to change. */
DEC.store = (function () {
  var KEY = 'dec15:v1';
  var mem = {};
  try { mem = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { mem = {}; }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* storage full or blocked: keep in memory */ } }
  return {
    get: function (k, dflt) { return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : dflt; },
    set: function (k, v) { mem[k] = v; persist(); },
    all: function () { return mem; },
    clear: function (prefix) { Object.keys(mem).forEach(function (k) { if (!prefix || k.indexOf(prefix) === 0) delete mem[k]; }); persist(); }
  };
})();

/* Text inputs that save as you type */
DEC.savedTextarea = function (key, opts) {
  opts = opts || {};
  var ta = DEC.h(opts.input ? 'input' : 'textarea', { 'aria-label': opts.label || 'Your answer', placeholder: opts.placeholder || '', rows: opts.rows || null, type: opts.input ? 'text' : null });
  ta.value = DEC.store.get(key, '');
  var t;
  ta.addEventListener('input', function () {
    clearTimeout(t);
    t = setTimeout(function () { DEC.store.set(key, ta.value); if (opts.onSave) opts.onSave(ta.value); }, 300);
  });
  return ta;
};

/* Simple word overlap used by the paraphrase checker */
DEC.overlap = function (source, mine) {
  var stop = 'the a an of and or to in on at for is are was were be by with as that this it its from into than then their there these those which who can could may also not more most much many such'.split(' ');
  function words(s) { return DEC.norm(s).split(' ').filter(function (w) { return w.length > 2 && stop.indexOf(w) === -1; }); }
  var src = words(source), me = words(mine);
  if (!me.length) return { pct: 0, shared: [], runs: [] };
  var shared = me.filter(function (w) { return src.indexOf(w) !== -1; });
  // copied runs of 4+ words
  var sw = DEC.norm(source).split(' '), mw = DEC.norm(mine).split(' '), runs = [];
  for (var i = 0; i + 3 < mw.length; i++) {
    var g = mw.slice(i, i + 4).join(' ');
    if ((' ' + sw.join(' ') + ' ').indexOf(' ' + g + ' ') !== -1) runs.push(g);
  }
  return { pct: Math.round(100 * shared.length / me.length), shared: shared, runs: runs };
};

DEC.isTeacher = function () { return document.body.classList.contains('teacher'); };
