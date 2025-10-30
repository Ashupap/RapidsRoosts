# Deployment Scripts for Windows Server

This directory contains scripts and configuration files for deploying Rapids & Roosts on Windows Server.

## Files Overview

### Documentation
- **DEPLOYMENT_GUIDE.md** - Complete deployment guide with step-by-step instructions

### Configuration Files
- **ecosystem.config.js** - PM2 configuration (in project root)
- **web.config** - IIS reverse proxy configuration
- **web-iisnode.config** - IIS with iisnode configuration
- **.env.example** - Environment variables template

### Deployment Scripts
- **deploy.ps1** - Automated deployment script
- **setup-pm2-service.ps1** - PM2 Windows service setup

## Quick Start

### Automated Deployment

1. Clone the repository to `C:\websites\rapids-roosts`
2. Create `.env` file from `.env.example` and configure
3. Run as Administrator:
   ```powershell
   cd C:\websites\rapids-roosts\deployment
   .\deploy.ps1
   ```

### Manual Deployment

Follow the detailed instructions in **DEPLOYMENT_GUIDE.md**

## Prerequisites

- Windows Server 2019/2022 or Windows 10/11 Pro
- Node.js 20.x or higher
- PostgreSQL 14+
- Administrator access

## Support

For detailed instructions and troubleshooting, see **DEPLOYMENT_GUIDE.md**

## Deployment Methods

1. **PM2 + IIS Reverse Proxy** (Recommended)
   - Better performance and stability
   - Easier debugging and monitoring
   - Use `deploy.ps1` for automated setup

2. **IIS with iisnode**
   - Native IIS integration
   - Use `web-iisnode.config`
   - Good for Windows-centric teams

Choose the method that best fits your infrastructure and team expertise.
