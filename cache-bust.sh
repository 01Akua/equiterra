#!/bin/bash
# Actualiza el query param ?v= de todos los css/js locales en las páginas HTML.
# Correr esto antes de cada `git push` a main (o después de cualquier cambio a css/*.css o js/*.js)
# para forzar a los navegadores de los clientes a bajar la versión nueva en vez de servir
# la copia cacheada (GitHub Pages manda cache-control: max-age=600 y los navegadores
# no revalidan un archivo con la misma URL dentro de esa ventana).
set -euo pipefail
cd "$(dirname "$0")"

VERSION="$(date +%Y%m%d%H%M%S)"

for f in *.html; do
  # css/xxx.css o css/xxx.css?v=... -> css/xxx.css?v=VERSION
  perl -pi -e "s/(href=\"css\/[a-zA-Z0-9_-]+\.css)(\?v=[0-9]+)?\"/\$1?v=$VERSION\"/g" "$f"
  perl -pi -e "s/(src=\"js\/[a-zA-Z0-9_-]+\.js)(\?v=[0-9]+)?\"/\$1?v=$VERSION\"/g" "$f"
done

echo "Cache-bust version: $VERSION aplicada a $(ls *.html | wc -l | tr -d ' ') páginas."
