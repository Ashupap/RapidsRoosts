# Quick Start - Windows Development Setup

## 🚀 Fastest Way to Get Started

### Prerequisites
1. Install [Node.js 20+](https://nodejs.org)
2. Clone this repository

That's it! SQLite is included - no separate database server needed.

### One-Command Setup

```powershell
cd deployment
.\dev-setup.ps1
```

That's it! The script will:
- ✅ Check prerequisites
- ✅ Install dependencies  
- ✅ Create .env file
- ✅ Set up database
- ✅ Start development server

---

## 📝 Manual Setup (5 minutes)

### 1. Install Dependencies
```powershell
npm install
```

### 2. Configure Environment
```powershell
# Copy template
copy deployment\.env.example .env

# Edit .env and update:
# - DATABASE_URL is already set to file:./dev.db (SQLite)
# - Add your Gmail API credentials if needed
# - Other settings as needed
```

### 3. Setup Database
```powershell
# SQLite database will be created automatically
# Just run migrations to create the schema
npm run db:push
```

This creates a `dev.db` file in your project root.

### 4. Start Development Server
```powershell
npm run dev
```

### 5. Open Browser
```
http://localhost:5000
```

---

## 🔄 Daily Workflow

**Start working:**
```powershell
npm run dev
```

**The server will:**
- Auto-reload when you change code
- Show errors in the console
- Run on port 5000

**Stop working:**
- Press `Ctrl+C`

---

## 🛠️ Common Tasks

### Update Database Schema
```powershell
npm run db:push
```

### View Database
```powershell
# Option 1: GUI tool (recommended)
# Download SQLite Browser: https://sqlitebrowser.org/

# Option 2: CLI
sqlite3 dev.db
# Then: SELECT * FROM bookings;
```

### Update Dependencies
```powershell
npm install
```

### Get Latest Code
```powershell
git pull
npm install
```

---

## ⚠️ Troubleshooting

### Port 5000 Already in Use
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill that process (replace PID)
taskkill /PID <PID> /F
```

### Database Connection Error
- Verify `.env` has `DATABASE_URL=file:./dev.db`
- Check if `dev.db` exists
- Try deleting `dev.db` and run `npm run db:push` again
- Check folder write permissions

### Can't Install Dependencies
```powershell
# Clear cache and reinstall
rm -rf node_modules
npm cache clean --force
npm install
```

---

## 📚 Need More Help?

See **DEPLOYMENT_GUIDE.md** for detailed instructions and advanced configuration.

---

---

## 🚀 Production Deployment

For production, see **PRODUCTION_NOTES.md** for:
- Production environment setup
- SQLite backup strategies
- Security best practices
- Monitoring and maintenance

**Quick Production Setup:**
1. Use `production.db` instead of `dev.db`
2. Set `NODE_ENV=production`
3. Generate strong `SESSION_SECRET`
4. Set up automated daily backups
5. Use PM2 in production mode

**Happy coding!** 🎉
