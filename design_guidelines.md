# Rapids Roosts Dandeli - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from immersive nature/travel platforms like Airbnb (booking flow) and National Geographic (nature storytelling), enhanced with parallax-driven engagement similar to Firewatch game aesthetics.

## Core Design Principles
- **Immersive Nature Experience**: Multi-layered parallax creates depth and connection to Karnataka's wilderness
- **Seamless Booking Journey**: Clear progress indicators and visual feedback at every step
- **Trust & Transparency**: Status tracking with color-coded clarity and real-time updates

## Color Palette

### Brand Colors
- **Primary (Forest Green)**: 162 45% 28% - Main CTAs, headers, progress indicators
- **Accent (River Blue)**: 190 49% 45% - Focus states, interactive elements, links
- **Secondary (Earthy Brown)**: 30 35% 35% - Pending status badges, secondary buttons
- **Highlight (Vibrant Teal)**: 168 63% 43% - Success states, confirmed bookings

### Neutrals & Backgrounds
- **Background (Off-White)**: 0 0% 97% - Page backgrounds, card containers
- **Text (Dark Charcoal)**: 0 0% 20% - Primary text, headings
- **Border/Divider**: 0 0% 85% - Subtle separators

## Typography

### Font Families
- **Headings/CTAs**: Montserrat (600-700 weight) - Bold, adventure-ready
- **Body Text**: Open Sans (400-600 weight) - Clean, readable

### Type Scale
- **Hero Headline**: 3xl-6xl, font-bold, tracking-tight
- **Section Headers**: 2xl-4xl, font-semibold
- **Card Titles**: xl-2xl, font-semibold
- **Body**: base-lg, font-normal
- **Captions**: sm-base, font-medium

## Layout System

### Spacing Primitives
Use Tailwind units: **4, 6, 8, 12, 16, 20, 24** for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: py-16 to py-24
- Card gaps: gap-6 to gap-8

### Container Strategy
- **Full-width sections**: max-w-7xl mx-auto px-6
- **Content areas**: max-w-6xl
- **Forms**: max-w-2xl

## Component Library

### Hero Section (Home Page)
- **Fullscreen video/image**: h-screen with dark overlay (opacity-40)
- **Layered parallax**: 3 depth levels (canopy, river, mist) with transform-gpu
- **CTA Block**: Centered, backdrop-blur-md bg-white/10, rounded-2xl p-8
- **Typed-effect tagline**: Animated text reveal

### Booking Form (Multi-Step)
- **Progress Bar**: Top-fixed, forest-green fill with step indicators
- **Form Cards**: bg-white shadow-xl rounded-xl p-8
- **Input Fields**: 
  - Default: border-gray-300 rounded-lg
  - Focus: ring-2 ring-river-blue border-river-blue
  - Error: border-red-500 with shake animation
- **Sidebar Summary**: Sticky positioning, parallax offset on scroll

### Status Cards
- **Pending**: Earthy brown badge with pulse animation (animate-pulse)
- **Confirmed**: Vibrant teal with shine effect (gradient shimmer)
- **Rejected**: Red with shake animation (animate-shake)
- **Booking ID**: Monospace font, larger size, copyable

### Adventure Highlight Cards
- **Horizontal scroll**: overflow-x-auto snap-x snap-mandatory
- **Card design**: aspect-video, rounded-xl, overflow-hidden
- **Hover state**: scale-105 shadow-2xl transition-all duration-300
- **Icon overlay**: Absolute positioning with hover zoom

### Buttons
- **Primary**: bg-forest-green text-white rounded-lg px-6 py-3 hover:bg-forest-green/90
- **Secondary**: bg-river-blue text-white
- **Outline on Images**: backdrop-blur-md bg-white/20 border-2 border-white/50 text-white
- **Sticky CTA**: Pulsating glow when form valid (shadow-lg shadow-teal-500/50)

## Parallax Animation Specifications

### Implementation Layers
1. **Background Layer**: transform: translateY(scrollY * 0.5) - slowest
2. **Mid Layer**: transform: translateY(scrollY * 0.3)
3. **Foreground**: transform: translateY(scrollY * 0.1) - fastest

### Scroll-Triggered Animations
- **Fade-in**: opacity-0 to opacity-100 when in viewport
- **Slide-up**: translate-y-10 to translate-y-0
- **Scale-in**: scale-95 to scale-100
- **Stagger delay**: 100ms between sequential elements

### Performance Optimizations
- Use `transform-gpu` for hardware acceleration
- Lighter animations on mobile (prefers-reduced-motion)
- Intersection Observer for viewport detection
- Debounced scroll handlers

## Page-Specific Guidelines

### Home Page
- Hero: Full viewport with looping video background
- Quick search: Floating card with 3-column date/activity/guests grid
- Adventure cards: 6-8 cards in horizontal scroll container
- Footer: 4-column grid (about, links, contact, social)

### Booking Page
- 4-step process: Details → Activities → Review → Payment
- Left: Form (w-2/3), Right: Summary sidebar (w-1/3, sticky top-24)
- Mobile: Stack vertically with summary as expandable bottom sheet

### Acknowledgement Page
- Centered card: max-w-2xl with confirmation details
- Animated water ripple background: SVG with continuous wave animation
- Pending badge: Pulse every 3s
- Check Status CTA: Prominent gradient button

### Status Page
- Search-first: Large centered input with booking ID format hint
- Result card: Slide-in from bottom with status-specific styling
- Timeline view: Vertical progress with checkpoints

## Images

### Hero Images/Video
- **Home Page**: Drone footage of Dandeli forests/river (16:9 ratio, 1920x1080 min)
- **Booking Page**: Subtle forest canopy background (parallax-ready, layered PNGs)
- **Acknowledgement**: Water ripple pattern (animated SVG or subtle video loop)
- **Status Page**: Mountain silhouette layers for parallax effect

### Activity Cards
- High-quality action shots: rafting, safari, trekking (1200x800 recommended)
- Consistent aspect ratio across all cards
- Overlay gradient: linear-gradient(to top, rgba(0,0,0,0.7), transparent)

## Accessibility & Responsiveness

### Dark Mode
Not required for nature/outdoor theme - light mode emphasizes natural daylight aesthetics

### Motion Preferences
- Respect `prefers-reduced-motion`: Disable parallax, use fade transitions only
- Provide toggle for animation intensity in settings

### Mobile Adaptations
- Parallax: Reduce layers from 3 to 2, slower scroll ratios
- Cards: Single column stacking
- Sticky elements: Convert to bottom sheets or inline placement

### Keyboard Navigation
- Clear focus rings: ring-2 ring-offset-2 ring-forest-green
- Skip navigation links for form steps
- Aria labels for all interactive elements

---

**Design Philosophy**: Create an immersive digital gateway to Dandeli's wilderness through layered visuals, smooth animations, and intuitive booking flow that builds trust and excitement for the adventure ahead.