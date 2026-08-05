<!-- EQUITERRA.md — Proyecto Korve, web en Elementor (WordPress) -->
<!-- last_updated: 2026-08-04 | status: activo -->

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
- [2026-07-30] **Revisión de cliente (2026-07-30) → "stage-1 scope decision"**: Bouaké Cookstoves y PANAM Biogas eliminados por completo (HTML + imágenes borrados, no solo desvinculados) → páginas huérfanas devuelven 404. Quedan **4 proyectos activos con página propia**: Sierra Nevada, Moba, Rafey Landfill, SOS Carbon (Copidega ya no tenía página desde antes). Correcciones de copy por proyecto: Rafey sin cifras de CAPEX/volumen/emisión (temas de negociación de offtake abierta, ahora muestra estándar/metodología/estado); Moba sin el % de benefit-sharing (50%) → lenguaje cualitativo, timeline 2026-2028 suavizado a "targeted/no vinculante"; SOS Carbon renombrado "Coastal Carbon · Sargassum" (antes "Blue Carbon"); Ancestro (Sierra Nevada) con tag simplificado "NBS · ARR", cita atribuida a Alexis Leroy, alt-text de galería restaurado según copy aprobado; CM4GE principios 3 y 5 realineados; disclaimer.html con la cláusula de no-solicitación aprobada; footers de proyecto ahora enlazan al LinkedIn real (antes "#").
- [2026-07-30] Añadido "Why Partner with Equiterra" (copy oficial) antes del CTA de cierre en todas las páginas internas que no lo tenían (about, cbam, disclaimer, privacy, solutions, terms).
- [2026-07-30] Modal de captura de lead "Download project brief" en las 4 páginas de proyecto activas (`js/download-modal.js`) — validación client-side, guardado local de leads. Pendiente: backend de formulario real + PDF por proyecto.
- [2026-07-30] Dropdown "Projects" en el nav agrupado por NBS/TBS, replicado en todas las páginas.
- [2026-07-30] Páginas legales añadidas: `privacy.html`, `terms.html`, `disclaimer.html`.
- [2026-07-30/31] Panel de administración (CMS) construido en `admin/index.html` + `admin/content.json`, servido por `js/content-loader.js` (wireado en las 5 páginas con contenido editable). Edición en vivo del sitio sin tocar HTML directamente.

## Multi-idioma (sistema híbrido)
- **EN**: original. **ES + PT**: traducción CURADA a mano (diccionario js/i18n.js) — natural, no literal. Instantáneo y funciona hasta en localhost.
- **FR/DE/IT**: traducción automática vía proxy Google (translate.goog) — solo en URL pública.
- Motor en main.js: applyI18n() reemplaza text nodes + placeholders ANTES del splitter de animación (clave para titulares partidos). Idioma se guarda en localStorage; al volver del proxy se pasa por #lang=xx.
- Diccionario: ~440+ cadenas x ES y PT (crecido de ~290 tras auditoría de cobertura completa el 2026-07-30: home, about, solutions, cbam, partner, 3 páginas legales, 4 páginas de proyecto activas). Términos de marca (Equiterra, CBAM, ARR, MRV, CM4GE, Arhuaco, nombres propios, emails) se omiten → quedan igual. `.notranslate` excluye nodos (ej. h1 "Proyecto Sierra Nevada").
- Para añadir/editar copy: actualizar el string en el HTML y su entrada en js/i18n.js (es y pt).
- Producción Elementor: plugin (Polylang/WPML/TranslatePress) + DeepL, URLs por idioma, hreflang. Las traducciones de i18n.js sirven como base ES/PT lista.
- [2026-07-30] **Selector de idioma ahora funcional en todo el sitio y en el panel CMS.** Bugs corregidos: `content-loader.js` pedía `admin/content.json` con ruta absoluta (rompía en el subpath de GitHub Pages) y sobrescribía silenciosamente texto ya traducido con el fallback en inglés de content.json en las 5 páginas gestionadas por CMS. Fix: fetch con ruta relativa + re-ejecutar el paso de i18n después de hidratar el DOM. `main.js` expone su traductor como `window.EQ_applyI18n` para que content-loader lo invoque. También se corrigieron 32 claves del diccionario que tenían un em dash crudo en vez del ", " normalizado que usa el motor para el lookup (nunca hacían match en runtime).
- [2026-07-31] **Panel admin (`admin/index.html`) con tabs EN/ES/PT por campo** + punto de estado, en vez de solo exponer el valor en inglés. Traducción automática de campos vacíos vía MyMemory (`translateText()`) al salir del input en inglés (sin pisar traducciones ya escritas a mano); "Guardar" corre el mismo pase como red de seguridad antes de guardar, con progreso en vivo en el badge de guardado. El botón de re-traducir usa un patrón de dos clics (armar/confirmar) en vez de `confirm()` nativo, porque `confirm()` bloquea toda la página (y la automatización de navegador) sin forma de cerrarlo programáticamente.

## Estado actual
- Fase: modelo en código — sitio multipágina completo, post stage-1 scope decision del cliente (2026-07-30)
- Done: Home premium + 4 páginas internas (about, solutions, cbam, partner) + 3 páginas legales (privacy, terms, disclaimer) + 4 páginas de proyecto activas (Sierra Nevada, Moba, Rafey, SOS/Coastal Carbon), motor de animación v2, video header, selector de idioma funcional site-wide (EN/ES/PT curado + FR/DE/IT proxy), panel admin/CMS con edición en vivo y traducción automática, modal de captura de leads en páginas de proyecto, guía ELEMENTOR.md, tunnel activo
- En progreso: pendientes menores post-revisión (punch list de lanzamiento, ver commit de56243)
- Pendiente: backend real de formulario de leads + PDF por proyecto, decisión de pase a Elementor

## Páginas
- index.html — Home (carrusel con 4 proyectos activos, sin Bouake/PANAM/Copidega)
- about.html — quiénes somos, cluster gallery (3 paneles agrupados, reveal escalonado + parallax), mandato/cómo trabajamos (text rows editoriales), founder, valores, sección Why Partner
- solutions.html — 3 capabilities detalladas, CM4GE, proceso, sección Why Partner
- cbam.html — explainer, timeline, FAQ (accordion), cómo ayudamos, sección Why Partner
- partner.html — tipos de partner, why, formulario de contacto
- privacy.html / terms.html / disclaimer.html — páginas legales, disclaimer con cláusula de no-solicitación aprobada, sección Why Partner
- proyecto-sierra-nevada.html, proyecto-moba.html, proyecto-rafey-landfill.html, proyecto-sos-carbon.html — únicas páginas de proyecto vivas; cada una con modal "Download project brief" y footer con link real a LinkedIn
- admin/index.html + admin/content.json — panel CMS (edición de contenido en vivo, tabs EN/ES/PT, traducción automática)
- Cada sección marcada con [NATIVO]/[PRO]/[CÓDIGO]; mapeo en ELEMENTOR.md

## Stack del modelo
- HTML/CSS/JS vanilla, sin build. Secciones scopeadas con `.eq-*` para portar a Elementor.
- css/: variables (tokens+paleta), base, anim (motor), layout (header/footer), home, pages.
- js/main.js: split de líneas/palabras, IntersectionObserver, parallax, marquee, pin horizontal, motor i18n (`applyI18n`/`window.EQ_applyI18n`).
- js/i18n.js: diccionario ES/PT (~440+ claves).
- js/content-loader.js: hidrata las 5 páginas CMS-managed desde `admin/content.json`, re-aplica i18n tras hidratar.
- js/download-modal.js: modal "Download project brief" (validación + guardado local de leads) en las 4 páginas de proyecto activas.
- admin/index.html + admin/content.json: panel de administración/CMS (edición en vivo, tabs EN/ES/PT, traducción automática vía MyMemory).
- Servir: `python3 -m http.server 8090` + `cloudflared tunnel --url http://127.0.0.1:8090` (8080 ocupado por otra app).

## Gotcha técnico (registrar para Elementor)
- Elementos con `clip-path` (reveal "wipe") reportan `intersectionRatio = 0` → un IntersectionObserver con threshold>0 nunca los detecta. Solución: observer aparte con `threshold:0` + rootMargin inferior.

## Restricciones técnicas
- Destino: Elementor (WordPress) — no es una SPA ni proyecto standalone.
- Entrega: código fraccionado por sección (HTML / CSS / JS separados) para widgets HTML/Code de Elementor.
- CSS scopeado por sección para evitar colisiones con estilos del tema/Elementor.

## Decisiones
<!-- Append-only. [FECHA] Decisión — Razón -->
- [2026-08-05] Cache-busting para css/js: el sitio se sirve vía GitHub Pages (`https://01akua.github.io/equiterra/`, confirmado con `gh api repos/01Akua/equiterra/pages`), que manda `cache-control: max-age=600` en todos los assets sin versión en la URL — el cliente reportó que "no le salían ciertos cambios", causado por el navegador sirviendo css/js del disco sin siquiera revalidar dentro de esa ventana de 10 min (y a veces más tiempo por cache de disco del navegador). Fix: `cache-bust.sh` reescribe el query param `?v=<timestamp>` de todos los `href="css/*.css"` / `src="js/*.js"` en las 12 páginas HTML. **Correr `./cache-bust.sh` antes de cada `git push` a main** (o después de tocar cualquier archivo en `css/` o `js/`) para que los clientes bajen la versión nueva sin necesitar hard-refresh. `content.json` (CMS) ya usaba `fetch(..., {cache:'no-store'})`, no necesitaba fix.
- [2026-08-04] Ronda de correcciones post-revisión móvil del cliente: (1) nombre correcto del framework "CM4GE — Carbon Markets for Global Equity" (no "Carbon Markets for Green Economies") y lenguaje de "framework" en vez de "guía", corregido en index.html, solutions.html, admin/content.json y js/i18n.js (ES/PT) — verificado contra el PDF real `Content/260801_CM4GE_V5.0.pdf` v5.0, que ahora vive en `assets/docs/CM4GE-V5.0.pdf` y es el destino real del botón "Download the framework" del Home (antes enlazaba a solutions.html). (2) Logo del header (72px→86px) y footer (38px→52px) agrandado. (3) About: "Sole focus: Climate" → "Sole focus: Impact finance" (copy + content.json + i18n.js). (4) Bug de hueco blanco en la cluster gallery de About en mobile: `grid-template-rows` definía 3 filas explícitas de 36vw pero solo se usan 2 → filas explícitas vacías siempre ocupan espacio en CSS Grid aunque no tengan contenido. Fix: `repeat(3,36vw)` → `repeat(2,36vw)` en el media query de 720px (css/pages.css). (5) CBAM: el panel `.eq-feature__media` de "Our role" tenía un SVG placeholder (líneas cruzadas) nunca reemplazado por una imagen real — se veía como imagen rota ("cruz en recuadro verde"). Reemplazado por `assets/images/solutions-markets.jpg`. (6) Selector de idioma ocultado site-wide (`js/main.js`, IIFE `languageSwitcher` con `return` temprano) — el cliente detectó "Maison" (traducción automática vía proxy Google) en vez de "Accueil" en francés y pidió quitar el selector hasta que FR/DE/IT tengan traducción curada por el equipo en vez de automática. ES/PT (curados) quedan listos para cuando se reactive.
- [2026-06-23] Entregar código por partes/bloques — la página vive en Elementor y debe pegarse por widget para no romper el layout.
- [2026-06-23] Mantener header + video de intro del sitio actual — requisito del cliente.
- [2026-06-23] Modelo inicial full-código estático, mostrado vía Cloudflare tunnel — antes de portar a Elementor.
- [2026-06-23] Animaciones v1 (fade-up + stagger genérico) descartadas por "parecer de IA". v2: reveal por líneas con máscara, wipe clip-path, parallax, marquee, galería horizontal anclada (pin).
- [2026-06-23] Reorg del Home: Hero → Manifiesto → Marquee → Capabilities (head sticky) → Approach → CM4GE → Proyectos (scroll horizontal) → Impacto → Founder (parallax) → Why → CTA.
- [2026-07-30] Stage-1 scope decision del cliente (revisión 2026-07-30): eliminar Bouaké y PANAM por completo del sitio (archivos + imágenes), no solo desvincularlos — para que las páginas huérfanas den 404 en vez de quedar indexables. Ver detalle de correcciones de copy por proyecto arriba en "Proyectos reales".
- [2026-07-30] Modelo de leads: captura client-side con guardado local (sin backend real todavía) — desbloquea la demo/revisión del cliente sin esperar a decidir el backend de formularios ni generar los PDFs por proyecto.
- [2026-07-31] Panel CMS con tabs EN/ES/PT por campo en vez de solo inglés — el editor necesita poder revisar o corregir a mano la traducción automática, no confiar ciegamente en la salida de máquina.

## Notas
- —
