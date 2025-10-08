# Prompt Optimizer Pro

A comprehensive web application for optimizing prompts for large language models (LLMs) with real-time preview and intelligent metrics.

## 🚀 Quick Start

### Running the Application

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/prompt-optimizer-pro.git
   cd prompt-optimizer-pro
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

### 1. Prompt Input Panel
- Textarea for raw prompt input
- 25+ predefined operators with categories
- Search and filter functionality
- Quick operator shortcuts
- Color-coded operator badges

### 2. LLM Configuration Panel
- **Parameters**: Temperature, Top P, Max Tokens sliders
- **Advanced Settings**: Role, Tone, Audience, Format dropdowns
- **Safety Features**: Chain of Thought, Reflective Mode, No Autopilot, Guardrail checkboxes
- Collapsible sections for organized interface

### 3. Prompt Preview Panel
- Real-time optimized prompt generation
- Copy to clipboard functionality
- Configuration explanations
- Token counting (input/output)
- Readability and creativity indicators

### 4. Metrics Panel
- Token usage analysis
- Readability assessment (simple/medium/complex)
- Creativity level indicator
- Efficiency scoring with visual progress ring
- Smart recommendations for improvement

## 🛠️ Technical Stack

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Font Awesome** - Icons
- **GitHub Actions** - Automated deployment

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

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (3-column layout)
- Tablet (stacked layout)
- Mobile (single column layout)

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

**Deployed with GitHub Actions 🚀**