# Frikital CG · README corto

**Archivos:** `salida.html` (fuente de navegador en OBS, 1920×1080, transparente) y `panel.html` (consola).

**Uso local (un computador):** abre `panel.html` y `salida.html` en el mismo navegador. En OBS la salida es otro programa, por eso para OBS hay que activar la sincronización (Firebase).

**Sincronizar equipos (Firebase):**
1. Authentication → Sign-in method → activa *Anónimo*.
2. Realtime Database → Reglas → pega las reglas entregadas y publica.
3. Completa `js/config.js` con apiKey, authDomain, projectId y appId (la databaseURL ya está).
4. En el panel: ⚙ → General → *Generar sala nueva*. Copia los dos enlaces que aparecen: el de la salida (OBS) y el del panel (otros equipos).

**OBS:** Fuente → Navegador → pega el enlace de la salida, ancho 1920, alto 1080. Tras actualizar archivos, usa *Actualizar caché del navegador actual*.

**Teclas:** F13–F24 (o la que asignes en Botonera → Editar botonera). Re Pág / Av Pág cambian el paso de la escaleta.

**Marcadores PENDIENTE_:** se ven en el panel, bloquean MOSTRAR y nunca salen en pantalla.
