# Setup PM2 as Windows Service
# Run this script as Administrator

#Requires -RunAsAdministrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PM2 Windows Service Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$PM2_HOME = "C:\pm2"

# Step 1: Create PM2 home directory
Write-Host "[1/4] Creating PM2 home directory..." -ForegroundColor Yellow
if (-not (Test-Path $PM2_HOME)) {
    New-Item -ItemType Directory -Path $PM2_HOME -Force | Out-Null
    Write-Host "  ✓ Created $PM2_HOME" -ForegroundColor Green
} else {
    Write-Host "  ✓ Directory already exists" -ForegroundColor Green
}

# Step 2: Set system environment variable
Write-Host "[2/4] Setting PM2_HOME environment variable..." -ForegroundColor Yellow
[System.Environment]::SetEnvironmentVariable("PM2_HOME", $PM2_HOME, [System.EnvironmentVariableTarget]::Machine)
Write-Host "  ✓ PM2_HOME set to $PM2_HOME" -ForegroundColor Green
Write-Host "  ⚠ Please restart your PowerShell session for this to take effect" -ForegroundColor Yellow

# Refresh environment variables in current session
$env:PM2_HOME = $PM2_HOME

# Step 3: Install PM2 globally
Write-Host "[3/4] Installing PM2..." -ForegroundColor Yellow
npm list -g pm2 > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    npm install -g pm2
    Write-Host "  ✓ PM2 installed" -ForegroundColor Green
} else {
    Write-Host "  ✓ PM2 already installed" -ForegroundColor Green
}

# Step 4: Install pm2-windows-service
Write-Host "[4/4] Installing PM2 Windows Service..." -ForegroundColor Yellow

npm list -g pm2-windows-service > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    npm install -g pm2-windows-service
    Write-Host "  ✓ pm2-windows-service installed" -ForegroundColor Green
} else {
    Write-Host "  ✓ pm2-windows-service already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Interactive Service Installation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "The installer will now start. Please answer the prompts:" -ForegroundColor White
Write-Host "  - Perform environment setup? YES" -ForegroundColor Gray
Write-Host "  - Set PM2_HOME? YES" -ForegroundColor Gray
Write-Host "  - PM2_HOME value: C:\pm2" -ForegroundColor Gray
Write-Host "  - Set PM2_SERVICE_SCRIPTS? NO" -ForegroundColor Gray
Write-Host "  - Set PM2_SERVICE_PM2_DIR? YES" -ForegroundColor Gray
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Run the service installer
pm2-service-install -n PM2

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "PM2 Service Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Verify the service:" -ForegroundColor Cyan
Write-Host "  1. Open Services (Win+R, type 'services.msc')" -ForegroundColor White
Write-Host "  2. Look for 'PM2' service" -ForegroundColor White
Write-Host "  3. Ensure it's Running and set to Automatic" -ForegroundColor White
Write-Host ""
Write-Host "To start your application:" -ForegroundColor Cyan
Write-Host "  1. cd C:\websites\rapids-roosts" -ForegroundColor White
Write-Host "  2. pm2 start ecosystem.config.js --env production" -ForegroundColor White
Write-Host "  3. pm2 save" -ForegroundColor White
Write-Host ""
