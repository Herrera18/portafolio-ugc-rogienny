# Portafolio UGC · Rogienny Herrera

Sitio estático de una sola página (HTML, CSS y JS, sin build). Vercel publica cada cambio que se sube a `main`.

## Estructura

```
index.html          ← todo el contenido (textos, videos, fotos)
assets/styles.css   ← diseño
assets/main.js      ← contacto (WhatsApp, correo) y comportamiento
assets/fonts/       ← Dastin (títulos). Poppins se carga desde Google Fonts
media/fotos/        ← fotos en WebP
media/videos/       ← adelantos mudos de 6 s (MP4) y su portada (JPG)
media/marca/        ← logo, monograma, favicon
media/og.jpg        ← imagen al compartir el link
```

## Cambios frecuentes

**WhatsApp o correo:** al inicio de `assets/main.js`, en el objeto `CONTACTO`. Si `email` tiene un valor, aparece solo en la sección Contacto.

**Enlazar un video de YouTube:** en `index.html`, cada video es un `<li class="reel" data-youtube="">`. Pon el ID dentro de `data-youtube` (en `https://youtu.be/aqz-KE-bpKQ` o `youtube.com/shorts/aqz-KE-bpKQ` el ID es `aqz-KE-bpKQ`). Con ID, el adelanto muestra un botón de play que abre el video completo con sonido. Funciona con videos "No listados".

**Agregar un video:** crea el adelanto mudo de 6 segundos y su portada:

```bash
ffmpeg -ss 0 -i original.mp4 -t 6 -an -vf "scale='min(720,iw)':-2" -c:v libx264 -crf 27 -pix_fmt yuv420p -movflags +faststart media/videos/nombre.mp4
ffmpeg -i media/videos/nombre.mp4 -frames:v 1 -q:v 4 media/videos/nombre.jpg
```

Luego copia un `<li class="reel">` en `index.html` y cambia el nombre, la marca y el tipo.

**Marcas de la cinta:** en `index.html`, sección "Cinta de marcas". La lista va dos veces (la segunda es la copia para que el movimiento sea continuo): cambia ambas.

## Ver en local

```bash
python -m http.server 3100
```
