<!-- ELEMENTOR.md — Guía de pase del modelo en código a Elementor -->
<!-- last_updated: 2026-06-23 -->

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

## Reglas al pegar código
1. Todo está scopeado con `.eq-*` → no choca con clases de Elementor.
2. Los snippets dependen de `css/anim.css` y `js/main.js`. Cargar ambos una sola vez (Custom CSS global + un widget HTML con el `<script>` en el footer).
3. Animaciones que dependen de `clip-path` (wipe) usan un IntersectionObserver con `threshold:0` — ya resuelto en `main.js`. No usar la entrance animation nativa de Elementor para esos bloques.

## Multi-idioma
- **Modelo en código:** selector EN/ES/PT/FR/DE/IT en el header → traducción automática Google (proxy `translate.goog`). Funciona solo en la URL pública (tunnel), no en localhost. Marca protegida con `notranslate`.
- **Producción Elementor/WP:** instalar **Polylang** o **WPML** o **TranslatePress** con traducción automática (DeepL/Google). Dan URLs por idioma (`/es/`, `/en/`), hreflang y SEO multilingüe — superior al proxy para producción. El selector nativo del plugin reemplaza el nuestro.

## Recomendación
Híbrido: estructura + estilos base en Elementor nativo; animaciones premium y la galería horizontal como código pegado por sección. FAQ y formulario: usar los widgets Pro nativos (mejor que nuestro JS para esos dos casos).
