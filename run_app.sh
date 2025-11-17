#!/bin/bash

# Prompt Master - Simple launcher script
# This script starts the application without needing to open Visual Studio Code

echo "🚀 Iniciando Prompt Master..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado."
    echo "📥 Descárgalo desde: https://nodejs.org/"
    echo ""
    echo "Presiona Enter para salir..."
    read
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm no está instalado."
    echo "📥 Descárgalo desde: https://nodejs.org/"
    echo ""
    echo "Presiona Enter para salir..."
    read
    exit 1
fi

# Check for .env.local file
if [ ! -f ".env.local" ]; then
    echo "⚠️  Advertencia: No se encontró el archivo .env.local"
    echo "🔧 Para configurar tu API key de Gemini, ejecuta: ./configure_api.sh"
    echo ""
fi

echo "🎯 Iniciando servidor de desarrollo..."
echo "📱 La aplicación se abrirá automáticamente en tu navegador"
echo "🌐 URL: http://localhost:3000/prompt-master"
echo ""
echo "Para detener el servidor, presiona Ctrl+C"
echo ""

# Start the development server
npm start
