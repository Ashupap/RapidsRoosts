# Rapids Roosts Dandeli - Tour Booking Application

## Overview
A modern, immersive tour booking web application featuring parallax animations, multi-step booking forms, and automated email notifications for Rapids Roosts Dandeli adventure tours in Karnataka, India. The complete website includes hero carousel, comprehensive content sections, booking system, and admin dashboard.

## Features

### Frontend Features
- **Video Hero Section**: Fullscreen hero carousel with TRAVALO-style layout featuring vibrant water rafting imagery
  - Smooth AnimatePresence crossfade transitions (1.2s easeInOut)
  - Auto-rotation every 12 seconds with manual navigation arrows
  - Video playback with automatic fallback to high-quality stock images
  - Parallax scroll effects with dynamic titles per slide
  - Logo integration in navigation header

- **Complete Content Sections**:
  - **About Dandeli**: 2-column layout with 4 feature highlights (Water Sports, Adventure, Wilderness, Eco Tourism) and image grid showcasing activities
  - **Activities Section**: 4 comprehensive activity cards with detailed descriptions and pricing (White Water Rafting ₹600-₹1,500, Jungle Safari ₹600, Kayaking, Forest Trekking)
  - **Adventure Packages**: 3 packages with full details - Couple (₹2,200/person), Family (₹2,000/person - MOST POPULAR), Student (₹1,800/person)
  - **Top Attractions**: 6 sightseeing destinations with icon-based cards (Supa Dam, Syntheri Rocks, Kavala Caves, Backwater, Crocodile Park, Moulangi Eco Park)
  - **Testimonials**: 4 authentic customer reviews from dandeli360.com
  - **Professional Footer**: Logo, Quick Links, Contact Info (+91 94839 40400, Dandeli Karnataka 581325), Activities list

### Backend Features
- **Multi-Step Booking Form**: Progressive booking flow with real-time validation and dynamic summary sidebar
- **Booking Acknowledgement**: Beautiful confirmation page with animated water ripple effects
- **Status Tracking**: Color-coded booking status lookup with detailed information display
- **PostgreSQL Database**: Production-ready data persistence for all bookings with Drizzle ORM
- **Gmail Notifications**: Automated email confirmations sent to customers upon booking
- **Admin Dashboard**: Secure admin panel for managing bookings with bcrypt authentication

## Technology Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion (parallax animations)
- **Backend**: Express.js, Node.js
- **Data Storage**: Google Sheets API
- **Email**: Gmail API
- **Forms**: React Hook Form with Zod validation
- **State Management**: TanStack Query

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
│   │   │   ├── home.tsx    # Landing page with video hero
│   │   │   ├── booking.tsx # Multi-step booking form
│   │   │   ├── acknowledgement.tsx  # Confirmation page
│   │   │   ├── status.tsx  # Booking status tracker
│   │   │   ├── admin-login.tsx     # Admin authentication
│   │   │   └── admin-dashboard.tsx # Admin booking management
│   │   ├── components/     # Reusable UI components
│   │   └── lib/            # Utilities and configurations
├── server/
│   ├── integrations/
│   │   └── gmail.ts        # Email notification service
│   ├── routes.ts           # API endpoints
│   ├── storage.ts          # PostgreSQL storage layer
│   └── db.ts               # Database connection
├── shared/
│   └── schema.ts           # Shared data models and validation
├── public/
│   └── videos/             # Video assets for hero background
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
1. User browses adventures on home page
2. Clicks "Book Now" to start booking process
3. Completes 4-step form (Personal Details → Trip Details → Additional Info → Review)
4. Receives unique Booking ID (format: RRD-XXXXXX)
5. Gets confirmation email with booking details
6. Can track status anytime using Booking ID

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
