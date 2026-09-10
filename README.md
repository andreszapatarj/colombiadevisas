# Visa Colombia — GitHub Pages Demo

Esta carpeta es la versión **estática de demostración** de la landing page.

## Qué funciona en GitHub Pages
- Landing responsive.
- Video hero local con autoplay/muted/loop/playsinline.
- Imágenes y videos locales.
- Botones CTA y navegación.
- Formulario visual con las dos opciones solicitadas.
- Vista de administrador de demostración.

## Qué NO funciona todavía en GitHub Pages
GitHub Pages no ejecuta PHP ni MySQL. Por eso en esta demo no se guardan clientes realmente y no se envía WhatsApp mediante API.

Eso se activa con la versión PHP/MySQL al subirla a Hostinger.

## Cómo subirla
1. Crea un repositorio en GitHub, por ejemplo `visa-colombia-landing`.
2. Sube **todo el contenido de esta carpeta** a la raíz del repositorio.
3. En GitHub entra a `Settings > Pages`.
4. En `Build and deployment`, selecciona `Deploy from a branch`.
5. Selecciona `main` y `/ (root)` y guarda.
6. GitHub te dará un enlace tipo `https://TUUSUARIO.github.io/visa-colombia-landing/`.

## Archivos multimedia
Reemplaza estos archivos manteniendo sus nombres para una prueba rápida:
- `assets/videos/hero.mp4`
- `assets/videos/testimonial-01.mp4`
- `assets/videos/testimonial-02.mp4`
- `assets/videos/testimonial-03.mp4`
- `assets/images/profile-placeholder.svg`

Para producción en Hostinger se usará la versión PHP/MySQL y se conectarán MySQL, WhatsApp/Twilio, Analytics, Meta Pixel y Tag Manager.
