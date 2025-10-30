# Rapids & Roosts - Windows Development Setup Script
# Quick setup for development environment

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Rapids & Roosts - Development Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This will set up your development environment" -ForegroundColor Gray
Write-Host ""

# Configuration
$APP_NAME = "rapids-roosts"
$DB_NAME = "rapids_roosts_dev"

# Step 1: Check Prerequisites
Write-Host "[1/6] Checking prerequisites..." -ForegroundColor Yellow

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "  ✓ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Node.js not found" -ForegroundColor Red
    Write-Host "    Please install from https://nodejs.org" -ForegroundColor Gray
    exit 1
}

# Check PostgreSQL
try {
    $pgVersion = psql --version
    Write-Host "  ✓ PostgreSQL found" -ForegroundColor Green
} catch {
    Write-Host "  ✗ PostgreSQL not found" -ForegroundColor Red
    Write-Host "    Please install from https://www.postgresql.org/download/windows/" -ForegroundColor Gray
    exit 1
}

# Check Git
try {
    $gitVersion = git --version
    Write-Host "  ✓ Git found" -ForegroundColor Green
} catch {
    Write-Host "  ⚠ Git not found (optional)" -ForegroundColor Yellow
}

# Step 2: Install Dependencies
Write-Host "[2/6] Installing npm dependencies..." -ForegroundColor Yellow

npm install --silent
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "  ✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Step 3: Check .env file
Write-Host "[3/6] Checking environment configuration..." -ForegroundColor Yellow

if (Test-Path ".env") {
    Write-Host "  ✓ .env file exists" -ForegroundColor Green
} else {
    if (Test-Path "deployment\.env.example") {
        Write-Host "  Creating .env file from template..." -ForegroundColor Gray
        Copy-Item "deployment\.env.example" ".env"
        Write-Host "  ✓ .env file created" -ForegroundColor Green
        Write-Host "  ⚠ Please edit .env file and update database credentials" -ForegroundColor Yellow
        
        # Pause for user to edit
        Write-Host ""
        Write-Host "Press any key after you've edited the .env file..." -ForegroundColor Yellow
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    } else {
        Write-Host "  ✗ .env.example not found" -ForegroundColor Red
        Write-Host "    Please create .env file manually" -ForegroundColor Gray
        exit 1
    }
}

# Step 4: Setup Database
Write-Host "[4/6] Setting up database..." -ForegroundColor Yellow

# Read DATABASE_URL from .env
$envContent = Get-Content ".env"
$dbUrl = ($envContent | Select-String "DATABASE_URL=").ToString() -replace "DATABASE_URL=", ""

if ($dbUrl) {
    Write-Host "  Database URL configured: $($dbUrl.Substring(0,30))..." -ForegroundColor Gray
    
    # Try to create database
    Write-Host "  Creating database '$DB_NAME'..." -ForegroundColor Gray
    psql -U postgres -c "CREATE DATABASE $DB_NAME;" 2>&1 | Out-Null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Database created" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Database might already exist (this is OK)" -ForegroundColor Yellow
    }
    
    # Run migrations
    Write-Host "  Running database migrations..." -ForegroundColor Gray
    npm run db:push
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Database migrations completed" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Database migrations had issues. You may need to run 'npm run db:push' manually" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ⚠ DATABASE_URL not found in .env" -ForegroundColor Yellow
    Write-Host "    Please configure database manually" -ForegroundColor Gray
}

# Step 5: Check if port 5000 is available
Write-Host "[5/6] Checking port availability..." -ForegroundColor Yellow

$portInUse = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "  ⚠ Port 5000 is already in use" -ForegroundColor Yellow
    Write-Host "    You may need to stop the existing process or change the PORT in .env" -ForegroundColor Gray
} else {
    Write-Host "  ✓ Port 5000 is available" -ForegroundColor Green
}

# Step 6: Ready to start
Write-Host "[6/6] Setup complete!" -ForegroundColor Yellow

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Development Environment Ready!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "To start the development server:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open your browser to:" -ForegroundColor Cyan
Write-Host "  http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Cyan
Write-Host "  npm run dev          - Start development server" -ForegroundColor Gray
Write-Host "  npm run db:push      - Update database schema" -ForegroundColor Gray
Write-Host "  Ctrl+C               - Stop development server" -ForegroundColor Gray
Write-Host ""
Write-Host "Would you like to start the development server now? (Y/N)" -ForegroundColor Yellow
$response = Read-Host

if ($response -eq "Y" -or $response -eq "y") {
    Write-Host ""
    Write-Host "Starting development server..." -ForegroundColor Green
    Write-Host "Press Ctrl+C to stop" -ForegroundColor Gray
    Write-Host ""
    npm run dev
} else {
    Write-Host ""
    Write-Host "Setup complete! Run 'npm run dev' when ready to start." -ForegroundColor Green
    Write-Host ""
}
