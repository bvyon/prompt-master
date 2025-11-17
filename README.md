# Prompt Master 🪄

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Gemini](https://img.shields.io/badge/Gemini-2.5%20Flash-green.svg)](https://ai.google.dev/)

Optimizador de prompts inteligente con real-time preview, métricas avanzadas y mejora IA usando Google **Gemini 2.5 Flash**.

## 🚀 Acceso Instantáneo

🌐 **[¡Usa la App AHORA!](https://bvyon.github.io/prompt-master)** - Sin instalar nada, funciona en cualquier navegador moderno.

**Para instalar como PWA:**
1. Abre el enlace ↑ en Chrome/Firefox/Safari
2. Busca "Instalar" o "Agregar a pantalla de inicio"
3. ¡Funciona como app nativa!

## 🎯 Características Principales

- **🧠 Enhancement IA**: Mejora automática de prompts con Gemini 2.5 Flash
- **📊 Métricas en Tiempo Real**: Análisis de tokens, legibilidad y creatividad
- **⚡ Vista Previa Instantánea**: Preview del prompt optimizado al instante
- **🎨 25+ Operadores**: Categorizados y con colores para fácil selección
- **💾 Persistencia Automática**: Configuraciones guardadas en localStorage
- **⌨️ Atajos de Teclado**: Ctrl+E (enhance), Ctrl+R (reset), Ctrl+M (métricas)
- **📱 Totalmente Responsivo**: Funciona en desktop, tablet y móvil
- **🛡️ Error Boundary**: Manejo robusto de errores sin crashes
- **🔔 Notificaciones Toast**: Feedback visual para todas las acciones

## 🛠️ Stack Tecnológico

- **React 18** - Framework UI moderno
- **Tailwind CSS** - Estilos utilitarios
- **Framer Motion** - Animaciones fluidas
- **Google Gemini 2.5 Flash** - IA para enhancement
- **PWA Ready** - Instalable en cualquier dispositivo

## 🚀 Instalación Local

Para desarrollo local, ejecuta:

```bash
# 1. Clona el repositorio
git clone https://github.com/bvyon/prompt-master.git
cd prompt-master

# 2. Instala dependencias
npm install

# 3. Configura tu API key de Gemini
# Obtén la key desde: https://makersuite.google.com/app/apikey
cp .env .env.local
# Edita .env.local y agrega: REACT_APP_GEMINI_API_KEY=tu_key_aqui

# 4. Inicia la aplicación
npm start
```

### Atajos Rápidos:
- **`./run_app.sh`** (macOS) o **`run_app.bat`** (Windows) - Inicia con un clic

---

## 📖 Guía de Uso Rápido

1. **Configura parámetros** en el panel izquierdo
2. **Escribe tu prompt** en el panel central
3. **Selecciona operadores** para optimizar
4. **Haz clic en "Enhance"** para mejora IA
5. **Copia el resultado** desde el panel derecho

### Operadores Disponibles:
- `/ELI5` - Explicaciones simples
- `/STEP-BY-STEP` - Guías estructuradas
- `/CHAIN OF THOUGHT` - Razonamiento lógico
- `/TECHNICAL` - Lenguaje especializado
- Y 20+ operadores más...

---

## 📊 Métricas y Análisis

- **Tokens estimados** en entrada/salida
- **Nivel de legibilidad** (Simple/Medio/Complejo)
- **Indicador de creatividad** visual
- **Recomendaciones** inteligentes de mejora

---

## 🔧 Configuración API

**IMPORTANTE:** Nunca commits el archivo `.env.local` (está en `.gitignore`).

### Para Desarrollo Local:
```bash
# Usa el script automático:
./configure_api.sh
```

### Para Producción (GitHub Pages):
1. Ve a Settings → Secrets → Actions
2. Agrega `REACT_APP_GEMINI_API_KEY` con tu clave

---

## 📱 Características Adicionales

- **PWA Instalable** - Funciona sin conexión limitada
- **Totalmente Responsivo** - Desktop, tablet y móvil
- **Persistencia Automática** - Guarda configuraciones
- **Atajos de Teclado** - Ctrl+E (enhance), Ctrl+R (reset)
- **Modo Oscuro** próximamente

---

## 🐛 Reportar Problemas

¿Encontraste un error? Abre un issue en GitHub:

1. Ve a [Issues](https://github.com/bvyon/prompt-master/issues)
2. Describe el problema detalladamente
3. Incluye capturas de pantalla si es posible
4. Menciona tu sistema operativo y navegador

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas!

1. Fork el proyecto
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m 'Agrega nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE) para más detalles.

---

## 🙏 Créditos

Desarrollado con ❤️ usando tecnologías modernas de React y IA.

**⭐ Si te gusta, dale una estrella al repositorio!**

---

## 📝 Changelog

### v1.1.0 (2025)
- ✅ **Prompt de Gemini optimizado** (25% más eficiente)
- ✅ **PWA instalable** en cualquier dispositivo
- ✅ **Scripts de ejecución** un clic
- ✅ **Sistema de notificaciones** completo
- ✅ **Atajos de teclado** mejorados
- ✅ **Error boundaries** robustos
- ✅ **Persistencia automática** de configuraciones
- ✅ **README completamente renovado**

### v1.0.1 (2024)
- ✅ **Integración Gemini 2.5 Flash** completa
- ✅ **Build productivo** optimizado
- ✅ **Despliegue automático** en GitHub Pages

### v1.0.0 (2024)
- ✅ **Lanzamiento inicial** con Gemini AI
