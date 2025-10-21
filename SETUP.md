# Configuración de API Key para GitHub Pages

## Opción 1: Usar GitHub Secrets (Recomendado)

Para proyectos desplegados en GitHub Pages, puedes usar GitHub Secrets:

1. Ve a tu repositorio en GitHub
2. Haz clic en "Settings" > "Secrets and variables" > "Actions"
3. Haz clic en "New repository secret"
4. Crea un secret llamado `REACT_APP_GEMINI_API_KEY` con tu API key real
5. El despliegue automático usará este secret

## Opción 2: Configuración Local

Para desarrollo local:

1. Copia el archivo `.env` existente:
   ```bash
   cp .env .env.local
   ```

2. Edita `.env.local` y pon tu API key real:
   ```
   REACT_APP_GEMINI_API_KEY=tu_api_key_real_aqui
   ```

3. Asegúrate de que `.env.local` no se suba a Git:
   ```bash
   echo ".env.local" >> .gitignore
   ```

## Opción 3: Variables de Entorno del Sistema

Puedes configurar la variable de entorno en tu sistema:
```bash
# En macOS/Linux
export REACT_APP_GEMINI_API_KEY=tu_api_key_real_aqui

# En Windows (Command Prompt)
set REACT_APP_GEMINI_API_KEY=tu_api_key_real_aqui
```

## Importante

- **Nunca subas archivos `.env` con claves reales a GitHub**
- **Usa siempre `.gitignore` para proteger archivos sensibles**
- **Para GitHub Pages, usa Secrets de GitHub**