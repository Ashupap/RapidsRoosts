import { Link, useLocation } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar, Users, ChevronRight, ChevronLeft, Waves, Mountain, Compass, Send, MapPin, Search, Mail, Phone, Hotel, Plane, Car, CalendarIcon, Minus, Plus } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import { useSEO, injectStructuredData } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import { ParallaxImage, ParallaxText } from "@/components/ParallaxSection";
import { CampfireEffect, WaterDroplets, WildlifeSilhouette, FloatingLeaves } from "@/components/AdventureEffects";
import raftingHero1 from "@assets/stock_images/vibrant_water_raftin_9419a08c.jpg";
import raftingHero2 from "@assets/stock_images/vibrant_water_raftin_5f8fedad.jpg";
import raftingHero3 from "@assets/stock_images/vibrant_water_raftin_24bbd1b7.jpg";
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
  
  useSEO({
    title: 'Home - Adventure Tourism in Dandeli',
    description: 'Experience the ultimate adventure in Dandeli, Karnataka. Book white water rafting, jungle safaris, forest trekking, and kayaking packages. Rapids & Roosts offers premium adventure tourism in the Western Ghats.',
    keywords: 'Dandeli adventure tourism, Dandeli packages, white water rafting Dandeli, jungle safari Karnataka, adventure sports Western Ghats, Dandeli resorts, Kali river rafting, Dandeli tour booking',
  });

  injectStructuredData('organization');
  injectStructuredData('localBusiness');

  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? "0%" : "0%", prefersReducedMotion ? "0%" : "20%"]);

  const handleBookNow = () => {
    const bookingData = {
      activityType: activeTab,
      checkInDate: checkInDate ? format(checkInDate, "yyyy-MM-dd") : "",
      checkOutDate: checkOutDate ? format(checkOutDate, "yyyy-MM-dd") : "",
      numberOfGuests: adults + children,
      adults,
      children,
      rooms,
    };
    sessionStorage.setItem("heroBookingData", JSON.stringify(bookingData));
    setLocation("/booking");
  };

  const totalGuests = adults + children;
  const guestsText = `${totalGuests} Guest${totalGuests !== 1 ? 's' : ''}, ${rooms} Room${rooms !== 1 ? 's' : ''}`;
  const dateRangeText = checkInDate && checkOutDate 
    ? `${format(checkInDate, "MMM dd")} - ${format(checkOutDate, "MMM dd, yyyy")}`
    : "Select dates";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Redesigned */}
      <section ref={heroRef} className="relative min-h-[90vh] overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${raftingHero1})` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-teal-900/30" />
        </motion.div>

        {/* Top Navigation Header */}
        <div className="relative z-20 px-4 md:px-8 py-6">
          <Navigation transparent currentPath="/" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-20 pb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto mb-8"
          >
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight tracking-tight" data-testid="text-hero-title">
              Discover Your Next Adventure in Dandeli
            </h1>
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl font-medium" data-testid="text-hero-subtitle">
              Unforgettable Experiences Await in Nature's Paradise
            </p>
          </motion.div>

          {/* Booking Form Card - Narrower Design */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-3xl"
          >
            <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl overflow-hidden border-0">
              <CardContent className="p-0">
                {/* Tabs for Activity Types */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full grid grid-cols-4 rounded-none h-12 bg-transparent border-b border-gray-200 dark:border-gray-700" data-testid="tabs-activity-selector">
                    <TabsTrigger 
                      value="rafting" 
                      className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-none h-full text-xs md:text-sm font-bold uppercase"
                      data-testid="tab-rafting"
                    >
                      <Waves className="h-4 w-4 md:h-5 md:w-5 md:mr-2" />
                      <span className="hidden md:inline">Rafting</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="safari" 
                      className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-none h-full text-xs md:text-sm font-bold uppercase"
                      data-testid="tab-safari"
                    >
                      <Compass className="h-4 w-4 md:h-5 md:w-5 md:mr-2" />
                      <span className="hidden md:inline">Safari</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="trekking" 
                      className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-none h-full text-xs md:text-sm font-bold uppercase"
                      data-testid="tab-trekking"
                    >
                      <Mountain className="h-4 w-4 md:h-5 md:w-5 md:mr-2" />
                      <span className="hidden md:inline">Trekking</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="kayaking" 
                      className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-none h-full text-xs md:text-sm font-bold uppercase"
                      data-testid="tab-kayaking"
                    >
                      <Send className="h-4 w-4 md:h-5 md:w-5 md:mr-2" />
                      <span className="hidden md:inline">Kayaking</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Booking Form */}
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Date Picker */}
                      <div>
                        <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                          <PopoverTrigger asChild>
                            <button
                              className="w-full h-11 px-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer text-left flex items-center gap-2 hover:border-primary transition-colors"
                              data-testid="button-date-picker"
                            >
                              <CalendarIcon className="h-4 w-4 text-primary shrink-0" />
                              <span className="text-sm truncate">{dateRangeText === "Select dates" ? "Check In/Check out Date" : dateRangeText}</span>
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <div className="p-4 space-y-4">
                              <div>
                                <p className="text-sm font-semibold mb-2">Check-in Date</p>
                                <CalendarComponent
                                  mode="single"
                                  selected={checkInDate}
                                  onSelect={(date) => {
                                    setCheckInDate(date);
                                    if (date && !checkOutDate) {
                                      setCheckOutDate(addDays(date, 1));
                                    }
                                  }}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </div>
                              <div>
                                <p className="text-sm font-semibold mb-2">Check-out Date</p>
                                <CalendarComponent
                                  mode="single"
                                  selected={checkOutDate}
                                  onSelect={setCheckOutDate}
                                  disabled={(date) => !checkInDate || date <= checkInDate}
                                />
                              </div>
                              <Button 
                                onClick={() => setDatePickerOpen(false)} 
                                className="w-full"
                                data-testid="button-date-done"
                              >
                                Done
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Guests Picker */}
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
                          <PopoverContent className="w-80" align="start">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold">Adults</p>
                                  <p className="text-xs text-muted-foreground">Age 13+</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setAdults(Math.max(1, adults - 1))}
                                    disabled={adults <= 1}
                                    data-testid="button-adults-minus"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="w-8 text-center font-semibold" data-testid="text-adults-count">{adults}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setAdults(adults + 1)}
                                    data-testid="button-adults-plus"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold">Children</p>
                                  <p className="text-xs text-muted-foreground">Age 0-12</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setChildren(Math.max(0, children - 1))}
                                    disabled={children <= 0}
                                    data-testid="button-children-minus"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="w-8 text-center font-semibold" data-testid="text-children-count">{children}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setChildren(children + 1)}
                                    data-testid="button-children-plus"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold">Rooms</p>
                                  <p className="text-xs text-muted-foreground">Max 4 per room</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setRooms(Math.max(1, rooms - 1))}
                                    disabled={rooms <= 1}
                                    data-testid="button-rooms-minus"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="w-8 text-center font-semibold" data-testid="text-rooms-count">{rooms}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setRooms(rooms + 1)}
                                    data-testid="button-rooms-plus"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <Button 
                                onClick={() => setGuestPickerOpen(false)} 
                                className="w-full"
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
                          disabled={!checkInDate || !checkOutDate}
                          className="w-full h-11 text-base font-bold bg-primary hover:bg-primary/90 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
        <FloatingLeaves />
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
                              <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                                <Icon className="h-5 w-5 text-white" />
                              </div>
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-90" />
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

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-section-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              What Our Guests Say
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from adventure seekers who visited Dandeli
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Sayba Qureshi",
                review: "The adventurous activities in the Dandeli Forest were fantastic! We really enjoyed Dandeli's natural beauty and wildlife. Must visit place for nature lovers.",
              },
              {
                name: "Melvin Costa",
                review: "Wonderful time spent at the stunning jungle resorts. The personnel really made us feel at home, and the views were breathtaking. Ideal location for unwinding.",
              },
              {
                name: "Deeksha Thorwat",
                review: "Loved our time at one of the resorts with swimming pool. After a day of rafting, relaxing by the pool was exactly what we needed. Highly recommend.",
              },
              {
                name: "Ali Ansari",
                review: "We had exactly what we needed throughout our stay. Great amenities, serene surroundings, and the ideal balance of luxury and nature.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.review}"
                    </p>
                    <p className="font-semibold text-foreground">— {testimonial.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Rhodes Minimalist Design */}
      <footer className="bg-card border-t border-border py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src={logo} alt="Rapids Roosts" className="h-12 w-12 rounded-full object-cover shadow-md" />
                <h3 className="font-heading text-lg md:text-xl font-medium tracking-wide">Rapids & Roosts</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your gateway to unforgettable adventures in Karnataka's wilderness. Experience the thrill of Dandeli!
              </p>
            </div>
            <div>
              <h4 className="font-heading font-medium mb-5 tracking-wide">Quick Links</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/activities" className="hover:text-primary transition-colors">
                    Our Activities
                  </Link>
                </li>
                <li>
                  <Link href="/booking" className="hover:text-primary transition-colors">
                    Book Adventure
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-primary transition-colors">
                    Track Booking
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-medium mb-5 tracking-wide">Contact Us</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                  <span>Dandeli, Karnataka<br/>India - 581325</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <a href="mailto:info@rapidsroosts.com" className="hover:text-primary transition-colors">info@rapidsroosts.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  <a href="tel:+919483940400" className="hover:text-primary transition-colors">+91 94839 40400</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-medium mb-5 tracking-wide">Adventures</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/rafting" className="hover:text-primary transition-colors">White Water Rafting</Link></li>
                <li><Link href="/safari" className="hover:text-primary transition-colors">Jungle Safari</Link></li>
                <li><Link href="/kayaking" className="hover:text-primary transition-colors">Kayaking</Link></li>
                <li><Link href="/trekking" className="hover:text-primary transition-colors">Forest Trekking</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Rapids & Roosts Dandeli. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

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
