# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2025-12-27

### Fixed
- ✅ **AnimatePresence import error**: Standardized all framer-motion imports across the codebase to prevent bundling conflicts
- ✅ **Consistent import patterns**: Changed from mixed import styles to unified wildcard imports for better bundle optimization

### Technical
- 🔧 **Import standardization**: All components now use `import * as framerMotion from 'framer-motion'` pattern
- 🔧 **Bundle optimization**: Eliminated duplicate framer-motion imports that were causing runtime errors
- 🔧 **Code consistency**: Unified import style across 6 components (App.js, Toast.js, LLMConfigurationPanel.js, PromptInputPanel.js, PromptPreviewPanel.js, MetricsPanel.js)

## [Unreleased]

## [1.0.1] - 2025-10-30

### Changed
- 🔧 **Complete Gemini model upgrade**: Replaced all references from Gemini 2.0 to Gemini 2.5 Flash across the entire codebase
- 🔧 **Updated API endpoints**: Both primary and fallback URLs now use gemini-2.5-flash
- 🔧 **Updated documentation**: All configuration files and README reflect the new model
- 🔧 **Enhanced security**: Updated API key configuration scripts to use the new model

### Fixed
- ✅ **Enhanced error handling** and response parsing
- ✅ **Improved code organization** with extracted utility functions

## [1.0.0] - 2025-10-29

### Added
- ✅ **Initial Gemini 2.5 Flash integration** for better performance and cost efficiency
- ✅ **AI-powered prompt enhancement** using Google's Gemini 2.5 Flash model
- ✅ **Manual enhancement button** for on-demand prompt improvement
- ✅ **Enhanced prompt preview** with visual indicators
- ✅ **Comprehensive error handling** and loading states
- ✅ **Secure API key management** with environment variables
- ✅ **One-click startup scripts** for macOS and Windows
- ✅ **Automatic API key configuration** with `configure_api.sh`
- ✅ **Complete documentation** with setup guides and deployment instructions

### Changed
- 🚀 **Upgraded from Gemini 2.0 Pro to Gemini 2.5 Flash** for better performance and cost efficiency
- 🚀 **Optimized API configuration** with proper fallback handling
- 📱 **Improved responsive design** with better mobile adaptation
- 🎨 **Enhanced user interface** with better color scheme and animations

### Technical
- 🛠️ **React 18** with modern hooks and patterns
- 🎨 **Tailwind CSS** for responsive styling
- 🎭 **Framer Motion** for smooth animations
- 🔧 **GitHub Actions** for automated deployment
- 📚 **Comprehensive documentation** with multiple guides
