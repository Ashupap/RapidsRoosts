# Rapids Roosts Dandeli - Tour Booking Application

## Overview
A modern, immersive tour booking web application featuring parallax animations, multi-step booking forms, and automated email notifications for Rapids Roosts Dandeli adventure tours in Karnataka, India.

## Features
- **Immersive Home Page**: Fullscreen parallax hero section with nature-inspired design and horizontally scrolling adventure cards
- **Multi-Step Booking Form**: Progressive booking flow with real-time validation and dynamic summary sidebar
- **Booking Acknowledgement**: Beautiful confirmation page with animated water ripple effects
- **Status Tracking**: Color-coded booking status lookup with detailed information display
- **Google Sheets Integration**: Persistent data storage for all bookings
- **Gmail Notifications**: Automated email confirmations sent to customers upon booking

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
│   │   │   ├── home.tsx    # Landing page with parallax hero
│   │   │   ├── booking.tsx # Multi-step booking form
│   │   │   ├── acknowledgement.tsx  # Confirmation page
│   │   │   └── status.tsx  # Booking status tracker
│   │   ├── components/     # Reusable UI components
│   │   └── lib/            # Utilities and configurations
├── server/
│   ├── integrations/
│   │   ├── gmail.ts        # Email notification service
│   │   └── sheets.ts       # Google Sheets data persistence
│   ├── routes.ts           # API endpoints
│   └── storage.ts          # Data storage interface
├── shared/
│   └── schema.ts           # Shared data models and validation
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

## Future Enhancements (Not in MVP)
- Admin dashboard for managing bookings
- WhatsApp notifications for admins
- Payment gateway integration (Razorpay)
- Booking modification and cancellation
- PostgreSQL migration for production scalability

## Implementation Notes

### Data Integrity
- All dates are validated to ensure ISO format (YYYY-MM-DD) before submission
- Date inputs include onChange validators to prevent format corruption
- Booking IDs are generated using nanoid for uniqueness

### Persistence Strategy
- In-memory cache provides fast lookups during the same session
- Google Sheets provides durable persistence across server restarts
- Spreadsheet ID automatically persisted to `.sheet_id` file
- Optional: Set GOOGLE_SHEET_ID environment variable to override

### Email Notifications
- Confirmations sent asynchronously (fire-and-forget pattern)
- Errors logged but don't block booking creation
- All bookings start with "pending" status

### Production Deployment
1. Set GOOGLE_SHEET_ID in production environment secrets
2. Monitor Google Sheets/Gmail API quotas in logs
3. Spreadsheet ID from `.sheet_id` file ensures data continuity
4. All connector credentials managed securely by Replit
