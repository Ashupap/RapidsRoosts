# Rapids & Roosts - Automated Deployment Script for Windows
# This script automates the deployment process for Windows Server

# Requires Administrator privileges
#Requires -RunAsAdministrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Rapids & Roosts - Windows Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$APP_NAME = "rapids-roosts"
$APP_DIR = "C:\websites\rapids-roosts"
$PM2_HOME = "C:\pm2"
$NODE_ENV = "production"
$PORT = 3000

# Step 1: Check Prerequisites
Write-Host "[1/8] Checking prerequisites..." -ForegroundColor Yellow

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "  ✓ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Node.js not found. Please install Node.js from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check if PostgreSQL is installed
try {
    $pgVersion = psql --version
    Write-Host "  ✓ PostgreSQL found" -ForegroundColor Green
} catch {
    Write-Host "  ⚠ PostgreSQL not found. Please install PostgreSQL manually" -ForegroundColor Yellow
}

# Step 2: Create directories
Write-Host "[2/8] Setting up directories..." -ForegroundColor Yellow

if (-not (Test-Path $APP_DIR)) {
    Write-Host "  ✗ Application directory not found: $APP_DIR" -ForegroundColor Red
    Write-Host "  Please clone the repository to $APP_DIR first" -ForegroundColor Red
    exit 1
} else {
    Write-Host "  ✓ Application directory found" -ForegroundColor Green
}

if (-not (Test-Path "$APP_DIR\logs")) {
    New-Item -ItemType Directory -Path "$APP_DIR\logs" -Force | Out-Null
    Write-Host "  ✓ Created logs directory" -ForegroundColor Green
}

if (-not (Test-Path $PM2_HOME)) {
    New-Item -ItemType Directory -Path $PM2_HOME -Force | Out-Null
    Write-Host "  ✓ Created PM2 home directory" -ForegroundColor Green
}

# Step 3: Set environment variables
Write-Host "[3/8] Setting environment variables..." -ForegroundColor Yellow

[System.Environment]::SetEnvironmentVariable("PM2_HOME", $PM2_HOME, [System.EnvironmentVariableTarget]::Machine)
Write-Host "  ✓ Set PM2_HOME=$PM2_HOME" -ForegroundColor Green

# Step 4: Install dependencies
Write-Host "[4/8] Installing dependencies..." -ForegroundColor Yellow

Set-Location $APP_DIR

# Install npm dependencies
Write-Host "  Installing npm packages..." -ForegroundColor Gray
npm install --silent
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  ✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Step 5: Build frontend
Write-Host "[5/8] Building frontend..." -ForegroundColor Yellow

npm run build
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Frontend built successfully" -ForegroundColor Green
} else {
    Write-Host "  ✗ Failed to build frontend" -ForegroundColor Red
    exit 1
}

# Step 6: Setup Database
Write-Host "[6/8] Setting up database..." -ForegroundColor Yellow

# Check if .env file exists
if (Test-Path "$APP_DIR\.env") {
    Write-Host "  ✓ .env file found" -ForegroundColor Green
    
    # Run database migrations
    Write-Host "  Running database migrations..." -ForegroundColor Gray
    npm run db:push
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Database migrations completed" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Database migrations failed. Please check database connection" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ⚠ .env file not found. Please create .env file with database credentials" -ForegroundColor Yellow
    Write-Host "    Example: DATABASE_URL=postgresql://user:password@localhost:5432/rapids_roosts" -ForegroundColor Gray
}

# Step 7: Install and configure PM2
Write-Host "[7/8] Setting up PM2..." -ForegroundColor Yellow

# Install PM2 globally
npm list -g pm2 > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Installing PM2..." -ForegroundColor Gray
    npm install -g pm2
    Write-Host "  ✓ PM2 installed" -ForegroundColor Green
} else {
    Write-Host "  ✓ PM2 already installed" -ForegroundColor Green
}

# Stop existing PM2 process if running
pm2 stop $APP_NAME > $null 2>&1
pm2 delete $APP_NAME > $null 2>&1

# Start application with PM2
Write-Host "  Starting application with PM2..." -ForegroundColor Gray
pm2 start ecosystem.config.js --env production

if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Application started with PM2" -ForegroundColor Green
} else {
    Write-Host "  ✗ Failed to start application with PM2" -ForegroundColor Red
    exit 1
}

# Save PM2 configuration
pm2 save
Write-Host "  ✓ PM2 configuration saved" -ForegroundColor Green

# Step 8: Configure PM2 as Windows Service
Write-Host "[8/8] Configuring PM2 as Windows Service..." -ForegroundColor Yellow

# Check if pm2-windows-service is installed
npm list -g pm2-windows-service > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "  Installing pm2-windows-service..." -ForegroundColor Gray
    npm install -g pm2-windows-service
}

# Check if PM2 service already exists
$service = Get-Service -Name "PM2" -ErrorAction SilentlyContinue
if ($service) {
    Write-Host "  ✓ PM2 service already exists" -ForegroundColor Green
} else {
    Write-Host "  Installing PM2 as Windows Service..." -ForegroundColor Gray
    Write-Host "  (This will open an interactive installer)" -ForegroundColor Gray
    pm2-service-install -n PM2
}

# Final status check
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Deployment Status" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

pm2 status

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Deployment Completed!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Application Details:" -ForegroundColor Cyan
Write-Host "  Name: $APP_NAME" -ForegroundColor White
Write-Host "  Directory: $APP_DIR" -ForegroundColor White
Write-Host "  Port: $PORT" -ForegroundColor White
Write-Host "  URL: http://localhost:$PORT" -ForegroundColor White
Write-Host ""
Write-Host "Useful Commands:" -ForegroundColor Cyan
Write-Host "  View logs:       pm2 logs $APP_NAME" -ForegroundColor White
Write-Host "  Restart app:     pm2 restart $APP_NAME" -ForegroundColor White
Write-Host "  Stop app:        pm2 stop $APP_NAME" -ForegroundColor White
Write-Host "  Status:          pm2 status" -ForegroundColor White
Write-Host "  Monitor:         pm2 monit" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Configure IIS reverse proxy (see DEPLOYMENT_GUIDE.md)" -ForegroundColor White
Write-Host "  2. Set up SSL certificate for HTTPS" -ForegroundColor White
Write-Host "  3. Configure domain DNS settings" -ForegroundColor White
Write-Host "  4. Test the application thoroughly" -ForegroundColor White
Write-Host ""
