# Visa Colombia — Landing Page (Prototipo)

Sitio estático (HTML/CSS/JS puro, sin frameworks ni backend) listo para
subir a **GitHub Pages** y, más adelante, a **Hostinger**.

## Estructura

```
index.html          → página principal (landing)
registro.html        → página de inscripción / contacto
admin-login.html      → acceso oculto al panel privado
admin.html            → panel privado de edición de contenido
css/style.css         → estilos (responsive: móvil, tablet, escritorio)
js/content.js         → contenido por defecto + guardado
js/main.js             → pinta el contenido en index.html
js/auth.js               → autenticación del panel privado
js/admin.js                → lógica del panel privado
```

## Dónde está oculto el botón de acceso al login

No hay ningún botón visible de "Iniciar sesión" en el sitio. El acceso
está escondido en el **pie de página (footer) de `index.html`**: el año
del aviso de copyright (`© 2026 Visa Colombia...`) es en realidad un
botón invisible. Haciendo **clic 5 veces seguidas** sobre ese año, el
navegador redirige a `admin-login.html`.

También puedes entrar directamente escribiendo la URL:
`tudominio.com/admin-login.html` (esta página tiene `meta
robots="noindex, nofollow"` para que buscadores como Google no la
indexen).

> Si prefieres otro "gesto secreto" (por ejemplo, un atajo de teclado,
> u ocultarlo en el logo en vez del año), dímelo y lo ajusto — el punto
> de enganche está aislado en `js/main.js`, sección "Acceso oculto".

## Usuario y contraseña iniciales

- **Usuario:** `admin`
- **Contraseña:** `CambiaEsta123!`

Al iniciar sesión por primera vez, el sistema **obliga** a crear un
usuario y una contraseña nuevos antes de dejar entrar al panel. Ese
paso no se puede omitir.

### Seguridad implementada en el login
- La contraseña nunca se guarda en texto plano: se deriva con
  **PBKDF2 (SHA-256, 100.000 iteraciones) + salt aleatorio**, usando la
  Web Crypto API nativa del navegador.
- El campo de contraseña tiene el **ícono de ojo** para mostrar/ocultar
  lo que se escribe.
- El campo usa `autocomplete="new-password"` para reducir que el
  navegador lo trate como un campo de inicio de sesión "normal" y lo
  autocomplete con contraseñas guardadas de otros sitios.
- Bloqueo temporal (30s) tras 5 intentos fallidos seguidos.
- La sesión del panel vive en `sessionStorage`: se cierra sola al
  cerrar la pestaña, y también hay un botón "Cerrar sesión".

**Importante — límites de este prototipo:** al no tener servidor ni
base de datos, tanto las credenciales como el contenido editable se
guardan en el **almacenamiento local del navegador** (`localStorage`)
del dispositivo donde se usa el panel. Esto es suficiente para mostrar
y probar el prototipo, pero antes de producción real se recomienda
mover la autenticación y el contenido a un backend con base de datos
(Hostinger ofrece hosting con PHP/MySQL, que sería el paso natural).

## Qué se puede editar desde el panel privado

Las dos líneas del título de portada, el subtítulo, el texto de los
dos botones del hero, la **imagen de fondo de la portada** y la
**foto del asesor** (pegando la URL de una imagen), el texto de
introducción, los 3 botones de enlace (etiqueta + URL de cada uno),
número de WhatsApp, Instagram y correo, los 4 servicios/asesorías, la
sección "por qué elegirnos" con sus estadísticas, el video (pega la
URL de inserción/embed de YouTube o Vimeo), los 3 testimonios y el
bloque de llamado a la acción final.

### Sobre las imágenes de la portada
Este entorno de trabajo no tiene acceso a internet para descargar la
foto real de la plantilla que enviaste, así que la portada usa una
**ilustración original** (mismo encuadre: ventana de aeropuerto,
avión, viajero con mochila y pasaporte, skyline) hecha a medida para
conservar la composición y los colores. Desde el panel privado puedes
pegar la URL de la foto real en "Imagen de fondo de la portada" y
"Foto del asesor" en cuanto la tengas alojada (por ejemplo, subiéndola
a Hostinger o a un servicio de imágenes), y se reemplazará al
instante sin tocar código.

## Cómo probarlo en GitHub Pages

1. Crea un repositorio nuevo y sube todo el contenido de esta carpeta.
2. Ve a **Settings → Pages**, elige la rama `main` y la carpeta raíz.
3. GitHub te dará una URL tipo `https://tuusuario.github.io/turepo/`.

## Cómo subirlo después a Hostinger

1. Comprime (o usa directamente) esta carpeta.
2. En hPanel, ve a **Administrador de archivos** → carpeta
   `public_html` y sube ahí el contenido (o usa FTP).
3. El sitio quedará disponible en tu dominio directamente, sin pasos
   adicionales (es HTML estático).

## Antes de publicar de verdad

- Reemplaza el número de WhatsApp, Instagram y correo de ejemplo desde
  el panel privado.
- Cambia el usuario y contraseña por defecto en el primer ingreso.
- Sustituye el video de ejemplo por el video real de la empresa.
- Revisa los textos legales/institucionales (este prototipo no
  representa a ninguna entidad del gobierno colombiano).
