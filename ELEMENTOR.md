<!-- ELEMENTOR.md — Guía de pase del modelo en código a Elementor -->
<!-- last_updated: 2026-08-04 -->

# Equiterra → Elementor: guía de pase

Cada sección del HTML está marcada con un comentario `[NATIVO]` / `[PRO]` / `[CÓDIGO]`.
Esta tabla resume qué hacer con cada bloque.

## Leyenda
- **[NATIVO]** — se arma arrastrando widgets de Elementor (free). Drag-and-drop.
- **[PRO]** — necesita Elementor Pro (sticky, parallax, form, motion effects).
- **[CÓDIGO]** — se pega como widget HTML o snippet en *Custom CSS* / code. No es drag-and-drop.

## Paso 0 — Tokens globales (hacer una vez)
- Pegar `css/variables.css` en **Elementor > Site Settings > Custom CSS**.
- O mapear a **Global Colors**: forest `#0f2e15`, mint `#dae2cb`, warm gray `#565953`, gold `#c9a86a`.
- **Global Font**: Outfit (ya es la del sitio actual).

## Mapeo por componente

| Componente | Nivel | Cómo en Elementor |
|------------|-------|-------------------|
| Header / nav | NATIVO | Theme Builder > Header + Nav Menu widget. Logo claro/oscuro = 2 imágenes con display por scroll (sticky header Pro) |
| Hero con video | NATIVO | Section con **Background type: Video** (igual que el sitio actual). Subir `assets/video/hero-intro.mp4` |
| Reveal título línea/palabra | CÓDIGO | Widget HTML con el markup + `css/anim.css` + `js/main.js` (split) |
| Ken Burns del video | CÓDIGO | Custom CSS (`@keyframes eq-kenburns`) |
| Manifiesto (statement) | NATIVO | Heading widget. Reveal = CÓDIGO |
| Marquee | CÓDIGO | Widget HTML + CSS `.eq-marquee` (o addon Happy/Premium si lo prefieren) |
| Capabilities head sticky | PRO | Columna con **Motion Effects > Sticky** |
| Cards (pilares, why, ptype) | NATIVO | Icon Box widget en grid |
| Wipe clip-path | CÓDIGO | Custom CSS + clase en la card |
| Framework principios | NATIVO | Icon List / cards |
| **Proyectos scroll horizontal** | CÓDIGO | Widget HTML + el JS de pin (lo más manual; sin equivalente nativo confiable) |
| Contadores (Impact) | NATIVO | **Counter** widget |
| Parallax founder | PRO | Motion Effects > Scrolling Effects |
| Feature rows (interior) | NATIVO | 2 columnas (texto + imagen/panel) |
| Process / pasos | NATIVO | Icon Box en grid (numerado con counter CSS o manual) |
| Timeline (CBAM) | NATIVO | Filas / Icon List |
| **FAQ accordion** | PRO | Widget **Accordion** nativo de Elementor (reemplaza nuestro JS) |
| **Formulario contacto** | PRO | Widget **Form** de Elementor Pro (reemplaza el `<form>` HTML; añade envío real) |
| Footer | NATIVO | Theme Builder > Footer |
| **Página de proyecto** (`.eq-proj-hero`/`.eq-facts`/`.eq-pgallery`/`.eq-feature`/`.eq-timeline`) | CÓDIGO/NATIVO mixto | Template único reutilizado por las 4 páginas activas (Sierra Nevada, Moba, Rafey, SOS). Hero+facts+feature = NATIVO (columnas/heading/icon list); galería = **Gallery widget** nativo; timeline = Icon List. Crear como **Elementor Theme Builder > Single template** con campos dinámicos (ACF o Pro's Dynamic Tags) en vez de duplicar HTML por proyecto |
| Modal "Download project brief" (`js/download-modal.js`) | PRO | **Popup Builder** de Elementor Pro (trigger por click) reemplaza el modal JS a mano; conectar a **Form** widget real en vez del guardado local de leads |
| Dropdown nav "Projects" (NBS/TBS) | NATIVO | Nav Menu widget con submenú de 2 niveles |
| Sección "Why Partner" (repetida en varias páginas) | NATIVO | Guardar como **Global Widget/Section** de Elementor y reutilizar por referencia — evita mantener el copy pegado 7 veces |
| Páginas legales (privacy/terms/disclaimer) | NATIVO | Páginas simples de texto; heading + rich text |

## Reglas al pegar código
1. Todo está scopeado con `.eq-*` → no choca con clases de Elementor.
2. Los snippets dependen de `css/anim.css` y `js/main.js`. Cargar ambos una sola vez (Custom CSS global + un widget HTML con el `<script>` en el footer).
3. Animaciones que dependen de `clip-path` (wipe) usan un IntersectionObserver con `threshold:0` — ya resuelto en `main.js`. No usar la entrance animation nativa de Elementor para esos bloques.

## Multi-idioma
- **Modelo en código (actualizado):** EN nativo + **ES/PT curados a mano** (diccionario `js/i18n.js`, ~440+ claves) — funcionan instantáneo, hasta en localhost, sin depender de un proxy externo. FR/DE/IT siguen vía proxy Google (`translate.goog`), solo en la URL pública. Marca protegida con `notranslate`.
- **Producción Elementor/WP:** instalar **Polylang** o **WPML** o **TranslatePress** con traducción automática (DeepL/Google). Dan URLs por idioma (`/es/`, `/en/`), hreflang y SEO multilingüe — superior al proxy para producción. Las cadenas ya curadas de `i18n.js` sirven como base ES/PT lista para importar, en vez de partir de traducción automática desde cero.

## Panel de administración (CMS del modelo, no porta directo)
- `admin/index.html` + `admin/content.json` + `js/content-loader.js` son un **CMS casero exclusivo del modelo en código** — permiten editar contenido (con tabs EN/ES/PT y traducción automática vía MyMemory) sin tocar HTML, para iterar rápido con el cliente antes del pase.
- **No se porta a Elementor.** En WordPress el rol de este panel lo cumple el propio wp-admin: cada campo editable del modelo (hero, facts, founder, proyectos, etc.) debe mapearse a **ACF (Advanced Custom Fields)** o a los **Dynamic Tags** de Elementor Pro, y la traducción la maneja el plugin multilenguaje (Polylang/WPML/TranslatePress), no un traductor JS a mano.
- Al planear el pase: usar `admin/content.json` como fuente de verdad de qué campos son editables y su estructura, para definir los grupos de campos ACF.

## Recomendación
Híbrido: estructura + estilos base en Elementor nativo; animaciones premium y la galería horizontal como código pegado por sección. FAQ y formulario: usar los widgets Pro nativos (mejor que nuestro JS para esos dos casos). Modal de leads → Popup Builder + Form Pro. Contenido editable → ACF/Dynamic Tags en vez del CMS casero.
