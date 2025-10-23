import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, ChevronRight, Waves, Mountain, Compass, Send } from "lucide-react";
import { useRef } from "react";
import heroImage from "@assets/generated_images/Dandeli_forest_river_hero_background_8f5b5671.png";
import raftingImage from "@assets/generated_images/White_water_rafting_adventure_d3da1bc1.png";
import safariImage from "@assets/generated_images/Jungle_safari_wildlife_adventure_3300876a.png";
import trekkingImage from "@assets/generated_images/Forest_trekking_adventure_trail_14dd1cd1.png";
import kayakingImage from "@assets/generated_images/Peaceful_kayaking_river_adventure_e3974c90.png";

const activities = [
  {
    id: "rafting",
    title: "White Water Rafting",
    description: "Experience the thrill of navigating through rushing rapids and pristine waters",
    image: raftingImage,
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

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-heading text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Explore the Wild Heart
              <br />
              <span className="text-primary-foreground">of Karnataka</span>
            </h1>
            <p className="mt-6 text-lg text-white/90 sm:text-xl md:text-2xl max-w-3xl mx-auto">
              Discover unforgettable adventures at Rapids Roosts Dandeli
            </p>
          </motion.div>

          {/* Quick Booking CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 w-full max-w-4xl"
          >
            <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl hover-elevate">
              <CardContent className="p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Plan Your Adventure</span>
                    </div>
                    <h3 className="font-heading text-2xl font-semibold text-white">
                      Start Your Journey Today
                    </h3>
                    <p className="text-white/70 text-sm">
                      Book your perfect adventure with seamless online booking
                    </p>
                  </div>
                  <Link href="/booking">
                    <Button
                      size="lg"
                      variant="default"
                      className="w-full sm:w-auto group"
                      data-testid="button-book-now-hero"
                    >
                      Book Now
                      <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
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
