/**
 * Equiterra — Content Loader
 * Fetches admin/content.json and injects values into the page.
 * Supports multilingual fields: {en, es, pt} objects.
 * Falls back silently to hardcoded HTML if JSON is unavailable.
 */
(function () {
  'use strict';

  // ── Language detection ─────────────────────────────────────────────────────
  function currentLang() {
    return localStorage.getItem('eq_lang') || 'en';
  }

  // ── Get value from nested path, resolve multilingual objects ───────────────
  function get(obj, path) {
    const val = path.replace(/\[(\d+)\]/g, '.$1').split('.').reduce((o, k) => o?.[k], obj);
    if (val && typeof val === 'object' && !Array.isArray(val) && ('en' in val || 'es' in val)) {
      const lang = currentLang();
      return (val[lang] && val[lang].trim()) ? val[lang] : (val['en'] || '');
    }
    return val;
  }

  // ── Selector maps per page ─────────────────────────────────────────────────
  const MAPS = {

    home: {
      '.eq-hero__tagline':                           'home.hero.tagline',
      '.eq-hero h1':                                 'html:home.hero.h1',
      '.eq-hero-subtitle':                           'home.hero.subtitle',
      '.eq-hero-cta-primary':                        'home.hero.cta_primary',
      '.eq-hero-cta-secondary':                      'home.hero.cta_secondary',
      '.eq-manifesto .eq-eyebrow':                   'home.manifesto.eyebrow',
      '.eq-manifesto h2':                            'home.manifesto.h2',
      '.eq-manifesto-p1':                            'home.manifesto.p1',
      '.eq-manifesto-p2':                            'home.manifesto.p2',
      '.eq-caps .eq-eyebrow':                        'home.capabilities.eyebrow',
      '.eq-caps h2.eq-h2':                           'home.capabilities.h2',
      '.eq-caps .eq-lead':                           'home.capabilities.lead',
      '.eq-pillars .eq-eyebrow':                     'home.pillars.eyebrow',
      '.eq-pillars h2.eq-h2':                        'home.pillars.h2',
      '.eq-framework .eq-eyebrow':                   'home.cm4ge.eyebrow',
      '.eq-framework h2.eq-h2':                      'home.cm4ge.h2',
      '.eq-framework .eq-lead':                      'home.cm4ge.lead',
      '.eq-framework .eq-btn':                       'home.cm4ge.cta',
      '.eq-impact .eq-eyebrow':                      'home.impact.eyebrow',
      '.eq-impact h2.eq-h2':                         'home.impact.h2',
      '.eq-founder .eq-eyebrow':                     'home.founder.eyebrow',
      '.eq-founder blockquote':                      'home.founder.quote',
      '.eq-founder__name':                           'home.founder.name',
      '.eq-founder__role':                           'home.founder.role',
      '.eq-founder-bio':                             'home.founder.bio',
      '.eq-why .eq-eyebrow':                         'home.why.eyebrow',
      '.eq-why-h2':                                  'home.why.h2',
      '.eq-cta-band h2.eq-h2':                       'home.cta.h2',
      '.eq-cta-band p':                              'home.cta.p',
      '.eq-cta-band .eq-btn--gold':                  'html:home.cta.btn_primary',
      '.eq-cta-band .eq-btn--ghost':                 'home.cta.btn_secondary',
    },

    about: {
      '.eq-phero .eq-eyebrow':                       'about.hero.eyebrow',
      '.eq-phero h1':                                'about.hero.h1',
      '.eq-phero p':                                 'about.hero.p',
      '.eq-about-who .eq-eyebrow':                   'about.who.eyebrow',
      '.eq-about-who h2':                            'about.who.h2',
      '.eq-about-who .eq-lead':                      'about.who.lead',
      '.eq-textrow:nth-child(1) h2':                 'about.mandate.h2',
      '.eq-textrow:nth-child(1) > div:last-child > p': 'about.mandate.p',
      '.eq-textrow:nth-child(2) h2':                 'about.how.h2',
      '.eq-textrow:nth-child(2) > div:last-child > p': 'about.how.p',
      '.eq-founder blockquote':                      'about.founder.quote',
      '.eq-about-values .eq-eyebrow':                'about.values.eyebrow',
      '.eq-about-values h2':                         'about.values.h2',
    },

    solutions: {
      '.eq-phero .eq-eyebrow':                       'solutions.hero.eyebrow',
      '.eq-phero h1':                                'solutions.hero.h1',
      '.eq-phero p':                                 'solutions.hero.p',
      '.eq-process .eq-eyebrow':                     'solutions.process.eyebrow',
      '.eq-process h2.eq-h2':                        'solutions.process.h2',
    },

    cbam: {
      '.eq-phero .eq-eyebrow':                       'cbam.hero.eyebrow',
      '.eq-phero h1':                                'cbam.hero.h1',
      '.eq-phero p':                                 'cbam.hero.p',
      '.eq-cbam-basics .eq-eyebrow':                 'cbam.basics.eyebrow',
      '.eq-cbam-basics h2.eq-h2':                    'cbam.basics.h2',
      '.eq-cbam-basics .eq-lead':                    'cbam.basics.lead',
      '.eq-cbam-role .eq-eyebrow':                   'cbam.role.eyebrow',
      '.eq-cbam-role h2':                            'cbam.role.h2',
      '.eq-cbam-role p':                             'cbam.role.p',
      '.eq-cbam-faq .eq-eyebrow':                    'cbam.faq_head.eyebrow',
      '.eq-cbam-faq h2.eq-h2':                       'cbam.faq_head.h2',
    },

    partner: {
      '.eq-phero .eq-eyebrow':                       'partner.hero.eyebrow',
      '.eq-phero h1':                                'partner.hero.h1',
      '.eq-phero p':                                 'partner.hero.p',
      '.eq-partner-types .eq-eyebrow':               'partner.types.eyebrow',
      '.eq-partner-types h2.eq-h2':                  'partner.types.h2',
      '.eq-contact__info .eq-eyebrow':               'partner.contact.eyebrow',
      '.eq-contact__info h2':                        'partner.contact.h2',
      '.eq-contact__info > p':                       'partner.contact.p',
    },

  };

  // Repeater maps: arrays injected by index
  const REPEATER_MAPS = {

    home: [
      { sel: '.eq-caps .eq-cap', fields: [
        { child: 'h3',  key: 'home.capabilities.items[I].h3' },
        { child: 'p',   key: 'home.capabilities.items[I].p' },
      ]},
      { sel: '.eq-pillars .eq-pillar', fields: [
        { child: 'h3',  key: 'home.pillars.items[I].h3' },
        { child: 'p',   key: 'home.pillars.items[I].p' },
      ]},
      { sel: '.eq-framework__list .eq-principle', fields: [
        { child: 'h4',  key: 'home.cm4ge.principles[I].h4' },
        { child: 'p',   key: 'home.cm4ge.principles[I].p' },
      ]},
      { sel: '.eq-impact__grid .eq-stat', fields: [
        { child: '.eq-stat__label', key: 'home.impact.stats[I].label' },
      ]},
      { sel: '.eq-section .eq-why', fields: [
        { child: 'h3',  key: 'home.why.items[I].h3' },
        { child: 'p',   key: 'home.why.items[I].p' },
      ]},
    ],

    solutions: [
      { sel: '.eq-feature', fields: [
        { child: '.eq-eyebrow',  key: 'solutions.services[I].eyebrow' },
        { child: 'h2',           key: 'solutions.services[I].h2' },
        { child: 'p',            key: 'solutions.services[I].p' },
      ]},
      { sel: '.eq-step', fields: [
        { child: 'h3',  key: 'solutions.process.steps[I].h3' },
        { child: 'p',   key: 'solutions.process.steps[I].p' },
      ]},
    ],

    cbam: [
      { sel: '.eq-cbam-basics .eq-ptype', fields: [
        { child: 'h3',  key: 'cbam.basics.cards[I].h3' },
        { child: 'p',   key: 'cbam.basics.cards[I].p' },
      ]},
      { sel: '.eq-tl', fields: [
        { child: '.eq-tl__date', key: 'cbam.timeline[I].date' },
        { child: 'h3',           key: 'cbam.timeline[I].h3' },
        { child: 'p',            key: 'cbam.timeline[I].p' },
      ]},
      { sel: '.eq-faq__item', fields: [
        { child: '.eq-faq__q', key: 'cbam.faq[I].q', html: true },
        { child: '.eq-faq__a p', key: 'cbam.faq[I].a' },
      ]},
    ],

    about: [
      { sel: '.eq-about-values .eq-ptype', fields: [
        { child: 'h3',  key: 'about.values.items[I].h3' },
        { child: 'p',   key: 'about.values.items[I].p' },
      ]},
    ],

    partner: [
      { sel: '.eq-partner-types .eq-ptype', fields: [
        { child: 'h3',  key: 'partner.types.items[I].h3' },
        { child: 'p',   key: 'partner.types.items[I].p' },
      ]},
    ],

  };

  // ── Main hydrate ───────────────────────────────────────────────────────────
  async function hydrate() {
    const page = document.body.dataset.page;
    if (!page || !MAPS[page]) return;

    let c;
    try {
      const base = document.querySelector('base')?.href || location.origin;
      const url = new URL('/admin/content.json', base).href + '?t=' + Date.now();
      const r = await fetch(url, { cache: 'no-store' });
      if (!r.ok) return;
      c = await r.json();
    } catch {
      return;
    }

    // Simple selector map
    const map = MAPS[page];
    for (const [sel, keyDef] of Object.entries(map)) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const isHtml = keyDef.startsWith('html:');
      const key = isHtml ? keyDef.slice(5) : keyDef;
      const val = get(c, key);
      if (val == null || val === '') continue;
      if (isHtml) el.innerHTML = val;
      else el.textContent = val;
    }

    // Repeater map
    const rmap = REPEATER_MAPS[page] || [];
    for (const group of rmap) {
      const els = document.querySelectorAll(group.sel);
      els.forEach((el, i) => {
        for (const f of group.fields) {
          const child = el.querySelector(f.child);
          if (!child) continue;
          const key = f.key.replace('I', i);
          const val = get(c, key);
          if (val == null || val === '') continue;
          if (f.html) child.innerHTML = val;
          else child.textContent = val;
        }
      });
    }

    // Site-wide: footer copyright + email
    const copy = document.querySelector('.eq-footer__bottom span');
    if (copy) { const v = get(c, 'site.copyright'); if (v) copy.textContent = v; }
    const emails = document.querySelectorAll('a[href^="mailto:"]');
    const email = get(c, 'site.email');
    if (email) emails.forEach(a => { a.href = 'mailto:' + email; a.textContent = email; });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hydrate);
  } else {
    hydrate();
  }

})();
