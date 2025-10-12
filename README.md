# Prompt Master

A comprehensive web application for optimizing prompts for large language models (LLMs) with real-time preview and intelligent metrics.

## 🚀 Quick Start

### Running the Application

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bvyon/prompt-master.git
   cd prompt-master
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

### Alternative: Direct File Access

You can also open `public/index.html` directly in your browser, but this may show development warnings and some features may not work properly due to browser security restrictions.

## 🎯 Features

### 1. LLM Configuration Panel (Primero)
- **Parameters**: Temperature, Top P, Max Tokens sliders
- **Advanced Settings**: Role, Tone, Audience, Format dropdowns
- **Safety Features**: Chain of Thought, Reflective Mode, No Autopilot, Guardrail checkboxes
- Collapsible sections for organized interface
- Botón "Proceed to Prompt" para avanzar al siguiente paso

### 2. Prompt Input Panel (Segundo)
- Textarea for raw prompt input
- 25+ predefined operators with categories
- Search and filter functionality
- Quick operator shortcuts
- Color-coded operator badges
- Solo activo después de configurar los parámetros
- Botón "Generate Prompt" para crear el prompt optimizado

### 3. Prompt Preview Panel (Tercero)
- Real-time optimized prompt generation
- Copy to clipboard functionality
- Configuration explanations
- Token counting (input/output)
- Readability and creativity indicators

### 4. Metrics Panel (Cuarto)
- Token usage analysis
- Readability assessment (simple/medium/complex)
- Creativity level indicator
- Efficiency scoring with visual progress ring
- Smart recommendations for improvement
- Toggle para mostrar/ocultar panel

Note: Color badges are now driven by a small utility (`src/utils/colorClasses.js`) that maps operator color keys to static Tailwind class names. This avoids missing CSS classes in production builds (Tailwind needs static class names to include them in the final CSS).

## 🛠️ Technical Stack

- **React 18** - UI framework
- **Tailwind CSS** - Styling
## ✅ Recent fixes and improvements

- Global CSS safety fixes (applied to `src/index.css`):
   - `overflow-x: hidden` added to `html, body, #root` to prevent horizontal scroll on small screens or when large elements are present.
   - `box-sizing: border-box` applied globally to make padding/border calculations predictable.
   - Media elements (images, SVGs, video) limited with `max-width: 100%` to avoid overflow.
   - Long operator names and monospaced preview text now wrap safely (`word-break` / `overflow-wrap`).

- Tailwind class detection:
   - Replaced dynamic template strings like `` `bg-${operator.color}-500` `` with a static mapping (`src/utils/colorClasses.js`) so Tailwind includes the necessary classes during build.

- Performance and UX tweaks:
   - Operator filtering memoized with `useMemo` to avoid unnecessary recalculations when typing/searching.
   - Operator lists and preview panels use `overflow-y-auto` with sensible `max-height` at breakpoints to avoid pushing layout and to enable internal scrolling.
   - Copy-to-clipboard button temporarily disables repeated clicks and shows a brief "Copied" state.

These changes were applied to improve behavior when deployed to GitHub Pages and on small/mobile viewports.

## 📱 Responsive and testing notes

- To test responsiveness locally, run `npm start` and use DevTools (toggle device toolbar) to check widths 375px, 768px, 1024px.
- Generate a production build (`npm run build`) and inspect the `build` folder or deploy to GitHub Pages to validate the final CSS payload.

## 🛳️ Deployment notes

- If you deploy to GitHub Pages, confirm the `homepage` field in `package.json` matches the repository path or update it to `"/"` for root deployment. The build process will use this to generate correct asset URLs.
- The mapping utility for color classes ensures classes are present in the final CSS; if you add new operator colors, also add entries to `src/utils/colorClasses.js`.
- **Framer Motion** - Animations
- **Font Awesome** - Icons
- **GitHub Actions** - Automated deployment

## 📋 Guía de Uso Paso a Paso

### Paso 1: Configuración Inicial del LLM
1. **Abre la aplicación** en tu navegador web
2. **En el panel izquierdo (LLM Configuration)**, ajusta los parámetros básicos:
   - **Temperature**: Controla la creatividad (0.0 = más determinista, 1.0 = más creativo)
   - **Top P**: Controla la diversidad de respuestas (0.0-1.0)
   - **Max Tokens**: Límite de longitud de la respuesta
3. **Configura las opciones avanzadas**:
   - **Role**: Selecciona el rol del asistente (experto, analista, etc.)
   - **Tone**: Elige el tono deseado (técnico, casual, formal, etc.)
   - **Audience**: Define a quién se dirige el contenido (principiante, experto, etc.)
   - **Format**: Selecciona el formato de salida (lista, tabla, JSON, etc.)
4. **Activa las características de seguridad** según sea necesario:
   - **Chain of Thought**: Habilita razonamiento paso a paso
   - **Reflective Mode**: Permite reflexión y auto-corrección
   - **No Autopilot**: Desactiva el modo automático
   - **Guardrail**: Aplica filtros de seguridad
5. **Haz clic en "Proceed to Prompt"** para continuar al siguiente paso

### Paso 2: Redacción del Prompt
1. **En el panel central (Prompt Input Panel)**, ahora disponible:
   - **Área de texto**: Ingresa tu prompt base o rough idea
   - **Operadores predefinidos**: 25+ operadores organizados por categorías
   - **Búsqueda y filtrado**: Encuentra operadores rápidamente
   - **Atajos rápidos**: Acceso directo a operadores comunes
   - **Badges con color**: Identificación visual por categoría
2. **Usa los operadores estratégicamente**:
   - **Simplificación**: /ELI5, /BEGINNER para explicaciones simples
   - **Estructura**: /STEP-BY-STEP, /CHECKLIST para guías organizadas
   - **Formato**: /EXEC SUMMARY, /BULLET POINTS, /TABLE, /JSON, /MARKDOWN
   - **Tono**: /TECHNICAL, /CASUAL, /FORMAL, /CREATIVE, /ANALYTICAL
   - **Razonamiento**: /CHAIN OF THOUGHT, /REFLECTIVE MODE
   - **Seguridad**: /NO AUTOPILOT, /GUARDRAIL
   - **Rol**: /ACT AS, /EXPERT
   - **Acción**: /CRITIQUE, /IMPROVE, /COMPARE, /EXAMPLES
3. **Genera el prompt optimizado**:
   - Haz clic en "Generate Prompt" para combinar todo
   - El resultado aparecerá en el panel de previsualización

### Paso 3: Revisión del Prompt Optimizado
1. **En el panel derecho (Prompt Preview Panel)**, verás:
   - El prompt optimizado generado en tiempo real
   - Conteo de tokens de entrada y salida
   - Indicadores de legibilidad y creatividad
   - Explicaciones de la configuración aplicada
2. **Prueba la funcionalidad de copiado**:
   - Haz clic en el botón "Copy to Clipboard" para copiar el prompt
   - El botón mostrará "Copied" brevemente cuando se complete
3. **Revisa los indicadores**:
   - Legibilidad: Simple, Medio, Complejo
   - Creatividad: Nivel de originalidad del prompt
   - Eficiencia: Puntuación general del prompt

### Paso 4: Análisis de Métricas
1. **En el panel inferior derecho (Metrics Panel)**, obtén análisis detallados:
   - **Uso de tokens**: Distribución y optimización
   - **Evaluación de legibilidad**: Clasificación detallada
   - **Nivel de creatividad**: Indicador visual
   - **Puntuación de eficiencia**: Anillo de progreso visual
   - **Recomendaciones inteligentes**: Sugerencias de mejora
2. **Muestra/oculta el panel** usando el botón "Hide/Show Metrics" en el encabezado

### Consejos de Uso Avanzado
1. **Itera rápidamente**: Cambia parámetros y ve los resultados en tiempo real
2. **Combina operadores**: Experimenta con diferentes combinaciones para obtener resultados óptimos
3. **Usa las métricas**: Ajusta tu prompt basándote en las recomendaciones de eficiencia
4. **Prueba en diferentes dispositivos**: La aplicación es totalmente responsiva
5. **Copia y pega**: Usa el prompt generado directamente en tu LLM favorito

## 📁 Project Structure

```
├── public/                 # Static files
│   ├── index.html         # Main HTML template
│   └── favicon.ico        # App icon
├── src/                   # React source code
│   ├── components/        # React components
│   │   ├── App.js
│   │   ├── PromptInputPanel.js
│   │   ├── LLMConfigurationPanel.js
│   │   ├── PromptPreviewPanel.js
│   │   └── MetricsPanel.js
│   ├── utils/             # Utility functions
│   │   └── promptBuilder.js
│   ├── operators.json     # Operator definitions
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── package.json           # Project configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── .gitignore             # Git ignore rules
├── .github/               # GitHub Actions
│   └── workflows/
│       └── deploy.yml     # Deployment workflow
├── README.md              # Project documentation
└── DEPLOYMENT.md          # Deployment guide
```

## 🔧 Development Setup

For a production-ready setup, consider:

1. **Install Node.js and npm**
2. **Create a React project**:
   ```bash
   npx create-react-app prompt-optimizer-pro
   ```
3. **Install dependencies**:
   ```bash
   npm install tailwindcss framer-motion
   ```
4. **Configure Tailwind CSS**:
   ```bash
   npx tailwindcss init -p
   ```
5. **Replace CDN links** with local imports in the components

## 🎨 Design System

- **Color Palette**: Blue, Purple, Green, Gray-based
- **Typography**: System font stack
- **Components**: Cards with soft shadows and rounded edges
- **Layout**: 3-column responsive grid
- **Animations**: Smooth transitions and micro-interactions

## 📊 Operators

The application includes 25+ operators organized by categories:

- **Simplification**: /ELI5, /BEGINNER
- **Structure**: /STEP-BY-STEP, /CHECKLIST
- **Format**: /EXEC SUMMARY, /BULLET POINTS, /TABLE, /JSON, /MARKDOWN
- **Tone**: /TECHNICAL, /CASUAL, /FORMAL, /CREATIVE, /ANALYTICAL
- **Reasoning**: /CHAIN OF THOUGHT, /REFLECTIVE MODE
- **Safety**: /NO AUTOPILOT, /GUARDRAIL
- **Role**: /ACT AS, /EXPERT
- **Action**: /CRITIQUE, /IMPROVE, /COMPARE, /EXAMPLES

## 🔍 Prompt Building Logic

Optimized prompts are constructed in this format:

```
/ROLE: {selected_role}
/TONE: {selected_tone}
/AUDIENCE: {selected_audience}
/FORMAT AS: {selected_format}
{active_operators list}
/temperature={value}
/top_p={value}
/max_tokens={value}
PROMPT: {user_prompt_text}
```

## 🚨 Development Warnings

The current setup uses CDN versions for development convenience. For production:

1. **React DevTools**: Install for better development experience
2. **Local Server**: Use a proper HTTP server (not file:// protocol)
3. **Source Maps**: Precompile scripts to avoid sourcemap warnings
4. **Tailwind CSS**: Install as PostCSS plugin or use CLI
5. **Babel**: Precompile scripts for production

## 🎯 Usage Tips

1. **Start with a clear prompt** - Be specific about what you want
2. **Use operators strategically** - Choose operators that match your goal
3. **Adjust parameters** - Fine-tune temperature and top_p for desired creativity
4. **Review metrics** - Use readability and efficiency scores to improve prompts
5. **Experiment** - Try different combinations of operators and settings

## 📱 Responsive Design Mejorado

La aplicación cuenta con un diseño responsivo completamente optimizado:

### Escritorio (Desktop)
- **Layout de 3 columnas**: LLM Configuration | Preview & Metrics | Prompt Input
- **Espaciado óptimo**: Gap adaptativo según tamaño de pantalla
- **Botones de tamaño completo**: Mejor experiencia de usuario

### Tablet y Pantallas Medianas
- **Transición suave**: Layout se adapta entre 3 y 2 columnas
- **Espaciado ajustado**: Menor gap para mejor uso del espacio
- **Elementos compactos**: Textos y botones adaptados

### Móvil (Mobile)
- **Layout vertical**: Todos los paneles apilados verticalmente
- **Header optimizado**: Logo y botones en columna separada
- **Botones full-width**: Mayor facilidad de toque
- **Textos ajustados**: Tamaños de fuente reducidos pero legibles
- **Footer responsive**: Información organizada en columnas

### Mejoras Recientes
- **Cambio de breakpoint**: De `lg:` a `xl:` para mejor adaptación
- **Espaciado dinámico**: `gap-4 md:gap-6` para móviles y tablets
- **Header responsive**: Diseño vertical en móviles con `flex-col`
- **Footer mejorado**: Contenido adaptable con `flex-wrap`
- **Botones accesibles**: `w-full` en móviles para mejor usabilidad

## 🔧 Customization

To customize the application:
1. **Modify operators.json** to add/remove operators
2. **Update component styling** in respective files
3. **Extend promptBuilder.js** for custom logic
4. **Add new metrics** in MetricsPanel.js

## 🚀 Deployment

### GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages:

1. **Create a GitHub repository** and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/prompt-optimizer-pro.git
   git push -u origin main
   ```

2. **Configure GitHub Pages**:
   - Go to your repository Settings
   - Pages section
   - Source: GitHub Actions
   - Branch: gh-pages

3. **Automatic deployment** will happen when you push to main branch.

### Manual Deployment

```bash
npm run build
npm run deploy
```

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

**Built with ❤️ using React, Tailwind CSS, and Framer Motion**

## 📝 Recent Updates

### Mejoras de UX y Flujo de Trabajo (Últimas Actualizaciones)
- **Reordenamiento de paneles**: Nuevo flujo de trabajo lógico:
  1. Configuraciones LLM
  2. Redacción del prompt
  3. Vista del prompt optimizado
  4. Análisis de métricas
- **Diseño responsivo mejorado**:
  - Cambio de breakpoint de `lg:` a `xl:` para mejor adaptación a dispositivos
  - Header y footer optimizados para móviles con diseño vertical
  - Botones con `w-full` en móviles para mejor accesibilidad
  - Espaciado dinámico con `gap-4 md:gap-6`
- **Experiencia de usuario mejorada**: Los usuarios siguen un flujo natural de configuración → creación → revisión → análisis

### Mejoras Anteriores
- **Code Readability Improvements**:
  - Added comments to `src/App.js` to enhance code readability and maintainability.
- **Deployed with GitHub Actions 🚀**
