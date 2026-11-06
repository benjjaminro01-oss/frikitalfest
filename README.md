# Frikital Fest 2026 · Sistema de gráficas (CG) · README

## Qué es
- `salida.html` → fuente de **Navegador** de OBS (1920×1080, fondo transparente).
- `panel.html` → consola del operador (Control, Control + Visual, Botonera). En celular y tablet muestra solo la botonera.

## Piezas incluidas
- **Cartón fijo** (inicio y cierre): `media/carton_inicio_web.mp4` (video en bucle, silenciado por defecto).
- **Motion de apertura**: `media/motion_apertura.mp4` (con su música; se oculta solo al terminar).
- **Rótulo Nombre GC** (plantilla GC_2) y **Rótulo Apoyo de texto** (plantilla GC_1): `media/gc_nombre.webm` y `media/gc_apoyo.webm` + texto editable con la fuente A4 Speed (`fonts/`).
- **Título GC**, cartón diseñado (de respaldo), escaleta de los 7 streamings (del Excel) y botonera con teclas F13–F24.

## Publicar en GitHub Pages
1. Repositorio **público** → sube **todo el contenido** de esta carpeta (incluye `media/` y `fonts/`).
2. Settings → Pages → Deploy from a branch → `main` / `(root)`.
3. Direcciones: `https://USUARIO.github.io/REPO/panel.html` y `.../salida.html`.

## Sincronizar equipos (Firebase)
1. Authentication → Sign-in method → **Anónimo** activado.
2. Realtime Database → Reglas → pegar las reglas entregadas → Publicar.
3. `js/config.js` ya trae la configuración del proyecto.
4. En el panel: ⚙ → General → **Generar sala nueva**. Copiar el enlace de **salida** (OBS) y el de **panel** (otros equipos).

## OBS
Fuente → Navegador → URL de la salida con `?sala=CODIGO`, ancho 1920, alto 1080. **Desmarcar** "Apagar la fuente cuando no esté visible" y "Actualizar el navegador cuando la escena se active". Abrir la salida unos minutos antes del evento para que precargue los videos. Para diagnóstico agregar `&debug` al enlace.

## Uso
- **MOSTRAR / OCULTAR / ACTUALIZAR / PREV** en cada gráfica. Un rótulo nuevo reemplaza al anterior (no se superponen).
- **Rótulo**: elegir tipo *Nombre GC* o *Apoyo de texto*. Textos largos se ajustan solos (hasta 2 líneas).
- **Marcadores `PENDIENTE_`**: se ven en el panel y nunca salen en pantalla.
- **Re Pág / Av Pág**: paso anterior / siguiente de la escaleta.
- **Biblioteca** (⚙): lista la carpeta `media` de GitHub y crea gráficas con archivos nuevos (videos MP4/WebM, imágenes).
- **Copia de seguridad**: ⚙ → General.

## Notas
- Toda la tipografía de las gráficas es A4 Speed (sin dependencias externas). No trae tildes, ñ, ¿ ni ¡: el sistema las compone con sus propias marcas.
- Al subir una versión nueva, recargar con Ctrl+F5 (y "Actualizar caché" en OBS).
