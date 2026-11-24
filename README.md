# Hemcor Electricidad y Sistemas — sitio web

Sitio estático (HTML, CSS y JavaScript, sin dependencias ni compilación).

## Dónde está publicado
- **Sitio oficial:** https://hemcorelectromecanica.com (y www.hemcorelectromecanica.com)
- **Hosting:** Cloudflare Pages, proyecto `hemcor-web`, conectado a este repositorio. Cada `push` a `main` se publica solo en 1–2 minutos.
- **Dominio:** registrado en Cloudflare Registrar, renovación automática activada (vence cada noviembre).
- **Copia de respaldo:** GitHub Pages en https://j0s4.github.io/hemcor-web/

## Seguridad
- Cabeceras de seguridad y caché en el archivo `_headers` (Cloudflare Pages las aplica automáticamente).
- Mantener activada la verificación en dos pasos en GitHub, Cloudflare y el correo de la cuenta.

## Agregar contenido
- **Video nuevo:** comprímalo (MP4 H.264, máximo 25 MB por archivo, que es el límite de Cloudflare Pages) y guárdelo en `videos/`. Ponga una imagen de portada en `images/` y copie en `proyectos.html` uno de los bloques `<div class="tarjeta reveal"><div class="video">…</div>…</div>`, cambiando el archivo y el texto.
- **Foto nueva:** use formato `.webp` (más liviano), de unos 720 px de ancho, y copie un bloque `<div class="tarjeta reveal"><div class="foto">…`.
- **Texto:** edite directamente el `.html` correspondiente.

## Estructura
- `css/estilos.css`: diseño (colores en `:root`)
- `js/main.js`: menú móvil, animaciones y formulario a WhatsApp
- `fonts/`: fuentes Barlow locales (no dependen de Google Fonts)
- `images/`, `videos/`: medios
