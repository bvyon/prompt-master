# Guía Rápida de Inicio - Prompt Master

## 🚀 Inicio Rápido para Futuras Sesiones

### 1. Abrir el Proyecto
- Abre Visual Studio Code
- Selecciona "Open Folder"
- Navega a: `/Users/bastianyon/Documents/prompt web/prompt-master`
- Haz clic en "Open"

### 2. Iniciar la Aplicación
Abre una terminal en VS Code (Terminal → New Terminal) y ejecuta:

```bash
cd prompt-master
npm start
```

**Nota:** Si ya estás en el directorio `prompt-master`, solo necesitas:
```bash
npm start
```

### 3. Acceder a la Aplicación
La aplicación se abrirá automáticamente en:
- `http://localhost:3000/prompt-master`

Si no se abre automáticamente, copia y pega esa URL en tu navegador.

## 📁 Estructura de Directorios Importantes

```
prompt-master/
├── src/                    # Código fuente de la aplicación
│   ├── components/         # Componentes React
│   ├── utils/             # Utilidades y servicios
│   └── operators.json     # Definición de operadores
├── public/                # Archivos estáticos
├── .env                   # Configuración de variables de entorno (NO subir a GitHub)
├── package.json           # Dependencias y scripts
└── QUICK_START.md         # Este archivo
```

## 🔧 Comandos Útiles

```bash
# Iniciar la aplicación en modo desarrollo
npm start

# Crear build para producción
npm run build

# Instalar dependencias (si las necesitas)
npm install

# Ver estado de Git
git status

# Subir cambios a GitHub
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

## ⚠️ Archivos Importantes

- **`.env`**: Contiene tu API key de Gemini. **¡No lo compartas ni subas a GitHub!**
- **`src/utils/geminiService.js`**: Servicio para integración con Gemini AI
- **`src/utils/colorClasses.js`**: Clases de color para los operadores

## 🎯 Próximos Pasos

1. **Configura tu API key** en el archivo `.env` (si aún no lo has hecho)
2. **Prueba la aplicación** en tu navegador
3. **Experimenta con los operadores** y la configuración de LLM

## 📚 Documentación Adicional

- Ver `SETUP.md` para configuración avanzada
- Ver `README.md` para detalles completos del proyecto
- Ver `DEPLOYMENT.md` para instrucciones de despliegue

---
**¡Listo para empezar!** 🚀