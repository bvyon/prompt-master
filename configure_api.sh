#!/bin/bash

# Script para configurar la API key de Gemini localmente

echo "🔧 Configuración de API Key de Gemini"
echo "===================================="

# Preguntar por la API key
read -p "Ingresa tu API key de Gemini (obtenida desde https://makersuite.google.com/app/apikey): " api_key

if [ -z "$api_key" ]; then
    echo "❌ Error: La API key no puede estar vacía"
    exit 1
fi

# Validar formato básico de API key (debe empezar con "AIza" o similar)
if [[ ! $api_key =~ ^AIza ]]; then
    echo "⚠️  Advertencia: La API key no parece tener el formato correcto (debe empezar con 'AIza')"
    read -p "¿Quieres continuar igualmente? (s/n): " confirm
    if [[ $confirm != [sS] ]]; then
        exit 1
    fi
fi

# Actualizar el archivo .env.local
sed -i '' "s/REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here/REACT_APP_GEMINI_API_KEY=$api_key/" .env.local

echo "✅ API key configurada exitosamente en .env.local"
echo ""
echo "🚀 Ahora puedes iniciar la aplicación con:"
echo "   npm start"
echo ""
echo "📝 La aplicación estará disponible en:"
echo "   http://localhost:3000/prompt-master"
echo ""
echo "💡 Recuerda: tu API key solo existe en tu computadora local y no se sube a GitHub"