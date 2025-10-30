# Production Deployment Notes - SQLite Edition

## Overview
Rapids & Roosts uses **SQLite** as the database for both development and production environments. This simplifies deployment and eliminates the need for a separate database server.

## SQLite for Production

### Why SQLite?
- ✅ **Zero configuration** - No database server to install or manage
- ✅ **File-based** - Easy backups (just copy the file)
- ✅ **Reliable** - Used by millions of applications worldwide
- ✅ **Fast** - Excellent performance for read-heavy workloads
- ✅ **Portable** - Single file contains entire database
- ✅ **No network overhead** - Direct file access

### Limitations to Consider
- ⚠️ **Single writer** - Only one process can write at a time (fine for most tourism sites)
- ⚠️ **File-based** - Not suitable for distributed deployments
- ⚠️ **Backup strategy** - Must be implemented separately (file copy)

### Best Practices for Production

**1. Use Separate Database Files**
```env
# Development
DATABASE_URL=file:./dev.db

# Production
DATABASE_URL=file:./production.db
```

**2. Implement Regular Backups**
```powershell
# Windows scheduled task (runs daily at 2 AM)
$backupPath = "C:\backups\rapids-roosts"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
Copy-Item "C:\websites\rapids-roosts\production.db" "$backupPath\production_$timestamp.db"

# Keep only last 30 days of backups
Get-ChildItem $backupPath -Filter "production_*.db" | 
    Where-Object {$_.LastWriteTime -lt (Get-Date).AddDays(-30)} | 
    Remove-Item
```

**3. Database File Location**
- Store in application directory
- Ensure proper file permissions (read/write for application user)
- Keep on fast storage (SSD recommended)

**4. Performance Optimization**
```sql
-- Run these pragmas at application startup
PRAGMA journal_mode=WAL;  -- Better concurrent access
PRAGMA synchronous=NORMAL; -- Balanced durability/performance
PRAGMA cache_size=-64000;  -- 64MB cache
PRAGMA temp_store=MEMORY;  -- Use RAM for temp tables
```

## Production Setup Checklist

### Environment Configuration
- [ ] Create `production.db` database file
- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Generate strong `SESSION_SECRET`
- [ ] Configure Gmail API credentials
- [ ] Set production domain in `DOMAIN` variable

### Security
- [ ] Use HTTPS (SSL/TLS certificate)
- [ ] Strong session secret (32+ random characters)
- [ ] Secure file permissions on `production.db`
- [ ] Enable firewall rules
- [ ] Regular security updates

### Backup Strategy
- [ ] Daily automated backups
- [ ] Off-site backup storage
- [ ] Test restore procedure
- [ ] Keep 30-day backup history
- [ ] Document backup/restore process

### Monitoring
- [ ] Application logs (`logs/out.log`, `logs/err.log`)
- [ ] Database file size monitoring
- [ ] Disk space alerts
- [ ] Uptime monitoring
- [ ] Error tracking

### Process Management
- [ ] Use PM2 for process management
- [ ] Configure PM2 to restart on crashes
- [ ] Set up PM2 as Windows service (optional)
- [ ] Monitor memory usage
- [ ] Configure log rotation

## Production Deployment Steps

### 1. Prepare Production Server
```powershell
# Install Node.js 20+
# Install PM2 globally
npm install -g pm2

# Create application directory
mkdir C:\websites\rapids-roosts
cd C:\websites\rapids-roosts
```

### 2. Deploy Application
```powershell
# Clone or copy application files
git clone <your-repo> .

# Install dependencies (production only)
npm install --production

# Or copy built files from development
```

### 3. Configure Environment
```powershell
# Create production .env file
copy deployment\.env.production.example .env

# Edit .env with production settings
notepad .env
```

### 4. Initialize Database
```powershell
# Create production database
npm run db:push

# This creates production.db with all tables
```

### 5. Start Application
```powershell
# Using PM2 (recommended)
pm2 start ecosystem.config.js --env production

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot (optional)
pm2 startup
```

### 6. Set Up Backups
```powershell
# Create backup directory
mkdir C:\backups\rapids-roosts

# Set up scheduled task for daily backups
# Use Windows Task Scheduler or create PowerShell script
```

## Database Backup & Restore

### Manual Backup
```powershell
# Stop application
pm2 stop rapids-roosts

# Copy database file
copy production.db "C:\backups\rapids-roosts\production_$(Get-Date -Format 'yyyyMMdd_HHmmss').db"

# Start application
pm2 start rapids-roosts
```

### Automated Backup Script
Save as `backup-database.ps1`:
```powershell
# Configuration
$appPath = "C:\websites\rapids-roosts"
$backupPath = "C:\backups\rapids-roosts"
$dbFile = "production.db"
$retentionDays = 30

# Create backup
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupFile = "$backupPath\production_$timestamp.db"

try {
    # Copy database
    Copy-Item "$appPath\$dbFile" $backupFile -Force
    Write-Host "✓ Backup created: $backupFile"
    
    # Clean old backups
    Get-ChildItem $backupPath -Filter "production_*.db" | 
        Where-Object {$_.LastWriteTime -lt (Get-Date).AddDays(-$retentionDays)} | 
        ForEach-Object {
            Remove-Item $_.FullName
            Write-Host "✓ Removed old backup: $($_.Name)"
        }
}
catch {
    Write-Host "✗ Backup failed: $_"
    exit 1
}
```

### Restore from Backup
```powershell
# Stop application
pm2 stop rapids-roosts

# Restore database
copy "C:\backups\rapids-roosts\production_YYYYMMDD_HHMMSS.db" production.db

# Start application
pm2 start rapids-roosts
```

## Monitoring & Maintenance

### Check Application Status
```powershell
pm2 status
pm2 logs rapids-roosts
pm2 monit
```

### Database Size Monitoring
```powershell
# Check database file size
Get-Item production.db | Select-Object Name, Length, LastWriteTime
```

### Disk Space
```powershell
# Check available disk space
Get-PSDrive C | Select-Object Used,Free
```

## Scaling Considerations

**When to Consider Other Databases:**
- Multiple concurrent writers (>10-20 simultaneous bookings)
- Need for database replication
- Distributed deployment across multiple servers
- Database size >50GB
- Need for advanced features (stored procedures, etc.)

**For Most Tourism Sites:**
SQLite is perfectly adequate for:
- Up to 100,000 bookings per year
- 100+ concurrent users (mostly reading)
- 1-10 concurrent booking submissions
- <10GB database size

## Support Resources

- SQLite Documentation: https://www.sqlite.org/docs.html
- PM2 Documentation: https://pm2.keymetrics.io/docs/
- Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices

## Emergency Contacts

Document your emergency procedures:
- Database corruption: Restore from latest backup
- Application crashes: Check PM2 logs, restart if needed
- Disk space issues: Clean old logs, compress old backups
- Performance issues: Check database size, optimize queries
