(function () {
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* header, progress, parallax */
  var hdr = $('#hdr'), prog = $('#progress'), hero = $('#heroImg');
  function onScroll() {
    var y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    hdr.classList.toggle('solid', y > innerHeight * 0.6);
    prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    if (hero && !reduce && y < innerHeight * 1.2) hero.style.transform = 'translate3d(0,' + (y * 0.18) + 'px,0)';
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* mobile menu */
  var burger = $('#burger'), nav = $('#nav');
  burger.addEventListener('click', function () {
    var o = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', o);
  });
  $$('#nav a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); }); });

  /* scroll spy */
  var links = $$('#nav a');
  var spy = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(function (a) { var s = $(a.getAttribute('href')); if (s) spy.observe(s); });

  /* reveal */
  var rv = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$('.rv').forEach(function (el) { reduce ? el.classList.add('in') : rv.observe(el); });

  /* count-up */
  function fmt(n, sep) { return sep ? n.toLocaleString('en-US') : String(n); }
  $$('[data-count]').forEach(function (el) {
    var to = +el.dataset.count, sep = el.dataset.sep;
    if (reduce) return;
    el.textContent = '0';
    var io = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return; io.disconnect();
      var t0 = performance.now(), d = 1600;
      (function step(t) {
        var p = Math.min((t - t0) / d, 1), k = 1 - Math.pow(1 - p, 4);
        el.textContent = fmt(Math.round(to * k), sep);
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });
    io.observe(el);
  });

  /* altitude strata */
  var strata = [
    { tag: 'Stratum 1 · 29% of the area', ha: '1,328', pct: 29, name: 'Lowland tropical, under 800 m', txt: 'Biome T1.3, dry forest. Where agricultural frontier pressure is strongest and dry-season water limits nursery siting.' },
    { tag: 'Stratum 2 · 18% of the area', ha: '806', pct: 18, name: 'Transition, 800 to 1,000 m', txt: 'Biomes T1.2 and T1.3 meet here. A mixed band where assisted regeneration and enrichment planting overlap.' },
    { tag: 'Stratum 3 · 53% of the area', ha: '2,400', pct: 53, name: 'Humid mountain, over 1,000 m', txt: 'Biome T1.2, humid montane forest. The largest stratum and the headwaters of the Río Ariguaní.' }
  ];
  var bands = $$('.band');
  function pick(i) {
    var s = strata[i];
    bands.forEach(function (b) { b.classList.toggle('on', +b.dataset.i === i); });
    $('#p-tag').textContent = s.tag; $('#p-ha').textContent = s.ha;
    $('#p-name').textContent = s.name; $('#p-txt').textContent = s.txt;
    $('#p-bar').style.width = s.pct + '%';
  }
  bands.forEach(function (b) {
    var i = +b.dataset.i;
    b.setAttribute('tabindex', '0'); b.setAttribute('role', 'button'); b.setAttribute('aria-label', strata[i].name);
    b.addEventListener('click', function () { pick(i); });
    b.addEventListener('mouseenter', function () { pick(i); });
    b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(i); } });
  });

  /* land cover donut */
  var cover = [
    ['Forest', 3720.7, '#1d5228'], ['Grassland', 646.8, '#9bb88a'],
    ['Shrubland', 164.7, '#c9a94d'], ['Built, cropland, bare soil', 1.0, '#8a8d86']
  ];
  var total = cover.reduce(function (a, c) { return a + c[1]; }, 0), C = 2 * Math.PI * 50, off = 0, dn = $('#donut'), dl = $('#donut-l');
  cover.forEach(function (c) {
    var len = c[1] / total * C;
    var ci = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    ci.setAttribute('cx', 70); ci.setAttribute('cy', 70); ci.setAttribute('r', 50);
    ci.setAttribute('stroke', c[2]); ci.setAttribute('stroke-dashoffset', -off);
    ci.setAttribute('stroke-dasharray', '0 ' + C); ci.dataset.len = len; ci.dataset.c = C;
    dn.appendChild(ci); off += len;
    var li = document.createElement('li');
    li.innerHTML = '<i style="background:' + c[2] + '"></i>' + c[0] + '<b>' + c[1].toLocaleString('en-US', { maximumFractionDigits: 1 }) + ' ha</b>';
    dl.appendChild(li);
  });

  /* carbon potential stack */
  var cp = [['High', 108, 2, '#c9a94d'], ['Medium', 1793, 40, '#4f8a58'], ['Low, near reference', 2632, 58, '#1d5228']];
  var st = $('#stack'), sl = $('#stack-l');
  cp.forEach(function (c) {
    var d = document.createElement('div'); d.style.background = c[3]; d.dataset.w = c[2]; d.textContent = c[2] >= 10 ? c[2] + '%' : '';
    d.title = c[0] + ': ' + c[2] + '%'; st.appendChild(d);
    var li = document.createElement('li');
    li.innerHTML = '<i style="background:' + c[3] + '"></i>' + c[0] + '<b>' + c[1].toLocaleString('en-US') + ' ha · ' + c[2] + '%</b>';
    sl.appendChild(li);
  });
  function animateCharts() {
    $$('#donut circle').forEach(function (c) { c.setAttribute('stroke-dasharray', c.dataset.len + ' ' + c.dataset.c); });
    $$('#stack div').forEach(function (d) { d.style.width = d.dataset.w + '%'; });
  }
  var cio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { animateCharts(); cio.disconnect(); } }, { threshold: 0.3 });
  cio.observe($('.charts'));

  /* approach tabs */
  var tabs = $$('.tab');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.setAttribute('aria-selected', x === t); });
      $$('.tabpanel').forEach(function (p) { p.classList.toggle('on', p.dataset.p === t.dataset.t); });
    });
  });
})();
