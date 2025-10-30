# Development Setup for Windows

This directory contains scripts and configuration files for setting up Rapids & Roosts on Windows for development purposes.

## Files Overview

### Documentation
- **DEPLOYMENT_GUIDE.md** - Complete development setup guide with step-by-step instructions

### Configuration Files
- **ecosystem.config.js** - PM2 configuration for development (in project root)
- **.env.example** - Environment variables template for development
- **web.config** - IIS configuration (for advanced setups only)
- **web-iisnode.config** - IIS with iisnode configuration (for advanced setups only)

### Setup Scripts
- **dev-setup.ps1** - Automated development environment setup (Recommended)
- **deploy.ps1** - Alternative deployment script
- **setup-pm2-service.ps1** - PM2 Windows service setup (optional)

## Quick Start

### Automated Setup (Recommended)

1. Clone the repository to your preferred location:
   ```powershell
   cd C:\dev
   git clone <your-repository-url> rapids-roosts
   cd rapids-roosts
   ```

2. Run the automated setup script:
   ```powershell
   cd deployment
   .\dev-setup.ps1
   ```

3. The script will guide you through the setup process and start the development server.

### Manual Setup

If you prefer manual setup, follow the detailed instructions in **DEPLOYMENT_GUIDE.md**

## Prerequisites

- Windows 10/11 or Windows Server
- Node.js 20.x or higher ([Download](https://nodejs.org))
- Git for Windows ([Download](https://git-scm.com))

**Note:** Uses SQLite database - no separate database server required!

## Development Workflow

**Start development server:**
```powershell
npm run dev
```

**Access the application:**
- Open browser to `http://localhost:5000`
- Server will auto-reload when you make code changes

**Stop development server:**
- Press `Ctrl+C` in the terminal

## Common Commands

```powershell
npm run dev              # Start development server with hot reload
npm run db:push          # Update database schema  
sqlite3 dev.db           # Access SQLite database
npm install              # Install/update dependencies
git pull                 # Get latest code changes
```

## Support

For detailed instructions and troubleshooting, see **DEPLOYMENT_GUIDE.md**

## Note on Production

This setup is optimized for **development only**. For production deployment:
- Use different environment variables (NODE_ENV=production)
- Set up proper security (strong SESSION_SECRET, HTTPS)
- Configure proper process management (PM2 cluster mode)
- Set up monitoring and logging
- Consider PostgreSQL or another production-grade database instead of SQLite
