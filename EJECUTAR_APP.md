# 🚀 Cómo Ejecutar Prompt Master Sin Visual Studio Code

¡Excelente! Tu aplicación Prompt Master ahora puede ejecutarse de varias formas sin necesidad de abrir Visual Studio Code. Elige la opción que mejor se adapte a tus necesidades:

---

## 🎯 **Opción 1: Web App en Producción (Recomendado)**

**✅ Ya desplegada automáticamente en:**
🌐 **https://bvyon.github.io/prompt-master**

**Características:**
- ✅ Funciona en cualquier navegador moderno (Chrome, Firefox, Safari, Edge)
- ✅ Instalable como aplicación (PWA) en móviles y computadoras
- ✅ Sin necesidad de instalar software adicional
- ✅ Actualizaciones automáticas
- ✅ Cache inteligente para funcionamiento offline limitado

**Para instalar como app (PWA):**
1. Abre: https://bvyon.github.io/prompt-master
2. En Chrome: Haz clic en "Instalar Prompt Master" en la barra de direcciones
3. En otros navegadores: Usa "Agregar a pantalla de inicio" o "Instalar sitio como app"

---

## 🎯 **Opción 2: Ejecutables Simples**

### **Para macOS:**
```bash
# Doble clic en el archivo o ejecuta:
./run_app.sh
```

### **Para Windows:**
```cmd
REM Doble clic en:
run_app.bat
```

**Características:**
- ✅ Abre automáticamente en el navegador
- ✅ Verifica que Node.js y npm estén instalados
- ✅ Mensajes de error claros si algo falta
- ✅ Servidor local en http://localhost:3000/prompt-master

---

## 🎯 **Opción 3: Usar los Ejecutables Originales**

Si prefieres los originales que ya estaban configurados:

### **macOS:**
```bash
./INSTALL_APP.sh    # Para instalación completa
./start_app.command # Para ejecución simple
```

### **Windows:**
```cmd
REM Usa los archivos .bat existentes en el directorio
```

---

## 🔧 **Configuración Inicial (Obligatoria)**

**Antes de la primera ejecución, configura tu API key de Gemini:**

```bash
# Ejecuta el script de configuración:
./configure_api.sh
```

**O manualmente:**
1. Crea el archivo `.env.local`
2. Agrega tu API key: `REACT_APP_GEMINI_API_KEY=tu_api_key_aqui`

---

## 📱 **Características Adicionales**

### **Aplicación Optimizada (Todas las opciones):**
- ✅ Mejor gestor de prompts para Gemini AI
- ✅ Interface moderna y responsiva
- ✅ Persistencia automática de configuraciones
- ✅ Atajos de teclado (Ctrl+E, Ctrl+R, Ctrl+M)
- ✅ Sistema de notificaciones
- ✅ Manejo inteligente de errores
- ✅ Métricas en tiempo real
- ✅ 25+ operadores de prompting

---

## 🚨 **Solución de Problemas**

### **Si la app web no carga:**
- Verifica tu conexión a internet
- Limpia el cache del navegador (Ctrl+F5)

### **Si los ejecutables fallan:**
- Asegúrate de tener Node.js 14+ instalado
- Verifica el archivo `.env.local` existe con tu API key
- En macOS: `chmod +x run_app.sh`

### **API Key problemas:**
- Revisa que la API key sea válida en Google AI Studio
- Verifica que tengas suficientes créditos/quota

---

## 🎉 **¡Listo!**

Ahora puedes usar Prompt Master de la forma que prefieras:

💻 **Web App Clic:** https://bvyon.github.io/prompt-master
🏃‍♂️ **Doble Clic:** `run_app.sh` o `run_app.bat`
📱 **Como App:** Instálala desde el navegador

**¡Disfruta optimizando tus prompts de IA!** ✨🪄
