#!/bin/bash

# Instalador de Prompt Master - Crea accesos directos para iniciar la aplicación fácilmente

echo "📦 Instalador de Prompt Master"
echo "=============================="

# Directorio de instalación
INSTALL_DIR="$HOME/Applications/Prompt Master"
DESKTOP_DIR="$HOME/Desktop"

echo "📁 Creando directorio de instalación en: $INSTALL_DIR"
mkdir -p "$INSTALL_DIR"

# Copiar archivos de la aplicación
echo "📋 Copiando archivos de la aplicación..."
cp -r . "$INSTALL_DIR/" 2>/dev/null || {
    echo "❌ Error: No se pudieron copiar los archivos"
    echo "Asegúrate de ejecutar este script desde el directorio de la aplicación"
    read -p "Presiona Enter para salir..."
    exit 1
}

# Crear accesos directos
echo "🔗 Creando accesos directos..."

# Acceso directo para macOS
cat > "$DESKTOP_DIR/Prompt Master.command" << 'EOF'
#!/bin/bash
# Acceso directo para Prompt Master

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/Prompt Master"

echo "🚀 Iniciando Prompt Master..."
echo "================================"

# Verificar dependencias
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo "Por favor, instala Node.js desde https://nodejs.org/"
    read -p "Presiona Enter para salir..."
    exit 1
fi

# Abrir navegador
if command -v open &> /dev/null; then
    sleep 2 && open "http://localhost:3000/prompt-master" &
fi

# Iniciar aplicación
npm start

echo ""
echo "👋 Presiona Enter para cerrar..."
read
EOF

# Hacer ejecutable
chmod +x "$DESKTOP_DIR/Prompt Master.command"

# Crear acceso directo en el dock (opcional)
echo "🎯 ¿Quieres agregar Prompt Master a tu Dock? (s/n):"
read -r add_to_dock
if [[ $add_to_dock =~ ^[sS]$ ]]; then
    # Agregar al dock
    defaults write com.apple.dock persistent-apps -array-add "<dict><key>tile-data</key><dict><key>file-data</key><dict><key>_CFURLString</key><string>$DESKTOP_DIR/Prompt Master.command</string><key>_CFURLStringType</key><integer>0</integer></dict></dict></dict>"
    echo "🔄 Reiniciando Dock..."
    killall Dock
fi

echo ""
echo "✅ ¡Instalación completada!"
echo ""
echo "📍 Accesos directos creados:"
echo "   - Escritorio: Prompt Master.command"
echo "   - Directorio: $INSTALL_DIR"
echo ""
echo "🚀 Para iniciar la aplicación:"
echo "   1. Haz doble clic en 'Prompt Master.command' en tu escritorio"
echo "   2. o abre Terminal y ejecuta: $INSTALL_DIR/start_app.command"
echo ""
echo "🌐 La aplicación se abrirá en: http://localhost:3000/prompt-master"
echo ""
echo "📝 Nota: Asegúrate de tener tu API key configurada en .env.local"
echo ""
read -p "Presiona Enter para salir..."