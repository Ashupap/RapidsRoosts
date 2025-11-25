import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronRight, 
  Clock, 
  Users, 
  TrendingUp, 
  Calendar,
  CheckCircle2,
  ArrowRight,
  MapPin
} from "lucide-react";
import { getAllActivities } from "@/data/activities";
import { useSEO, injectStructuredData } from "@/lib/seo";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useRef, useState } from "react";
import activityVideo from "@assets/activity-video-compressed.mp4";
import fallbackImage from "@assets/stock_images/vibrant_water_raftin_9419a08c.jpg";

export default function Activities() {
  const prefersReducedMotion = useReducedMotion();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? "0%" : "0%", prefersReducedMotion ? "0%" : "20%"]);

  useSEO({
    title: 'Adventure Activities in Dandeli - White Water Rafting, Safari, Trekking | Best Dandeli Experiences',
    description: 'Discover the best adventure activities in Dandeli, Karnataka. White water rafting on Kali River (Grade 2-3 rapids), wildlife safaris in 834 sq km sanctuary, Western Ghats trekking, kayaking & more. Experience Dandeli with Rapids & Roosts - #1 rated adventure tourism operator.',
    keywords: 'Dandeli activities, adventure activities in Dandeli, things to do in Dandeli, white water rafting Dandeli, jungle safari Dandeli, Dandeli trekking, kayaking Dandeli, adventure sports Karnataka, Kali river activities, Dandeli wildlife safari, adventure tourism Dandeli, best activities in Dandeli, Dandeli water sports',
  });

  injectStructuredData('organization');
  injectStructuredData('breadcrumb', {
    items: [
      { name: 'Home', url: '/' },
      { name: 'Activities' }
    ]
  });

  const activities = getAllActivities();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section with Video Background */}
      <section ref={heroRef} className="relative min-h-[70vh] overflow-hidden -mt-20 pt-20">
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
            poster={fallbackImage}
            onLoadedData={() => setVideoLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={activityVideo} type="video/mp4" />
          </video>
          
          {/* Fallback Image - shown until video loads */}
          {!videoLoaded && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${fallbackImage})` }}
            />
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-teal-900/30" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center px-6 pt-32 pb-20">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-white/90 font-medium mb-6">
                <MapPin className="inline h-3 w-3 mr-2" />
                Dandeli, Karnataka
              </p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                Our Adventure Activities
              </h1>
              <p className="text-base md:text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Experience the thrill of adventure in the heart of Western Ghats. 
                From adrenaline-pumping rafting to serene forest treks, we offer 
                expertly curated experiences for every adventurer.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="#activities">
                  <Button size="lg" className="text-base">
                    Explore Activities
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="text-base bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                    About Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-section-teal border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">4</div>
              <div className="text-sm text-muted-foreground">Adventure Activities</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">834</div>
              <div className="text-sm text-muted-foreground">Sq Km Sanctuary</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Adventurers</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activities Grid */}
      <section id="activities" className="py-20 px-6 bg-section-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-20"
          >
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={activity.id}
                  variants={itemVariants}
                  className="group"
                >
                  <Card className="overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl">
                    <div className={`grid lg:grid-cols-2 gap-0 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                      {/* Image Section */}
                      <div className={`relative h-64 lg:h-auto overflow-hidden ${!isEven ? 'lg:order-2' : ''}`}>
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        
                        {/* Floating Badge */}
                        <div className="absolute top-6 left-6">
                          <div className="flex items-center gap-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-4 py-2 rounded-full">
                            <Icon className="h-5 w-5" />
                            <span className="font-semibold text-sm">{activity.difficulty}</span>
                          </div>
                        </div>

                      </div>

                      {/* Content Section */}
                      <CardContent className={`p-8 lg:p-12 flex flex-col justify-center ${!isEven ? 'lg:order-1' : ''}`}>
                        <div className="space-y-6">
                          <div>
                            <h2 className="font-heading text-3xl md:text-4xl font-medium text-foreground mb-4 leading-tight">
                              {activity.title}
                            </h2>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                              {activity.description}
                            </p>
                          </div>

                          {/* Quick Info */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-sm">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Clock className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Duration</div>
                                <div className="font-semibold text-foreground">{activity.duration}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Users className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Group Size</div>
                                <div className="font-semibold text-foreground">{activity.capacity}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <Calendar className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Best Season</div>
                                <div className="font-semibold text-foreground">{activity.bestSeason}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                              <div className="p-2 rounded-lg bg-primary/10">
                                <TrendingUp className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <div className="text-xs text-muted-foreground">Level</div>
                                <div className="font-semibold text-foreground">{activity.difficulty}</div>
                              </div>
                            </div>
                          </div>

                          {/* Highlights */}
                          <div>
                            <h3 className="font-semibold text-foreground mb-3">Highlights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {activity.highlights.slice(0, 4).map((highlight, idx) => (
                                <div key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                  <span className="text-sm text-muted-foreground">{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* CTAs */}
                          <div className="flex flex-wrap gap-3 pt-4">
                            <Link href={`/${activity.slug}`}>
                              <Button size="lg">
                                Learn More
                                <ChevronRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-primary-foreground/80 font-medium mb-6">Start Your Journey</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium mb-8 leading-tight">
              Ready for Your Adventure?
            </h2>
            <p className="text-base md:text-lg mb-10 text-primary-foreground/90 leading-relaxed">
              Explore our adventure activities and experience the thrill of Dandeli's wilderness. 
              Our expert team is ready to make your adventure unforgettable.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/dandeli-guide">
                <Button size="lg" variant="secondary" className="text-base">
                  Dandeli Travel Guide
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="text-base bg-transparent border-white text-white hover:bg-white hover:text-primary">
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
