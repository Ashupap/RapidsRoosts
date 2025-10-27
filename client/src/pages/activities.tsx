import { motion } from "framer-motion";
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
import logo from "@assets/logo_1761304770834.jpg";

export default function Activities() {
  useSEO({
    title: 'Our Activities - Adventure Sports & Tours in Dandeli',
    description: 'Explore our complete range of adventure activities in Dandeli. White water rafting, jungle safaris, forest trekking, kayaking, and customized adventure packages. Detailed pricing, timings, and booking information.',
    keywords: 'Dandeli activities, adventure sports Dandeli, rafting safari trekking kayaking, Dandeli tour activities, Western Ghats adventures, Karnataka outdoor activities',
  });

  injectStructuredData('organization');

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                <img 
                  src={logo} 
                  alt="Rapids Roosts Dandeli" 
                  className="h-12 w-12 rounded-full object-cover shadow-md" 
                />
                <div>
                  <h1 className="font-heading text-lg md:text-xl font-medium text-foreground tracking-wide">
                    Rapids & Roosts
                  </h1>
                  <p className="text-[10px] md:text-xs uppercase tracking-wider text-muted-foreground">Adventure Tourism</p>
                </div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link href="/">
                <span className="text-sm font-normal tracking-wide text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Home
                </span>
              </Link>
              <Link href="/activities">
                <span className="text-sm font-medium tracking-wide text-foreground cursor-pointer">
                  Our Activities
                </span>
              </Link>
              <Link href="/status">
                <span className="text-sm font-normal tracking-wide text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                  Check Status
                </span>
              </Link>
              <Link href="/booking">
                <Button size="sm">
                  Book Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-16" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-6">
              <MapPin className="inline h-3 w-3 mr-2" />
              Dandeli, Karnataka
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-foreground mb-8 leading-tight">
              Our Adventure Activities
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the thrill of adventure in the heart of Western Ghats. 
              From adrenaline-pumping rafting to serene forest treks, we offer 
              expertly curated experiences for every adventurer.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/booking">
                <Button size="lg" className="text-base">
                  Book Your Adventure
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#activities">
                <Button size="lg" variant="outline" className="text-base">
                  Explore Activities
                </Button>
              </Link>
            </div>
          </motion.div>
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

                        {/* Price Badge */}
                        <div className="absolute bottom-6 right-6">
                          <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-1">Starting from</div>
                            <div className="text-2xl font-bold text-primary">{activity.price}</div>
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
                              <Button variant="outline" size="lg">
                                Learn More
                                <ChevronRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                            <Link href="/booking">
                              <Button size="lg">
                                Book Now
                                <ArrowRight className="ml-2 h-4 w-4" />
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
              Book your perfect adventure package today and experience the thrill of Dandeli's wilderness. 
              Our expert team is ready to make your adventure unforgettable.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/booking">
                <Button size="lg" variant="secondary" className="text-base">
                  Book Your Adventure
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

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Rapids & Roosts Dandeli. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Experience the best adventure tourism in Karnataka's Western Ghats
          </p>
        </div>
      </footer>
    </div>
  );
}
