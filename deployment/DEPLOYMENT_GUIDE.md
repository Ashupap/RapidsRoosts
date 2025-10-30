# Rapids & Roosts - Windows Development Setup Guide

This guide provides step-by-step instructions for setting up the Rapids & Roosts application on a Windows development server for testing and development purposes.

## Purpose

This is a **development environment setup** - optimized for:
- Easy testing and iteration
- Quick start/stop cycles
- Development mode features (hot reload, detailed logs)
- Local database access
- Simple configuration

For production deployment, different configurations are required.

---

## Prerequisites

### Required Software
- ✅ Windows 10/11 or Windows Server
- ✅ Node.js 20.x or higher ([Download](https://nodejs.org))
- ✅ Git for Windows ([Download](https://git-scm.com/download/win))

### Optional Tools
- PM2 Process Manager (for background process management)
- VS Code or your preferred code editor
- SQLite Browser for viewing database (optional)

---

## Development Setup

### Step 1: Initial Setup

1. **Install Node.js**
   - Download and install Node.js from https://nodejs.org
   - Verify installation:
   ```powershell
   node --version
   npm --version
   ```

2. **Clone Application**
   ```powershell
   # Choose your preferred location
   cd C:\dev
   git clone <your-repository-url> rapids-roosts
   cd rapids-roosts
   ```

### Step 2: Configure Application

1. **Install Dependencies**
   ```powershell
   npm install
   ```

2. **Set up Environment Variables**
   - Copy `.env.example` to `.env`
   - Edit the `.env` file with your development settings:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=file:./dev.db
   SESSION_SECRET=dev-secret-key-change-for-production
   GMAIL_CLIENT_ID=your-gmail-client-id
   GMAIL_CLIENT_SECRET=your-gmail-client-secret
   GMAIL_REFRESH_TOKEN=your-refresh-token
   GOOGLE_SHEET_ID=your-sheet-id
   ```

3. **Set up Database**
   ```powershell
   # SQLite database will be created automatically
   # Run migrations to create schema
   npm run db:push
   ```
   
   This will create a `dev.db` file in your project root with all the necessary tables.

### Step 3: Run the Application

**Option A: Direct Development Server (Recommended for Dev)**

```powershell
# Start the development server with hot reload
npm run dev

# Open browser at http://localhost:5000
# Server will auto-reload when you make code changes
```

**Option B: Using PM2 (For background process)**

1. **Install PM2 Globally**
   ```powershell
   npm install -g pm2
   ```

2. **Start with PM2**
   ```powershell
   # Start application in development mode
   pm2 start ecosystem.config.js --env development
   
   # Check status
   pm2 status
   
   # View logs
   pm2 logs rapids-roosts
   
   # Stop when done
   pm2 stop rapids-roosts
   ```

### Step 4: Access the Application

1. **Open Browser**
   - Navigate to `http://localhost:5000`
   - Test all features and pages

2. **Development Tools**
   - Browser DevTools for debugging
   - Check console for errors
   - Test on different browsers

---

## Development Workflow

### Daily Development

**Starting Work:**
```powershell
cd C:\dev\rapids-roosts

# Pull latest changes
git pull

# Install any new dependencies
npm install

# Start dev server
npm run dev
```

**Making Changes:**
- Edit files in your code editor
- Server auto-reloads on file changes
- Refresh browser to see updates
- Check console for errors

**Stopping Work:**
```powershell
# Press Ctrl+C to stop dev server
# Or if using PM2:
pm2 stop rapids-roosts
```

### Database Management

**View Database:**
```powershell
# Option 1: Install SQLite Browser (GUI tool)
# Download from: https://sqlitebrowser.org/

# Option 2: Use SQLite CLI
sqlite3 dev.db
# Then run SQL queries, e.g.: SELECT * FROM bookings;
```

**Reset Database:**
```powershell
# Delete the database file and recreate
rm dev.db
npm run db:push
```

**Backup Database (Optional):**
```powershell
# Simply copy the database file
copy dev.db dev_backup.db
```

### Troubleshooting

**Application won't start:**
- Check error messages in console
- Verify database connection in `.env`
- Check Node.js version: `node --version`
- Try `npm install` again

**Port already in use:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000
# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

**Database connection errors:**
- Verify DATABASE_URL in `.env` is set to `file:./dev.db`
- Check if `dev.db` file exists in project root
- Try deleting `dev.db` and run `npm run db:push` again
- Check file permissions on the project directory

**Hot reload not working:**
- Check file watcher limits
- Restart dev server
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

---

## Quick Setup Script

For quick development setup, use the automated PowerShell script:

```powershell
cd C:\dev\rapids-roosts\deployment
.\dev-setup.ps1
```

This script will:
1. Check prerequisites
2. Install dependencies
3. Set up development database
4. Configure environment
5. Start the application in development mode

---

## Development Checklist

- ✅ Node.js 20.x or higher installed
- ✅ `.env` file configured with development settings
- ✅ SQLite database file created (`dev.db`)
- ✅ Database migrations run successfully
- ✅ Application starts without errors
- ✅ Can access at http://localhost:5000
- ✅ Hot reload works when editing files
- ✅ Test data can be added for development

---

## Support

For issues or questions:
1. Check application logs: `pm2 logs rapids-roosts`
2. Check Windows Event Viewer
3. Review this guide's Troubleshooting section
4. Check Node.js and PostgreSQL documentation

## Useful Commands

```powershell
# Development server
npm run dev              # Start with hot reload

# Database
npm run db:push          # Apply schema changes
sqlite3 dev.db           # Access database via CLI

# Code quality
npm run lint             # Check code quality (if configured)
npm test                 # Run tests (if configured)

# Git
git status               # Check changes
git pull                 # Update code
git add .                # Stage changes
git commit -m "message"  # Commit changes
```

---

**Development setup completed!** 🎉

Your Rapids & Roosts application is now running in development mode on Windows.

**Next Steps:**
1. Test all features thoroughly
2. Make your code changes
3. Test with real data
4. Prepare for production deployment when ready
