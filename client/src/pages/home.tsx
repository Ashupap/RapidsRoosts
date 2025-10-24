import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, ChevronRight, Waves, Mountain, Compass, Send, MapPin } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import raftingFallback from "@assets/stock_images/aerial_view_of_river_19896f5a.jpg";
import safariImageFallback from "@assets/stock_images/lush_green_forest_ju_ca3bd63f.jpg";
import campFallback from "@assets/stock_images/camping_tents_in_for_1bdeb780.jpg";
import safariImage from "@assets/generated_images/Jungle_safari_wildlife_adventure_3300876a.png";
import trekkingImage from "@assets/generated_images/Forest_trekking_adventure_trail_14dd1cd1.png";
import kayakingImage from "@assets/generated_images/Peaceful_kayaking_river_adventure_e3974c90.png";

const activities = [
  {
    id: "rafting",
    title: "White Water Rafting",
    description: "Experience the thrill of navigating through rushing rapids and pristine waters",
    image: raftingFallback,
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

const heroVideos = [
  {
    src: "/videos/water-rafting.mp4",
    fallback: raftingFallback,
    title: "Water Rafting",
  },
  {
    src: "/videos/jungle-safari.mp4",
    fallback: safariImageFallback,
    title: "Jungle Safari",
  },
  {
    src: "/videos/forest-camp.mp4",
    fallback: campFallback,
    title: "Forest Camp",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videoError, setVideoError] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.5]);

  // Auto-rotate videos every 12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % heroVideos.length);
      setVideoError(false); // Reset error state when switching videos
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Video Background */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Video/Image Background with Parallax */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          {!videoError ? (
            <video
              key={currentVideoIndex}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setVideoError(true)}
              data-testid="video-hero-background"
            >
              <source src={heroVideos[currentVideoIndex].src} type="video/mp4" />
            </video>
          ) : (
            <div
              key={currentVideoIndex}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroVideos[currentVideoIndex].fallback})` }}
              data-testid="image-hero-fallback"
            />
          )}
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl"
          >
            <h1 className="font-heading text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl">
              Welcome to Rapids Roosts
            </h1>
            <p className="mt-6 text-xl text-white/95 sm:text-2xl md:text-3xl font-light drop-shadow-lg">
              You're one step closer to a great vacation!
            </p>
          </motion.div>

          {/* Quick Booking Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 w-full max-w-5xl"
          >
            <Card className="backdrop-blur-lg bg-white/95 dark:bg-black/90 border-white/30 shadow-2xl">
              <CardContent className="p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  {/* Location Input */}
                  <div className="flex-1 flex items-center gap-3 p-4 rounded-lg bg-background/50 hover-elevate transition-all">
                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                    <div className="flex-1 text-left">
                      <label className="text-xs text-muted-foreground block mb-1">Location</label>
                      <input
                        type="text"
                        placeholder="Dandeli, Karnataka"
                        className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                        data-testid="input-location"
                      />
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div className="flex-1 flex items-center gap-3 p-4 rounded-lg bg-background/50 hover-elevate transition-all">
                    <Calendar className="h-5 w-5 text-primary shrink-0" />
                    <div className="flex-1 text-left">
                      <label className="text-xs text-muted-foreground block mb-1">Check In/Out</label>
                      <input
                        type="text"
                        placeholder="Select dates"
                        className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                        data-testid="input-dates"
                      />
                    </div>
                  </div>

                  {/* Guests Picker */}
                  <div className="flex-1 flex items-center gap-3 p-4 rounded-lg bg-background/50 hover-elevate transition-all">
                    <Users className="h-5 w-5 text-primary shrink-0" />
                    <div className="flex-1 text-left">
                      <label className="text-xs text-muted-foreground block mb-1">Guests</label>
                      <input
                        type="text"
                        placeholder="Select guests"
                        className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                        data-testid="input-guests"
                      />
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <Link href="/booking">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto px-8 h-14 text-base font-semibold"
                      data-testid="button-book-now-hero"
                    >
                      BOOK NOW
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12"
          >
            {[
              { icon: Waves, label: "500+ Adventures", value: "500+" },
              { icon: Mountain, label: "76,561 Destinations", value: "50+" },
              { icon: Users, label: "717,036 Happy Guests", value: "10k+" },
              { icon: Compass, label: "Customer Care 24/7", value: "24/7" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 text-white"
                  data-testid={`stat-${index}`}
                >
                  <Icon className="h-8 w-8 sm:h-10 sm:w-10 mb-2 drop-shadow-lg" />
                  <p className="text-xs sm:text-sm text-white/80 text-center">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2 text-white/60">
              <span className="text-sm">Scroll to explore</span>
              <ChevronRight className="h-5 w-5 rotate-90" />
            </div>
          </motion.div>
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
