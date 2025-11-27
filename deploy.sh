#!/bin/bash

#===============================================================================
# Rapids & Roosts Dandeli - Cross-Platform Deployment Script
# Works on: Linux, macOS, Windows (Git Bash/WSL)
#===============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="rapids-roosts-dandeli"
BUILD_DIR="dist"
PUBLIC_DIR="dist/public"
PORT="${PORT:-5000}"

#===============================================================================
# Helper Functions
#===============================================================================

print_header() {
    echo ""
    echo -e "${CYAN}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC}  ${GREEN}$1${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

print_step() {
    echo -e "${BLUE}➤${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

check_command() {
    if ! command -v $1 &> /dev/null; then
        print_error "$1 is not installed. Please install it first."
        exit 1
    fi
}

#===============================================================================
# System Detection
#===============================================================================

detect_os() {
    case "$(uname -s)" in
        Linux*)     OS="Linux";;
        Darwin*)    OS="macOS";;
        CYGWIN*|MINGW*|MSYS*) OS="Windows";;
        *)          OS="Unknown";;
    esac
    echo $OS
}

#===============================================================================
# Pre-flight Checks
#===============================================================================

preflight_checks() {
    print_header "Pre-flight Checks"
    
    print_step "Detecting operating system..."
    OS=$(detect_os)
    print_success "Operating System: $OS"
    
    print_step "Checking required tools..."
    check_command node
    check_command npm
    print_success "Node.js $(node -v) found"
    print_success "npm $(npm -v) found"
    
    if ! [ -f "package.json" ]; then
        print_error "package.json not found. Are you in the project root?"
        exit 1
    fi
    print_success "Project structure verified"
}

#===============================================================================
# Clean Build
#===============================================================================

clean_build() {
    print_header "Cleaning Previous Build"
    
    print_step "Removing old build artifacts..."
    rm -rf "$BUILD_DIR" 2>/dev/null || true
    rm -rf node_modules/.cache 2>/dev/null || true
    print_success "Clean complete"
}

#===============================================================================
# Install Dependencies
#===============================================================================

install_dependencies() {
    print_header "Installing Dependencies"
    
    print_step "Installing npm packages..."
    npm ci --prefer-offline 2>/dev/null || npm install
    print_success "Dependencies installed"
}

#===============================================================================
# Build Application
#===============================================================================

build_app() {
    print_header "Building Application"
    
    print_step "Building frontend (Vite)..."
    npm run build
    print_success "Frontend built successfully"
    
    print_step "Verifying build output..."
    if [ -d "$PUBLIC_DIR" ]; then
        FILE_COUNT=$(find "$PUBLIC_DIR" -type f | wc -l)
        print_success "Build contains $FILE_COUNT files"
    else
        print_error "Build directory not found at $PUBLIC_DIR"
        exit 1
    fi
}

#===============================================================================
# Production Server Setup
#===============================================================================

create_production_server() {
    print_header "Creating Production Server Configuration"
    
    print_step "Creating production server entry..."
    cat > dist/server.js << 'EOF'
const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable gzip compression
app.use(compression());

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Cache control for static assets
app.use('/assets', express.static(path.join(__dirname, 'public/assets'), {
    maxAge: '1y',
    immutable: true
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: '1h'
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        service: 'Rapids & Roosts Dandeli'
    });
});

// Contact info endpoint
app.get('/api/contact-info', (req, res) => {
    res.json({
        phone: '+91 94839 40400',
        email: 'info@rapidsroosts.com',
        address: 'Dandeli, Karnataka, India - 581325',
        whatsapp: 'https://wa.me/919483940400'
    });
});

// SPA fallback - serve index.html for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌊 Rapids & Roosts Dandeli server running on port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
});
EOF

    # Create minimal package.json for production
    cat > dist/package.json << EOF
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
EOF

    print_success "Production server created"
}

#===============================================================================
# Platform-Specific Configurations
#===============================================================================

create_docker_config() {
    print_header "Creating Docker Configuration"
    
    cat > Dockerfile << 'EOF'
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
WORKDIR /app/dist
RUN npm install --production
EXPOSE 5000
CMD ["npm", "start"]
EOF

    cat > .dockerignore << 'EOF'
node_modules
dist
.git
.gitignore
*.md
.env*
.DS_Store
Thumbs.db
EOF

    cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  web:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost:5000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
EOF

    print_success "Docker files created"
}

create_nginx_config() {
    print_header "Creating Nginx Configuration"
    
    mkdir -p deployment/nginx
    
    cat > deployment/nginx/nginx.conf << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name rapidsroosts.com www.rapidsroosts.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name rapidsroosts.com www.rapidsroosts.com;
    
    # SSL Configuration (update paths)
    ssl_certificate /etc/letsencrypt/live/rapidsroosts.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rapidsroosts.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers off;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml;
    
    root /var/www/rapidsroosts/public;
    index index.html;
    
    # Static assets with long cache
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # API proxy to Node.js backend
    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

    print_success "Nginx configuration created"
}

create_pm2_config() {
    print_header "Creating PM2 Configuration"
    
    cat > ecosystem.config.js << 'EOF'
module.exports = {
    apps: [{
        name: 'rapids-roosts-dandeli',
        script: 'dist/server.js',
        instances: 'max',
        exec_mode: 'cluster',
        autorestart: true,
        watch: false,
        max_memory_restart: '500M',
        env: {
            NODE_ENV: 'development',
            PORT: 5000
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 5000
        },
        error_file: './logs/pm2-error.log',
        out_file: './logs/pm2-out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }]
};
EOF

    print_success "PM2 configuration created"
}

create_systemd_service() {
    print_header "Creating Systemd Service"
    
    mkdir -p deployment/systemd
    
    cat > deployment/systemd/rapidsroosts.service << 'EOF'
[Unit]
Description=Rapids & Roosts Dandeli Website
Documentation=https://github.com/rapidsroosts/dandeli
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=/var/www/rapidsroosts/dist
ExecStart=/usr/bin/node server.js
Restart=on-failure
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=rapidsroosts
Environment=NODE_ENV=production
Environment=PORT=5000

[Install]
WantedBy=multi-user.target
EOF

    print_success "Systemd service created"
}

create_vercel_config() {
    print_header "Creating Vercel Configuration"
    
    cat > vercel.json << 'EOF'
{
    "version": 2,
    "name": "rapids-roosts-dandeli",
    "builds": [
        {
            "src": "package.json",
            "use": "@vercel/static-build",
            "config": {
                "distDir": "dist/public"
            }
        }
    ],
    "routes": [
        {
            "src": "/api/health",
            "dest": "/api/health.json"
        },
        {
            "src": "/assets/(.*)",
            "headers": {
                "cache-control": "public, max-age=31536000, immutable"
            },
            "dest": "/assets/$1"
        },
        {
            "handle": "filesystem"
        },
        {
            "src": "/(.*)",
            "dest": "/index.html"
        }
    ]
}
EOF

    print_success "Vercel configuration created"
}

create_netlify_config() {
    print_header "Creating Netlify Configuration"
    
    cat > netlify.toml << 'EOF'
[build]
  command = "npm run build"
  publish = "dist/public"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
EOF

    print_success "Netlify configuration created"
}

create_cloudflare_config() {
    print_header "Creating Cloudflare Pages Configuration"
    
    mkdir -p deployment/cloudflare
    
    cat > deployment/cloudflare/_redirects << 'EOF'
/*    /index.html   200
EOF

    cat > deployment/cloudflare/_headers << 'EOF'
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
EOF

    print_success "Cloudflare Pages configuration created"
}

#===============================================================================
# Deployment Commands
#===============================================================================

print_deployment_instructions() {
    print_header "Deployment Instructions"
    
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}Build completed successfully!${NC}"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "${YELLOW}Choose your deployment platform:${NC}"
    echo ""
    echo -e "${BLUE}1. Replit (Recommended - Current Platform)${NC}"
    echo "   • Click the 'Deploy' button in Replit"
    echo "   • Or use: npm run build && npm start"
    echo ""
    echo -e "${BLUE}2. Docker${NC}"
    echo "   • docker build -t rapids-roosts ."
    echo "   • docker run -p 5000:5000 rapids-roosts"
    echo "   • Or: docker-compose up -d"
    echo ""
    echo -e "${BLUE}3. VPS/Cloud Server (Ubuntu/Debian)${NC}"
    echo "   • scp -r dist/* user@server:/var/www/rapidsroosts/"
    echo "   • sudo cp deployment/systemd/rapidsroosts.service /etc/systemd/system/"
    echo "   • sudo systemctl enable rapidsroosts && sudo systemctl start rapidsroosts"
    echo "   • Configure Nginx using deployment/nginx/nginx.conf"
    echo ""
    echo -e "${BLUE}4. PM2 (Process Manager)${NC}"
    echo "   • npm install -g pm2"
    echo "   • pm2 start ecosystem.config.js --env production"
    echo "   • pm2 save && pm2 startup"
    echo ""
    echo -e "${BLUE}5. Vercel (Serverless)${NC}"
    echo "   • npm i -g vercel"
    echo "   • vercel --prod"
    echo ""
    echo -e "${BLUE}6. Netlify (Static + Functions)${NC}"
    echo "   • npm i -g netlify-cli"
    echo "   • netlify deploy --prod"
    echo ""
    echo -e "${BLUE}7. Cloudflare Pages${NC}"
    echo "   • Push to GitHub"
    echo "   • Connect repo in Cloudflare Pages dashboard"
    echo "   • Build command: npm run build"
    echo "   • Output directory: dist/public"
    echo ""
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}Contact Information:${NC}"
    echo "   • Phone: +91 94839 40400"
    echo "   • Email: info@rapidsroosts.com"
    echo "   • WhatsApp: https://wa.me/919483940400"
    echo -e "${CYAN}═══════════════════════════════════════════════════════════════════${NC}"
}

#===============================================================================
# Main Execution
#===============================================================================

main() {
    echo ""
    echo -e "${CYAN}╔════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${NC}  ${GREEN}🌊 Rapids & Roosts Dandeli - Deployment Script${NC}              ${CYAN}║${NC}"
    echo -e "${CYAN}║${NC}  ${YELLOW}Adventure Tourism in Karnataka, India${NC}                      ${CYAN}║${NC}"
    echo -e "${CYAN}╚════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    # Parse arguments
    SKIP_BUILD=false
    PLATFORM=""
    
    while [[ "$#" -gt 0 ]]; do
        case $1 in
            --skip-build) SKIP_BUILD=true ;;
            --platform) PLATFORM="$2"; shift ;;
            --clean) clean_build; exit 0 ;;
            --help) 
                echo "Usage: ./deploy.sh [options]"
                echo ""
                echo "Options:"
                echo "  --skip-build    Skip the build step"
                echo "  --platform      Generate config for specific platform"
                echo "                  (docker|nginx|pm2|vercel|netlify|cloudflare|all)"
                echo "  --clean         Clean build artifacts only"
                echo "  --help          Show this help message"
                exit 0
                ;;
            *) print_warning "Unknown parameter: $1" ;;
        esac
        shift
    done
    
    # Run deployment steps
    preflight_checks
    
    if [ "$SKIP_BUILD" = false ]; then
        clean_build
        install_dependencies
        build_app
        create_production_server
    fi
    
    # Generate platform configs
    case "$PLATFORM" in
        docker) create_docker_config ;;
        nginx) create_nginx_config ;;
        pm2) create_pm2_config ;;
        systemd) create_systemd_service ;;
        vercel) create_vercel_config ;;
        netlify) create_netlify_config ;;
        cloudflare) create_cloudflare_config ;;
        all|"")
            create_docker_config
            create_nginx_config
            create_pm2_config
            create_systemd_service
            create_vercel_config
            create_netlify_config
            create_cloudflare_config
            ;;
    esac
    
    print_deployment_instructions
}

# Run main function
main "$@"
