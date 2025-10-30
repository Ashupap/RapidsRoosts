# Rapids & Roosts - Windows Server Deployment Guide

This guide provides step-by-step instructions for deploying the Rapids & Roosts application on Windows Server.

## Deployment Methods

We provide two deployment approaches:
1. **PM2 + IIS Reverse Proxy** (Recommended) - Better for Node.js developers
2. **IIS with iisnode** (Alternative) - Better for Windows-centric teams

---

## Prerequisites

### Required Software
- ✅ Windows Server 2019/2022 or Windows 10/11 Pro
- ✅ Node.js 20.x or higher ([Download](https://nodejs.org))
- ✅ PostgreSQL 14+ ([Download](https://www.postgresql.org/download/windows/))
- ✅ Git for Windows ([Download](https://git-scm.com/download/win))

### For PM2 Method
- PM2 Process Manager (installed via npm)
- IIS with URL Rewrite and Application Request Routing modules

### For IIS Method
- IIS with iisnode module
- URL Rewrite Module

---

## Method 1: PM2 + IIS Reverse Proxy (Recommended)

### Step 1: Initial Setup

1. **Install Node.js**
   - Download and install Node.js from https://nodejs.org
   - Verify installation:
   ```powershell
   node --version
   npm --version
   ```

2. **Install PostgreSQL**
   - Download and install PostgreSQL
   - Note the database credentials during installation

3. **Clone Application**
   ```powershell
   cd C:\
   mkdir websites
   cd websites
   git clone <your-repository-url> rapids-roosts
   cd rapids-roosts
   ```

### Step 2: Configure Application

1. **Install Dependencies**
   ```powershell
   npm install
   ```

2. **Set up Environment Variables**
   - Copy `.env.example` to `.env` (if available)
   - Edit the `.env` file with your production settings:
   ```env
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=postgresql://username:password@localhost:5432/rapids_roosts
   SESSION_SECRET=your-secure-random-secret-here
   GMAIL_CLIENT_ID=your-gmail-client-id
   GMAIL_CLIENT_SECRET=your-gmail-client-secret
   GMAIL_REFRESH_TOKEN=your-refresh-token
   GOOGLE_SHEET_ID=your-sheet-id
   ```

3. **Set up Database**
   ```powershell
   # Create database
   psql -U postgres -c "CREATE DATABASE rapids_roosts;"
   
   # Run migrations
   npm run db:push
   ```

4. **Build Frontend**
   ```powershell
   npm run build
   ```

### Step 3: Install and Configure PM2

1. **Install PM2 Globally**
   ```powershell
   npm install -g pm2
   ```

2. **Test Application Locally**
   ```powershell
   # Start the application
   npm run start
   
   # Open browser and test at http://localhost:3000
   ```

3. **Start with PM2**
   ```powershell
   # Navigate to project directory
   cd C:\websites\rapids-roosts
   
   # Start application with PM2
   pm2 start ecosystem.config.js --env production
   
   # Check status
   pm2 status
   
   # View logs
   pm2 logs rapids-roosts
   
   # Save PM2 process list
   pm2 save
   ```

### Step 4: Configure PM2 as Windows Service

Run the automated setup script:
```powershell
# Run as Administrator
cd C:\websites\rapids-roosts\deployment
.\setup-pm2-service.ps1
```

Or manually:
1. **Install pm2-windows-service**
   ```powershell
   npm install -g pm2-windows-service
   ```

2. **Create PM2 Home Directory**
   ```powershell
   mkdir C:\pm2
   setx PM2_HOME "C:\pm2" /M
   ```
   Restart PowerShell after this.

3. **Install Service**
   ```powershell
   pm2-service-install -n PM2
   ```

4. **Verify Service**
   - Press `Win + R`, type `services.msc`
   - Find "PM2" service
   - Ensure it's "Running" and set to "Automatic"

### Step 5: Configure IIS Reverse Proxy

1. **Install Required IIS Modules**
   - URL Rewrite Module: https://www.iis.net/downloads/microsoft/url-rewrite
   - Application Request Routing: https://www.iis.net/downloads/microsoft/application-request-routing

2. **Enable Proxy in ARR**
   - Open IIS Manager (`Win + R` → `inetmgr`)
   - Click on server name
   - Double-click "Application Request Routing Cache"
   - Click "Server Proxy Settings" in right panel
   - Check "Enable proxy"
   - Click "Apply"

3. **Create IIS Website**
   - In IIS Manager, right-click "Sites" → "Add Website"
   - Site name: `rapids-roosts`
   - Physical path: `C:\inetpub\wwwroot\rapids-roosts-proxy` (create this folder)
   - Binding: HTTP, Port 80, Host name: `your-domain.com`
   - Click "OK"

4. **Configure Reverse Proxy**
   - Copy `deployment/web.config` to `C:\inetpub\wwwroot\rapids-roosts-proxy\web.config`
   - Or configure manually:
     - Select your site in IIS Manager
     - Double-click "URL Rewrite"
     - Click "Add Rule(s)..." → "Reverse Proxy"
     - Enter: `localhost:3000`
     - Click "OK"

5. **Test**
   - Open browser and navigate to `http://your-domain.com`
   - Application should load

### Step 6: Configure SSL (HTTPS)

1. **Obtain SSL Certificate**
   - Use Let's Encrypt with win-acme or
   - Purchase from certificate authority

2. **Bind Certificate in IIS**
   - In IIS Manager, right-click your site → "Edit Bindings"
   - Click "Add"
   - Type: HTTPS, Port: 443
   - Select your SSL certificate
   - Click "OK"

3. **Force HTTPS Redirect**
   - Update `web.config` to add HTTPS redirect rule (already included in provided config)

---

## Method 2: IIS with iisnode

### Prerequisites
- Install iisnode from https://github.com/tjanczuk/iisnode/releases
- Install URL Rewrite Module

### Steps

1. **Follow Steps 1-2 from Method 1** (Initial Setup and Configuration)

2. **Modify server/index.ts**
   - Ensure server listens on `process.env.PORT || 3000`
   - Already configured in your app

3. **Copy Application to IIS Directory**
   ```powershell
   xcopy /E /I C:\websites\rapids-roosts C:\inetpub\wwwroot\rapids-roosts
   ```

4. **Create IIS Website**
   - In IIS Manager, right-click "Sites" → "Add Website"
   - Site name: `rapids-roosts`
   - Physical path: `C:\inetpub\wwwroot\rapids-roosts`
   - Binding: HTTP, Port 80
   - Click "OK"

5. **Copy web.config for iisnode**
   ```powershell
   copy C:\inetpub\wwwroot\rapids-roosts\deployment\web-iisnode.config C:\inetpub\wwwroot\rapids-roosts\web.config
   ```

6. **Test Application**
   - Navigate to `http://localhost`

---

## Post-Deployment

### Monitoring

**PM2 Monitoring:**
```powershell
pm2 monit          # Real-time monitoring
pm2 logs           # View logs
pm2 status         # Check status
```

**Windows Event Viewer:**
- Check Application logs for errors
- Check PM2 service logs

### Maintenance

**Update Application:**
```powershell
cd C:\websites\rapids-roosts
git pull
npm install
npm run build
pm2 restart rapids-roosts
```

**Database Backup:**
```powershell
pg_dump -U postgres rapids_roosts > backup_$(Get-Date -Format "yyyyMMdd_HHmmss").sql
```

**View Application Logs:**
```powershell
pm2 logs rapids-roosts --lines 100
```

### Troubleshooting

**Application won't start:**
- Check PM2 logs: `pm2 logs`
- Verify database connection in `.env`
- Check Node.js version: `node --version`

**Can't access via domain:**
- Verify IIS bindings
- Check Windows Firewall (open ports 80, 443)
- Verify DNS settings

**Database connection errors:**
- Check PostgreSQL is running: `services.msc`
- Verify DATABASE_URL in `.env`
- Test connection: `psql -U postgres rapids_roosts`

**PM2 doesn't restart after reboot:**
- Check PM2 service status: `services.msc`
- Verify PM2_HOME environment variable: `echo $env:PM2_HOME`
- Reinstall service: `pm2-service-install -n PM2`

---

## Automated Deployment Script

For quick deployment, use the automated PowerShell script:

```powershell
# Run as Administrator
cd C:\websites\rapids-roosts\deployment
.\deploy.ps1
```

This script will:
1. Install dependencies
2. Build frontend
3. Set up database
4. Configure PM2
5. Start the application

---

## Security Checklist

- ✅ Change SESSION_SECRET to a strong random value
- ✅ Use environment variables for sensitive data
- ✅ Enable Windows Firewall
- ✅ Keep Windows Server updated
- ✅ Use HTTPS with valid SSL certificate
- ✅ Regularly backup database
- ✅ Set up proper file permissions
- ✅ Monitor application logs
- ✅ Keep Node.js and dependencies updated
- ✅ Disable directory browsing in IIS

---

## Support

For issues or questions:
1. Check application logs: `pm2 logs rapids-roosts`
2. Check Windows Event Viewer
3. Review this guide's Troubleshooting section
4. Check Node.js and PostgreSQL documentation

---

**Deployment completed successfully!** 🎉

Your Rapids & Roosts application should now be running on your Windows Server.
