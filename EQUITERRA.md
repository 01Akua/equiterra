<!-- EQUITERRA.md — Proyecto Korve, web en Elementor (WordPress) -->
<!-- last_updated: 2026-06-23 | status: activo -->

# Equiterra

## Descripción
Proyecto Korve. Rediseño premium del sitio de Equiterra (firma de finanzas climáticas / mercados de carbono). Modelo full-código local, mostrado vía Cloudflare tunnel, diseñado para portarse fácil a Elementor (WordPress). Unifica UI/UX de dos referencias y mantiene el header con video de intro del sitio actual.

## Sitios de referencia
- Actual: https://equiterra.capital/ — Hero "Financing a sustainable future" → 4 pilares → Capabilities → CM4GE Framework → Founder (Alexis Ludwig Leroy) → Proyectos (carrusel) → Why Partner → Footer. Eslogan: Finance • Equity • Earth.
- Ref 1: https://perspectives.cc/ — minimalismo funcional, hero 3 tarjetas, dato duro, CTAs limpios.
- Ref 2: https://www.climateimpact.com/ — corporativo premium, carrusel logos clientes, mapas interactivos, testimonios, cards modulares, multilenguaje.

## Paleta de marca (extraída de SVG)
| Nombre | HEX |
|--------|-----|
| Dark Forest Green (primario) | #0f2e15 |
| Light Mint Green / sage (secundario) | #dae2cb |
| Warm Gray (neutro) | #565953 |
| Blanco | #ffffff |

## Tipografía
- Outfit (Google Fonts) — usada por el sitio actual. Mantener.

## Assets
- Logos/ — 25 variantes x SVG, PNG 1X, PNG 2X. Para web usar SVG.
- assets/video/hero-intro.mp4 — video de fondo del header, descargado del sitio actual (recorte original 57s–65s).

## Hallazgos técnicos
- El sitio actual YA está hecho en Elementor → portar el rediseño será directo.
- Alcance del modelo: multipágina (Home, About, Solutions, CBAM, Partner With Us).

## Proyectos reales (2026-07-17, desde OneDrive "Equiterra Projects")
- 3º intento de descarga por fin funcionó: `equiterra archivos.zip` (11GB, Zip64 — usar Python/7z, NO el unzip nativo de macOS que falla en archivos >4GB). Carpeta origen: SharePoint `equiterracapital.sharepoint.com/sites/Repository-Communication` → `Communications Equiterra/Equiterra Projects`.
- Estructura: **NBS Projects** (ARR Moba, ARR Sierra Nevada, Bouake Cookstoves) y **TBS Projects** (Copidega Biogas, PANAM Biogas, Rafey Landfill Project, SOS Carbon Project).
- Solo 4 proyectos tenían deck (PPTX/PDF) con datos reales: Sierra Nevada, Moba, Bouaké Cookstoves, Rafey Landfill. Copidega no tiene NADA (ni fotos ni deck). PANAM y SOS solo tienen fotos de campo, sin deck.
- **7 páginas de proyecto** (mismo template `.eq-proj-hero`/`.eq-facts`/`.eq-pgallery`/`.eq-feature`/`.eq-timeline`/CTA):
  - `proyecto-sierra-nevada.html` — **Ancestro que Seremos**, actualizada con datos reales (9 comunidades Arhuaco, ~5,000 ha, 90 predios, 40 años, Equitable Earth M001 v1.2, Saumama Foundation). Ya NO es placeholder.
  - `proyecto-moba.html` — Moba ARR, DRC. 10,000 ha, Gold Standard, Graine de Vie/FERKAM.
  - `proyecto-bouake-cookstoves.html` — Bouaké Clean Cooking Initiative, Côte d'Ivoire. 90,000 cookstoves, GS4GG.
  - `proyecto-rafey-landfill.html` — Rafey Landfill Gas Project, Rep. Dominicana. 9.6M m³/año, Art. 6.4.
  - `proyecto-panam-biogas.html` — página ligera (solo hero+intro+1 foto), sin deck, honesto "in structuring".
  - `proyecto-sos-carbon.html` — página ligera, sargassum/blue carbon, Rep. Dominicana (inferido de nombres de archivo "DR_SOS"), sin deck.
  - Copidega Biogas — sin página propia (cero contenido); solo card "in structuring" sin link en el Home.
- Home (`index.html#projects`, carrusel horizontal): las 5 tarjetas placeholder (Amazon Reforestation, etc.) fueron reemplazadas por las 7 tarjetas reales con foto+tag+ubicación.
- Fotos reales extraídas y optimizadas (sips, 1600px/q60) en `assets/images/`: moba-1/2, bouake-1/2, rafey-1/2, panam-1, sos-1/2/3. Varias venían rotadas 90° (HEIC sin EXIF orientation) → corregidas con `sips -r 90`.
- Contenido de los decks es CONFIDENCIAL (marcado así en el propio PDF) pero es material propio de Equiterra para su propio sitio — no hay problema de terceros.
- [2026-07-18] Traducciones ES/PT completas en `js/i18n.js` para las 6 páginas nuevas/actualizadas y las tarjetas del Home (397 claves por idioma). Verificado en navegador con inyección directa del diccionario (ojo: el servidor de dev local cachea agresivamente `js/i18n.js`, usar `fetch({cache:'no-store'})` o hard-reload al probar cambios de i18n).
- [2026-07-21] Eliminada la card "Copidega Biogas" del Home (cero contenido disponible, se veía como página inconclusa). PANAM Biogas y SOS Carbon Project ampliadas con fact sheet + segunda foto + sección de feature con texto honesto basado en lo observable en las fotos (celda de contención revestida en PANAM; lixiviado de sargazo en SOS) — sin inventar cifras que no existen en las fuentes. Traducciones ES/PT añadidas (428 claves/idioma).
- ⚠️ [2026-07-21] Se borró por accidente `equiterra archivos.zip` (11GB, la fuente local) con un `rm -f` incluido sin querer en un comando combinado. Sin impacto: la fuente sigue intacta en SharePoint y ya se había extraído todo lo necesario. Lección: nunca combinar `rm` con otros comandos sin revisar explícitamente cada parte primero.

## Multi-idioma (sistema híbrido)
- **EN**: original. **ES + PT**: traducción CURADA a mano (diccionario js/i18n.js) — natural, no literal. Instantáneo y funciona hasta en localhost.
- **FR/DE/IT**: traducción automática vía proxy Google (translate.goog) — solo en URL pública.
- Motor en main.js: applyI18n() reemplaza text nodes + placeholders ANTES del splitter de animación (clave para titulares partidos). Idioma se guarda en localStorage; al volver del proxy se pasa por #lang=xx.
- Diccionario: ~290 cadenas x ES y PT. Términos de marca (Equiterra, CBAM, ARR, MRV, CM4GE, Arhuaco, nombres propios, emails) se omiten → quedan igual. `.notranslate` excluye nodos (ej. h1 "Proyecto Sierra Nevada").
- Para añadir/editar copy: actualizar el string en el HTML y su entrada en js/i18n.js (es y pt).
- Producción Elementor: plugin (Polylang/WPML/TranslatePress) + DeepL, URLs por idioma, hreflang. Las traducciones de i18n.js sirven como base ES/PT lista.

## Estado actual
- Fase: modelo en código — sitio multipágina completo
- Done: Home premium + 4 páginas internas (about, solutions, cbam, partner), motor de animación v2, video header, guía ELEMENTOR.md, tunnel activo
- En progreso: revisión del cliente
- Pendiente: datos reales (stats, proyectos, founder), copy final, decisión de pase a Elementor

## Páginas
- index.html — Home (11 secciones)
- about.html — quiénes somos, cluster gallery (3 paneles agrupados, reveal escalonado + parallax), mandato/cómo trabajamos (text rows editoriales), founder, valores
- solutions.html — 3 capabilities detalladas, CM4GE, proceso
- cbam.html — explainer, timeline, FAQ (accordion), cómo ayudamos
- partner.html — tipos de partner, why, formulario de contacto
- Cada sección marcada con [NATIVO]/[PRO]/[CÓDIGO]; mapeo en ELEMENTOR.md

## Stack del modelo
- HTML/CSS/JS vanilla, sin build. Secciones scopeadas con `.eq-*` para portar a Elementor.
- css/: variables (tokens+paleta), base, anim (motor), layout (header/footer), home.
- js/main.js: split de líneas/palabras, IntersectionObserver, parallax, marquee, pin horizontal.
- Servir: `python3 -m http.server 8090` + `cloudflared tunnel --url http://127.0.0.1:8090` (8080 ocupado por otra app).

## Gotcha técnico (registrar para Elementor)
- Elementos con `clip-path` (reveal "wipe") reportan `intersectionRatio = 0` → un IntersectionObserver con threshold>0 nunca los detecta. Solución: observer aparte con `threshold:0` + rootMargin inferior.

## Restricciones técnicas
- Destino: Elementor (WordPress) — no es una SPA ni proyecto standalone.
- Entrega: código fraccionado por sección (HTML / CSS / JS separados) para widgets HTML/Code de Elementor.
- CSS scopeado por sección para evitar colisiones con estilos del tema/Elementor.

## Decisiones
<!-- Append-only. [FECHA] Decisión — Razón -->
- [2026-06-23] Entregar código por partes/bloques — la página vive en Elementor y debe pegarse por widget para no romper el layout.
- [2026-06-23] Mantener header + video de intro del sitio actual — requisito del cliente.
- [2026-06-23] Modelo inicial full-código estático, mostrado vía Cloudflare tunnel — antes de portar a Elementor.
- [2026-06-23] Animaciones v1 (fade-up + stagger genérico) descartadas por "parecer de IA". v2: reveal por líneas con máscara, wipe clip-path, parallax, marquee, galería horizontal anclada (pin).
- [2026-06-23] Reorg del Home: Hero → Manifiesto → Marquee → Capabilities (head sticky) → Approach → CM4GE → Proyectos (scroll horizontal) → Impacto → Founder (parallax) → Why → CTA.

## Notas
- —
