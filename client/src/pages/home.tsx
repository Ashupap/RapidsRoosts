import { Link } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, ChevronRight, ChevronLeft, Waves, Mountain, Compass, Send, MapPin, Mail, Phone, Search } from "lucide-react";
import { useRef, useState, useEffect } from "react";
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

const activities = [
  {
    id: "rafting",
    title: "White Water Rafting",
    description: "Experience the thrill of navigating through rushing rapids and pristine waters",
    image: raftingHero2,
    icon: Waves,
    duration: "2-3 hours",
    difficulty: "Moderate to Advanced",
  },
  {
    id: "safari",
    title: "Jungle Safari",
    description: "Explore wildlife in their natural habitat with expert guides",
    image: safariImage,
    icon: Compass,
    duration: "3-4 hours",
    difficulty: "Easy",
  },
  {
    id: "trekking",
    title: "Forest Trekking",
    description: "Discover hidden trails and breathtaking vistas in the Western Ghats",
    image: trekkingImage,
    icon: Mountain,
    duration: "4-6 hours",
    difficulty: "Moderate",
  },
  {
    id: "kayaking",
    title: "Kayaking Adventure",
    description: "Paddle through serene waters surrounded by lush tropical forests",
    image: kayakingImage,
    icon: Send,
    duration: "2-3 hours",
    difficulty: "Easy to Moderate",
  },
];

const heroDestinations = [
  {
    src: "/videos/water-rafting.mp4",
    fallback: raftingHero1,
    subtitle: "Experience The Thrill",
    title: "WHITE WATER RAFTING",
    description: "Navigate the rapids of Kali River",
  },
  {
    src: "/videos/jungle-safari.mp4",
    fallback: safariImage1,
    subtitle: "Discover Wild",
    title: "JUNGLE SAFARI",
    description: "Explore exotic wildlife in nature",
  },
  {
    src: "/videos/forest-camp.mp4",
    fallback: campImage1,
    subtitle: "Reconnect With Nature",
    title: "FOREST CAMPING",
    description: "Immerse in wilderness retreat",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.5]);

  // Auto-rotate every 12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroDestinations.length);
      setVideoError(false);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + heroDestinations.length) % heroDestinations.length);
    setVideoError(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroDestinations.length);
    setVideoError(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Video/Image Background with Smooth Crossfade */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <AnimatePresence>
            {!videoError ? (
              <motion.video
                key={`video-${currentIndex}`}
                autoPlay
                loop
                muted
                playsInline
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setVideoError(true)}
                data-testid="video-hero-background"
              >
                <source src={heroDestinations[currentIndex].src} type="video/mp4" />
              </motion.video>
            ) : (
              <motion.div
                key={`image-${currentIndex}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroDestinations[currentIndex].fallback})` }}
                data-testid="image-hero-fallback"
              />
            )}
          </AnimatePresence>
          
          {/* Dark overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 pointer-events-none" />
        </motion.div>

        {/* Top Navigation Header */}
        <div className="relative z-20 flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Rapids Roosts Dandeli" className="h-16 w-16 rounded-full object-cover shadow-lg" data-testid="img-logo" />
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-white tracking-wider">
              RAPIDS & ROOSTS
            </h1>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-white text-sm font-medium hover:text-white/80 transition-colors">
              DESTINATION
            </Link>
            <Link href="/booking" className="text-white text-sm font-medium hover:text-white/80 transition-colors">
              OUR ACTIVITY
            </Link>
            <Link href="/status" className="text-white text-sm font-medium hover:text-white/80 transition-colors">
              CHECK STATUS
            </Link>
            <Link href="/admin/login" className="text-white text-sm font-medium hover:text-white/80 transition-colors">
              ADMIN
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-6 text-white text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@rapidsroosts.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 XXXXXXXXXX</span>
            </div>
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6 pb-32">
          {/* Previous Arrow */}
          <button
            onClick={goToPrevious}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-white/40 backdrop-blur-sm bg-white/10 flex items-center justify-center hover-elevate active-elevate-2 transition-all group z-30"
            data-testid="button-previous-destination"
          >
            <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Center Content */}
          <div className="text-center">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <p className="text-white/90 text-2xl md:text-3xl lg:text-4xl font-light italic tracking-wide">
                {heroDestinations[currentIndex].subtitle}
              </p>
              <h2 className="font-heading text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tight leading-none drop-shadow-2xl">
                {heroDestinations[currentIndex].title}
              </h2>
            </motion.div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-6 mt-12">
              {heroDestinations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    setVideoError(false);
                  }}
                  className={`text-sm font-medium transition-all ${
                    index === currentIndex
                      ? 'text-white scale-110'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                  data-testid={`button-pagination-${index}`}
                >
                  0{index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Next Arrow */}
          <button
            onClick={goToNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-white/40 backdrop-blur-sm bg-white/10 flex items-center justify-center hover-elevate active-elevate-2 transition-all group z-30"
            data-testid="button-next-destination"
          >
            <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Bottom Search Bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-full max-w-4xl px-6">
          <Card className="bg-white/95 dark:bg-black/90 backdrop-blur-lg shadow-2xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {/* Destination */}
                <div className="flex items-center gap-3 p-3 rounded-lg hover-elevate transition-all cursor-pointer">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">Destination</p>
                    <p className="text-sm font-medium text-foreground truncate">Dandeli</p>
                  </div>
                </div>

                {/* Kind of Trip */}
                <div className="flex items-center gap-3 p-3 rounded-lg hover-elevate transition-all cursor-pointer">
                  <Compass className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">Kind Of Trip</p>
                    <p className="text-sm font-medium text-foreground truncate">Adventure</p>
                  </div>
                </div>

                {/* Activities */}
                <div className="flex items-center gap-3 p-3 rounded-lg hover-elevate transition-all cursor-pointer">
                  <Waves className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">Activities & Themes</p>
                    <p className="text-sm font-medium text-foreground truncate">Rafting, Safari</p>
                  </div>
                </div>

                {/* Average Price */}
                <div className="flex items-center gap-3 p-3 rounded-lg hover-elevate transition-all cursor-pointer">
                  <Calendar className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-1">Average Price</p>
                    <p className="text-sm font-medium text-foreground truncate">₹2,500 - ₹5,000</p>
                  </div>
                </div>

                {/* Search Button */}
                <Link href="/booking" className="col-span-2 md:col-span-1">
                  <Button
                    className="w-full h-full min-h-[60px] text-base font-semibold"
                    data-testid="button-search-hero"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Adventure Highlights Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Our Adventures
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our curated selection of thrilling outdoor activities
            </p>
          </motion.div>

          {/* Horizontal Scrolling Cards */}
          <div className="overflow-x-auto pb-6 -mx-6 px-6 scrollbar-hide">
            <div className="flex gap-6 w-max">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      className="w-[320px] sm:w-[380px] overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 hover:shadow-2xl group cursor-pointer"
                      data-testid={`card-activity-${activity.id}`}
                    >
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 rounded-lg bg-primary/90 backdrop-blur-sm">
                              <Icon className="h-5 w-5 text-primary-foreground" />
                            </div>
                          </div>
                          <h3 className="font-heading text-2xl font-bold text-white">
                            {activity.title}
                          </h3>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <p className="text-muted-foreground mb-4">
                          {activity.description}
                        </p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{activity.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>{activity.difficulty}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* View All Adventures CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link href="/booking">
              <Button size="lg" data-testid="button-book-adventure">
                Book Your Adventure
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-card-border py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-heading text-lg font-semibold mb-4">Rapids Roosts Dandeli</h3>
              <p className="text-muted-foreground text-sm">
                Your gateway to unforgettable adventures in Karnataka's wilderness
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/booking" className="hover:text-foreground transition-colors">
                    Book Now
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-foreground transition-colors">
                    Check Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Dandeli, Karnataka</li>
                <li>info@rapidsroosts.com</li>
                <li>+91 XXXXXXXXXX</li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-card-border text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Rapids Roosts Dandeli. All rights reserved.</p>
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
