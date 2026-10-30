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

Luego copia un `<li class="reel">` en `index.html` y cambia el nombre, la marca, el tipo y la categoría (`data-cat`: `cabello`, `skincare`, `hogar` o `tips`, son las pestañas sobre la cinta; un video puede ir en dos, separadas por espacio: `cabello tips`). Con menos de 6 videos, una categoría queda fija y se desliza con el dedo.

**Marcas de la cinta:** en `index.html`, sección "Cinta de marcas". La lista va dos veces (la segunda es la copia para que el movimiento sea continuo): cambia ambas.

## Idiomas (español / inglés)

El texto de `index.html` está en español. Las traducciones al inglés están en `assets/i18n.js`: cada línea es `"texto en español": "texto en inglés"`.

- Para corregir un texto en inglés, cambia el valor de la derecha.
- Si cambias un texto en español en `index.html`, cambia también su clave (la izquierda) en `i18n.js`, o ese texto quedará en español en la versión en inglés.
- El mensaje de WhatsApp en inglés está al final de `i18n.js` (`I18N_EN_WA`).

El idioma se elige así: `?lang=en` o `?lang=es` en el enlace; si no, la última elección del visitante; si no, el idioma de su navegador. El botón ES/EN del menú lo cambia y lo recuerda.

Enlaces directos para compartir: `https://rogienny-ugc.vercel.app/?lang=en` (marcas de EE.UU.) y `https://rogienny-ugc.vercel.app/?lang=es`.

## Fotos UGC

Sección "Fotos que venden" en `index.html`. Cada foto es un `<li>` con su categoría y la imagen en `media/fotos/` (600×800, WebP).

## Ver en local

```bash
python -m http.server 3100
```

## Imagen para compartir (WhatsApp, redes)

`media/og.jpg` se genera desde `tools/og.html` (mismo diseño que la portada; la carpeta `tools` no se publica). Si cambia la foto de portada, ábrela con Edge en modo headless y guarda la captura como `media/og.jpg`:

```bash
msedge --headless=new --hide-scrollbars --window-size=1200,630 --virtual-time-budget=8000 --allow-file-access-from-files --screenshot=og.png "file:///RUTA/portafolio-ugc-rogienny/tools/og.html"
```

## Si cambias una foto o video por otro con el mismo nombre

Los navegadores guardan las fotos y videos por un día. Para que se vea el cambio enseguida, sube el número de versión en `index.html`, por ejemplo `hero.webp?v=2` → `hero.webp?v=3`.
