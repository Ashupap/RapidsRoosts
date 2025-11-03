import { Link, useLocation } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar, Users, ChevronRight, ChevronLeft, Waves, Mountain, Compass, Send, MapPin, Search, Mail, Phone, Hotel, Plane, Car, CalendarIcon, Minus, Plus, Home as HomeIcon, Building2, Bed } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import { useSEO, injectStructuredData } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ParallaxImage, ParallaxText } from "@/components/ParallaxSection";
import { CampfireEffect, WaterDroplets, WildlifeSilhouette } from "@/components/AdventureEffects";
import BookingModal from "@/components/BookingModal";
import raftingHero1 from "@assets/stock_images/vibrant_water_raftin_9419a08c.jpg";
import raftingHero2 from "@assets/stock_images/vibrant_water_raftin_5f8fedad.jpg";
import raftingHero3 from "@assets/stock_images/vibrant_water_raftin_24bbd1b7.jpg";
import heroVideo from "@assets/hero-video-compressed.mp4";
import safariImage1 from "@assets/stock_images/jungle_safari_wildli_f86a9bfa.jpg";
import safariImage2 from "@assets/stock_images/jungle_safari_wildli_5c354858.jpg";
import campImage1 from "@assets/stock_images/forest_camping_tents_2caeb335.jpg";
import campImage2 from "@assets/stock_images/forest_camping_tents_a8893aea.jpg";
import logo from "@assets/logo_1761304770834.jpg";
import safariImage from "@assets/generated_images/Jungle_safari_wildlife_adventure_3300876a.png";
import trekkingImage from "@assets/generated_images/Forest_trekking_adventure_trail_14dd1cd1.png";
import kayakingImage from "@assets/generated_images/Peaceful_kayaking_river_adventure_e3974c90.png";
import attraction1 from "@assets/stock_images/beautiful_scenic_att_1cdf7d23.jpg";
import attraction2 from "@assets/stock_images/beautiful_scenic_att_77cd0564.jpg";
import attraction3 from "@assets/stock_images/beautiful_scenic_att_bdb908e4.jpg";
import attraction4 from "@assets/stock_images/beautiful_scenic_att_039c94ac.jpg";
import attraction5 from "@assets/stock_images/beautiful_scenic_att_cd48e758.jpg";
import attraction6 from "@assets/stock_images/beautiful_scenic_att_54162866.jpg";
import gallery1 from "@assets/stock_images/adventure_sports_gal_5c0d834f.jpg";
import gallery2 from "@assets/stock_images/adventure_sports_gal_e8f9751c.jpg";
import gallery3 from "@assets/stock_images/adventure_sports_gal_5bf20dc4.jpg";
import gallery4 from "@assets/stock_images/adventure_sports_gal_479a2b17.jpg";
import gallery5 from "@assets/stock_images/adventure_sports_gal_18a21954.jpg";
import gallery6 from "@assets/stock_images/adventure_sports_gal_925d082f.jpg";
import gallery7 from "@assets/stock_images/adventure_sports_gal_01231397.jpg";
import gallery8 from "@assets/stock_images/adventure_sports_gal_57d199b3.jpg";
import resort1 from "@assets/stock_images/luxury_resort_accomm_d96d2ca3.jpg";
import homestay1 from "@assets/stock_images/cozy_homestay_cottag_37c83eba.jpg";

const activities = [
  {
    id: "rafting",
    title: "White Water Rafting",
    description: "Navigate through Grade 2-3 rapids on the Kali River. Options: 9 km (Long Rafting - 3 hours) or 1 km (Short Rafting - 1 hour)",
    image: raftingHero2,
    icon: Waves,
    duration: "1-3 hours",
    difficulty: "Moderate to Advanced",
    price: "₹600 - ₹1,500",
  },
  {
    id: "safari",
    title: "Jungle Safari",
    description: "Explore 834 sq km wildlife sanctuary home to tigers, leopards, sloth bears, and exotic birds. Guided jeep safari through pristine forests",
    image: safariImage,
    icon: Compass,
    duration: "2-3 hours",
    difficulty: "Easy",
    price: "₹600/person",
  },
  {
    id: "trekking",
    title: "Forest Trekking",
    description: "Discover hidden trails through Western Ghats with breathtaking vistas and rich biodiversity",
    image: trekkingImage,
    icon: Mountain,
    duration: "4-6 hours",
    difficulty: "Moderate",
    price: "Included in package",
  },
  {
    id: "kayaking",
    title: "Kayaking",
    description: "Paddle through serene Kali River waters, perfect for beginners and experienced kayakers alike",
    image: kayakingImage,
    icon: Send,
    duration: "2-3 hours",
    difficulty: "Easy to Moderate",
    price: "Included in package",
  },
];

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("rafting");
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [guestPickerOpen, setGuestPickerOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [selectingCheckOut, setSelectingCheckOut] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  
  useSEO({
    title: 'Rapids & Roosts Dandeli - #1 Adventure Tourism in Karnataka | White Water Rafting, Safari & Trekking',
    description: 'Best adventure tourism in Dandeli, Karnataka. Experience white water rafting on Kali River, jungle safaris in 834 sq km wildlife sanctuary, forest trekking in Western Ghats, and kayaking. Book your Dandeli tour package with Rapids & Roosts - rated #1 for adventure sports in Karnataka.',
    keywords: 'Dandeli, Dandeli tourism, adventure tourism Karnataka, best adventure tourism Karnataka, white water rafting Dandeli, jungle safari Dandeli, Dandeli packages, Kali river rafting, Western Ghats trekking, Dandeli wildlife sanctuary, adventure sports Karnataka, Dandeli tour booking, things to do in Dandeli',
  });

  injectStructuredData('organization');
  injectStructuredData('localBusiness');
  injectStructuredData('touristDestination');
  
  injectStructuredData('faqPage', {
    faqs: [
      {
        question: "What is the best time to visit Dandeli?",
        answer: "The best time to visit Dandeli is from October to May. October to February offers pleasant weather (15-28°C) perfect for all activities. March to May is ideal for white water rafting as the Kali River has strong currents. Avoid monsoon season (June-September) as most adventure activities are closed for safety."
      },
      {
        question: "How do I reach Dandeli from Bangalore?",
        answer: "Dandeli is approximately 460 km from Bangalore. You can reach by: 1) Road: 8-9 hours drive via NH48 and NH63. Regular buses available from Bangalore Majestic. 2) Train: Take a train to Hubli (400 km), then taxi/bus to Dandeli (72 km). 3) Flight: Fly to Hubli Airport, then 2-hour drive to Dandeli."
      },
      {
        question: "What activities are included in Dandeli tour packages?",
        answer: "Our Dandeli packages include white water rafting (9 km or 1 km options), jungle safari in 834 sq km wildlife sanctuary, forest trekking through Western Ghats, kayaking on Kali River, bird watching, and nature walks. All safety equipment, guides, and permits are included."
      },
      {
        question: "Is Dandeli safe for families and children?",
        answer: "Yes, Dandeli is completely safe for families! We offer age-appropriate activities: jungle safaris suitable for all ages, easy trekking trails for children 5+, and short rafting (1 km) for beginners. Our experienced guides ensure safety with quality equipment and thorough briefings."
      },
      {
        question: "What wildlife can I see in Dandeli Wildlife Sanctuary?",
        answer: "Dandeli Wildlife Sanctuary (834 sq km) is home to Bengal tigers, black panthers, leopards, sloth bears, elephants, Indian bison, deer species, crocodiles, and over 300 bird species including hornbills, kingfishers, and eagles."
      },
      {
        question: "What should I pack for a Dandeli trip?",
        answer: "Essentials: Comfortable clothing, sturdy shoes for trekking, swimwear for water activities, sunscreen (SPF 50+), insect repellent, hat/cap, sunglasses, camera, power bank, personal medications, and a light jacket for evenings. We provide all safety gear and helmets."
      },
      {
        question: "What accommodation options are available in Dandeli?",
        answer: "We offer diverse accommodations: Riverside Cottages (scenic Kali River views), Luxury Tents (glamping experience), Jungle Treehouses (elevated stays amidst nature), and Shared Dormitories (budget-friendly). All options include meals, WiFi access, and 24/7 hot water."
      },
      {
        question: "How difficult is white water rafting in Dandeli?",
        answer: "Dandeli offers Grade 2-3 rapids, suitable for beginners to intermediate rafters. No prior experience needed! We offer 1 km Short Rafting (1 hour, easy for first-timers) and 9 km Long Rafting (2-3 hours, more thrilling). Professional instructors provide complete training."
      }
    ]
  });

  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? "0%" : "0%", prefersReducedMotion ? "0%" : "20%"]);

  const handleBookNow = () => {
    setBookingModalOpen(true);
  };

  const getDefaultBookingValues = () => ({
    activities: activeTab ? [activeTab] : [],
    checkInDate: checkInDate ? format(checkInDate, "yyyy-MM-dd") : "",
    checkOutDate: checkOutDate ? format(checkOutDate, "yyyy-MM-dd") : "",
    numberOfGuests: adults + children,
  });

  const totalGuests = adults + children;
  const guestsText = `${totalGuests} Guest${totalGuests !== 1 ? 's' : ''}, ${rooms} Room${rooms !== 1 ? 's' : ''}`;
  const dateRangeText = checkInDate && checkOutDate 
    ? `${format(checkInDate, "MMM dd")} - ${format(checkOutDate, "MMM dd, yyyy")}`
    : "Select dates";

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section - Redesigned */}
      <section ref={heroRef} className="relative h-screen md:min-h-[90vh] overflow-hidden -mt-20 pt-20">
        {/* Background Video with Parallax */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={raftingHero1}
            onLoadedData={() => setVideoLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          
          {/* Fallback Image - shown until video loads */}
          {!videoLoaded && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${raftingHero1})` }}
            />
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-teal-900/30" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 md:px-6 pt-16 md:pt-20 pb-8 md:pb-28 h-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto mb-4 md:mb-8"
          >
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-3 md:mb-4 leading-tight tracking-tight" data-testid="text-hero-title">
              Discover Your Next Adventure in Dandeli
            </h1>
            <p className="text-white/90 text-lg sm:text-xl md:text-xl lg:text-2xl font-medium" data-testid="text-hero-subtitle">
              Unforgettable Experiences Await in Nature's Paradise
            </p>
          </motion.div>

          {/* Booking Form Card - Narrower Design */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-2xl"
          >
            <Card className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg shadow-2xl overflow-hidden border-0 rounded-none">
              <CardContent className="p-0">
                {/* Tabs for Activity Types */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full grid grid-cols-4 rounded-none h-12 bg-gray-800 dark:bg-gray-900 border-0" data-testid="tabs-activity-selector">
                    <TabsTrigger 
                      value="rafting" 
                      className="data-[state=active]:bg-primary data-[state=active]:text-white text-white rounded-none h-full text-xs md:text-sm font-bold uppercase"
                      data-testid="tab-rafting"
                    >
                      <Waves className="h-4 w-4 md:h-5 md:w-5 md:mr-2" />
                      <span className="hidden md:inline">Rafting</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="safari" 
                      className="data-[state=active]:bg-primary data-[state=active]:text-white text-white rounded-none h-full text-xs md:text-sm font-bold uppercase"
                      data-testid="tab-safari"
                    >
                      <Compass className="h-4 w-4 md:h-5 md:w-5 md:mr-2" />
                      <span className="hidden md:inline">Safari</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="trekking" 
                      className="data-[state=active]:bg-primary data-[state=active]:text-white text-white rounded-none h-full text-xs md:text-sm font-bold uppercase"
                      data-testid="tab-trekking"
                    >
                      <Mountain className="h-4 w-4 md:h-5 md:w-5 md:mr-2" />
                      <span className="hidden md:inline">Trekking</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="kayaking" 
                      className="data-[state=active]:bg-primary data-[state=active]:text-white text-white rounded-none h-full text-xs md:text-sm font-bold uppercase"
                      data-testid="tab-kayaking"
                    >
                      <Send className="h-4 w-4 md:h-5 md:w-5 md:mr-2" />
                      <span className="hidden md:inline">Kayaking</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Booking Form */}
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Date Picker - Compact & Animated */}
                      <div>
                        <Popover open={datePickerOpen} onOpenChange={(open) => {
                          setDatePickerOpen(open);
                          if (!open) setSelectingCheckOut(false);
                        }}>
                          <PopoverTrigger asChild>
                            <button
                              className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer text-left flex items-center gap-2 hover:border-primary transition-colors"
                              data-testid="button-date-picker"
                            >
                              <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
                              <span className="text-sm truncate">{dateRangeText === "Select dates" ? "Check In/Check out Date" : dateRangeText}</span>
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 max-h-[60vh] overflow-y-auto" align="start" side="bottom">
                            <div className="p-2">
                              {/* Compact Date Range Display */}
                              {checkInDate && checkOutDate && (
                                <motion.div 
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="mb-2 p-2 bg-primary/10 rounded-md border border-primary/20"
                                >
                                  <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                      <div className="text-center">
                                        <div className="text-[10px] text-muted-foreground uppercase">Check-in</div>
                                        <div className="font-bold text-primary">{format(checkInDate, "MMM dd")}</div>
                                      </div>
                                      <div className="text-primary">→</div>
                                      <div className="text-center">
                                        <div className="text-[10px] text-muted-foreground uppercase">Check-out</div>
                                        <div className="font-bold text-primary">{format(checkOutDate, "MMM dd")}</div>
                                      </div>
                                    </div>
                                    <div className="text-[10px] text-muted-foreground">
                                      {Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))} nights
                                    </div>
                                  </div>
                                </motion.div>
                              )}

                              {/* Compact Calendar with Range Highlighting */}
                              <style>
                                {`
                                  .compact-calendar .rdp {
                                    --rdp-cell-size: 32px;
                                    font-size: 12px;
                                  }
                                  .compact-calendar .rdp-months {
                                    margin: 0;
                                  }
                                  .compact-calendar .rdp-month {
                                    margin: 0;
                                  }
                                  .compact-calendar .rdp-caption {
                                    padding: 4px 8px;
                                    margin-bottom: 4px;
                                  }
                                  .compact-calendar .rdp-nav {
                                    padding: 0;
                                  }
                                  .compact-calendar .rdp-nav_button {
                                    width: 24px;
                                    height: 24px;
                                  }
                                  .compact-calendar .rdp-table {
                                    margin: 0;
                                  }
                                  .compact-calendar .rdp-head_cell {
                                    font-size: 10px;
                                    padding: 2px;
                                  }
                                  .compact-calendar .rdp-cell {
                                    padding: 1px;
                                  }
                                  .compact-calendar .rdp-day {
                                    width: 32px;
                                    height: 32px;
                                    font-size: 12px;
                                  }
                                  .compact-calendar .date-in-range {
                                    background: linear-gradient(135deg, hsl(182, 78%, 38%, 0.15) 0%, hsl(182, 78%, 38%, 0.25) 100%);
                                    position: relative;
                                  }
                                  .compact-calendar .date-in-range::after {
                                    content: '';
                                    position: absolute;
                                    inset: 0;
                                    border-radius: 0.25rem;
                                    animation: pulse-range 2s ease-in-out infinite;
                                  }
                                  @keyframes pulse-range {
                                    0%, 100% { box-shadow: 0 0 0 0 hsl(182, 78%, 38%, 0.4); }
                                    50% { box-shadow: 0 0 0 2px hsl(182, 78%, 38%, 0.2); }
                                  }
                                  .compact-calendar .rdp-day_selected {
                                    background-color: hsl(182, 78%, 38%) !important;
                                    color: white !important;
                                    font-weight: bold;
                                  }
                                  .compact-calendar .date-endpoint {
                                    background-color: hsl(182, 78%, 38%) !important;
                                    color: white !important;
                                    font-weight: bold;
                                  }
                                `}
                              </style>
                              <div className="compact-calendar">
                                <CalendarComponent
                                  mode="single"
                                  selected={selectingCheckOut ? checkOutDate : checkInDate}
                                  onSelect={(date) => {
                                    if (!date) return;
                                    
                                    if (!checkInDate || selectingCheckOut) {
                                      if (!checkInDate) {
                                        setCheckInDate(date);
                                        setCheckOutDate(addDays(date, 1));
                                        setSelectingCheckOut(true);
                                      } else {
                                        setCheckOutDate(date);
                                        setSelectingCheckOut(false);
                                      }
                                    } else {
                                      setCheckInDate(date);
                                      setCheckOutDate(addDays(date, 1));
                                      setSelectingCheckOut(true);
                                    }
                                  }}
                                  disabled={(date) => {
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    
                                    if (selectingCheckOut && checkInDate) {
                                      return date <= checkInDate;
                                    }
                                    return date < today;
                                  }}
                                  modifiers={{
                                    inRange: (date) => {
                                      if (!checkInDate || !checkOutDate) return false;
                                      return date > checkInDate && date < checkOutDate;
                                    },
                                    endpoint: (date) => {
                                      if (!checkInDate || !checkOutDate) return false;
                                      const dateTime = date.getTime();
                                      return dateTime === checkInDate.getTime() || dateTime === checkOutDate.getTime();
                                    }
                                  }}
                                  modifiersClassNames={{
                                    inRange: 'date-in-range',
                                    endpoint: 'date-endpoint'
                                  }}
                                  initialFocus
                                  className="rounded-md border-0"
                                />
                              </div>

                              {/* Compact Action Buttons */}
                              <div className="flex gap-1.5 mt-2">
                                <Button 
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setCheckInDate(undefined);
                                    setCheckOutDate(undefined);
                                    setSelectingCheckOut(false);
                                  }}
                                  className="flex-1 text-xs h-7"
                                >
                                  Clear
                                </Button>
                                <Button 
                                  onClick={() => setDatePickerOpen(false)} 
                                  className="flex-1 text-xs h-7"
                                  data-testid="button-date-done"
                                  disabled={!checkInDate || !checkOutDate}
                                >
                                  Done
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Guests Picker - Compact Design */}
                      <div>
                        <Popover open={guestPickerOpen} onOpenChange={setGuestPickerOpen}>
                          <PopoverTrigger asChild>
                            <button
                              className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer text-left flex items-center gap-2 hover:border-primary transition-colors"
                              data-testid="button-guest-picker"
                            >
                              <Users className="h-4 w-4 text-primary shrink-0" />
                              <span className="text-sm truncate">{guestsText === "2 Guests, 1 Room" && !checkInDate ? "Select Guest and Room" : guestsText}</span>
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-72 max-h-[70vh] overflow-y-auto" align="start" side="bottom">
                            <div className="space-y-3 p-1">
                              {/* Adults */}
                              <div className="flex items-center justify-between py-2">
                                <div>
                                  <p className="font-semibold text-sm">Adults</p>
                                  <p className="text-xs text-muted-foreground">Age 13+</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => setAdults(Math.max(1, adults - 1))}
                                    disabled={adults <= 1}
                                    data-testid="button-adults-minus"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-6 text-center font-semibold text-sm" data-testid="text-adults-count">{adults}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => setAdults(adults + 1)}
                                    data-testid="button-adults-plus"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>

                              {/* Children */}
                              <div className="flex items-center justify-between py-2">
                                <div>
                                  <p className="font-semibold text-sm">Children</p>
                                  <p className="text-xs text-muted-foreground">Age 0-12</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => setChildren(Math.max(0, children - 1))}
                                    disabled={children <= 0}
                                    data-testid="button-children-minus"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-6 text-center font-semibold text-sm" data-testid="text-children-count">{children}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => setChildren(children + 1)}
                                    data-testid="button-children-plus"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>

                              {/* Rooms */}
                              <div className="flex items-center justify-between py-2">
                                <div>
                                  <p className="font-semibold text-sm">Rooms</p>
                                  <p className="text-xs text-muted-foreground">Max 4 per room</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                                    disabled={rooms <= 1}
                                    data-testid="button-rooms-minus"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-6 text-center font-semibold text-sm" data-testid="text-rooms-count">{rooms}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => setRooms(rooms + 1)}
                                    data-testid="button-rooms-plus"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>

                              {/* Done Button */}
                              <Button 
                                onClick={() => setGuestPickerOpen(false)} 
                                className="w-full h-8 text-xs mt-2"
                                data-testid="button-guest-done"
                              >
                                Done
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Book Now Button */}
                      <div>
                        <Button 
                          onClick={handleBookNow}
                          className="w-full h-11 text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-lg"
                          data-testid="button-book-now-hero"
                        >
                          BOOK NOW
                        </Button>
                      </div>
                    </div>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* About Dandeli Section */}
      <section className="py-20 px-6 bg-section-teal relative overflow-hidden">
        <WaterDroplets />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">Discover Dandeli</p>
              <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight">
                Nature & Adventure<br/>at its Best
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed">
                Nature is at its bountiful best at <span className="font-semibold text-foreground">Dandeli</span> (North Karnataka), 
                making it an ideal holiday destination. This destination, located on the banks of the Kali River, 
                offers unparalleled scenic beauty complemented by exotic wildlife in its tropical forests.
              </p>
              <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
                Easily accessible, Dandeli is the perfect destination for nature lovers and adventure-seekers alike. 
                Experience the ultimate adventure holiday surrounded by the Western Ghats' magnificent landscapes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Waves className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Water Sports</p>
                    <p className="text-sm text-muted-foreground">Rafting & Kayaking</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Mountain className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Adventure</p>
                    <p className="text-sm text-muted-foreground">Trekking & Safari</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Compass className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Wilderness</p>
                    <p className="text-sm text-muted-foreground">834 sq km Sanctuary</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Send className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Eco Tourism</p>
                    <p className="text-sm text-muted-foreground">Nature Retreats</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <ParallaxImage
                src={raftingHero3}
                alt="Water Rafting in Dandeli"
                speed={-40}
                containerClassName="rounded-lg h-64"
                className="rounded-lg"
              />
              <div className="mt-8">
                <ParallaxImage
                  src={safariImage2}
                  alt="Jungle Safari in Dandeli"
                  speed={-55}
                  containerClassName="rounded-lg h-64"
                  className="rounded-lg"
                />
              </div>
              <ParallaxImage
                src={campImage2}
                alt="Camping in Dandeli"
                speed={-35}
                containerClassName="rounded-lg h-64"
                className="rounded-lg"
              />
              <div className="mt-8">
                <ParallaxImage
                  src={safariImage}
                  alt="Wildlife in Dandeli"
                  speed={-50}
                  containerClassName="rounded-lg h-64"
                  className="rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Adventure Highlights Section */}
      <section className="py-20 px-6 bg-section-light relative overflow-hidden">
        <WildlifeSilhouette type="bird" />
        <WildlifeSilhouette type="deer" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">Experiences</p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6">
              Our Adventures
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose from our curated selection of thrilling outdoor activities
            </p>
          </motion.div>

          {/* Horizontal Scrolling Cards */}
          <div className="overflow-x-auto pb-6 -mx-6 px-6 scrollbar-hide">
            <div className="flex gap-6 min-w-max md:grid md:grid-cols-2 lg:grid-cols-4 md:min-w-0">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="w-80 md:w-auto"
                  >
                    <Link href={`/${activity.id}`}>
                      <Card className="hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer h-full overflow-hidden group" data-testid={`card-activity-${activity.id}`}>
                        <div className="relative h-48 overflow-hidden">
                          <motion.img
                            src={activity.image}
                            alt={activity.title}
                            className="w-full h-full object-cover transition-transform duration-700"
                            whileHover={{ scale: 1.1 }}
                            data-testid={`img-activity-${activity.id}`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2 mb-2">
                              <motion.div 
                                className="p-2 rounded-lg bg-white/20 backdrop-blur-sm"
                                whileHover={prefersReducedMotion ? { scale: 1.05 } : { 
                                  scale: 1.1, 
                                  rotate: [0, -10, 10, -10, 0],
                                  transition: { duration: 0.5 }
                                }}
                              >
                                <motion.div
                                  animate={prefersReducedMotion ? {} : { 
                                    y: [0, -3, 0],
                                  }}
                                  transition={prefersReducedMotion ? {} : { 
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                  }}
                                >
                                  <Icon className="h-5 w-5 text-white" />
                                </motion.div>
                              </motion.div>
                              <h3 className="font-heading text-xl font-bold text-white" data-testid={`text-activity-title-${activity.id}`}>
                                {activity.title}
                              </h3>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {activity.description}
                          </p>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Duration</span>
                              <span className="font-semibold text-foreground">{activity.duration}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Difficulty</span>
                              <span className="font-semibold text-foreground">{activity.difficulty}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Price</span>
                              <span className="font-bold text-primary">{activity.price}</span>
                            </div>
                          </div>
                          <Button className="w-full group-hover:bg-primary/90" data-testid={`button-explore-${activity.id}`}>
                            Explore More
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link href="/activities">
              <Button size="lg" variant="outline" className="group" data-testid="button-view-all-activities">
                View All Activities
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80 opacity-90" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
              Book your thrilling experience in Dandeli today and create memories that will last a lifetime
            </p>
            <Link href="/booking">
              <Button size="lg" variant="secondary" className="text-lg px-8 shadow-xl hover-elevate" data-testid="button-book-cta">
                Book Your Adventure
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Accommodations Section */}
      <section className="py-20 px-6 bg-section-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">
              <Bed className="inline h-3 w-3 mr-2" />
              Where You'll Stay
            </p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6">
              Resorts & Homestays
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose from luxury riverside resorts to cozy traditional homestays, all designed to complement your adventure experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Resort Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/accommodations">
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:border-primary/50 cursor-pointer h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={resort1}
                      alt="Rapids Resort"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        <Building2 className="h-3 w-3" />
                        Resort
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-heading text-2xl font-bold text-white mb-1">Rapids Resort</h3>
                      <p className="text-white/90 text-sm">Luxury Meets Adventure</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      Premium rooms with modern amenities, swimming pool, multi-cuisine restaurant, and direct access to all adventure activities
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Starting from</p>
                        <p className="text-2xl font-bold text-primary">₹2,200<span className="text-sm font-normal text-muted-foreground">/night</span></p>
                      </div>
                      <Button variant="outline" className="group-hover:bg-primary group-hover:text-white transition-colors">
                        Explore
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Homestay Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link href="/accommodations">
                <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:border-primary/50 cursor-pointer h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={homestay1}
                      alt="Traditional Homestay"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-2 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        <HomeIcon className="h-3 w-3" />
                        Homestay
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-heading text-2xl font-bold text-white mb-1">Traditional Homestay</h3>
                      <p className="text-white/90 text-sm">Local Culture & Hospitality</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      Authentic Dandeli experience with home-cooked meals, personalized attention, and warm family environment
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Starting from</p>
                        <p className="text-2xl font-bold text-primary">₹1,500<span className="text-sm font-normal text-muted-foreground">/night</span></p>
                      </div>
                      <Button variant="outline" className="group-hover:bg-primary group-hover:text-white transition-colors">
                        Explore
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link href="/accommodations">
              <Button size="lg" variant="outline" className="group" data-testid="button-view-all-accommodations">
                View All Accommodations
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-6 bg-section-coral">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">Curated Packages</p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6">
              Adventure Packages
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose from our carefully curated packages designed for couples, families, and student groups
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Couple Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="hover-elevate active-elevate-2 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="font-heading text-2xl font-bold mb-2">Couple Package</h3>
                    <p className="text-3xl font-bold text-primary">From ₹2,200<span className="text-sm font-normal text-muted-foreground">/person</span></p>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">23 Hours Stay</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">7 Adventure Activities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">3 Meals & Tea</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">5 Sightseeing Points</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">Swimming Pool Access</span>
                    </div>
                  </div>
                  <Link href="/booking" className="w-full">
                    <Button className="w-full" data-testid="button-book-couple">
                      Book Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Family Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="hover-elevate active-elevate-2 transition-all duration-300 border-primary border-2">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-2">
                      MOST POPULAR
                    </div>
                    <h3 className="font-heading text-2xl font-bold mb-2">Family Package</h3>
                    <p className="text-3xl font-bold text-primary">From ₹2,000<span className="text-sm font-normal text-muted-foreground">/person</span></p>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">23 Hours Stay</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">7 Adventure Activities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">3 Buffet Meals & Tea</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">5 Sightseeing Points</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">Campfire & Rain Dance</span>
                    </div>
                  </div>
                  <Link href="/booking" className="w-full">
                    <Button className="w-full" data-testid="button-book-family">
                      Book Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Student Package */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="hover-elevate active-elevate-2 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="font-heading text-2xl font-bold mb-2">Student Package</h3>
                    <p className="text-3xl font-bold text-primary">From ₹1,800<span className="text-sm font-normal text-muted-foreground">/person</span></p>
                  </div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">23 Hours Stay</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">7 Adventure Activities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">3 Meals & Tea</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">5 Sightseeing Points</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-sm">Group Activities</span>
                    </div>
                  </div>
                  <Link href="/booking" className="w-full">
                    <Button className="w-full" data-testid="button-book-student">
                      Book Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sightseeing Section */}
      <section className="py-20 px-6 bg-section-sand">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Top Attractions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the natural wonders and scenic beauty around Dandeli
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Supa Dam", image: attraction1 },
              { name: "Syntheri Rocks", image: attraction2 },
              { name: "Kavala Caves", image: attraction3 },
              { name: "Backwater", image: attraction4 },
              { name: "Crocodile Park", image: attraction5 },
              { name: "Moulangi Eco Park", image: attraction6 },
            ].map((attraction, index) => (
              <motion.div
                key={attraction.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer group" data-testid={`card-attraction-${index}`}>
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                      data-testid={`img-attraction-${index}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-heading text-lg font-bold text-white" data-testid={`text-attraction-name-${index}`}>
                        {attraction.name}
                      </h3>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-6 bg-section-blue">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Adventure Gallery
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the thrill and beauty of Dandeli through our lens
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative overflow-hidden rounded-lg aspect-square group cursor-pointer"
              >
                <motion.img
                  src={image}
                  alt={`Dandeli adventure ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500"
                  whileHover={{ scale: 1.15 }}
                  data-testid={`img-gallery-${index}`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link href="/booking">
              <Button size="lg" data-testid="button-book-from-gallery">
                Start Your Adventure
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">FAQ</p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about planning your Dandeli adventure
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "What is the best time to visit Dandeli?",
                answer: "The best time to visit Dandeli is from October to May. October to February offers pleasant weather (15-28°C) perfect for all activities. March to May is ideal for white water rafting as the Kali River has strong currents. Avoid monsoon season (June-September) as most adventure activities are closed for safety."
              },
              {
                question: "How do I reach Dandeli from Bangalore?",
                answer: "Dandeli is approximately 460 km from Bangalore. You can reach by: 1) Road: 8-9 hours drive via NH48 and NH63. Regular buses available from Bangalore Majestic. 2) Train: Take a train to Hubli (400 km), then taxi/bus to Dandeli (72 km). 3) Flight: Fly to Hubli Airport, then 2-hour drive to Dandeli. We can arrange pickups from Hubli."
              },
              {
                question: "What activities are included in Dandeli tour packages?",
                answer: "Our Dandeli packages include white water rafting (9 km or 1 km options), jungle safari in 834 sq km wildlife sanctuary, forest trekking through Western Ghats, kayaking on Kali River, bird watching, and nature walks. All safety equipment, guides, and permits are included. You can customize your package with additional activities like coracle rides, zip-lining, and night camping."
              },
              {
                question: "Is Dandeli safe for families and children?",
                answer: "Yes, Dandeli is completely safe for families! We offer age-appropriate activities: jungle safaris suitable for all ages, easy trekking trails for children 5+, and short rafting (1 km) for beginners. Our experienced guides ensure safety with quality equipment and thorough briefings. Children under 12 get special supervision during adventure activities."
              },
              {
                question: "What wildlife can I see in Dandeli Wildlife Sanctuary?",
                answer: "Dandeli Wildlife Sanctuary (834 sq km) is home to Bengal tigers, black panthers, leopards, sloth bears, elephants, Indian bison, deer species (sambar, spotted, barking), crocodiles, and over 300 bird species including hornbills, kingfishers, and eagles. Best viewing times are early morning (6-9 AM) and evening (4-6 PM) safari drives."
              },
              {
                question: "What should I pack for a Dandeli trip?",
                answer: "Essentials: Comfortable clothing (quick-dry recommended), sturdy shoes for trekking, swimwear for water activities, sunscreen (SPF 50+), insect repellent, hat/cap, sunglasses, camera, power bank, personal medications, and a light jacket for evenings. For rafting, bring extra clothes and waterproof bags for electronics. We provide all safety gear and helmets."
              },
              {
                question: "What accommodation options are available in Dandeli?",
                answer: "We offer diverse accommodations: Riverside Cottages (scenic Kali River views, AC, private bathrooms), Luxury Tents (glamping experience, modern amenities), Jungle Treehouses (elevated stays amidst nature), and Shared Dormitories (budget-friendly, clean facilities). All options include meals, WiFi access, and 24/7 hot water. You can select your preference during booking."
              },
              {
                question: "How difficult is white water rafting in Dandeli?",
                answer: "Dandeli offers Grade 2-3 rapids, suitable for beginners to intermediate rafters. No prior experience needed! We offer: 1 km Short Rafting (1 hour, Grade 2, easy for first-timers) and 9 km Long Rafting (2-3 hours, Grade 2-3, more thrilling). Professional instructors provide complete training and safety briefings. Age limit: 12+ for long rafting, 8+ for short rafting. Swimming ability not mandatory but recommended."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <details className="group bg-section-light rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-colors">
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-foreground hover:text-primary transition-colors list-none" data-testid={`button-faq-${index}`}>
                    <span className="text-lg pr-4">{faq.question}</span>
                    <ChevronRight className="h-5 w-5 flex-shrink-0 transition-transform duration-300 group-open:rotate-90 text-primary" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed" data-testid={`text-answer-${index}`}>
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-6">Still have questions? We're here to help!</p>
            <Link href="/booking">
              <Button size="lg" data-testid="button-book-from-faq">
                Book Your Adventure
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-section-light via-white to-section-light relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">Testimonials</p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6">
              What Our Guests Say
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Real experiences from adventure seekers who discovered the magic of Dandeli
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sayba Qureshi",
                review: "The adventurous activities in the Dandeli Forest were fantastic! We really enjoyed Dandeli's natural beauty and wildlife. Must visit place for nature lovers.",
                rating: 5,
                initials: "SQ",
              },
              {
                name: "Melvin Costa",
                review: "Wonderful time spent at the stunning jungle resorts. The personnel really made us feel at home, and the views were breathtaking. Ideal location for unwinding.",
                rating: 5,
                initials: "MC",
              },
              {
                name: "Deeksha Thorwat",
                review: "Loved our time at one of the resorts with swimming pool. After a day of rafting, relaxing by the pool was exactly what we needed. Highly recommend.",
                rating: 5,
                initials: "DT",
              },
              {
                name: "Ali Ansari",
                review: "We had exactly what we needed throughout our stay. Great amenities, serene surroundings, and the ideal balance of luxury and nature.",
                rating: 5,
                initials: "AA",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                data-testid={`card-testimonial-${index}`}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-xl overflow-hidden group">
                  <CardContent className="p-8 relative">
                    {/* Large Quote Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                      className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors duration-300"
                    >
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </motion.div>

                    {/* Star Rating */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                      className="flex gap-1 mb-4"
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.svg
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.4, 
                            delay: index * 0.15 + 0.4 + (i * 0.05),
                            type: "spring",
                            stiffness: 200
                          }}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                          data-testid={`star-${index}-${i}`}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                      ))}
                    </motion.div>

                    {/* Review Text */}
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
                      className="text-muted-foreground text-base leading-relaxed mb-6 relative z-10"
                      data-testid={`text-review-${index}`}
                    >
                      "{testimonial.review}"
                    </motion.p>

                    {/* Author Section */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.6 }}
                      className="flex items-center gap-4"
                    >
                      {/* Avatar with Initials */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-semibold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {testimonial.initials}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground" data-testid={`text-name-${index}`}>
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Verified Guest
                        </p>
                      </div>
                    </motion.div>

                    {/* Decorative gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Booking Modal */}
      <BookingModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        defaultValues={getDefaultBookingValues()}
      />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
