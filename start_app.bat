@echo off
REM Script para iniciar Prompt Master en Windows
REM Requiere que Node.js y npm estén instalados

echo 🚀 Iniciando Prompt Master...
echo ================================

REM Verificar si estamos en el directorio correcto
if not exist "package.json" (
    echo ❌ Error: No se encontró package.json
    echo Por favor, ejecuta este script desde el directorio de la aplicación
    pause
    exit /b 1
)

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: Node.js no está instalado
    echo Por favor, instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si npm está instalado
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Error: npm no está instalado
    echo Por favor, instala npm
    pause
    exit /b 1
)

REM Verificar si .env.local existe
if not exist ".env.local" (
    echo ⚠️  Advertencia: No se encontró .env.local
    echo La aplicación funcionará pero la API de Gemini no estará disponible
    echo.
)

REM Abrir el navegador automáticamente
echo 🔧 Abriendo navegador...
start http://localhost:3000/prompt-master

REM Iniciar la aplicación
echo.
echo 🚀 Iniciando servidor de desarrollo...
echo La aplicación abrirá automáticamente en tu navegador...
echo.
npm start

echo.
echo 👋 Presiona cualquier tecla para cerrar...
pause >nul