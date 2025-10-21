#!/bin/bash

# Script para iniciar Prompt Master con un solo clic
# Requiere que Node.js y npm estén instalados

echo "🚀 Iniciando Prompt Master..."
echo "================================"

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json"
    echo "Por favor, ejecuta este script desde el directorio de la aplicación"
    read -p "Presiona Enter para salir..."
    exit 1
fi

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo "Por favor, instala Node.js desde https://nodejs.org/"
    read -p "Presiona Enter para salir..."
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm no está instalado"
    echo "Por favor, instala npm"
    read -p "Presiona Enter para salir..."
    exit 1
fi

# Verificar si .env.local existe y tiene la API key
if [ ! -f ".env.local" ]; then
    echo "⚠️  Advertencia: No se encontró .env.local"
    echo "La aplicación funcionará pero la API de Gemini no estará disponible"
    echo ""
fi

# Iniciar la aplicación
echo "🔧 Iniciando servidor de desarrollo..."
echo "La aplicación abrirá automáticamente en tu navegador..."
echo ""

# Abrir el navegador automáticamente
if command -v open &> /dev/null; then
    sleep 2 && open "http://localhost:3000/prompt-master" &
elif command -v xdg-open &> /dev/null; then
    sleep 2 && xdg-open "http://localhost:3000/prompt-master" &
fi

# Iniciar la aplicación
npm start

# Esperar a que el usuario presione Enter para cerrar
echo ""
echo "👋 Presiona Enter para cerrar..."
read