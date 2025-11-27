#===============================================================================
# Rapids & Roosts Dandeli - Windows PowerShell Deployment Script
# Works on: Windows 10/11 with PowerShell 5.1+
#===============================================================================

$ErrorActionPreference = "Stop"

# Configuration
$APP_NAME = "rapids-roosts-dandeli"
$BUILD_DIR = "dist"
$PUBLIC_DIR = "dist/public"
$PORT = if ($env:PORT) { $env:PORT } else { "5000" }

#===============================================================================
# Helper Functions
#===============================================================================

function Write-Header {
    param([string]$Message)
    Write-Host ""
    Write-Host "==================================================================" -ForegroundColor Cyan
    Write-Host "  $Message" -ForegroundColor Green
    Write-Host "==================================================================" -ForegroundColor Cyan
    Write-Host ""
}

function Write-Step {
    param([string]$Message)
    Write-Host "[>] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[!] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[X] $Message" -ForegroundColor Red
}

function Test-Command {
    param([string]$Command)
    $exists = $null -ne (Get-Command $Command -ErrorAction SilentlyContinue)
    return $exists
}

#===============================================================================
# Pre-flight Checks
#===============================================================================

function Invoke-PreflightChecks {
    Write-Header "Pre-flight Checks"
    
    Write-Step "Checking operating system..."
    $osInfo = [System.Environment]::OSVersion
    Write-Success "Operating System: Windows $($osInfo.Version)"
    
    Write-Step "Checking required tools..."
    
    if (-not (Test-Command "node")) {
        Write-Error "Node.js is not installed. Please install it from https://nodejs.org"
        exit 1
    }
    $nodeVersion = & node -v
    Write-Success "Node.js $nodeVersion found"
    
    if (-not (Test-Command "npm")) {
        Write-Error "npm is not installed. Please install Node.js from https://nodejs.org"
        exit 1
    }
    $npmVersion = & npm -v
    Write-Success "npm $npmVersion found"
    
    if (-not (Test-Path "package.json")) {
        Write-Error "package.json not found. Are you in the project root?"
        exit 1
    }
    Write-Success "Project structure verified"
}

#===============================================================================
# Clean Build
#===============================================================================

function Invoke-CleanBuild {
    Write-Header "Cleaning Previous Build"
    
    Write-Step "Removing old build artifacts..."
    if (Test-Path $BUILD_DIR) {
        Remove-Item -Recurse -Force $BUILD_DIR
    }
    if (Test-Path "node_modules/.cache") {
        Remove-Item -Recurse -Force "node_modules/.cache"
    }
    Write-Success "Clean complete"
}

#===============================================================================
# Install Dependencies
#===============================================================================

function Install-Dependencies {
    Write-Header "Installing Dependencies"
    
    Write-Step "Installing npm packages..."
    try {
        & npm ci --prefer-offline 2>$null
    } catch {
        & npm install
    }
    Write-Success "Dependencies installed"
}

#===============================================================================
# Build Application
#===============================================================================

function Build-Application {
    Write-Header "Building Application"
    
    Write-Step "Building frontend (Vite)..."
    & npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Build failed"
        exit 1
    }
    Write-Success "Frontend built successfully"
    
    Write-Step "Verifying build output..."
    if (Test-Path $PUBLIC_DIR) {
        $fileCount = (Get-ChildItem -Recurse -File $PUBLIC_DIR).Count
        Write-Success "Build contains $fileCount files"
    } else {
        Write-Error "Build directory not found at $PUBLIC_DIR"
        exit 1
    }
}

#===============================================================================
# Create Production Server
#===============================================================================

function New-ProductionServer {
    Write-Header "Creating Production Server Configuration"
    
    Write-Step "Creating production server entry..."
    
    $serverJs = @'
const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(compression());

app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

app.use('/assets', express.static(path.join(__dirname, 'public/assets'), {
    maxAge: '1y',
    immutable: true
}));

app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1h'
}));

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        service: 'Rapids & Roosts Dandeli'
    });
});

app.get('/api/contact-info', (req, res) => {
    res.json({
        phone: '+91 94839 40400',
        email: 'info@rapidsroosts.com',
        address: 'Dandeli, Karnataka, India - 581325',
        whatsapp: 'https://wa.me/919483940400'
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rapids & Roosts Dandeli server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
'@
    
    Set-Content -Path "$BUILD_DIR/server.js" -Value $serverJs
    
    $packageJson = @"
{
    "name": "$APP_NAME",
    "version": "1.0.0",
    "private": true,
    "scripts": {
        "start": "node server.js"
    },
    "dependencies": {
        "express": "^4.18.2",
        "compression": "^1.7.4"
    },
    "engines": {
        "node": ">=18.0.0"
    }
}
"@
    
    Set-Content -Path "$BUILD_DIR/package.json" -Value $packageJson
    
    Write-Success "Production server created"
}

#===============================================================================
# IIS Configuration (Windows-specific)
#===============================================================================

function New-IISConfig {
    Write-Header "Creating IIS Configuration"
    
    $webConfig = @'
<?xml version="1.0" encoding="utf-8"?>
<configuration>
    <system.webServer>
        <handlers>
            <add name="iisnode" path="server.js" verb="*" modules="iisnode" />
        </handlers>
        <rewrite>
            <rules>
                <rule name="StaticContent">
                    <action type="Rewrite" url="public{REQUEST_URI}"/>
                </rule>
                <rule name="DynamicContent">
                    <conditions>
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
                    </conditions>
                    <action type="Rewrite" url="server.js"/>
                </rule>
            </rules>
        </rewrite>
        <iisnode 
            nodeProcessCommandLine="&quot;C:\Program Files\nodejs\node.exe&quot;"
            watchedFiles="web.config;*.js"
            loggingEnabled="true"
            logDirectory="logs"
        />
        <staticContent>
            <mimeMap fileExtension=".json" mimeType="application/json" />
            <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
        </staticContent>
        <httpCompression>
            <dynamicTypes>
                <add mimeType="application/json" enabled="true" />
            </dynamicTypes>
        </httpCompression>
    </system.webServer>
</configuration>
'@
    
    Set-Content -Path "$BUILD_DIR/web.config" -Value $webConfig
    Write-Success "IIS web.config created"
}

#===============================================================================
# Windows Service Configuration
#===============================================================================

function New-WindowsServiceConfig {
    Write-Header "Creating Windows Service Configuration"
    
    if (-not (Test-Path "deployment/windows")) {
        New-Item -ItemType Directory -Force -Path "deployment/windows" | Out-Null
    }
    
    $nssm = @'
@echo off
REM Rapids & Roosts Dandeli - Windows Service Installation
REM Requires NSSM (Non-Sucking Service Manager) - https://nssm.cc/

set SERVICE_NAME=RapidsRoostsDandeli
set NODE_PATH=C:\Program Files\nodejs\node.exe
set APP_DIR=%~dp0dist

echo Installing Rapids & Roosts Dandeli as Windows Service...

nssm install %SERVICE_NAME% "%NODE_PATH%" "%APP_DIR%\server.js"
nssm set %SERVICE_NAME% AppDirectory "%APP_DIR%"
nssm set %SERVICE_NAME% AppEnvironmentExtra "NODE_ENV=production" "PORT=5000"
nssm set %SERVICE_NAME% Description "Rapids & Roosts Dandeli - Adventure Tourism Website"
nssm set %SERVICE_NAME% Start SERVICE_AUTO_START
nssm set %SERVICE_NAME% AppStdout "%APP_DIR%\logs\stdout.log"
nssm set %SERVICE_NAME% AppStderr "%APP_DIR%\logs\stderr.log"
nssm set %SERVICE_NAME% AppRotateFiles 1
nssm set %SERVICE_NAME% AppRotateBytes 1048576

echo Starting service...
nssm start %SERVICE_NAME%

echo Done! Service is running on port 5000
pause
'@
    
    Set-Content -Path "deployment/windows/install-service.bat" -Value $nssm
    Write-Success "Windows Service installation script created"
}

#===============================================================================
# Print Deployment Instructions
#===============================================================================

function Show-DeploymentInstructions {
    Write-Header "Deployment Instructions"
    
    Write-Host "==================================================================" -ForegroundColor Cyan
    Write-Host "  Build completed successfully!" -ForegroundColor Green
    Write-Host "==================================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Choose your deployment platform:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Local Development" -ForegroundColor Blue
    Write-Host "   cd dist && npm install && npm start"
    Write-Host ""
    Write-Host "2. IIS (Windows Server)" -ForegroundColor Blue
    Write-Host "   - Install iisnode from https://github.com/Azure/iisnode"
    Write-Host "   - Copy dist folder to IIS site root"
    Write-Host "   - web.config is already created"
    Write-Host ""
    Write-Host "3. Windows Service (NSSM)" -ForegroundColor Blue
    Write-Host "   - Download NSSM from https://nssm.cc/"
    Write-Host "   - Run: deployment\windows\install-service.bat"
    Write-Host ""
    Write-Host "4. Docker" -ForegroundColor Blue
    Write-Host "   docker build -t rapids-roosts ."
    Write-Host "   docker run -p 5000:5000 rapids-roosts"
    Write-Host ""
    Write-Host "5. Azure App Service" -ForegroundColor Blue
    Write-Host "   - az webapp up --name rapids-roosts --resource-group myRG"
    Write-Host ""
    Write-Host "==================================================================" -ForegroundColor Cyan
    Write-Host "Contact Information:" -ForegroundColor Green
    Write-Host "   Phone: +91 94839 40400"
    Write-Host "   Email: info@rapidsroosts.com"
    Write-Host "   WhatsApp: https://wa.me/919483940400"
    Write-Host "==================================================================" -ForegroundColor Cyan
}

#===============================================================================
# Main Execution
#===============================================================================

function Main {
    param(
        [switch]$SkipBuild,
        [switch]$Clean,
        [switch]$Help
    )
    
    Write-Host ""
    Write-Host "==================================================================" -ForegroundColor Cyan
    Write-Host "  Rapids & Roosts Dandeli - Windows Deployment Script" -ForegroundColor Green
    Write-Host "  Adventure Tourism in Karnataka, India" -ForegroundColor Yellow
    Write-Host "==================================================================" -ForegroundColor Cyan
    Write-Host ""
    
    if ($Help) {
        Write-Host "Usage: .\deploy.ps1 [options]"
        Write-Host ""
        Write-Host "Options:"
        Write-Host "  -SkipBuild    Skip the build step"
        Write-Host "  -Clean        Clean build artifacts only"
        Write-Host "  -Help         Show this help message"
        return
    }
    
    if ($Clean) {
        Invoke-CleanBuild
        return
    }
    
    Invoke-PreflightChecks
    
    if (-not $SkipBuild) {
        Invoke-CleanBuild
        Install-Dependencies
        Build-Application
        New-ProductionServer
    }
    
    New-IISConfig
    New-WindowsServiceConfig
    
    Show-DeploymentInstructions
}

# Run main function with arguments
Main @args
