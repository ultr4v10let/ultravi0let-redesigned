/*
 * ULTRAVI0LET: behaviour reference from the approved prototype. PORT THIS, DON'T SHIP IT.
 *
 * This is the single vanilla script that drives the approved page (design/reference/ultravi0let-final.html,
 * where it runs with its data filled in). Its five placeholders, and where the same data lives in this kit
 * (the kit's files use clearer names):
 *
 *   __FS__        the fragment shader                       design/sky/sky.frag
 *   __THEME__     TH.pal.dawn / .clear                      sky-data.json  heroFilm.dawn / heroFilm.clear
 *                 TH.pal.ndawn / .nclear                    sky-data.json  heroFilm.nightDawn / heroFilm.nightClear
 *                 TH.paper[0] / [1]                         sky-data.json  paper.light / paper.dark
 *                 TH.daypal.light / .dark (arrays of 8)     sky-data.json  processFilm.palettes.light / .dark
 *                 TH.ink, TH.inkLum, TH.skyShade            sky-data.json  processFilm.markInk / markInkLuminance / markShade
 *                 TH.vfall                                  sky-data.json  noWebGLFallback.workViewer
 *                 TH.uvH, TH.uvP                            not used by the final design (both [0, 0]); drop
 *   __SKIES__     SKY.l and SKY.d (identical lists)         sky-data.json  workSkies.list
 *   __PROJECTS__  [{ n, name, status, tags, year,           content.json   work.projects[]: same fields, except
 *                    desc, stats: [[value, label]] }]                     desc -> description, stats -> [{ value, label }]
 *   __CHAPTERS__  [[position, light, dark]]                 sky-data.json  heroFilm.chapters.list
 *
 * Also unused in the final design: the `uv` field passed to Sky.draw and the uUV uniform. The final shader in this
 * kit doesn't have it.
 *
 * docs/BEHAVIOUR.md explains every section of this file in plain terms, with the numbers pulled out.
 */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var sstep = function (a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var ease = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var hex = function (h) { return [parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255]; };
  var mix3 = function (a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]; };

  /* ================================================================ the sky renderer */
  var TH = __THEME__;
  var FS = __FS__;
  var VS = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}';
  var UNIFORMS = ['uRes', 'uTime', 'uScale', 'uSun', 'uR', 'uSunR', 'uTop', 'uMid', 'uLow', 'uHaze', 'uGlare', 'uPaper', 'uMidPos', 'uHazeAmt',
    'uGlareAmt', 'uVeil', 'uRing', 'uRingAmt', 'uHead', 'uDogL', 'uDogR', 'uLine', 'uLineW', 'uArc', 'uNight', 'uGhost', 'uPaperMix', 'uDisc', 'uVig',
    'uSkyH', 'uGroundOn', 'uGround', 'uUV'];

  function Sky(canvas, maxPx) {
    var gl = null;
    try {
      gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false, stencil: false, premultipliedAlpha: false, preserveDrawingBuffer: false, powerPreference: 'high-performance' });
    } catch (e) { gl = null; }
    if (!gl) return null;
    function sh(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
      return s;
    }
    var vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return null;
    var pr = gl.createProgram();
    gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(pr)); return null; }
    gl.useProgram(pr);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var U = {};
    UNIFORMS.forEach(function (n) { U[n] = gl.getUniformLocation(pr, n); });
    var self = { canvas: canvas, w: 0, h: 0, cssW: 1, cssH: 1, scale: 1, lost: false };
    canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); self.lost = true; });
    self.size = function (cssW, cssH) {
      cssW = Math.max(1, cssW); cssH = Math.max(1, cssH);
      var s = Math.min(window.devicePixelRatio || 1, 2);
      if (cssW * cssH * s * s > maxPx) s = Math.sqrt(maxPx / (cssW * cssH));
      var W = Math.max(1, Math.round(cssW * s)), H = Math.max(1, Math.round(cssH * s));
      if (W !== self.w || H !== self.h) { canvas.width = W; canvas.height = H; self.w = W; self.h = H; gl.viewport(0, 0, W, H); }
      self.cssW = cssW; self.cssH = cssH; self.scale = W / cssW;
    };
    self.draw = function (st) {
      if (self.lost) return;
      var k = self.scale;
      gl.uniform2f(U.uRes, self.w, self.h);
      gl.uniform1f(U.uTime, st.time);
      gl.uniform1f(U.uScale, k);
      gl.uniform2f(U.uSun, st.sx * k, st.sy * k);
      gl.uniform1f(U.uR, st.R * k);
      gl.uniform1f(U.uSunR, st.sunR * k);
      gl.uniform3fv(U.uTop, st.top); gl.uniform3fv(U.uMid, st.mid); gl.uniform3fv(U.uLow, st.low);
      gl.uniform3fv(U.uHaze, st.haze); gl.uniform3fv(U.uGlare, st.glare); gl.uniform3fv(U.uPaper, st.paper);
      gl.uniform1f(U.uMidPos, st.midPos); gl.uniform1f(U.uHazeAmt, st.hazeAmt); gl.uniform1f(U.uGlareAmt, st.glareAmt);
      gl.uniform1f(U.uVeil, st.veil); gl.uniform1f(U.uRing, st.ring); gl.uniform1f(U.uRingAmt, st.ringAmt); gl.uniform1f(U.uHead, st.head);
      gl.uniform1f(U.uDogL, st.dogL); gl.uniform1f(U.uDogR, st.dogR); gl.uniform1f(U.uLine, st.line); gl.uniform1f(U.uLineW, st.lineW * k);
      gl.uniform1f(U.uArc, st.arc); gl.uniform1f(U.uNight, st.night); gl.uniform1f(U.uGhost, st.ghost);
      gl.uniform1f(U.uPaperMix, st.paperMix); gl.uniform1f(U.uDisc, st.disc); gl.uniform1f(U.uVig, st.vig);
      gl.uniform1f(U.uSkyH, (st.skyH || self.cssH) * k); gl.uniform1f(U.uUV, st.uv || 0); gl.uniform1f(U.uGroundOn, st.groundOn ? 1 : 0); gl.uniform3fv(U.uGround, st.ground || st.paper);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    return self;
  }

  /* ================================================================ theme */
  var switches = [].slice.call(document.querySelectorAll('.switch'));
  var sysDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = root.getAttribute('data-theme') || (sysDark ? 'dark' : 'light');
  var night = theme === 'dark' ? 1 : 0, nightTarget = night;
  var needFilm = true, needView = true;
  function paint(t) {
    theme = t;
    if (root.getAttribute('data-theme') !== t) root.setAttribute('data-theme', t);
    switches.forEach(function (s) {
      s.setAttribute('aria-checked', t === 'dark' ? 'true' : 'false');
      s.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }
  paint(theme);
  new MutationObserver(function () {
    var t = root.getAttribute('data-theme');
    if (t && t !== theme) { paint(t); nightTarget = t === 'dark' ? 1 : 0; needFilm = needView = pNeed = true; }
  }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

  var busy = false;
  switches.forEach(function (sw) {
    sw.addEventListener('click', function () {
      if (busy) return;
      var next = theme === 'dark' ? 'light' : 'dark';
      switches.forEach(function (s) { s.setAttribute('aria-checked', next === 'dark' ? 'true' : 'false'); s.classList.remove('draw'); void s.offsetWidth; s.classList.add('draw'); });
      if (reduce || !document.startViewTransition) { paint(next); nightTarget = next === 'dark' ? 1 : 0; needFilm = needView = pNeed = true; return; }
      busy = true;
      setTimeout(function () {
        var r = sw.getBoundingClientRect();
        var x = r.left + r.width / 2, y = r.top + r.height / 2;
        var R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        root.classList.add('vt');
        var tr = document.startViewTransition(function () {
          paint(next);
          night = nightTarget = next === 'dark' ? 1 : 0;
          drawFilm(performance.now() / 1000);
          drawView(performance.now());
          if (pIn) drawProc(performance.now() / 1000);
          updateHead();
        });
        tr.ready.then(function () {
          root.animate({ clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + R + 'px at ' + x + 'px ' + y + 'px)'] },
            { duration: 900, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', pseudoElement: '::view-transition-new(root)' });
        }).catch(function () {});
        tr.finished.finally(function () { root.classList.remove('vt'); busy = false; });
      }, 380);
    });
  });

  /* ================================================================ header and menu */
  var head = document.getElementById('site-head');
  var mnav = document.getElementById('mnav'), mopen = document.getElementById('menu-open'), mclose = document.getElementById('menu-close');
  /* the menu: the icon folds into a ring, a halo expands from it and opens a sky; closing folds the sky back */
  var mnEdge = document.getElementById('mn-edge'), edgeC = [].slice.call(mnEdge.querySelectorAll('circle'));
  var mnItems = [].slice.call(mnav.querySelectorAll('.mn-list li'));
  var menuState = 'closed', menuRaf = 0;
  var outCubic = function (t) { return 1 - Math.pow(1 - t, 3); }, inCubic = function (t) { return t * t * t; };
  function menuGeom() {
    var r = mopen.getBoundingClientRect();
    var x = r.left + r.width / 2, y = r.top + r.height / 2;
    return { x: x, y: y, R: Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)) + 48 };
  }
  function setReveal(g, r, op) {
    mnav.style.clipPath = 'circle(' + r.toFixed(1) + 'px at ' + g.x.toFixed(1) + 'px ' + g.y.toFixed(1) + 'px)';
    edgeC.forEach(function (c, i) {
      c.setAttribute('cx', g.x.toFixed(1)); c.setAttribute('cy', g.y.toFixed(1));
      c.setAttribute('r', Math.max(0, r + (i === 3 ? -3.5 : i === 0 ? 6 : 0)).toFixed(1));
    });
    mnEdge.style.opacity = op.toFixed(3);
  }
  function sweep(g, from, to, dur, fn, done) {
    cancelAnimationFrame(menuRaf);
    var t0 = performance.now();
    (function step(now) {
      var t = clamp((now - t0) / dur, 0, 1);
      setReveal(g, lerp(from, to, fn(t)), Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.08)), 0.6));
      if (t < 1) menuRaf = requestAnimationFrame(step); else done();
    })(t0);
  }
  function markHere() {
    var map = { work: 0, services: 1, studio: 2, process: 2, contact: 3 }, here = -1, mid = innerHeight * 0.4;
    ['work', 'services', 'studio', 'process', 'contact'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= mid) here = map[id];
    });
    mnItems.forEach(function (li, i) { li.classList.toggle('here', i === here); });
  }
  function openMenu() {
    if (menuState !== 'closed') return;
    menuState = 'opening';
    var g = menuGeom();
    mnav.style.setProperty('--mx', g.x.toFixed(1) + 'px');
    mnav.style.setProperty('--my', g.y.toFixed(1) + 'px');
    markHere();
    mopen.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (reduce) {
      mnav.classList.add('show', 'in'); mnav.style.clipPath = 'none';
      menuState = 'open'; mclose.focus({ preventScroll: true }); return;
    }
    mopen.classList.add('to-ring');
    setTimeout(function () {
      setReveal(g, 0, 0);
      mnav.classList.add('show'); mnEdge.classList.add('show');
      void mnav.offsetWidth;
      mnav.classList.add('in');
      sweep(g, 0, g.R, 780, outCubic, function () {
        mnav.style.clipPath = 'none'; mnEdge.classList.remove('show');
        menuState = 'open'; mclose.focus({ preventScroll: true });
      });
    }, 230);
  }
  function closeMenu(after) {
    if (menuState !== 'open') return;
    menuState = 'closing';
    var g = menuGeom();
    function finish() {
      mnav.classList.remove('show', 'in', 'out'); mnEdge.classList.remove('show');
      mnav.style.clipPath = ''; mclose.classList.remove('to-ring');
      document.body.style.overflow = '';
      mopen.setAttribute('aria-expanded', 'false');
      menuState = 'closed';
      mopen.focus({ preventScroll: true });
      setTimeout(function () { mopen.classList.remove('to-ring'); }, 90);
      if (after) after();
    }
    if (reduce) { finish(); return; }
    mclose.classList.add('to-ring');
    mnav.classList.remove('in'); mnav.classList.add('out');
    setTimeout(function () {
      mnEdge.classList.add('show');
      sweep(g, g.R, 0, 560, inCubic, finish);
    }, 260);
  }
  mopen.addEventListener('click', openMenu);
  mclose.addEventListener('click', function () { closeMenu(); });
  [].forEach.call(mnav.querySelectorAll('.mn-list a'), function (l) {
    l.addEventListener('click', function (ev) {
      ev.preventDefault();
      var target = document.querySelector(l.getAttribute('href'));
      closeMenu(function () { if (target) target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); });
    });
  });
  document.addEventListener('keydown', function (ev) {
    if (menuState !== 'open') return;
    if (ev.key === 'Escape') { closeMenu(); return; }
    if (ev.key !== 'Tab') return;
    var f = [].slice.call(mnav.querySelectorAll('a[href], button')).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    if (ev.shiftKey && document.activeElement === f[0]) { ev.preventDefault(); f[f.length - 1].focus(); }
    else if (!ev.shiftKey && document.activeElement === f[f.length - 1]) { ev.preventDefault(); f[0].focus(); }
  });
  window.addEventListener('resize', function () { if (menuState === 'open' && innerWidth > 880) closeMenu(); });

  /* ================================================================ typewriter */
  (function () {
    var full = 'We build the quiet machinery behind loud products', a = 'We build the ', b = 'quiet';
    var e1 = document.getElementById('t1'), e2 = document.getElementById('t2'), e3 = document.getElementById('t3'), caret = document.getElementById('caret');
    function show(n) { var s = full.slice(0, n); e1.textContent = s.slice(0, a.length); e2.textContent = s.slice(a.length, a.length + b.length); e3.textContent = s.slice(a.length + b.length); }
    if (reduce) { show(full.length); caret.classList.add('done'); return; }
    var i = 0; show(0);
    setTimeout(function tick() {
      i += 1; show(i);
      if (i < full.length) setTimeout(tick, full.charAt(i - 1) === ' ' ? 60 : 32);
      else setTimeout(function () { caret.classList.add('done'); }, 1200);
    }, 450);
  })();

  /* ================================================================ the film */
  var film = document.getElementById('top'), stage = document.getElementById('stage'), canvas = document.getElementById('sky');
  var hero = document.getElementById('film-hero'), endcard = document.getElementById('endcard');
  var halves = [].slice.call(endcard.querySelectorAll('.half')), slot = document.getElementById('zero-slot');
  var zeros = [].slice.call(slot.querySelectorAll('svg')), endsub = document.getElementById('end-sub');
  var labels = [].slice.call(document.querySelectorAll('.ring-label'));
  var chapterEl = document.getElementById('chapter'), barEl = document.getElementById('bar-fill'), pctEl = document.getElementById('pct');
  var sky = Sky(canvas, Math.min(screen.width, screen.height) < 600 ? 0.9e6 : 2.0e6);
  if (!sky) root.classList.add('no-gl');
  var PAL = TH.pal;
  Object.keys(PAL).forEach(function (k) { ['top', 'mid', 'low', 'haze', 'glare'].forEach(function (c) { PAL[k][c] = hex(PAL[k][c]); }); });
  var PAPER = [hex(TH.paper[0]), hex(TH.paper[1])];
  function mixPal(a, b, t) {
    return { top: mix3(a.top, b.top, t), mid: mix3(a.mid, b.mid, t), low: mix3(a.low, b.low, t), haze: mix3(a.haze, b.haze, t), glare: mix3(a.glare, b.glare, t),
      midPos: lerp(a.midPos, b.midPos, t), hazeAmt: lerp(a.hazeAmt, b.hazeAmt, t), glareAmt: lerp(a.glareAmt, b.glareAmt, t) };
  }
  var CHAPTERS = __CHAPTERS__;  /* [scroll position, light label, dark label] */
  var LABEL_AT = [0.125, 0.375, 0.625, 0.875];
  var zero = { x: 0, y: 0, r: 20 }, stageW = 1, stageH = 1, labelW = [];
  var filmIn = true, lastChapter = -1, lastHead = '', filmVeil = 0, filmPNow = 0, heroDark = false, procDark = false;

  function filmP() {
    var r = film.getBoundingClientRect();
    var total = r.height - stage.clientHeight;
    return total > 0 ? clamp(-r.top / total, 0, 1) : 0;
  }
  function measure() {
    stageW = stage.clientWidth; stageH = stage.clientHeight;
    if (sky) sky.size(stageW, stageH);
    var s = slot.getBoundingClientRect(), g = stage.getBoundingClientRect();
    zero = { x: s.left - g.left + s.width / 2, y: s.top - g.top + s.height / 2, r: s.height * 0.48 };
    var box = zero.r * 46 / 11;
    zeros.forEach(function (z) { z.setAttribute('width', box.toFixed(1)); z.setAttribute('height', box.toFixed(1)); });
    labelW = labels.map(function (l) { return l.offsetWidth; });
    needFilm = true;
  }

  function drawFilm(time) {
    var p = filmP();
    var W = stageW, H = stageH, portrait = H > W * 1.05;
    var skyT = sstep(0.04, 0.3, p);
    var rise = ease(sstep(0.03, 0.32, p));
    var R0 = Math.min(W, H) * (portrait ? 0.3 : 0.29);
    var sx = W / 2, sy = lerp(H * (portrait ? 0.8 : 0.73), H * (portrait ? 0.47 : 0.5), rise), R = R0;
    var m = ease(sstep(0.72, 0.9, p));
    if (m > 0) { sx = lerp(sx, zero.x, m); sy = lerp(sy, zero.y, m); R = R0 * Math.pow(zero.r / R0, m); }
    var ringLin = clamp((p - 0.3) / 0.26, 0, 1);
    filmPNow = p; filmVeil = sstep(0.1, 0.32, p);
    var paperMix = sstep(0.73, 0.86, p);
    var nightV = night;
    if (sky && p < 0.965) {
      var pal = mixPal(mixPal(PAL.dawn, PAL.clear, skyT), mixPal(PAL.ndawn, PAL.nclear, skyT), nightV);
      sky.draw({
        time: reduce ? 4 : time, sx: sx, sy: sy, R: R, sunR: Math.max(R * (0.035 + 0.01 * nightV), 2.2),
        top: pal.top, mid: pal.mid, low: pal.low, haze: pal.haze, glare: pal.glare, midPos: pal.midPos, hazeAmt: pal.hazeAmt, glareAmt: pal.glareAmt * (1 - 0.35 * m),
        paper: mix3(PAPER[0], PAPER[1], nightV),
        veil: sstep(0.1, 0.32, p) * (1 - 0.6 * m), ring: ringLin * 1.04, ringAmt: lerp(1, 0.78, nightV), head: reduce ? 0 : sstep(0, 0.02, ringLin) * (1 - sstep(0.93, 1, ringLin)),
        dogL: sstep(0.5, 0.57, p), dogR: sstep(0.54, 0.61, p), line: sstep(0.58, 0.7, p), lineW: lerp(W * 0.56, 1.8 * R, m),
        arc: sstep(0.62, 0.72, p) * (1 - sstep(0.72, 0.8, p)), night: nightV, ghost: sstep(0.2, 0.4, p) * (1 - sstep(0.68, 0.76, p)) * (1 - 0.5 * nightV),
        paperMix: paperMix, disc: 1.45, vig: 1 - paperMix, uv: lerp(TH.uvH[0], TH.uvH[1], nightV)
      });
    }
    /* the words around the sky */
    var ho = sstep(0.02, 0.15, p);
    hero.style.opacity = (1 - ho).toFixed(3);
    hero.style.transform = 'translate3d(0,' + (-ho * 80).toFixed(1) + 'px,0)';
    hero.style.visibility = ho >= 0.999 ? 'hidden' : '';
    var gap = 16 + 0.07 * R;
    labels.forEach(function (l, i) {
      var a = LABEL_AT[i] * Math.PI * 2;
      var x = sx + Math.sin(a) * (R + gap), y = sy - Math.cos(a) * (R + gap);
      var right = Math.sin(a) > 0, w = labelW[i] || 0;
      var lx = right ? x : x - w;
      lx = clamp(lx, 12, W - 12 - w);
      var o = sstep(LABEL_AT[i] + 0.005, LABEL_AT[i] + 0.06, ringLin) * (1 - sstep(0.7, 0.76, p));
      l.style.opacity = o.toFixed(3);
      l.style.transform = 'translate3d(' + lx.toFixed(1) + 'px,' + (y - 8).toFixed(1) + 'px,0)';
    });
    var wm = sstep(0.76, 0.9, p), spread = (1 - ease(wm)) * W * 0.22;
    halves[0].style.opacity = halves[1].style.opacity = wm.toFixed(3);
    halves[0].style.transform = 'translate3d(' + (-spread).toFixed(1) + 'px,0,0)';
    halves[1].style.transform = 'translate3d(' + spread.toFixed(1) + 'px,0,0)';
    var zo = sky ? sstep(0.87, 0.92, p) : sstep(0.74, 0.86, p);
    zeros.forEach(function (z) { z.style.opacity = zo.toFixed(3); });
    canvas.style.opacity = (1 - sstep(0.9, 0.95, p)).toFixed(3);
    var so = sstep(0.88, 0.97, p);
    endsub.style.opacity = so.toFixed(3);
    endsub.style.transform = 'translate3d(0,' + ((1 - so) * 18).toFixed(1) + 'px,0)';
    /* chapter bar */
    var ci = 0;
    for (var c = 0; c < CHAPTERS.length; c++) if (p >= CHAPTERS[c][0]) ci = c;
    var key = ci + (theme === 'dark' ? 'd' : 'l');
    if (key !== lastChapter) {
      lastChapter = key;
      chapterEl.innerHTML = '';
      var n = document.createElement('i'); n.textContent = '0' + (ci + 1);
      chapterEl.appendChild(n); chapterEl.appendChild(document.createTextNode(CHAPTERS[ci][theme === 'dark' ? 2 : 1]));
    }
    barEl.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    pctEl.textContent = p < 0.005 ? 'Scroll' : String(Math.round(p * 100)).padStart(3, '0') + ' / 100';
    /* is the sky behind the text dark? */
    var dark = theme === 'dark' || (skyT * (1 - sstep(0.74, 0.84, p)) > 0.5);
    stage.classList.toggle('sky-dark', dark);
    heroDark = dark;
  }

  /* ================================================================ work: a day of halos */
  var SKY = __SKIES__;
  var PROJECTS = __PROJECTS__;
  [SKY.l, SKY.d].forEach(function (list) { list.forEach(function (s) { ['top', 'mid', 'low', 'haze', 'glare'].forEach(function (c) { s[c] = hex(s[c]); }); }); });
  var SKIES = SKY.l;
  var vcanvas = document.getElementById('vsky'), vart = document.getElementById('v-art');
  var vsky = Sky(vcanvas, 1.2e6);
  var rows = [].slice.call(document.querySelectorAll('#work-index .row'));
  var vread = document.getElementById('v-read');
  var cur = 0, from = null, t0 = -1e9, viewIn = false, swapT = null;
  if (!vsky) vart.style.background = TH.vfall;
  function lerpSky(a, b, t) {
    var o = {};
    Object.keys(b).forEach(function (k) {
      if (k === 'label') return;
      o[k] = Array.isArray(b[k]) ? mix3(a[k], b[k], t) : lerp(a[k], b[k], t);
    });
    return o;
  }
  /* the sky for project i in the current theme */
  function skyAt(i) { return lerpSky(SKY.l[i], SKY.d[i], night); }
  var viewState = skyAt(0);
  from = viewState;
  function drawView(now) {
    if (!vsky) return;
    var W = vsky.cssW, H = vsky.cssH;
    var k = (now - t0) / 1000;
    var mk = ease(clamp(k / 0.9, 0, 1));
    viewState = lerpSky(from, skyAt(cur), mk);
    var s = viewState;
    var ring = reduce ? 1 : clamp((k - 0.12) / 0.8, 0, 1);
    var dogs = reduce ? 1 : sstep(0.75, 1.1, k);
    var R = s.R * H;
    vsky.draw({
      time: reduce ? 4 : now / 1000, sx: s.sx * W, sy: s.sy * H, R: R, sunR: Math.max(R * (0.035 + 0.01 * s.night), 2),
      top: s.top, mid: s.mid, low: s.low, haze: s.haze, glare: s.glare, midPos: s.midPos, hazeAmt: s.hazeAmt, glareAmt: s.glareAmt,
      paper: PAPER[0], veil: s.veil, ring: ring * 1.04, ringAmt: lerp(1, 0.78, s.night), head: reduce ? 0 : sstep(0, 0.03, ring) * (1 - sstep(0.93, 1, ring)),
      dogL: s.dogs * dogs, dogR: s.dogs * sstep(0.85, 1.2, reduce ? 2 : k), line: s.line * sstep(0.9, 1.25, reduce ? 2 : k), lineW: W * 0.56,
      arc: s.arc * sstep(1.0, 1.35, reduce ? 2 : k), night: s.night, ghost: s.ghost, paperMix: 0, disc: 1.45, vig: 1, uv: lerp(TH.uvH[0], TH.uvH[1], night)
    });
  }
  function fill(p) {
    var sk = SKIES[PROJECTS.indexOf(p)];
    document.getElementById('v-status').textContent = p.status;
    document.getElementById('v-tags').textContent = p.tags;
    document.getElementById('v-n').textContent = p.n;
    document.getElementById('v-time').textContent = sk.label;
    document.getElementById('v-year').textContent = p.year;
    document.getElementById('v-name').textContent = p.name;
    document.getElementById('v-desc').textContent = p.desc;
    var st = document.getElementById('v-stats');
    st.textContent = '';
    p.stats.forEach(function (s) {
      var sp = document.createElement('span'), b = document.createElement('b');
      b.textContent = s[0]; sp.appendChild(b); sp.appendChild(document.createTextNode(' ' + s[1])); st.appendChild(sp);
    });
    vart.classList.toggle('light-sky', sk.label === 'Dawn');
  }
  function select(i) {
    if (i === cur || i < 0) return;
    from = viewState; t0 = performance.now(); cur = i; needView = true;
    rows.forEach(function (r, k) { r.classList.toggle('on', k === i); r.setAttribute('aria-pressed', k === i ? 'true' : 'false'); });
    if (reduce) { fill(PROJECTS[i]); return; }
    vread.classList.add('fade');
    clearTimeout(swapT);
    swapT = setTimeout(function () { fill(PROJECTS[i]); vread.classList.remove('fade'); }, 200);
  }
  rows.forEach(function (r, i) {
    r.addEventListener('mouseenter', function () { select(i); });
    r.addEventListener('focus', function () { select(i); });
    r.addEventListener('click', function (ev) { ev.preventDefault(); select(i); });
  });
  var narrow = window.matchMedia('(max-width: 880px)');
  if ('IntersectionObserver' in window) {
    var rio = new IntersectionObserver(function (entries) {
      if (!narrow.matches) return;
      entries.forEach(function (en) { if (en.isIntersecting) select(rows.indexOf(en.target)); });
    }, { rootMargin: '-62% 0px -30% 0px', threshold: 0 });
    rows.forEach(function (r) { rio.observe(r); });
    new IntersectionObserver(function (e) { viewIn = e[0].isIntersecting; if (viewIn) needView = true; }).observe(vart);
    new IntersectionObserver(function (e) { filmIn = e[0].isIntersecting; if (filmIn) needFilm = true; }).observe(film);
  } else { viewIn = true; }
  /* ================================================================ process: one day, four phases, scrubbed by scroll */
  var pfilm = document.getElementById('process'), pstage = document.getElementById('pstage'), pcanvas = document.getElementById('psky');
  var psky = Sky(pcanvas, Math.min(screen.width, screen.height) < 600 ? 0.9e6 : 2.0e6);
  var parc = document.getElementById('p-arc'), ptrail = document.getElementById('p-trail'), pover = document.getElementById('pover'), ptg = document.getElementById('pTrailG');
  var pws = [0, 1, 2, 3].map(function (i) { return document.getElementById('pw' + i); });
  var psteps = [].slice.call(pstage.querySelectorAll('.p-step')), pphases = [].slice.call(pstage.querySelectorAll('.p-phase'));
  var pmarks = document.getElementById('p-marks');
  var pintro = document.getElementById('p-intro'), plabel = document.getElementById('p-label'), ptime = document.getElementById('p-time'), pfill = document.getElementById('p-fill');
  /* scroll position (KP) to the sun's place on its arc (KU): it eases into each phase and lingers there */
  var KP = [0, 0.15, 0.37, 0.59, 0.81, 1], KU = [0, 0.2, 0.4, 0.6, 0.8, 1];
  var CLOCK = { light: [350, 400, 600, 800, 1060, 1130], dark: [1170, 1220, 1380, 1540, 1710, 1760] };
  function P(top, mid, low, midPos, haze, hazeAmt, glare, glareAmt) { return { top: hex(top), mid: hex(mid), low: hex(low), midPos: midPos, haze: hex(haze), hazeAmt: hazeAmt, glare: hex(glare), glareAmt: glareAmt }; }
  var DAYPAL = { light: TH.daypal.light.map(function (q) { return P.apply(null, q); }), dark: TH.daypal.dark.map(function (q) { return P.apply(null, q); }) };
  var INK = hex(TH.ink), WHITE = [1, 1, 1];
  var pW = 1, pH = 1, pHZ = 1, pR = 60, pTotal = 1, pIn = false, pNeed = true, pWp = [], timeW = 44, lastClock = '', procVeil = 0;
  function seg(keys, vals, x, easeIt) {
    for (var j = 0; j < keys.length - 1; j++) {
      if (x <= keys[j + 1] || j === keys.length - 2) {
        var t = clamp((x - keys[j]) / (keys[j + 1] - keys[j]), 0, 1);
        return lerp(vals[j], vals[j + 1], easeIt ? ease(t) : t);
      }
    }
    return vals[vals.length - 1];
  }
  function palAt(list, u) {
    var j = Math.min(4, Math.floor(u * 5)), t = clamp(u * 5 - j, 0, 1);
    return mixPal(list[j], list[j + 1], t);
  }
  function procP() {
    var r = pfilm.getBoundingClientRect();
    var total = r.height - pstage.clientHeight;
    return total > 0 ? clamp(-r.top / total, 0, 1) : 0;
  }
  function pmeasure() {
    pW = pstage.clientWidth; pH = pstage.clientHeight;
    var slim = pW < 880, headH = slim ? 64 : 88;
    var ground = slim ? clamp(pH * 0.37, 292, 340) : clamp(pH * 0.31, 236, 300);
    pHZ = Math.round(pH - ground);
    pR = clamp(Math.min(pW, pHZ) * (slim ? 0.2 : 0.19), 54, 150);
    var apex = Math.max(headH + pR + 46, pHZ * 0.34);
    var y0 = pHZ + 0.62 * pR, yc = (8 * apex - 2 * y0) / 6;
    var d = 'M' + (0.04 * pW).toFixed(1) + ' ' + y0.toFixed(1) + ' C' + (0.22 * pW).toFixed(1) + ' ' + yc.toFixed(1) + ' ' + (0.78 * pW).toFixed(1) + ' ' + yc.toFixed(1) + ' ' + (0.96 * pW).toFixed(1) + ' ' + y0.toFixed(1);
    parc.setAttribute('d', d); ptrail.setAttribute('d', d);
    pover.setAttribute('viewBox', '0 0 ' + pW + ' ' + pH);
    var cr = document.getElementById('p-cliprect');
    cr.setAttribute('x', -40); cr.setAttribute('y', -40); cr.setAttribute('width', pW + 80); cr.setAttribute('height', pHZ + 40);
    ptg.setAttribute('x2', pW);
    pTotal = parc.getTotalLength() || 1;
    ptrail.style.strokeDasharray = pTotal.toFixed(1) + ' ' + (pTotal + 20).toFixed(1);
    pWp = KU.slice(1, 5).map(function (u) { return parc.getPointAtLength(u * pTotal); });
    pws.forEach(function (g, i) { g.setAttribute('transform', 'translate(' + pWp[i].x.toFixed(1) + ' ' + pWp[i].y.toFixed(1) + ') scale(' + (slim ? 0.8 : 1) + ')'); });
    psteps.forEach(function (s, i) {
      var w = s.offsetWidth, x = clamp(pWp[i].x - w / 2, 16, pW - 16 - w);
      s.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)';
      s.style.setProperty('--tick', (pWp[i].x - x).toFixed(1) + 'px');
    });
    pstage.style.setProperty('--hz', pHZ + 'px');
    if (psky) psky.size(pW, pH);
    timeW = ptime.offsetWidth || 44;
    pNeed = true;
  }
  function drawProc(time) {
    var p = procP(), u = seg(KP, KU, p, true);
    var pt = parc.getPointAtLength(clamp(u, 0, 1) * pTotal);
    var pal = mixPal(palAt(DAYPAL.light, u), palAt(DAYPAL.dark, u), night);
    var ringLin = clamp((p - 0.03) / 0.34, 0, 1);
    procVeil = 0.4 + 0.55 * sstep(0.02, 0.15, p);
    if (psky) {
      var paper = mix3(PAPER[0], PAPER[1], night);
      psky.draw({
        time: reduce ? 4 : time, sx: pt.x, sy: pt.y, R: pR, sunR: Math.max(pR * (0.045 + 0.012 * night), 2.4),
        top: pal.top, mid: pal.mid, low: pal.low, haze: pal.haze, glare: pal.glare, midPos: pal.midPos, hazeAmt: pal.hazeAmt, glareAmt: pal.glareAmt,
        paper: paper, ground: paper, groundOn: 1, skyH: pHZ,
        veil: procVeil, ring: ringLin * 1.04, ringAmt: lerp(1, 0.78, night), head: reduce ? 0 : sstep(0, 0.02, ringLin) * (1 - sstep(0.93, 1, ringLin)),
        dogL: sstep(0.52, 0.58, p), dogR: sstep(0.55, 0.61, p), line: sstep(0.3, 0.4, p), lineW: pW * 0.5,
        arc: sstep(0.56, 0.64, p), night: night, ghost: 0.5 * (1 - 0.5 * night), paperMix: 0, disc: 1.45, vig: 1, uv: lerp(TH.uvP[0], TH.uvP[1], night)
      });
    }
    /* marks over the sky switch between ink and white with the sky behind them */
    var lum = 0.2126 * pal.top[0] + 0.7152 * pal.top[1] + 0.0722 * pal.top[2];
    var kInk = sstep(TH.inkLum[0], TH.inkLum[1], lum), c = mix3(WHITE, INK, kInk);
    pstage.style.setProperty('--sk', 'rgb(' + Math.round(c[0] * 255) + ',' + Math.round(c[1] * 255) + ',' + Math.round(c[2] * 255) + ')');
    pstage.style.setProperty('--sks', kInk > 0.5 ? 'rgba(255,255,255,.55)' : TH.skyShade);
    procDark = theme === 'dark' || kInk < 0.5;
    /* the path behind the sun, and each phase it has reached */
    ptrail.style.strokeDashoffset = (pTotal * (1 - u)).toFixed(1);
    pws.forEach(function (g, i) { g.classList.toggle('lit', p >= KP[i + 1] - 0.012); });
    /* solar time rides the parhelic line beside the sun */
    var mins = seg(KU, CLOCK[theme === 'dark' ? 'dark' : 'light'], u, false);
    var mm = Math.round(mins) % 1440, clock = String(Math.floor(mm / 60)).padStart(2, '0') + ':' + String(mm % 60).padStart(2, '0');
    if (clock !== lastClock) { ptime.textContent = clock; lastClock = clock; }
    var right = pt.x < pW * 0.6, off = 1.18 * pR + 16;
    var tx = right ? pt.x + off : pt.x - off - timeW;
    ptime.style.transform = 'translate3d(' + clamp(tx, 12, pW - 12 - timeW).toFixed(1) + 'px,' + (pt.y - 24).toFixed(1) + 'px,0)';
    ptime.style.opacity = (sstep(pHZ + 4, pHZ - 30, pt.y) * sstep(0.02, 0.06, p)).toFixed(3);
    /* the section title gives way to the phases */
    var io = sstep(0.012, 0.065, p);
    pintro.style.opacity = (1 - io).toFixed(3);
    pintro.style.transform = 'translate3d(0,' + (-io * 40).toFixed(1) + 'px,0)';
    plabel.style.opacity = sstep(0.06, 0.1, p).toFixed(3);
    pmarks.style.opacity = (0.15 + 0.85 * sstep(0.01, 0.06, p)).toFixed(3);
    pphases.forEach(function (el, i) {
      /* one phase at a time: the old one lifts away before the next one rises in */
      var a = i === 0 ? sstep(0.03, 0.085, p) : sstep(KP[i + 1] - 0.075, KP[i + 1] - 0.035, p);
      var b = i === 3 ? 1 : 1 - sstep(KP[i + 2] - 0.115, KP[i + 2] - 0.08, p);
      el.style.opacity = (a * b).toFixed(3);
      el.style.transform = 'translate3d(0,' + ((1 - a) * 24 - (1 - b) * 24).toFixed(1) + 'px,0)';
    });
    var active = -1;
    for (var i = 0; i < 4; i++) if (p >= (i === 0 ? 0.055 : KP[i + 1] - 0.078)) active = i;
    psteps.forEach(function (s, i) { s.classList.toggle('on', i === active); s.classList.toggle('done', i < active); });
    pfill.style.transform = 'scaleX(' + (clamp(pt.x / pW, 0, 1) * sstep(0, 0.04, p)).toFixed(4) + ')';
  }

  /* the header sits on whichever sky is under it */
  function updateHead() {
    var hh = head.offsetHeight || 88;
    var fr = film.getBoundingClientRect(), pr = pfilm.getBoundingClientRect();
    var overHero = fr.bottom > hh, overProc = pr.top < hh && pr.bottom > hh;
    var solid = !(overHero || overProc);
    var onSky = theme !== 'dark' && ((overHero && heroDark) || (overProc && pr.top <= 0 && procDark));
    var hs = (solid ? 's' : 'f') + (onSky ? 'd' : '');
    if (hs !== lastHead) {
      lastHead = hs;
      head.classList.toggle('solid', solid);
      head.classList.toggle('on-sky', onSky);
    }
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { pIn = e[0].isIntersecting; if (pIn) pNeed = true; }).observe(pfilm);
  } else { pIn = true; }

  function sizeView() { if (vsky) { var r = vart.getBoundingClientRect(); vsky.size(r.width, r.height); needView = true; } }

  /* ================================================================ contact */
  var form = document.getElementById('contact-form'), note = document.getElementById('form-note');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    note.hidden = false;
  });
  var copyBtn = document.getElementById('copy-email'), mail = document.getElementById('email');
  copyBtn.addEventListener('click', function () {
    var done = function () { copyBtn.textContent = 'Copied'; setTimeout(function () { copyBtn.textContent = 'Copy'; }, 1600); };
    var fallback = function () { var r = document.createRange(); r.selectNodeContents(mail); var s = getSelection(); s.removeAllRanges(); s.addRange(r); };
    try { navigator.clipboard.writeText(mail.textContent.trim()).then(done, fallback); } catch (err) { fallback(); }
  });

  /* ================================================================ loop */
  var needHead = true;
  window.addEventListener('scroll', function () { needFilm = pNeed = needHead = true; }, { passive: true });
  var rt = null;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { measure(); sizeView(); pmeasure(); needHead = true; }, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measure(); pmeasure(); });
  measure(); sizeView(); pmeasure();
  var lastFilm = 0, lastView = 0, lastProc = 0, lastT = performance.now();
  function frame(now) {
    requestAnimationFrame(frame);
    var dt = Math.min(64, now - lastT); lastT = now;
    if (Math.abs(night - nightTarget) > 0.001) { night += (nightTarget - night) * Math.min(1, dt / 180); needFilm = needView = pNeed = true; }
    else night = nightTarget;
    if (document.hidden || menuState === 'open') return;
    var drifting = !reduce && sky && (night > 0.01 || filmVeil > 0.01) && filmPNow < 0.965;
    if (filmIn && (needFilm || (drifting && now - lastFilm > 50))) { drawFilm(now / 1000); lastFilm = now; needFilm = false; needHead = true; }
    if (pIn && (pNeed || (!reduce && psky && now - lastProc > 50))) { drawProc(now / 1000); lastProc = now; pNeed = false; needHead = true; }
    if (needHead) { updateHead(); needHead = false; }
    var animating = now - t0 < 1500;
    if (viewIn && (needView || animating || (!reduce && now - lastView > 50))) { drawView(now); lastView = now; needView = false; }
  }
  requestAnimationFrame(frame);
})();
