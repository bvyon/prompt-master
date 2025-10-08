# Deployment Guide for Prompt Master

This guide will help you deploy the Prompt Master application to GitHub Pages.

## Prerequisites

1. A GitHub account
2. Node.js (v18 or higher) installed
3. Git installed

## Quick Start

### 1. GitHub Repository Setup

Your repository already exists at: https://github.com/bvyon/prompt-master

Initialize Git repository and push your code:
```bash
git init
git add .
git commit -m "Initial commit: Prompt Master"
git branch -M main
git remote add origin https://github.com/bvyon/prompt-master.git
git push -u origin main
```

### 2. Configure GitHub Pages

1. Go to your repository on GitHub: https://github.com/bvyon/prompt-master
2. Click on the "Settings" tab
3. Scroll down to the "Pages" section
4. Under "Build and deployment":
   - Source: "GitHub Actions"
   - Branch: "gh-pages"
5. Click "Save"

### 3. Deploy

The GitHub Actions workflow will automatically deploy your application when you push to the main branch.

## Manual Deployment

If you need to deploy manually:

```bash
# Install dependencies
npm install

# Build the application
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
prompt-master/
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
└── README.md              # Project documentation
```

## Build Configuration

The application uses:
- **React 18** for the UI framework
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Font Awesome** for icons
- **GitHub Actions** for automated deployment

## Environment Variables

No environment variables are required for this application.

## Customization

### Adding New Operators

1. Edit `src/operators.json` to add new operators
2. Each operator should have:
   - `operator`: The operator name (e.g., "/NEW_OPERATOR")
   - `description`: A brief description
   - `category`: The category (e.g., "format", "tone", "structure")
   - `color`: Tailwind color class (e.g., "blue", "purple", "green")

### Styling Customization

1. Modify `tailwind.config.js` to customize the color palette
2. Update `src/index.css` for custom CSS rules
3. Edit component files in `src/components/` for specific styling

### Adding New Features

1. Create new components in `src/components/`
2. Add utility functions in `src/utils/`
3. Update `src/App.js` to integrate new features

## Troubleshooting

### Build Issues

If you encounter build errors:

1. Clear the node_modules folder and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. Check for syntax errors in your components

### Deployment Issues

If deployment fails:

1. Check the GitHub Actions logs in the "Actions" tab
2. Ensure your repository is public (GitHub Pages requires this)
3. Verify the GitHub Pages settings are configured correctly

### Font Awesome Icons Not Loading

If icons don't appear:
1. Check that Font Awesome CDN is included in `public/index.html`
2. Ensure you have an internet connection

## Development

### Running in Development Mode

```bash
npm start
```

This will start the development server at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This creates a production build in the `build/` directory.

### Testing

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing issues on GitHub
3. Create a new issue with detailed information

---

**Happy Prompting! 🚀**