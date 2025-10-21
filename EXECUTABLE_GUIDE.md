# Guía de Ejecutables para Prompt Master

## 🚀 Inicia la aplicación con un solo clic

### 📁 Archivos de Ejecutables Creados

#### **Para macOS:**
- `start_app.command` - Script para iniciar la aplicación
- `INSTALL_APP.sh` - Instalador que crea accesos directos

#### **Para Windows:**
- `start_app.bat` - Script para iniciar la aplicación

---

## 🎯 Método 1: Usar el ejecutable directo (Recomendado)

### **Para macOS:**

1. **Abre Terminal** en el directorio de la aplicación
2. **Ejecuta el script:**
   ```bash
   ./start_app.command
   ```

3. **¡Listo!** La aplicación se iniciará automáticamente y se abrirá en tu navegador

### **Para Windows:**

1. **Abre Símbolo del sistema** (cmd) en el directorio de la aplicación
2. **Ejecuta el script:**
   ```cmd
   start_app.bat
   ```

3. **¡Listo!** La aplicación se iniciará automáticamente y se abrirá en tu navegador

---

## 🎯 Método 2: Instalación completa (Opción recomendada)

### **Para macOS:**

1. **Ejecuta el instalador:**
   ```bash
   ./INSTALL_APP.sh
   ```

2. **Sigue las instrucciones:**
   - El instalador creará un acceso directo en tu escritorio
   - Opcionalmente puede agregar la aplicación a tu Dock
   - Copiará todos los archivos a `~/Applications/Prompt Master`

3. **Inicia la aplicación:**
   - Haz doble clic en `Prompt Master.command` en tu escritorio
   - o usa el acceso directo en el Dock

### **Para Windows:**

1. **Copia el archivo `start_app.bat`** a una ubicación conveniente (ej: Escritorio)
2. **Haz doble clic** en `start_app.bat` para iniciar la aplicación

---

## 🔧 Características de los ejecutables

### ✨ **Funcionalidades:**
- ✅ Verificación automática de Node.js y npm
- ✅ Apertura automática del navegador en `http://localhost:3000/prompt-master`
- ✅ Verificación del archivo `.env.local`
- ✅ Mensajes de error claros si algo falla
- ✅ Cierre automático cuando presionas Enter

### 🛡️ **Seguridad:**
- ✅ No requiere instalación de software adicional
- ✅ No modifica archivos del sistema
- ✅ Solo accede a los archivos de la aplicación
- ✅ Tu API key permanece segura en `.env.local`

---

## 🚨 Solución de Problemas

### **Si el ejecutable no funciona:**

#### **Problema 1: "Permission denied"**
```bash
# Solución para macOS:
chmod +x start_app.command
```

#### **Problema 2: Node.js no instalado**
1. Descarga Node.js desde: https://nodejs.org/
2. Instálalo y reinicia tu computadora
3. Vuelve a intentar con el ejecutable

#### **Problema 3: No se abre el navegador**
- El ejecutable intentará abrir automáticamente el navegador
- Si no funciona, abre manualmente `http://localhost:3000/prompt-master`
- Verifica que tu navegador esté funcionando correctamente

#### **Problema 4: Error en .env.local**
- Asegúrate de tener el archivo `.env.local` configurado
- Verifica que tu API key esté correcta
- El ejecutable te advertirá si no encuentra el archivo

---

## 📝 Notas Importantes

### **Requisitos previos:**
- ✅ Node.js instalado (versión 14 o superior)
- ✅ npm instalado (viene con Node.js)
- ✅ Archivo `.env.local` con tu API key de Gemini

### **Primera vez:**
1. Configura tu API key usando `./configure_api.sh`
2. Prueba que la aplicación funciona con `npm start`
3. Luego usa el ejecutable para futuras sesiones

### **Actualizaciones:**
- Si actualizas el código desde GitHub, ejecuta el instalador de nuevo
- Los ejecutables siempre usarán la última versión del código

---

## 🎉 ¡Listo para usar!**

Ahora puedes iniciar Prompt Master con:
- **Un solo doble clic** en el ejecutable
- **Sin abrir Visual Studio Code**
- **Sin escribir comandos manualmente**
- **Tu API key ya configurada**

**¡Disfruta de tu aplicación de optimización de prompts!** 🚀✨