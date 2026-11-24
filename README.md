# Hemcor Electricidad y Sistemas — sitio web

Sitio estático (HTML, CSS y JavaScript, sin dependencias ni compilación).

## Publicar con GitHub Pages (gratis)
1. En el repositorio: **Settings → Pages**.
2. En *Source*, elija **Deploy from a branch**, rama `main` y carpeta `/ (root)`, y pulse **Save**.
3. En 1 o 2 minutos el sitio queda en `https://j0s4.github.io/hemcor-web/`.

## Conectar un dominio propio
1. Compre el dominio (por ejemplo, en NIC.cr para `.cr`, o en Namecheap o Porkbun para `.com`).
2. En el DNS del dominio, cree:
   - un registro `CNAME` para `www` que apunte a `j0s4.github.io`
   - cuatro registros `A` para el dominio raíz: `185.199.108.153`, `185.199.109.153`, `185.199.110.153` y `185.199.111.153`
3. En **Settings → Pages → Custom domain**, escriba `www.sudominio.com`, guarde y active **Enforce HTTPS**.
4. Reemplace `https://j0s4.github.io/hemcor-web/` por el dominio nuevo en todos los `.html` (etiquetas `canonical`, `og:` y datos estructurados).

## Agregar contenido
- **Video nuevo:** comprímalo (MP4 H.264, idealmente de menos de 10 MB) y guárdelo en `videos/`. Ponga una imagen de portada en `images/` y copie en `proyectos.html` uno de los bloques `<div class="tarjeta reveal"><div class="video">…</div>…</div>`, cambiando el archivo y el texto.
- **Foto nueva:** use formato `.webp` (más liviano), de unos 720 px de ancho, y copie un bloque `<div class="tarjeta reveal"><div class="foto">…`.
- **Texto:** edite directamente el `.html` correspondiente.

## Estructura
- `css/estilos.css`: diseño (colores en `:root`)
- `js/main.js`: menú móvil, animaciones y formulario a WhatsApp
- `fonts/`: fuentes Barlow locales (no dependen de Google Fonts)
- `images/`, `videos/`: medios
