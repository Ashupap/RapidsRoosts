# Rapids & Roosts - Windows Development Setup Script
# Automated setup for development environment

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Rapids & Roosts - Development Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This will automatically set up your development environment" -ForegroundColor Gray
Write-Host ""

# Configuration
$APP_NAME = "rapids-roosts"
$DB_FILE = "dev.db"

# Step 1: Check Prerequisites
Write-Host "[1/5] Checking prerequisites..." -ForegroundColor Yellow

# Check Node.js
try {
    $nodeVersion = node --version
    Write-Host "  ✓ Node.js $nodeVersion found" -ForegroundColor Green
}
catch {
    Write-Host "  ✗ Node.js not found" -ForegroundColor Red
    Write-Host "    Please install from https://nodejs.org" -ForegroundColor Gray
    exit 1
}

# Check Git
try {
    $gitVersion = git --version
    Write-Host "  ✓ Git found" -ForegroundColor Green
}
catch {
    Write-Host "  ⚠ Git not found (optional)" -ForegroundColor Yellow
}

# Step 2: Install Dependencies
Write-Host "[2/5] Installing npm dependencies..." -ForegroundColor Yellow

npm install --silent
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Dependencies installed" -ForegroundColor Green
}
else {
    Write-Host "  ✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Step 3: Create .env file
Write-Host "[3/5] Setting up environment configuration..." -ForegroundColor Yellow

if (Test-Path ".env") {
    Write-Host "  ℹ .env file already exists, skipping creation" -ForegroundColor Cyan
}
else {
    Write-Host "  Creating .env file..." -ForegroundColor Gray
    
    # Create .env content
    $envContent = @"
# Environment Configuration for Rapids & Roosts (Development)

# Node Environment
NODE_ENV=development

# Server Port
PORT=5000

# Database Configuration
# SQLite database file (will be created automatically)
DATABASE_URL=file:./dev.db

# Session Secret (for development only - use a strong secret in production)
SESSION_SECRET=dev-secret-key-not-for-production

# Gmail API Configuration (for email notifications)
# Add your credentials here when ready to test email features
GMAIL_CLIENT_ID=your-gmail-client-id-here
GMAIL_CLIENT_SECRET=your-gmail-client-secret-here
GMAIL_REFRESH_TOKEN=your-refresh-token-here

# Google Sheets Configuration (for booking data)
# Add your sheet ID here when ready to test Google Sheets integration
GOOGLE_SHEET_ID=your-google-sheet-id-here
"@

    # Write .env file
    Set-Content -Path ".env" -Value $envContent
    Write-Host "  ✓ .env file created with development settings" -ForegroundColor Green
    Write-Host "  ✓ Database configured: file:./dev.db" -ForegroundColor Green
}

# Step 4: Setup Database
Write-Host "[4/5] Setting up SQLite database..." -ForegroundColor Yellow

# Check if database file already exists
if (Test-Path $DB_FILE) {
    Write-Host "  ℹ Database file already exists at ./$DB_FILE" -ForegroundColor Cyan
    Write-Host "  Updating schema to match latest changes..." -ForegroundColor Gray
}
else {
    Write-Host "  Creating new SQLite database at ./$DB_FILE" -ForegroundColor Gray
}

# Run migrations to create/update database schema
npm run db:push

if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Database schema created/updated successfully" -ForegroundColor Green
    if (Test-Path $DB_FILE) {
        $dbSize = (Get-Item $DB_FILE).Length / 1KB
        Write-Host "  ✓ Database file ready at ./$DB_FILE ($("{0:N2}" -f $dbSize) KB)" -ForegroundColor Green
    }
}
else {
    Write-Host "  ⚠ Database migrations had issues" -ForegroundColor Yellow
    Write-Host "    You may need to run 'npm run db:push' manually later" -ForegroundColor Gray
}

# Step 5: Check if port 5000 is available
Write-Host "[5/5] Checking port availability..." -ForegroundColor Yellow

$portInUse = Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "  ⚠ Port 5000 is already in use" -ForegroundColor Yellow
    Write-Host "    You may need to stop the existing process or change PORT in .env" -ForegroundColor Gray
}
else {
    Write-Host "  ✓ Port 5000 is available" -ForegroundColor Green
}

# Final: Ready to start
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✓ Development Environment Ready!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Setup Summary:" -ForegroundColor Cyan
Write-Host "  • Node.js dependencies installed" -ForegroundColor Gray
Write-Host "  • .env file configured" -ForegroundColor Gray
Write-Host "  • SQLite database created at ./$DB_FILE" -ForegroundColor Gray
Write-Host "  • Server will run on http://localhost:5000" -ForegroundColor Gray
Write-Host ""
Write-Host "To start the development server:" -ForegroundColor Cyan
Write-Host ""
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Cyan
Write-Host "  npm run dev          - Start development server" -ForegroundColor Gray
Write-Host "  npm run db:push      - Update database schema" -ForegroundColor Gray
Write-Host "  sqlite3 dev.db       - Access database" -ForegroundColor Gray
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
}
else {
    Write-Host ""
    Write-Host "Setup complete! Run 'npm run dev' when ready to start." -ForegroundColor Green
    Write-Host ""
}
