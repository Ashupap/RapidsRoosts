# Rapids Roosts Dandeli - Informational Tourism Website

## Overview
Rapids Roosts Dandeli is a modern, immersive informational website for adventure tours in Dandeli, Karnataka, India. The website showcases activities like white-water rafting, jungle safaris, kayaking, and trekking, with comprehensive SEO optimization targeting keywords like "dandeli", "dandeli tourism", "adventure tourism in karnataka", and "best adventure tourism in karnataka". The website is strictly informational with no booking system or pricing information - visitors are encouraged to contact via phone or email for bookings.

## User Preferences
I prefer detailed explanations and iterative development. Ask before making major changes. Do not make changes to the `attached_assets/` folder. Do not make changes to the `design_guidelines.md` file.

## System Architecture
The application follows a lightweight client-server architecture. The frontend is built with React, TypeScript, Tailwind CSS, and Framer Motion, focusing on a responsive, animation-rich UI/UX with the vibrant "Adventure Pulse" color palette (Teal Rapids hsl(182, 78%, 38%), Ember Trail hsl(17, 92%, 55%), Jungle Canopy hsl(138, 54%, 32%), Moonlit Mist hsl(210, 40%, 96%)) and Montserrat/Open Sans typography. Key UI components are sourced from shadcn/ui. The backend uses Express.js and Node.js to serve the static frontend assets with minimal API endpoints (health check and contact info). **No database is required** - the website is purely informational.

### Key Features:
- **Comprehensive SEO Optimization**: Dynamic meta tags, Open Graph, Twitter Cards, JSON-LD schemas (FAQPage, TouristDestination, TravelAgency, Organization, BreadcrumbList), canonical URLs, and geo-location tags targeting top Google rankings for Dandeli tourism keywords.
- **2000+ Word Dandeli Travel Guide**: Complete travel guide page with detailed information about best time to visit, how to reach, activities, accommodations, food, packing tips, and sample itineraries - optimized for long-tail keywords.
- **FAQ Section with Schema**: 8 comprehensive FAQs with JSON-LD FAQPage schema for rich snippets in search results.
- **Modern Mobile-Responsive Navigation**: Professional navigation with desktop and mobile (hamburger menu) support.
- **About Us Page**: Complete company story page with video hero, statistics, core values, sustainability commitment, and environmental promise sections.
- **Dedicated Activities Page & Detail Pages**: Showcase and detailed information for white water rafting, jungle safari, forest trekking, and kayaking activities.
- **Adventure Pulse Design System**: Vibrant adventure-themed color palette with glassmorphic UI elements.
- **Advanced Parallax Effects**: Reusable ParallaxImage, ParallaxText, and ParallaxLayer components with configurable speeds.
- **Adventure-Themed Animations**: Campfire effects, water droplets, wildlife silhouettes - all WCAG-compliant.
- **Video Hero Section**: Fullscreen hero carousel with video playback and parallax scroll effects.
- **Informational CTAs**: All buttons direct to "Contact Us", "Learn More", or "Explore Activities" instead of booking.
- **Full Accessibility Compliance**: All continuous animations respect prefers-reduced-motion using framer-motion's SSR-safe hook.
- **Global Contact Modal**: Context-based contact modal accessible from all pages with phone and email options.
- **Colorful Social Media Icons**: Brand-colored icons (Facebook blue, Instagram pink, Twitter blue, YouTube red, WhatsApp green) in footer.

## External Dependencies
- **Lucide React**: Icon library for UI icons.
- **React Icons**: Social media brand icons (Facebook, Instagram, Twitter, YouTube, WhatsApp).
- **Framer Motion**: Animation library for parallax effects and transitions.
- **Tailwind CSS**: Utility-first CSS framework.
- **shadcn/ui**: UI component library.
- **Wouter**: Lightweight routing library.

## Deployment

### Cross-Platform Deployment Scripts
The project includes comprehensive deployment scripts:

- **`deploy.sh`**: Linux/macOS deployment script
- **`deploy.ps1`**: Windows PowerShell deployment script

Both scripts support multiple deployment platforms:
- Replit (recommended - current platform)
- Docker & Docker Compose
- VPS/Cloud Server with Nginx + PM2/Systemd
- Vercel, Netlify, Cloudflare Pages
- Windows IIS with iisnode
- Windows Service with NSSM

Run `./deploy.sh --help` or `.\deploy.ps1 -Help` for usage instructions.

### Contact Information
- **Phone**: +91 94839 40400
- **Email**: info@rapidsroosts.com
- **WhatsApp**: https://wa.me/919483940400
- **Address**: Dandeli, Karnataka, India - 581325

### Recent Changes (November 2025)
- Converted from booking application to purely informational website
- Removed all booking functionality, forms, and database dependencies
- Removed all pricing information from activities, accommodations, and packages
- Updated all CTAs to informational actions ("Contact Us", "Learn More", "Explore Activities")
- Maintained comprehensive SEO optimization for search engine rankings
- Added comprehensive cross-platform deployment scripts (Linux, macOS, Windows)
- Created Docker, Nginx, PM2, Vercel, Netlify, Cloudflare, IIS configurations
- Updated header branding to "Adventure Dandeli"
- Added colorful brand-colored social media icons in footer
