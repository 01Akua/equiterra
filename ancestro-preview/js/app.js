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
  var cp = [['Needs active restoration', 42, '#4f8a58'], ['Close to natural condition', 58, '#1d5228']];
  var st = $('#stack'), sl = $('#stack-l');
  cp.forEach(function (c) {
    var d = document.createElement('div'); d.style.background = c[2]; d.dataset.w = c[1]; d.textContent = c[1] + '%';
    d.title = c[0] + ': ' + c[1] + '%'; st.appendChild(d);
    var li = document.createElement('li');
    li.innerHTML = '<i style="background:' + c[2] + '"></i>' + c[0] + '<b>' + c[1] + '%</b>';
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
  /* ---------- gallery + events (edit the data lists to add content) ---------- */
  var PHOTOS = [
    { id: 'g1',  cat: 'Territory',   size: 'w', cap: 'Panorama of the Sierra Nevada' },
    { id: 'g7',  cat: 'Communities', size: 't', cap: 'Weaving under the tree' },
    { id: 'g3',  cat: 'Territory',   size: '',  cap: 'Stone path between traditional houses' },
    { id: 'g16', cat: 'Gatherings',  size: 'w', cap: 'Large group in front of the houses' },
    { id: 'g6',  cat: 'Communities', size: 't', cap: 'Arhuaco women in the forest' },
    { id: 'g2',  cat: 'Territory',   size: '',  cap: 'Río Ariguaní' },
    { id: 'g15', cat: 'Gatherings',  size: '',  cap: 'Assembly under the maloca' },
    { id: 'g18', cat: 'Communities', size: '',  cap: 'Community among the cacao' },
    { id: 'g4',  cat: 'Territory',   size: '',  cap: 'Slope with agaves' },
    { id: 'g5',  cat: 'Territory',   size: '',  cap: 'Garden and forest' },
    { id: 'g8',  cat: 'Communities', size: 't', cap: 'Three authorities at the house' },
    { id: 'g9',  cat: 'Communities', size: '',  cap: 'Community leader in front of the houses' },
    { id: 'g10', cat: 'Communities', size: '',  cap: 'Portrait of an Arhuaco woman' },
    { id: 'g11', cat: 'Communities', size: '',  cap: 'Man at the fence' },
    { id: 'g12', cat: 'Gatherings',  size: '',  cap: 'Conversation in the field' },
    { id: 'g13', cat: 'Gatherings',  size: '',  cap: 'Group seated in the forest' },
    { id: 'g14', cat: 'Gatherings',  size: '',  cap: 'Address at the community house' },
    { id: 'g17', cat: 'Gatherings',  size: 'w', cap: 'Communities and team at sunset' }
  ];
  var IMG = function (id) { return id === 'bogota' ? 'img/sierra-nevada-3.jpg' : 'img/gallery/' + id + '.jpg'; };

  // upcoming: true shows the card in "Coming next"
  var EVENTS = [
    { date: '2027', label: '2027', title: 'Pilot nurseries and first planting', place: 'Project territory', upcoming: true, cover: 'g4', photos: ['g4', 'g5'],
      text: 'Pilot nurseries and planting on at least 2% of the area, the first step of restoration in the territory.' },
    { date: '2026-10-12', label: 'Week of 12 Oct 2026', title: 'Capacity building for five Arhuaco leaders', place: 'Bogotá', cover: 'bogota', photos: ['bogota'],
      text: 'A training week in Bogotá for five Arhuaco leaders of the project.' },
    { date: '2026-08-07', label: '7 Aug 2026', title: 'Validation Agreement signed', place: 'Kunkurwa de Nawaku', cover: 'g16', photos: ['g16', 'g17'],
      text: 'The Validation Agreement was signed by mamos, cabildos and comisarios.' },
    { date: '2026-05', label: 'May – Aug 2026', title: 'Field missions and participatory mapping', place: 'Cuenca Durankwa Meyna', cover: 'g12', photos: ['g12', 'g11', 'g5'],
      text: 'Field missions with the communities and participatory mapping of the territory.' },
    { date: '2026-05-04', label: '4 May 2026', title: 'Socialisation assembly', place: 'Gunchukwa', cover: 'g15', photos: ['g15', 'g14'],
      text: 'Assembly to present the project to the communities. Women leaders also spoke.' }
  ];

  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var gal = $('#gal'), filter = 'all', expanded = false, SHOW = 8, shown = [];
  function renderGal() {
    shown = PHOTOS.filter(function (p) { return filter === 'all' || p.cat === filter; });
    var vis = expanded ? shown : shown.slice(0, SHOW);
    gal.innerHTML = vis.map(function (p, i) {
      return '<button class="gi ' + (p.size ? 'gi--' + p.size : '') + '" data-i="' + i + '" type="button"><img src="' + IMG(p.id) + '" alt="' + esc(p.cap) + '" loading="lazy"><span>' + esc(p.cap) + '</span></button>';
    }).join('');
    $('#gal-more').parentNode.style.display = (!expanded && shown.length > SHOW) ? '' : 'none';
  }
  $$('#gf .tab').forEach(function (t) {
    t.addEventListener('click', function () {
      $$('#gf .tab').forEach(function (x) { x.setAttribute('aria-selected', x === t); });
      filter = t.dataset.f; renderGal();
    });
  });
  $('#gal-more').addEventListener('click', function () { expanded = true; renderGal(); });
  renderGal();

  /* lightbox */
  var lb = $('#lb'), cur = 0, lastFocus = null;
  function showLb(i) {
    cur = (i + shown.length) % shown.length;
    $('#lb-img').src = IMG(shown[cur].id); $('#lb-img').alt = shown[cur].cap; $('#lb-cap').textContent = shown[cur].cap;
  }
  function openLb(i) { lastFocus = document.activeElement; lb.hidden = false; document.body.style.overflow = 'hidden'; showLb(i); $('#lb-x').focus(); }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  gal.addEventListener('click', function (e) { var b = e.target.closest('.gi'); if (b) openLb(+b.dataset.i); });
  $('#lb-x').addEventListener('click', closeLb);
  $('#lb-p').addEventListener('click', function () { showLb(cur - 1); });
  $('#lb-n').addEventListener('click', function () { showLb(cur + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  var tx = null;
  lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (tx === null) return; var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 40) showLb(cur + (dx < 0 ? 1 : -1));
  });

  /* events */
  function evCard(ev, i, big) {
    return '<button class="ev ' + (big ? 'ev--big' : '') + '" data-e="' + i + '" type="button"><span class="ev__img"><img src="' + IMG(ev.cover) + '" alt="" loading="lazy"></span>' +
      '<span class="ev__b"><span class="ev__tag ' + (ev.upcoming ? 'up' : '') + '">' + (ev.upcoming ? 'Upcoming' : 'Held') + '</span>' +
      '<time class="ev__d">' + esc(ev.label) + '</time><strong>' + esc(ev.title) + '</strong><em>' + esc(ev.place) + '</em><span class="ev__t">' + esc(ev.text) + '</span></span></button>';
  }
  var nextHtml = '', gridHtml = '';
  EVENTS.forEach(function (ev, i) {
    if (ev.upcoming) nextHtml += '<span class="evnext__l">Coming next</span>' + evCard(ev, i, true);
    else gridHtml += evCard(ev, i, false);
  });
  $('#evnext').innerHTML = nextHtml; $('#evgrid').innerHTML = gridHtml;
  var evm = $('#evm');
  function openEv(i) {
    var ev = EVENTS[i]; lastFocus = document.activeElement;
    $('#evm-ph').innerHTML = ev.photos.map(function (id) { return '<img src="' + IMG(id) + '" alt="' + esc(ev.title) + '" loading="lazy">'; }).join('');
    $('#evm-ph').className = 'evm__ph n' + ev.photos.length;
    $('#evm-meta').textContent = ev.label + ' · ' + ev.place;
    $('#evm-title').textContent = ev.title; $('#evm-txt').textContent = ev.text;
    evm.hidden = false; document.body.style.overflow = 'hidden'; $('#evm-x').focus();
  }
  function closeEv() { evm.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  $('#events').addEventListener('click', function (e) { var b = e.target.closest('.ev'); if (b) openEv(+b.dataset.e); });
  $('#evm-x').addEventListener('click', closeEv);
  evm.addEventListener('click', function (e) { if (e.target === evm) closeEv(); });

  document.addEventListener('keydown', function (e) {
    if (!lb.hidden) {
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') showLb(cur - 1);
      else if (e.key === 'ArrowRight') showLb(cur + 1);
    } else if (!evm.hidden && e.key === 'Escape') closeEv();
  });
})();
