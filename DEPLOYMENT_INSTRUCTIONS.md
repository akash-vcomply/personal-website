# 🚀 Deployment and Development Instructions

## Table of Contents
- [Local Development](#local-development)
- [Making Changes](#making-changes)
- [Deployment Process](#deployment-process)
- [Common Scenarios](#common-scenarios)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## 🖥️ Local Development

### Starting Development Server
```bash
npm start
```
- This will run the app in development mode
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser
- The page will reload when you make changes
- You may also see any lint errors in the console

## 📝 Making Changes

### 1. Basic Workflow
```bash
# Start local development server
npm start

# Make your changes and test them locally
# When satisfied, proceed with git commands

# Check what files you changed
git status

# Add all changed files to staging
git add .

# Commit your changes with a descriptive message
git commit -m "Description of your changes"

# Push to GitHub
git push origin main
```

### 2. Deployment After Changes
```bash
# Deploy to GitHub Pages
npm run deploy
```
⚠️ **Important**: Changes will not appear on the live site until you run `npm run deploy`

## 🌐 Deployment Process

### Full Deployment Steps
1. Make sure all changes are committed to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

3. Wait 2-5 minutes for changes to be reflected on:
   - https://akash-vcomply.github.io/personal-website/

## 📋 Common Scenarios

### 1. Updating Content
```bash
# 1. Edit files
# 2. Test locally with npm start
# 3. Commit changes
git add .
git commit -m "Updated content in About section"
git push origin main
# 4. Deploy
npm run deploy
```

### 2. Adding New Features
```bash
# 1. Create/edit components
# 2. Test thoroughly with npm start
# 3. Commit changes
git add .
git commit -m "Added new portfolio section"
git push origin main
# 4. Deploy
npm run deploy
```

### 3. Styling Changes
```bash
# 1. Edit CSS/styles
# 2. Test responsiveness locally
# 3. Commit changes
git add .
git commit -m "Updated styling for mobile view"
git push origin main
# 4. Deploy
npm run deploy
```

## 🔧 Troubleshooting

### Deployment Failed
```bash
# Clear the build folder
rm -rf build

# Rebuild and deploy
npm run deploy
```

### Common Issues
1. **Build Errors**
   - Check console for error messages
   - Make sure all dependencies are installed: `npm install`
   - Clear npm cache: `npm cache clean --force`

2. **Deployment Not Updating**
   - Wait at least 5 minutes
   - Check GitHub repository settings
   - Verify gh-pages branch exists

3. **Local Development Issues**
   - Clear node_modules: `rm -rf node_modules`
   - Reinstall dependencies: `npm install`
   - Start fresh: `npm start`

## ✨ Best Practices

### 1. Code Management
- Make meaningful commit messages
- Test thoroughly before deploying
- Keep dependencies updated: `npm update`

### 2. Testing
- Always test locally first
- Check mobile responsiveness
- Verify all interactive features
- Test in different browsers

### 3. Performance
- Optimize images before adding
- Keep bundle size in check
- Monitor console for warnings/errors

## 📱 Quick Reference Commands

```bash
# Development
npm start                  # Start local development
git status                # Check changed files
git add .                 # Stage changes
git commit -m "message"   # Commit changes
git push origin main      # Push to GitHub

# Deployment
npm run deploy            # Deploy to GitHub Pages
```

## 🔄 Regular Maintenance

### Monthly Tasks
1. Update dependencies:
   ```bash
   npm update
   ```

2. Check for security vulnerabilities:
   ```bash
   npm audit
   ```

3. Clean up unnecessary files:
   ```bash
   # Remove build directory
   rm -rf build
   # Remove node_modules
   rm -rf node_modules
   # Reinstall dependencies
   npm install
   ```

---

📝 **Note**: Keep this file updated with any new procedures or troubleshooting steps you discover along the way.
