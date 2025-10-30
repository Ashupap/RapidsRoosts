# Quick Start - Windows Development Setup

## 🚀 Fastest Way to Get Started

### Prerequisites
1. Install [Node.js 20+](https://nodejs.org)
2. Install [PostgreSQL 14+](https://www.postgresql.org/download/windows/)
3. Clone this repository

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
# - DATABASE_URL with your PostgreSQL password
# - Other settings as needed
```

### 3. Setup Database
```powershell
# Create database
psql -U postgres -c "CREATE DATABASE rapids_roosts_dev;"

# Run migrations
npm run db:push
```

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
psql -U postgres rapids_roosts_dev
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
- Check PostgreSQL is running: `services.msc`
- Verify password in `.env`
- Try: `psql -U postgres`

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

**Happy coding!** 🎉
