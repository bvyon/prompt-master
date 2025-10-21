# Prompt Master

A comprehensive web application for optimizing prompts for large language models (LLMs) with real-time preview, intelligent metrics, and AI-powered enhancement using Google's Gemini API.

## 🚀 Quick Start

### Option 1: Use Executable Scripts (Recommended)

#### For macOS:
```bash
# Clone and setup
git clone https://github.com/bvyon/prompt-master.git
cd prompt-master

# Configure your Gemini API key
./configure_api.sh

# Start with one click
./start_app.command
```

#### For Windows:
```bash
# Clone and setup
git clone https://github.com/bvyon/prompt-master.git
cd prompt-master

# Configure your Gemini API key (manually edit .env.local)
# Start with one click
start_app.bat
```

### Option 2: Traditional Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bvyon/prompt-master.git
   cd prompt-master
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure your Gemini API key**:
   ```bash
   # Get your API key from: https://makersuite.google.com/app/apikey
   cp .env .env.local
   # Edit .env.local and add your API key
   ```

4. **Start the development server**:
   ```bash
   npm start
   ```

5. **Open your browser** and navigate to:
   ```
   http://localhost:3000/prompt-master
   ```

### Alternative: Direct File Access

You can also open `public/index.html` directly in your browser, but this may show development warnings and some features may not work properly due to browser security restrictions.

## 🎯 Features

### 1. LLM Configuration Panel (First)
- **Parameters**: Temperature, Top P, Max Tokens sliders
- **Advanced Settings**: Role, Tone, Audience, Format dropdowns
- **Safety Features**: Chain of Thought, Reflective Mode, No Autopilot, Guardrail checkboxes
- Collapsible sections for organized interface

### 2. Prompt Input Panel (Second)
- Textarea for raw prompt input
- 25+ predefined operators with categories
- Search and filter functionality
- Quick operator shortcuts
- Color-coded operator badges
- **AI-Prompt Enhancement**: One-click prompt improvement with Google's Gemini AI
- Manual enhancement trigger with loading states and error handling

### 3. Prompt Preview Panel (Third)
- Real-time optimized prompt generation
- Copy to clipboard functionality
- Configuration explanations
- Token counting (input/output)
- Readability and creativity indicators
- **Enhanced Prompt Badge**: Visual indicator for AI-optimized prompts

### 4. Metrics Panel (Fourth)
- Token usage analysis
- Readability assessment (simple/medium/complex)
- Creativity level indicator
- Efficiency scoring with visual progress ring
- Smart recommendations for improvement
- Toggle to show/hide panel

Note: Color badges are now driven by a small utility (`src/utils/colorClasses.js`) that maps operator color keys to static Tailwind class names. This avoids missing CSS classes in production builds (Tailwind needs static class names to include them in the final CSS).

## 🤖 Gemini AI Integration

### AI-Powered Prompt Enhancement
- **Google Gemini 2.0 Flash** integration for advanced prompt optimization
- **Manual enhancement trigger** - Enhance prompts on-demand with a single click
- **Smart system prompts** - Specialized prompt engineering guidance
- **Error handling** - Comprehensive error messages and recovery
- **Loading states** - Visual feedback during enhancement process

### 🔒 API Key Security & Setup

#### **For Development (Local Setup):**
1. **Get your Gemini API key** from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Use the automatic configuration script**:
   ```bash
   ./configure_api.sh
   ```
   This will create and configure your `.env.local` file securely.

3. **Manual configuration**:
   ```bash
   cp .env .env.local
   # Edit .env.local and add: REACT_APP_GEMINI_API_KEY=your_api_key_here
   ```

#### **For Production (GitHub Pages):**
1. **Add your API key as a GitHub Secret**:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Create a secret named `REACT_APP_GEMINI_API_KEY` with your API key
   - The deployment will automatically use this secret

### 📚 Setup Documentation
- See [`GEMINI_LOCAL_SETUP.md`](GEMINI_LOCAL_SETUP.md) for detailed setup instructions
- See [`SETUP.md`](SETUP.md) for advanced configuration options
- See [`EXECUTABLE_GUIDE.md`](EXECUTABLE_GUIDE.md) for one-click startup

### Usage
1. **Write and configure** your prompt with desired settings
2. **Click "Enhance with Gemini AI"** to improve your prompt
3. **Review the enhanced version** in the preview panel with the "Enhanced" badge

### ⚠️ Security Notes
- **Never commit your `.env` file to Git** (it's in `.gitignore`)
- **Your API key is never exposed** in the codebase
- **GitHub Secrets** are used for production deployment
- **Local development** uses `.env.local` which is never shared

## 🛠️ Technical Stack

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Font Awesome** - Icons
- **Google Gemini API** - AI-powered enhancement
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
- **Google Gemini API** - AI-powered enhancement
- **GitHub Actions** - Automated deployment

## 📋 Step-by-Step Usage Guide

### Step 1: Initial LLM Configuration
1. **Open the application** in your web browser
2. **In the left panel (LLM Configuration)**, adjust the basic parameters:
   - **Temperature**: Controls creativity (0.0 = more deterministic, 1.0 = more creative)
   - **Top P**: Controls response diversity (0.0-1.0)
   - **Max Tokens**: Response length limit
3. **Configure the advanced options**:
   - **Role**: Select the assistant role (expert, analyst, etc.)
   - **Tone**: Choose the desired tone (technical, casual, formal, etc.)
   - **Audience**: Define who the content is for (beginner, expert, etc.)
   - **Format**: Select the output format (list, table, JSON, etc.)
4. **Enable safety features** as needed:
   - **Chain of Thought**: Enables step-by-step reasoning
   - **Reflective Mode**: Allows reflection and self-correction
   - **No Autopilot**: Disables automatic mode
   - **Guardrail**: Applies safety filters
5. **Click "Proceed to Prompt"** to continue to the next step

### Step 2: Prompt Writing
1. **In the center panel (Prompt Input Panel)**, now available:
   - **Text area**: Enter your base prompt or rough idea
   - **Predefined operators**: 25+ operators organized by categories
   - **Search and filtering**: Find operators quickly
   - **Quick shortcuts**: Direct access to common operators
   - **Color-coded badges**: Visual identification by category
2. **Use operators strategically**:
   - **Simplification**: /ELI5, /BEGINNER for simple explanations
   - **Structure**: /STEP-BY-STEP, /CHECKLIST for organized guides
   - **Format**: /EXEC SUMMARY, /BULLET POINTS, /TABLE, /JSON, /MARKDOWN
   - **Tone**: /TECHNICAL, /CASUAL, /FORMAL, /CREATIVE, /ANALYTICAL
   - **Reasoning**: /CHAIN OF THOUGHT, /REFLECTIVE MODE
   - **Safety**: /NO AUTOPILOT, /GUARDRAIL
   - **Role**: /ACT AS, /EXPERT
   - **Action**: /CRITIQUE, /IMPROVE, /COMPARE, /EXAMPLES
3. **Generate the optimized prompt**:
   - Click "Generate Prompt" to combine everything
   - The result will appear in the preview panel

### Step 3: Review Optimized Prompt
1. **In the right panel (Prompt Preview Panel)**, you'll see:
   - The real-time generated optimized prompt
   - Input and output token count
   - Readability and creativity indicators
   - Explanations of the applied configuration
2. **Test the copy functionality**:
   - Click the "Copy to Clipboard" button to copy the prompt
   - The button will briefly show "Copied" when completed
3. **Review the indicators**:
   - Readability: Simple, Medium, Complex
   - Creativity: Originality level of the prompt
   - Efficiency: Overall prompt score

### Step 4: Metrics Analysis
1. **In the bottom right panel (Metrics Panel)**, get detailed analysis:
   - **Token usage**: Distribution and optimization
   - **Readability assessment**: Detailed classification
   - **Creativity level**: Visual indicator
   - **Efficiency score**: Visual progress ring
   - **Smart recommendations**: Improvement suggestions
2. **Show/hide the panel** using the "Hide/Show Metrics" button in the header

### Advanced Usage Tips
1. **Iterate quickly**: Change parameters and see results in real-time
2. **Combine operators**: Experiment with different combinations for optimal results
3. **Use the metrics**: Adjust your prompt based on efficiency recommendations
4. **Test on different devices**: The application is fully responsive
5. **Copy and paste**: Use the generated prompt directly in your favorite LLM

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
│   │   ├── promptBuilder.js
│   │   ├── geminiService.js
│   │   └── colorClasses.js
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
├── DEPLOYMENT.md          # Deployment guide
├── SETUP.md               # Setup and configuration guide
├── QUICK_START.md         # Quick start guide for developers
├── GEMINI_LOCAL_SETUP.md  # Gemini API local setup guide
├── EXECUTABLE_GUIDE.md   # One-click startup guide
├── configure_api.sh       # API key configuration script (macOS/Linux)
├── start_app.command      # One-click startup script (macOS)
├── start_app.bat          # One-click startup script (Windows)
└── INSTALL_APP.sh         # Full installation script (macOS)
```

## 🚀 One-Click Startup

### Executable Scripts
- **`start_app.command`** (macOS) - Start the application with one click
- **`start_app.bat`** (Windows) - Start the application with one click
- **`INSTALL_APP.sh`** (macOS) - Create desktop shortcuts and dock integration

### Configuration Scripts
- **`configure_api.sh`** - Automatically configure your Gemini API key

### Usage
```bash
# Quick setup and start
./configure_api.sh
./start_app.command

# Or install for easy access
./INSTALL_APP.sh
```

See [`EXECUTABLE_GUIDE.md`](EXECUTABLE_GUIDE.md) for complete details.

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

## 📱 Improved Responsive Design

The application features a fully optimized responsive design:

### Desktop
- **3-column layout**: LLM Configuration | Preview & Metrics | Prompt Input
- **Optimal spacing**: Adaptive gap based on screen size
- **Full-width buttons**: Better user experience

### Tablet and Medium Screens
- **Smooth transition**: Layout adapts between 3 and 2 columns
- **Adjusted spacing**: Smaller gap for better space utilization
- **Compact elements**: Text and buttons adapted

### Mobile
- **Vertical layout**: All panels stacked vertically
- **Optimized header**: Logo and buttons in separate column
- **Full-width buttons**: Easier touch interaction
- **Adjusted text**: Reduced font sizes but still readable
- **Responsive footer**: Information organized in columns

### Recent Improvements
- **Breakpoint change**: From `lg:` to `xl:` for better adaptation
- **Dynamic spacing**: `gap-4 md:gap-6` for mobile and tablets
- **Responsive header**: Vertical design on mobile with `flex-col`
- **Improved footer**: Adaptable content with `flex-wrap`
- **Accessible buttons**: `w-full` on mobile for better usability

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

**Built with ❤️ using React, Tailwind CSS, Framer Motion, and Google Gemini AI**

## 📝 Recent Updates

### 🚀 One-Click Startup Scripts (Latest)
- **Executable scripts** for easy application startup:
  - `start_app.command` (macOS) - Start with one click
  - `start_app.bat` (Windows) - Start with one click
  - `INSTALL_APP.sh` (macOS) - Create desktop shortcuts and dock integration
- **Automatic API key configuration** with `configure_api.sh`
- **Complete documentation** with [`EXECUTABLE_GUIDE.md`](EXECUTABLE_GUIDE.md)
- **No more need to open editor** - just double-click and start!

### 🔒 Enhanced Security & Setup
- **Comprehensive API key management** with detailed setup guides
- **Local development** with `.env.local` (never shared)
- **Production deployment** with GitHub Secrets
- **Detailed security documentation** in [`GEMINI_LOCAL_SETUP.md`](GEMINI_LOCAL_SETUP.md)
- **Automated configuration scripts** for easy setup

### 🤖 Gemini AI Integration
- **AI-powered prompt enhancement** using Google's Gemini 2.0 Flash model
- **Manual enhancement button** for on-demand prompt improvement
- **Enhanced prompt preview** with visual indicators
- **Comprehensive error handling** and loading states
- **Secure API key management** with environment variables

### 📚 Enhanced Documentation
- **QUICK_START.md** - Quick reference for developers
- **SETUP.md** - Advanced configuration options
- **GEMINI_LOCAL_SETUP.md** - Detailed Gemini API setup
- **EXECUTABLE_GUIDE.md** - Complete one-click startup guide

### Previous Improvements

### UX and Workflow Improvements
- **Panel reordering**: New logical workflow:
  1. LLM Configurations
  2. Prompt Writing
  3. Optimized Prompt View
  4. Metrics Analysis
- **Improved responsive design**:
  - Breakpoint change from `lg:` to `xl:` for better device adaptation
  - Header and footer optimized for mobile with vertical design
  - Buttons with `w-full` on mobile for better accessibility
  - Dynamic spacing with `gap-4 md:gap-6`
- **Enhanced user experience**: Users follow a natural configuration → creation → review → analysis flow

### Previous Improvements
- **Code Readability Improvements**:
  - Added comments to `src/App.js` to enhance code readability and maintainability.
- **Deployed with GitHub Actions 🚀**
