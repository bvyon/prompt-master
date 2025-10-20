# API Key Security Guide

## 🔒 Protecting Your Gemini API Key

This guide explains how to keep your Gemini API key secure when deploying to GitHub.

## 🚨 Current Security Status

**Your API key is currently exposed** in the `.env` file, which gets committed to Git. This means anyone with access to your repository can see and use your API key.

## 🔧 Immediate Solutions

### Option 1: Remove .env from Git (Recommended for Development)

1. **Add .env to .gitignore** (if not already there):
   ```bash
   echo ".env" >> .gitignore
   ```

2. **Remove the existing .env from Git**:
   ```bash
   git rm --cached .env
   ```

3. **Add .env to .gitignore** properly:
   ```bash
   echo "" >> .gitignore
   echo "# Environment variables" >> .gitignore
   echo ".env" >> .gitignore
   echo ".env.local" >> .gitignore
   echo ".env.development.local" >> .gitignore
   echo ".env.test.local" >> .gitignore
   echo ".env.production.local" >> .gitignore
   ```

4. **Commit the changes**:
   ```bash
   git add .gitignore
   git commit -m "Add .env to .gitignore for security"
   ```

### Option 2: Use Environment Variables in Production

For deployment (GitHub Pages, Vercel, etc.), set environment variables through the platform's dashboard:

- **GitHub Pages**: Not directly supported for environment variables
- **Vercel**: Settings → Environment Variables
- **Netlify**: Site Settings → Build & Deploy → Environment Variables
- **Render**: Service → Environment

### Option 3: Use a Backend Proxy (Most Secure)

Create a simple backend service that proxies API calls:

1. **Create a Node.js/Express server** that handles Gemini API calls
2. **Store the API key** securely on the server
3. **Frontend calls your server** instead of Gemini directly
4. **Your server forwards** the request to Gemini

## 📁 Updated .gitignore Template

Add this to your `.gitignore` file:

```
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
build/
dist/

# Dependencies
node_modules/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# IDEs and editors
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
```

## 🔐 Best Practices

### For Development
1. **Never commit API keys** to version control
2. **Use environment variables** in your local development
3. **Document setup requirements** for other developers
4. **Create a .env.example** file with placeholder values

### For Production
1. **Use platform environment variables** when possible
2. **Implement rate limiting** on your API calls
3. **Monitor API usage** for suspicious activity
4. **Consider using API key rotation** for production

### Example .env.example

Create this file to show others what environment variables they need:

```bash
# Gemini API Configuration
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
REACT_APP_GEMINI_MODEL=gemini-2.0-flash-exp
```

## 🚀 Deployment Considerations

### GitHub Pages Limitations
- **No environment variables** support
- **Static site only** - no server-side code
- **API keys must be handled client-side** (not recommended)

### Alternative Deployment Platforms
Consider platforms that support environment variables:
- **Vercel** (Free tier available)
- **Netlify** (Free tier available)
- **Render** (Free tier available)
- **AWS Amplify** (Free tier available)

## 🛡️ Additional Security Measures

### API Key Restrictions
1. **Set usage limits** in Google AI Studio
2. **Restrict to specific domains** (if using a backend)
3. **Enable API key restrictions** for your app's domain

### Monitoring
1. **Monitor API usage** through Google Cloud Console
2. **Set up alerts** for unusual usage patterns
3. **Regularly audit** API key usage

## 📋 Summary

1. **Immediate action**: Remove `.env` from Git using `.gitignore`
2. **Development**: Use local environment variables
3. **Production**: Use platform environment variables or backend proxy
4. **Security**: Never expose API keys in client-side code for production

This approach keeps your API key secure while maintaining development flexibility.