# Rapids Roosts Dandeli - Tour Booking Application

## Overview
Rapids Roosts Dandeli is a modern, immersive tour booking web application for adventure tours in Dandeli, Karnataka, India. It features a comprehensive booking system, automated notifications, and an admin dashboard. The project aims to provide a seamless user experience for booking activities like white-water rafting, jungle safaris, kayaking, and trekking, while offering robust management tools for administrators. The ambition is to create a leading platform for adventure tourism in the region, focusing on user engagement and efficient booking processes.

## User Preferences
I prefer detailed explanations and iterative development. Ask before making major changes. Do not make changes to the `attached_assets/` folder. Do not make changes to the `design_guidelines.md` file.

## System Architecture
The application follows a client-server architecture. The frontend is built with React, TypeScript, Tailwind CSS, and Framer Motion, focusing on a responsive, animation-rich UI/UX with the vibrant "Adventure Pulse" color palette (Teal Rapids hsl(182, 78%, 38%), Ember Trail hsl(17, 92%, 55%), Jungle Canopy hsl(138, 54%, 32%), Moonlit Mist hsl(210, 40%, 96%)) and Montserrat/Open Sans typography. Key UI components are sourced from shadcn/ui. The backend uses Express.js and Node.js, interacting with a PostgreSQL database via Drizzle ORM for data persistence. Booking confirmations are handled via Gmail API, and Google Sheets is used for initial data storage. The system includes a multi-step booking form with real-time validation, a status tracking system, and an SEO-optimized structure with dynamic meta tags, structured data, and canonical URLs. An admin dashboard provides secure management of bookings with bcrypt authentication and session-based login.

### Key Features:
- **Comprehensive SEO Optimization**: Dynamic meta tags, Open Graph, Twitter Cards, JSON-LD schemas, canonical URLs, and geo-location tags.
- **Modern Mobile-Responsive Navigation**: Professional navigation with desktop and mobile (hamburger menu) support. Includes About Us page link.
- **About Us Page**: Complete company story page with video hero, statistics, core values, sustainability commitment, and environmental promise sections.
- **Dedicated Activities Page & Detail Pages**: Showcase and detailed information for various adventure activities.
- **Adventure Pulse Design System**: Vibrant adventure-themed color palette with glassmorphic UI elements, right-aligned hero booking card for unobstructed content viewing.
- **Advanced Parallax Effects**: Reusable ParallaxImage, ParallaxText, and ParallaxLayer components with configurable speeds applied to images and activity cards for depth perception.
- **Adventure-Themed Animations**: Campfire effects at hero footer, water droplets in nature sections, wildlife silhouettes (birds, deer), and floating leaves - all with WCAG-compliant accessibility.
- **Video Hero Section**: Fullscreen hero carousel with video playback, auto-rotation (12s intervals), and parallax scroll effects - all respecting user motion preferences.
- **Mobile-Optimized Booking Form**: Compact single-calendar date picker with smart check-in/check-out selection, max-height constraints (70vh), scrollable popovers, and condensed guest picker for optimal mobile experience.
- **Multi-Step Booking Form**: Progressive booking flow with validation and dynamic summary.
- **Automated Email Notifications**: Gmail API integration for booking confirmations and status updates.
- **Admin Dashboard**: Secure panel for managing bookings, including status updates and search/filter capabilities.
- **Full Accessibility Compliance**: All continuous animations (parallax, auto-rotation, adventure effects) respect prefers-reduced-motion using framer-motion's SSR-safe hook.

## External Dependencies
- **SQLite**: Primary database for both development and production (file-based, no server required).
- **Google Sheets API**: Used for initial booking data persistence (requires `GOOGLE_SHEET_ID` environment variable).
- **Gmail API**: For sending automated email notifications (booking confirmations and status updates).
- **Replit Connectors**: Utilized for secure integration with Gmail and potentially Google Sheets.
- **Lucide React**: Icon library.
- **Passport.js**: For admin authentication.
- **Bcrypt**: Password hashing for admin credentials.

## Deployment
The application includes comprehensive setup scripts for Windows environments in the `/deployment` directory:
- **Quick Setup Script**: Automated PowerShell script (`dev-setup.ps1`) for one-click development environment configuration
- **Development Guide**: Complete step-by-step setup instructions (`DEPLOYMENT_GUIDE.md`)
- **Production Guide**: SQLite production deployment best practices (`PRODUCTION_NOTES.md`)
- **Configuration Files**: Environment templates for development and production (`.env.example`, `.env.production.example`)
- **PM2 Config**: Process management configuration for development and production (`ecosystem.config.js`)
- **Backup Scripts**: Automated database backup strategies for production

### Database Strategy
- **Development**: Uses `dev.db` SQLite file for local testing
- **Production**: Uses `production.db` SQLite file with automated daily backups
- **Advantages**: Zero configuration, file-based backups, excellent performance for tourism booking sites