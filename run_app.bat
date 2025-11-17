@echo off
REM Prompt Master - Simple launcher for Windows
REM This script starts the application without needing to open Visual Studio Code

echo 🚀 Iniciando Prompt Master...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Node.js no está instalado.
    echo 📥 Descárgalo desde: https://nodejs.org/
    echo.
    echo Presiona cualquier tecla para salir...
    pause >nul
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: npm no está instalado.
    echo 📥 Descárgalo desde: https://nodejs.org/
    echo.
    echo Presiona cualquier tecla para salir...
    pause >nul
    exit /b 1
)

REM Check for .env.local file
if not exist ".env.local" (
    echo ⚠️  Advertencia: No se encontró el archivo .env.local
    echo 🔧 Para configurar tu API key de Gemini, ejecuta: configure_api.bat (si existe)
    echo.
)

echo 🎯 Iniciando servidor de desarrollo...
echo 📱 La aplicación se abrirá automáticamente en tu navegador
echo 🌐 URL: http://localhost:3000/prompt-master
echo.
echo Para detener el servidor, presiona Ctrl+C
echo.

REM Start the development server
npm start
