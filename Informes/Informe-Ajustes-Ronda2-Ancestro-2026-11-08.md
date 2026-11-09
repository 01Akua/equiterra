# Informe · Ajustes Ronda 2 · Ancestro que Seremos
Fecha: 8 de noviembre de 2026 · Sitio: `ancestro-preview/` (vista previa 01akua.github.io/equiterra/ancestro-preview)
Estado: **hecho en local, NO publicado** (falta `git push`, pendiente de tu aprobación).

## Cambios aplicados
| # | Ajuste | Qué se hizo | Archivos |
|---|---|---|---|
| 1 | Fondo de portada | Reemplazada la panorámica por la foto de los dos mayores (original HEIC 4284×5712, exportada a 1950×2600 JPG). `object-position: 50% 50%` en escritorio; en celular `38% 45%` para que no se corte el mayor de la izquierda. Degradado verde oscuro intacto. Alt actualizado. | `img/hero-aqs.jpg`, `index.html`, `css/style.css` |
| 2 | Título del proyecto | "Ancestro que Seremos at a glance" → **"Ancestro que Seremos: key facts"** (opción del documento; la etiqueta "THE PROJECT" se mantiene). | `index.html` |
| 3 | Galería sin textos | Quitados los pies de foto y la franja oscura en la galería y en las fotos sueltas (2 `figcaption`). La descripción queda solo como `alt`. | `js/app.js`, `index.html`, `css/style.css` |
| 4 | ODS | Las 14 fichas de colores con texto se reemplazaron por los íconos oficiales (1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 17), 320×320, con alt "SDG n: nombre". | `img/sdg/*.jpg`, `index.html`, `css/style.css` |
| 5 | Mapas | Nueva sección "Location · Where the project is" con los Mapas 1 y 2 (renderizados a JPG desde los PDF; clic abre la imagen completa). Responsive: 2 columnas / 1 en celular. | `img/maps/*.jpg`, `index.html`, `css/style.css` |

Revisado con capturas en escritorio (1440) y celular (390). El original de la portada anterior quedó respaldado fuera del sitio (scratchpad); sigue en git.

## Para decidir / verificar antes de publicar
1. **Cifras que no coinciden con los mapas.** Los mapas dicen **4.527,5 ha y 102 predios (Fase 1)**; el sitio dice **4,533 ha y 90 predios** (+≈30 en integración). No lo toqué: confirmar cuál es la cifra vigente.
2. **Autorización de imagen** de las dos niñas en la puerta (portada). El documento pide confirmarlo con la comunidad; si no, recortar a la izquierda o difuminar. Hoy están visibles.
3. **Idioma de los mapas:** están en español y con marca Equiterra; el sitio está en inglés. Dejé el alt en inglés. ¿Se piden versiones en inglés?
4. **Subtítulo del lightbox:** al abrir una foto de la galería todavía aparece su descripción debajo (no está "sobre" la imagen). Dime si también se quita.
5. **Mapas como sección nueva:** el documento no indicaba dónde ubicarlos; los puse entre "People" y "Gallery". Se mueve fácil.
6. Mapas como "Documento de trabajo · Fase 1": confirmar que pueden ser públicos.
7. Peso: portada 1,6 MB (aceptable; se puede bajar a ~1 MB si hace falta).

## Siguiente paso
Con tu OK: commit y `git push` para publicar la vista previa, y actualizar `EQUITERRA.md`.
