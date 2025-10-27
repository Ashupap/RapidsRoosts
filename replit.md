# Rapids Roosts Dandeli - Tour Booking Application

## Overview
A modern, immersive tour booking web application featuring parallax animations, multi-step booking forms, and automated email notifications for Rapids Roosts Dandeli adventure tours in Karnataka, India. The complete website includes hero carousel, comprehensive content sections, booking system, and admin dashboard.

## Features

### Frontend Features
- **Comprehensive SEO Optimization**: Full search engine optimization across all pages
  - Meta tags (title, description, keywords) with dynamic page-specific content
  - Open Graph protocol for rich social media sharing (Facebook, LinkedIn)
  - Twitter Cards for enhanced Twitter previews
  - Structured data with JSON-LD schemas (LocalBusiness, TouristAttraction, Organization)
  - Canonical URLs derived from active routes
  - Geo-location meta tags for local search optimization
  - Automatic sitemap generation capability

- **Modern Mobile-Responsive Navigation**: Professional navigation system with mobile-first design
  - Desktop: Clean header with logo, navigation links, and contact button
  - Mobile: Hamburger menu with smooth Sheet-based slide-out panel
  - Contact information prominently displayed (phone, email)
  - Transparent overlay support for hero sections
  - Fully responsive across all device sizes

- **Dedicated Activities Page** (/activities): Comprehensive showcase of all adventure offerings
  - Card-based layout with high-quality activity images
  - Detailed information for each activity (pricing, duration, group size, difficulty)
  - Activity highlights and requirements
  - Seasonal availability information
  - Direct "Book Now" CTAs for each activity
  - Responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)
  - Smooth animations and hover effects

- **Enhanced Animations & Transitions**: Modern, performant animations throughout
  - Custom CSS animations: fadeInUp, fadeIn, scaleIn, slideIn (left/right)
  - Continuous animations: pulse-slow, shimmer, shake
  - Hover effects and micro-interactions on cards and buttons
  - Smooth scroll behavior across all pages
  - Grid pattern backgrounds for visual depth
  - Optimized for performance with CSS-based animations

- **Video Hero Section**: Fullscreen hero carousel with TRAVALO-style layout featuring vibrant water rafting imagery
  - Smooth AnimatePresence crossfade transitions (1.2s easeInOut)
  - Auto-rotation every 12 seconds with manual navigation arrows
  - Video playback with automatic fallback to high-quality stock images
  - Parallax scroll effects with dynamic titles per slide
  - Logo integration in navigation header

- **Complete Content Sections**:
  - **About Dandeli**: 2-column layout with 4 feature highlights (Water Sports, Adventure, Wilderness, Eco Tourism) and image grid showcasing activities
  - **Activities Section**: 4 comprehensive activity cards with detailed descriptions and pricing, each linking to dedicated detail pages
  - **Adventure Packages**: 3 packages with full details - Couple (₹2,200/person), Family (₹2,000/person - MOST POPULAR), Student (₹1,800/person)
  - **Top Attractions**: 6 sightseeing destinations with animated image cards featuring hover scale effects (Supa Dam, Syntheri Rocks, Kavala Caves, Backwater, Crocodile Park, Moulangi Eco Park)
  - **Adventure Gallery**: 8 high-quality images in responsive grid (4 columns desktop, 2 mobile) with zoom animations and "Start Your Adventure" CTA
  - **Testimonials**: 4 authentic customer reviews from dandeli360.com
  - **Professional Footer**: Logo, Quick Links, Contact Info (+91 94839 40400, Dandeli Karnataka 581325), Activities list

- **Activity Detail Pages**: Comprehensive standalone pages for each activity accessible via /rafting, /safari, /kayaking, /trekking
  - **White Water Rafting** (/rafting): 3 rafting options (Short 1-2 km - ₹500, Mid 5 km - ₹1,200, Long 9 km - ₹1,800), Grade 2-3 rapids info, equipment details, safety requirements, seasonal guide (Oct-June best, July-Sept monsoon)
  - **Jungle Safari** (/safari): Wildlife showcase (Tigers, Black Panthers, Elephants, 200+ bird species), safari timings (6:30 AM, 3:00 PM), best season guide, what to bring checklist
  - **Kayaking** (/kayaking): Flatwater (₹150/hour) and whitewater (₹300/hour) options, equipment provided, safety briefing details, suitable for all skill levels
  - **Forest Trekking** (/trekking): 6 popular trails (Shiroli Peak 1,934 ft, Kavala Caves, Syntheri Rocks, Magod Falls, Moulangi, Anshi), elevation details, trek duration (2-6 hours), difficulty levels
  - Each page features: Parallax hero section, quick info cards (duration, price, capacity, season), comprehensive activity descriptions, safety information, seasonal guides, what to bring lists, multiple "Book Now" CTAs, "Back to Home" navigation

### Backend Features
- **Multi-Step Booking Form**: Progressive booking flow with real-time validation and dynamic summary sidebar
- **Booking Acknowledgement**: Beautiful confirmation page with animated water ripple effects
- **Status Tracking**: Color-coded booking status lookup with detailed information display
- **PostgreSQL Database**: Production-ready data persistence for all bookings with Drizzle ORM
- **Gmail Notifications**: Automated email confirmations sent to customers upon booking
- **Admin Dashboard**: Secure admin panel for managing bookings with bcrypt authentication

## Technology Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion (parallax animations)
- **UI Components**: shadcn/ui (Sheet, Card, Button, Badge components)
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Email**: Gmail API via Replit connector
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query
- **SEO**: Custom React hooks with JSON-LD structured data
- **Icons**: Lucide React

## Setup Instructions

### 1. Google Sheets Integration
The application uses Google Sheets to persist booking data. On first run, the system will automatically create a new spreadsheet.

**Important**: After the first booking is created, check the server logs for a message like:
```
Created new spreadsheet: [SPREADSHEET_ID]
Please set GOOGLE_SHEET_ID environment variable to: [SPREADSHEET_ID]
```

**To ensure persistence across restarts:**
1. Copy the Spreadsheet ID from the logs
2. Add it as an environment variable in Replit Secrets:
   - Key: `GOOGLE_SHEET_ID`
   - Value: (paste the spreadsheet ID)

Without setting this environment variable, a new spreadsheet will be created on each server restart, and previous bookings won't be accessible.

### 2. Gmail Integration
Gmail integration is already configured via the Replit connector. Confirmation emails will be sent automatically when bookings are created.

### 3. Running the Application
The application is configured to run automatically:
```bash
npm run dev
```

## Project Structure
```
├── client/
│   ├── src/
│   │   ├── pages/          # Page components
│   │   │   ├── home.tsx    # Landing page with hero carousel, activities, attractions, gallery
│   │   │   ├── activities.tsx # Dedicated activities showcase page (NEW)
│   │   │   ├── rafting.tsx # White Water Rafting detail page
│   │   │   ├── safari.tsx  # Jungle Safari detail page
│   │   │   ├── kayaking.tsx # Kayaking detail page
│   │   │   ├── trekking.tsx # Forest Trekking detail page
│   │   │   ├── booking.tsx # Multi-step booking form
│   │   │   ├── acknowledgement.tsx  # Confirmation page
│   │   │   ├── status.tsx  # Booking status tracker
│   │   │   ├── admin-login.tsx     # Admin authentication
│   │   │   └── admin-dashboard.tsx # Admin booking management
│   │   ├── components/     # Reusable UI components
│   │   │   └── Navigation.tsx  # Mobile-responsive navigation (NEW)
│   │   ├── data/           # Application data
│   │   │   └── activities.ts   # Centralized activity data (NEW)
│   │   └── lib/            # Utilities and configurations
│   │       └── seo.ts      # SEO utilities and hooks (NEW)
├── server/
│   ├── integrations/
│   │   └── gmail.ts        # Email notification service
│   ├── routes.ts           # API endpoints
│   ├── storage.ts          # PostgreSQL storage layer
│   └── db.ts               # Database connection
├── shared/
│   └── schema.ts           # Shared data models and validation
├── attached_assets/
│   ├── stock_images/       # Activity images, attractions, gallery photos
│   └── generated_images/   # AI-generated activity illustrations
└── design_guidelines.md    # Design system documentation
```

## API Endpoints

### POST /api/bookings
Create a new booking
- **Request Body**: Customer details, activity type, dates, number of guests
- **Response**: `{ bookingId: "RRD-XXXXXX" }`
- **Side Effects**: Saves to Google Sheets, sends confirmation email

### GET /api/bookings/:bookingId
Retrieve booking by ID
- **Response**: Complete booking details with status

## Design System
The application follows a nature-inspired color palette:
- **Primary (Forest Green)**: #2F5D62 - Main CTAs, headers
- **Accent (River Blue)**: #3A95A9 - Focus states, interactive elements
- **Secondary (Earthy Brown)**: #7A5C3A - Pending status badges
- **Highlight (Vibrant Teal)**: #1ABC9C - Success states

Typography:
- **Headings**: Montserrat (bold, adventure-ready)
- **Body**: Open Sans (clean, readable)

## Booking Status Types
- **Pending**: Awaiting manual confirmation (earthy brown badge with pulse animation)
- **Confirmed**: Booking approved (vibrant teal with shimmer effect)
- **Rejected**: Booking declined (red with shake animation)

## Customer Journey
1. User lands on home page with hero carousel, activities preview, attractions, and gallery
2. Can explore all activities via dedicated Activities page (/activities) with comprehensive information
3. Can either:
   - Click "Learn More" on any activity card to view detailed activity page (rafting/safari/kayaking/trekking)
   - Click "Book Now" directly to start booking process
4. From detail pages, users can explore comprehensive activity information and click "Book Now"
5. Completes 4-step booking form (Personal Details → Trip Details → Additional Info → Review)
6. Receives unique Booking ID (format: RRD-XXXXXX)
7. Gets confirmation email with booking details via Gmail
8. Can track booking status anytime using Booking ID via /status page
9. Admin reviews and updates booking status (pending → confirmed/rejected)
10. Customer receives status update email notification

## SEO Features (NEW)
- **Dynamic Meta Tags**: Each page has unique, optimized title, description, and keywords
- **Social Sharing**: Open Graph and Twitter Card meta tags for rich social previews
- **Structured Data**: JSON-LD schemas for LocalBusiness and TouristAttraction
- **Local SEO**: Geo-location tags for Dandeli, Karnataka coordinates
- **Canonical URLs**: Proper canonical URLs derived from current route
- **Mobile Optimization**: Viewport and mobile-friendly meta tags

## Admin Features (Phase 2 - Completed)

### Admin Authentication
- **Login System**: Session-based authentication using Passport.js
- **Password Security**: Bcrypt hashing with 10 salt rounds
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple
- **Default Credentials**: username: `admin`, password: `admin123` (CHANGE IN PRODUCTION!)
- **Routes**: 
  - `/admin/login` - Admin login page
  - `/admin/dashboard` - Admin dashboard (protected)

### Admin Dashboard
- **View All Bookings**: Table view with pagination and search
- **Search & Filter**: Search by booking ID, name, or email; filter by status
- **Booking Management**:
  - Confirm bookings (changes status to "confirmed")
  - Reject bookings (changes status to "rejected")
  - View all booking details
- **Statistics**: Real-time counts for total, pending, confirmed, and rejected bookings
- **Email Notifications**: Automatic status update emails sent to customers via Gmail

### API Endpoints (Admin)
- `POST /api/admin/login` - Authenticate admin
- `POST /api/admin/logout` - Logout admin
- `GET /api/admin/check` - Check auth status
- `GET /api/admin/bookings` - Get all bookings (protected)
- `PATCH /api/admin/bookings/:bookingId/status` - Update booking status (protected)

## Future Enhancements (Phase 3)

### WhatsApp Notifications (Pending Setup)
- **Integration Required**: Twilio connector for WhatsApp Business API
- **Purpose**: Send real-time alerts to admin when new bookings arrive
- **Setup Steps**: 
  1. Set up Twilio connector in Replit
  2. Configure WhatsApp Business API with Twilio
  3. Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER as secrets
  4. Implement notification service in server/integrations/whatsapp.ts
- **Note**: Dismissed for now - can be added later when Twilio is configured

### Payment Gateway Integration (Razorpay)
- Add payment collection during booking process
- Store payment status in database
- Handle payment callbacks and confirmations
- Support deposits and full payments

### Enhanced Booking Management
- Allow customers to cancel bookings online
- Allow customers to modify booking dates/details
- Admin interface for processing refunds
- Cancellation policies and automated refund calculations

## Implementation Notes

### Video Hero Section
- Place video files in `public/videos/` directory:
  - `water-rafting.mp4` - Water rafting adventure footage
  - `jungle-safari.mp4` - Jungle safari and wildlife footage
  - `forest-camp.mp4` - Forest camping and nature footage
- Recommended specs: MP4, 1920x1080, H.264 codec, <10MB, 10-30 seconds
- Automatic fallback to stock images if videos are unavailable
- Supports autoplay, loop, and muted playback for best UX

### Data Integrity
- All dates are validated to ensure ISO format (YYYY-MM-DD) before submission
- Date inputs include onChange validators to prevent format corruption
- Booking IDs are generated using nanoid for uniqueness

### Database
- PostgreSQL database with Drizzle ORM for production scalability
- Session storage in PostgreSQL via connect-pg-simple
- Password hashing with bcrypt (10 salt rounds)

### Email Notifications
- Confirmations sent asynchronously (fire-and-forget pattern)
- Errors logged but don't block booking creation
- All bookings start with "pending" status

### Production Deployment
1. Set GOOGLE_SHEET_ID in production environment secrets
2. Monitor Google Sheets/Gmail API quotas in logs
3. Spreadsheet ID from `.sheet_id` file ensures data continuity
4. All connector credentials managed securely by Replit
