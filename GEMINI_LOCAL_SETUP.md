# Configuración Local de Gemini API

## 🚀 Cómo configurar tu API key de Gemini en tu computadora

### **Paso 1: Obtener tu API Key**

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Inicia sesión con tu cuenta de Google
3. Haz clic en "Create API Key"
4. Copia la API key que se genera (empieza con "AIza...")

### **Paso 2: Configurar la API Key Localmente**

#### **Opción A: Usar el script automático (Recomendado)**

```bash
cd prompt-master
./configure_api.sh
```

Este script te pedirá tu API key y la configurará automáticamente.

#### **Opción B: Configurar manualmente**

1. Abre el archivo `.env.local` en VS Code
2. Reemplaza `your_gemini_api_key_here` con tu API key real:

```bash
REACT_APP_GEMINI_API_KEY=AIzaTuApiKeyRealAqui
```

3. Guarda el archivo

### **Paso 3: Probar la configuración**

1. Inicia la aplicación:
   ```bash
   npm start
   ```

2. Abre la aplicación en: `http://localhost:3000/prompt-master`

3. Prueba la función de Gemini:
   - Escribe un prompt en el panel central
   - Haz clic en "Enhance with Gemini AI"
   - Deberías ver el mensaje "Enhancing..." y luego el prompt mejorado

### **Paso 4: Solución de problemas**

#### **Si no funciona la API:**

1. **Verifica la API key**:
   - Asegúrate de que la API key empiece con "AIza"
   - Comprueba que no tenga espacios extra al inicio o final

2. **Revisa el archivo .env.local**:
   ```bash
   cat .env.local
   ```
   Debe mostrar: `REACT_APP_GEMINI_API_KEY=AIza...`

3. **Reinicia la aplicación**:
   ```bash
   npm start
   ```

4. **Revisa la consola**:
   - Abre las herramientas de desarrollador (F12)
   - Ve a la pestaña "Console"
   - Busca mensajes de error relacionados con Gemini

#### **Mensajes de error comunes:**

- **"Gemini API key not configured"**: Tu API key no está configurada correctamente
- **"Network error"**: Problema de conexión o API key inválida
- **"API request failed"**: La API key podría estar expirada o incorrecta

### **Paso 5: Verificación final**

Para confirmar que todo funciona:

1. Escribe este prompt de prueba:
   ```
   Explica la inteligencia artificial de forma simple
   ```

2. Haz clic en "Enhance with Gemini AI"

3. Deberías ver un prompt mejorado con el badge "Enhanced"

### **🔒 Seguridad recordatoria**

- **Nunca compartas tu API key**
- **No subas .env.local a GitHub** (ya está en .gitignore)
- **Tu API key solo funciona en tu computadora local**

### **📞 Si necesitas ayuda**

1. Revisa el archivo `SETUP.md` para más detalles
2. Verifica que tu API key esté activa en [Google AI Studio](https://makersuite.google.com/app/apikey)
3. Asegúrate de tener conexión a internet

---
**¡Listo para usar Gemini AI!** 🤖✨