# Guía de Despliegue (Deployment)

Esta aplicación Vite + React se puede desplegar fácilmente en **Vercel** o **Firebase Hosting**.

## Opción 1: Vercel (Recomendada - Más fácil)

1. **Instala Vercel CLI** (si no lo tienes):

    ```powershell
    npm i -g vercel
    ```

2. **Inicia el despliegue**:
    Estando en la carpeta del proyecto (`c:\Users\felip\Documents\crhistmas-app`), ejecuta:

    ```powershell
    vercel
    ```

3. **Sigue los pasos**:
    - Set up and deploy? **Y**
    - Scope? **(Enter)**
    - Link to existing project? **N**
    - Project name? **(Enter)**
    - Directory? **(Enter / ./ )**
    - **Build settings**: Detectará automáticamente Vite. Simplemente presiona Enter.

4. **IMPORTANTE: Variables de Entorno**:
    Una vez creado el proyecto en Vercel, debes ir al panel de control (Dashboard) de Vercel en el navegador:
    - Ve a **Settings > Environment Variables**.
    - Agrega TODAS las variables que tienes en tu archivo `.env` (ábrelo localmente para copiar los valores):
        - `VITE_FIREBASE_API_KEY`
        - `VITE_FIREBASE_AUTH_DOMAIN`
        - `VITE_FIREBASE_PROJECT_ID`
        - ... y todas las demás.
    - **Redespliega**: Ejecuta `vercel --prod` en tu terminal o presiona "Redeploy" en Vercel para que tome los cambios.

## Opción 2: Firebase Hosting

1. **Instala Firebase Tools**:

    ```powershell
    npm install -g firebase-tools
    ```

2. **Inicia sesión**:

    ```powershell
    firebase login
    ```

3. **Inicializa el proyecto**:

    ```powershell
    firebase init hosting
    ```

    - Selecciona "Use an existing project" -> elige `gift-webapp-fd049`.
    - "What do you want to use as your public directory?": Escribe **dist**.
    - "Configure as a single-page app?": **Yes (y)**.
    - "Set up automatic builds and deploys with GitHub?": **No (N)** (por ahora).

4. **Construye y Despliega**:

    ```powershell
    npm run build
    firebase deploy
    ```

> **Nota para PWA**: Si usas Vercel, asegúrate de que el archivo `sw.js` y el `manifest.webmanifest` se carguen correctamente (Vite lo maneja, pero verifica en la consola del navegador si hay errores 404).
