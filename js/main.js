/* ============================================================
   EQUITERRA — Interacciones (vanilla, sin dependencias)
   Motor editorial: line/word reveal, wipe, parallax, marquee, pin H.
   ============================================================ */
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Header sólido al scroll ---- */
  const header = document.querySelector('.eq-header');
  if (header && !header.classList.contains('eq-header--inner')) {
    const onScroll = () => header.classList.toggle('is-solid', window.scrollY > 60);
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Menú móvil ---- */
  const burger = document.querySelector('.eq-burger');
  const mobile = document.querySelector('.eq-mobile');
  if (burger && mobile) {
    burger.addEventListener('click', () => {
      const open = mobile.classList.toggle('is-open');
      document.body.classList.toggle('nav-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobile.classList.remove('is-open'); document.body.classList.remove('nav-open');
    }));
  }

  /* ---- Split de titulares en líneas (máscara) ---- */
  function splitLines(el) {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    const tmp = words.map(w => { const s = document.createElement('span'); s.style.display = 'inline-block'; s.textContent = w; el.append(s, document.createTextNode(' ')); return s; });
    const lines = []; let top = null, cur = null;
    tmp.forEach(s => {
      const t = Math.round(s.offsetTop);
      if (t !== top) { top = t; cur = []; lines.push(cur); }
      cur.push(s.textContent);
    });
    el.textContent = '';
    lines.forEach((line, i) => {
      const wrap = document.createElement('span'); wrap.className = 'line-wrap';
      const inner = document.createElement('span'); inner.className = 'line'; inner.style.setProperty('--i', i);
      inner.textContent = line.join(' ');
      wrap.appendChild(inner); el.appendChild(wrap);
    });
  }
  /* ---- Split del hero en palabras ---- */
  function splitWords(el) {
    const words = el.innerHTML.trim().split(/\s+/);
    el.innerHTML = '';
    words.forEach((w, i) => {
      const wrap = document.createElement('span'); wrap.className = 'word-wrap';
      const inner = document.createElement('span'); inner.className = 'word'; inner.style.setProperty('--i', i);
      inner.innerHTML = w; wrap.appendChild(inner); el.appendChild(wrap);
      el.appendChild(document.createTextNode(' '));
    });
  }

  /* ---- Observer: marca .is-in (se monta tras splittear) ----
     Nota: los elementos con clip-path (wipe) reportan intersectionRatio = 0,
     así que necesitan un observer con threshold 0 + rootMargin inferior. ---- */
  function mountObserver() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-anim], [data-stagger], .eq-rule').forEach(el => el.classList.add('is-in'));
      return;
    }
    const reveal = (entries, io) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
    // Elementos con clip-path (wipe / wipe-x)
    const clipped = document.querySelectorAll('[data-anim="wipe"], [data-anim="wipe-x"]');
    const ioClip = new IntersectionObserver(reveal, { threshold: 0, rootMargin: '0px 0px -14% 0px' });
    clipped.forEach(el => ioClip.observe(el));
    // El resto
    const rest = document.querySelectorAll('[data-anim]:not([data-anim="wipe"]):not([data-anim="wipe-x"]), [data-stagger], .eq-rule');
    const ioRest = new IntersectionObserver(reveal, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });
    rest.forEach(el => ioRest.observe(el));
  }

  /* ---- i18n curado (ES/PT): reemplaza texto del DOM ANTES de splittear ---- */
  const I18N_STORE = 'eq_lang';
  const CURATED = ['es', 'pt'];
  function currentLang() {
    if (location.host.endsWith('.translate.goog')) return new URLSearchParams(location.search).get('_x_tr_tl') || 'en';
    return localStorage.getItem(I18N_STORE) || 'en';
  }
  function applyI18n(lang) {
    if (!CURATED.includes(lang) || !window.EQ_I18N || !window.EQ_I18N[lang]) return;
    const dict = window.EQ_I18N[lang];
    const norm = s => s.replace(/\s+/g, ' ').trim();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = n.parentElement;
        if (!p || p.closest('.notranslate, script, style, .eq-lang')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = []; let x; while ((x = walker.nextNode())) nodes.push(x);
    nodes.forEach(n => {
      const t = dict[norm(n.nodeValue)];
      if (t !== undefined) n.nodeValue = n.nodeValue.match(/^\s*/)[0] + t + n.nodeValue.match(/\s*$/)[0];
    });
    document.querySelectorAll('[placeholder]').forEach(el => {
      const t = dict[norm(el.getAttribute('placeholder'))];
      if (t !== undefined) el.setAttribute('placeholder', t);
    });
    document.documentElement.lang = lang;
  }

  function initText() {
    applyI18n(currentLang());           // 1) traducir
    if (!reduce) {                      // 2) luego splittear el texto ya traducido
      document.querySelectorAll('[data-anim="lines"]').forEach(splitLines);
      document.querySelectorAll('[data-anim="words"]').forEach(splitWords);
    }
    mountObserver();                    // 3) animar
  }
  // Esperar a la fuente para medir bien los saltos de línea
  if (document.fonts && document.fonts.ready) {
    let done = false; const go = () => { if (!done) { done = true; initText(); } };
    document.fonts.ready.then(go); setTimeout(go, 800); // fallback
  } else { initText(); }

  /* ---- Contadores ---- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const co = new IntersectionObserver((es) => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target, target = parseFloat(el.dataset.count), dur = 1600, t0 = performance.now();
        const step = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target).toLocaleString();
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step); co.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(el => co.observe(el));
  }

  /* ---- Marquee: duplica el contenido para loop sin saltos ---- */
  document.querySelectorAll('.eq-marquee__track').forEach(t => { t.innerHTML += t.innerHTML; });

  /* ---- Selector de idioma ----
     EN original · ES/PT curados (diccionario, instantáneo, sirve en localhost)
     · FR/DE/IT traducción automática (proxy Google translate.goog) ---- */
  (function languageSwitcher() {
    const LANGS = [['en', 'English'], ['es', 'Español'], ['pt', 'Português'], ['fr', 'Français'], ['de', 'Deutsch'], ['it', 'Italiano']];
    const PROXY = ['fr', 'de', 'it'];
    const onProxy = location.host.endsWith('.translate.goog');
    const isLocal = /^(127\.|localhost|0\.0\.0\.0|192\.168\.|10\.)/.test(location.host);
    const current = currentLang();

    // Aplicar lang pasado por hash (#lang=xx) al volver del proxy al host canónico
    const hashLang = (location.hash.match(/lang=([a-z]{2})/) || [])[1];
    if (hashLang && !onProxy) {
      if (hashLang === 'en') localStorage.removeItem(I18N_STORE); else localStorage.setItem(I18N_STORE, hashLang);
      history.replaceState(null, '', location.pathname + location.search);
      if (hashLang !== current) return location.reload();
    }

    function originalHost() {
      // proxy host: a--b-example-com.translate.goog  ->  a-b.example.com
      return location.host.replace(/\.translate\.goog$/, '').replace(/--/g, ' ').replace(/-/g, '.').replace(/ /g, '-');
    }
    function proxyHost() {
      return location.host.replace(/-/g, '--').replace(/\./g, '-') + '.translate.goog';
    }

    function translateTo(code) {
      if (code === current) return;
      if (PROXY.includes(code)) {
        if (isLocal) { alert('FR/DE/IT usan traducción automática que necesita la URL pública (Cloudflare tunnel), no localhost.\n\nES y PT sí funcionan aquí.'); return; }
        const base = onProxy ? location.host.replace(/\.translate\.goog$/, '') : proxyHost();
        location.href = location.protocol + '//' + base + location.pathname + '?_x_tr_sl=auto&_x_tr_tl=' + code + '&_x_tr_hl=' + code;
        return;
      }
      // EN / ES / PT → host canónico + curado
      if (onProxy) { // salir del proxy llevando el idioma por hash
        location.href = location.protocol + '//' + originalHost() + location.pathname + '#lang=' + code;
        return;
      }
      if (code === 'en') localStorage.removeItem(I18N_STORE); else localStorage.setItem(I18N_STORE, code);
      location.reload();
    }

    function build(container) {
      const wrap = document.createElement('div');
      wrap.className = 'eq-lang notranslate';
      wrap.setAttribute('translate', 'no');
      wrap.innerHTML =
        '<button class="eq-lang__btn" aria-haspopup="true" aria-expanded="false">🌐 <span>' + current.toUpperCase() + '</span> <span class="eq-lang__caret">▾</span></button>' +
        '<div class="eq-lang__menu" role="menu">' +
        LANGS.map(l => '<button data-lang="' + l[0] + '"' + (l[0] === current ? ' class="is-current"' : '') + '>' + l[1] + '<small>' + l[0].toUpperCase() + '</small></button>').join('') +
        '</div>';
      const btn = wrap.querySelector('.eq-lang__btn');
      btn.addEventListener('click', (e) => { e.stopPropagation(); const o = wrap.classList.toggle('is-open'); btn.setAttribute('aria-expanded', String(o)); });
      wrap.querySelectorAll('[data-lang]').forEach(b => b.addEventListener('click', () => translateTo(b.dataset.lang)));
      container.prepend(wrap);
    }
    const cta = document.querySelector('.eq-header__cta');
    if (cta) build(cta);
    const mob = document.querySelector('.eq-mobile');
    if (mob) { const slot = document.createElement('div'); slot.style.marginTop = '1.2rem'; mob.appendChild(slot); build(slot); }
    document.addEventListener('click', () => document.querySelectorAll('.eq-lang.is-open').forEach(w => w.classList.remove('is-open')));
  })();

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.eq-faq__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.eq-faq__item');
      const ans = item.querySelector('.eq-faq__a');
      const open = item.classList.toggle('is-open');
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : '';
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ---- Parallax + Pin horizontal: un solo rAF loop ---- */
  const parallaxEls = [...document.querySelectorAll('[data-parallax]')];
  const hs = document.querySelector('.eq-hscroll');
  const hsPin = hs && hs.querySelector('.eq-hscroll__pin');
  const hsTrack = hs && hs.querySelector('.eq-hscroll__track');
  const isMobile = () => window.matchMedia('(max-width: 760px)').matches;

  function sizeHscroll() {
    if (!hs || isMobile()) { if (hs) hs.style.height = ''; return; }
    const extra = Math.max(0, hsTrack.scrollWidth - window.innerWidth);
    hs.style.height = (window.innerHeight + extra) + 'px';
  }

  let ticking = false;
  function frame() {
    ticking = false;
    if (!reduce) {
      parallaxEls.forEach(el => {
        const r = el.getBoundingClientRect();
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const offset = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
        el.style.setProperty('--py', offset.toFixed(1) + 'px');
      });
    }
    if (hs && hsTrack && !isMobile()) {
      const total = hs.offsetHeight - window.innerHeight;
      const prog = Math.min(Math.max(-hs.getBoundingClientRect().top / total, 0), 1);
      const extra = Math.max(0, hsTrack.scrollWidth - window.innerWidth);
      hsTrack.style.transform = `translateX(${(-prog * extra).toFixed(1)}px)`;
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  if (parallaxEls.length || hs) {
    sizeHscroll(); frame();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { sizeHscroll(); frame(); });
  }
})();
