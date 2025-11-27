# Rapids & Roosts Dandeli - Deployment Guide

## Quick Start

### Linux/macOS
```bash
chmod +x deploy.sh
./deploy.sh
```

### Windows (PowerShell)
```powershell
.\deploy.ps1
```

## Deployment Platforms

### 1. Replit (Current Platform)
- Click the **Deploy** button in Replit
- The app will be deployed automatically with a public URL

### 2. Docker
```bash
# Build and run
docker build -t rapids-roosts .
docker run -p 5000:5000 rapids-roosts

# Or use docker-compose
docker-compose up -d
```

### 3. VPS/Cloud Server (Ubuntu/Debian)

```bash
# 1. Copy build to server
scp -r dist/* user@server:/var/www/rapidsroosts/

# 2. Install dependencies on server
cd /var/www/rapidsroosts/dist
npm install --production

# 3. Setup systemd service
sudo cp /path/to/deployment/systemd/rapidsroosts.service /etc/systemd/system/
sudo systemctl enable rapidsroosts
sudo systemctl start rapidsroosts

# 4. Configure Nginx
sudo cp /path/to/deployment/nginx/nginx.conf /etc/nginx/sites-available/rapidsroosts
sudo ln -s /etc/nginx/sites-available/rapidsroosts /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

### 4. PM2 (Process Manager)
```bash
npm install -g pm2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

### 5. Vercel
```bash
npm i -g vercel
vercel --prod
```

### 6. Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod
```

### 7. Cloudflare Pages
1. Push code to GitHub
2. Connect repository in Cloudflare Pages dashboard
3. Build command: `npm run build`
4. Output directory: `dist/public`

### 8. IIS (Windows Server)
1. Install [iisnode](https://github.com/Azure/iisnode)
2. Copy `dist` folder to IIS site root
3. The `web.config` file is included in the build

### 9. Windows Service (NSSM)
1. Download [NSSM](https://nssm.cc/)
2. Run: `deployment\windows\install-service.bat`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `production` |

## Health Check

The application exposes a health check endpoint:
```
GET /api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "service": "Rapids & Roosts Dandeli"
}
```

## Contact Information

- **Phone:** +91 94839 40400
- **Email:** info@rapidsroosts.com
- **WhatsApp:** https://wa.me/919483940400
- **Address:** Dandeli, Karnataka, India - 581325

## SEO Keywords

- Dandeli
- Dandeli tourism
- Adventure tourism in Karnataka
- Best adventure tourism in Karnataka
- White water rafting Dandeli
- Jungle safari Dandeli
- Kayaking Dandeli
- Forest trekking Dandeli
