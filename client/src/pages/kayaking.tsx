import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Calendar, Clock, Users, Shield, MapPin, ChevronRight, Send, IndianRupee, Droplets } from "lucide-react";
import kayakingImage from "@assets/generated_images/Peaceful_kayaking_river_adventure_e3974c90.png";
import { useSEO, injectStructuredData } from "@/lib/seo";

export default function KayakingDetail() {
  useSEO({
    title: 'Kayaking Adventure - Kali River Kayaking in Dandeli',
    description: 'Paddle through serene Kali River waters and Supa Reservoir on a guided kayaking adventure. Perfect for beginners and experienced paddlers. Flatwater and whitewater options available from ₹150 per hour.',
    keywords: 'kayaking Dandeli, Kali river kayaking, water sports Dandeli, kayaking Karnataka, backwater kayaking, Supa reservoir kayaking, adventure kayaking India',
  });

  injectStructuredData('activity', {
    name: 'Kayaking Adventure',
    description: 'Paddle through serene Kali River backwaters',
    image: kayakingImage,
    url: '/kayaking',
    price: '150-300',
  });

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.5]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${kayakingImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
        </motion.div>

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Send className="h-6 w-6" />
              </div>
              <p className="text-sm uppercase tracking-[0.2em] mb-4 text-white/80">Adventure Activity</p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight" data-testid="heading-kayaking-title">
                Kayaking Adventure
              </h1>
              <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
                Paddle through serene Kali River waters and Supa Reservoir
              </p>
            </motion.div>
          </div>
        </div>

        <Link href="/">
          <Button
            variant="outline"
            className="absolute top-6 left-6 z-20 backdrop-blur-sm bg-white/10 border-white/40 text-white hover:bg-white/20"
            data-testid="button-back-home"
          >
            ← Back to Home
          </Button>
        </Link>
      </section>

      {/* Quick Info */}
      <section className="py-12 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Duration</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-kayaking-duration">15-60 minutes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <IndianRupee className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Price Range</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-kayaking-price">₹150-₹300</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Capacity</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-kayaking-capacity">1-2 person kayaks</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Best Season</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-kayaking-season">Oct - May</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-3xl font-bold mb-4">Paddle Through Paradise</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Experience the tranquility of kayaking on the pristine Kali River and Supa Dam Reservoir. 
                  Surrounded by the lush Western Ghats, kayaking offers a unique perspective of Dandeli's 
                  natural beauty, combining peaceful exploration with gentle adventure.
                </p>
                <p className="text-lg text-muted-foreground">
                  Whether you're a complete beginner or an experienced paddler, our professional instructors 
                  provide comprehensive training in paddling techniques and safety. Navigate calm waters or 
                  challenge yourself with Grade II-III rapids.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-heading text-2xl font-bold mb-4">Types of Kayaking</h3>
                <div className="space-y-4">
                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplets className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold text-lg">Flatwater Kayaking</h4>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        Perfect for beginners and families. Learn paddle control on calm stretches 
                        of the Kali River and Supa Reservoir. Enjoy the scenic beauty and spot exotic 
                        birds along the way.
                      </p>
                      <p className="text-sm text-primary font-medium">Suitable for non-swimmers with life jackets</p>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Send className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold text-lg">Whitewater Kayaking</h4>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        For adrenaline seekers! Navigate Grade II-III rapids and test your skills 
                        against the river's challenges. Requires flatwater experience first.
                      </p>
                      <p className="text-sm text-primary font-medium">Recommended: Age 12+ with swimming ability</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="font-heading text-2xl font-bold mb-4">Safety & Equipment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Safety Gear</h4>
                      <p className="text-sm text-muted-foreground">
                        US Coast Guard rated life jackets and helmets provided
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Expert Training</h4>
                      <p className="text-sm text-muted-foreground">
                        Professional instructors teach all paddling techniques
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Age Requirement</h4>
                      <p className="text-sm text-muted-foreground">
                        Minimum 12 years old
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Location</h4>
                      <p className="text-sm text-muted-foreground">
                        Ganeshgudi, Joida Taluk
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-8">
                    <h3 className="font-heading text-2xl font-bold mb-4">
                      Ready to Paddle?
                    </h3>
                    <p className="mb-6 opacity-90">
                      Book your kayaking adventure and experience the serenity of Dandeli's waters 
                      surrounded by pristine Western Ghats forests.
                    </p>
                    <Link href="/booking">
                      <Button size="lg" variant="secondary" className="w-full" data-testid="button-book-kayaking">
                        Book Your Kayaking Trip
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">Experience Highlights</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                        <span>Glide through tranquil waters with surreal forest views</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                        <span>Spot wildlife and exotic birds along the riverbanks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                        <span>Solo or two-person kayaks with double-blade paddles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                        <span>Combine with rafting, camping, and jungle safaris</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                        <span>Early morning sessions offer best temperatures</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">What to Bring</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Quick-drying athletic wear
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Water shoes or neoprene booties
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Waterproof bag for valuables
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Sunscreen and hat
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Refillable water bottle
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">Timings & Season</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Daily Timings</p>
                        <p className="text-sm text-muted-foreground">9:00 AM - 6:00 PM</p>
                      </div>
                      <div className="h-px bg-border" />
                      <div>
                        <p className="font-medium">Best Season</p>
                        <p className="text-sm text-muted-foreground">
                          October to May (optimal water levels and comfortable temperatures)
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      Note: Activity may be suspended during monsoon when dam gates are closed
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-3xl font-bold mb-8 text-center">Why Choose Kayaking?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">For Everyone</h4>
                  <p className="text-sm text-muted-foreground">
                    Suitable for beginners and experienced paddlers. Professional training ensures 
                    everyone can enjoy this water sport safely.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Peaceful Exploration</h4>
                  <p className="text-sm text-muted-foreground">
                    Unlike motorized boats, kayaking offers a quiet way to explore nature, getting 
                    you closer to wildlife without disturbing them.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Great Workout</h4>
                  <p className="text-sm text-muted-foreground">
                    Kayaking provides excellent cardiovascular exercise while building upper body 
                    strength - all while enjoying stunning scenery.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
