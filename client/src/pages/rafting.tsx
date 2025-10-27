import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Calendar, Clock, Users, Shield, MapPin, ChevronRight, Waves, IndianRupee } from "lucide-react";
import { useState } from "react";
import raftingImage from "@assets/stock_images/vibrant_water_raftin_9419a08c.jpg";
import raftingHero2 from "@assets/stock_images/adventure_sports_gal_5c0d834f.jpg";
import raftingHero3 from "@assets/stock_images/adventure_sports_gal_5bf20dc4.jpg";
import { useSEO, injectStructuredData } from "@/lib/seo";

export default function RaftingDetail() {
  useSEO({
    title: 'White Water Rafting - Kali River Rafting Adventure in Dandeli',
    description: 'Experience thrilling white water rafting on the Kali River in Dandeli. Navigate Grade 2-3 rapids with professional guides. Choose from 9 km long rafting or 1 km short rafting routes. Book now from ₹600.',
    keywords: 'white water rafting Dandeli, Kali river rafting, rafting Karnataka, Dandeli rafting price, river rafting Western Ghats, Grade 2-3 rapids, adventure rafting India',
  });

  injectStructuredData('activity', {
    name: 'White Water Rafting',
    description: 'Navigate Grade 2-3 rapids on the pristine Kali River',
    image: raftingImage,
    url: '/rafting',
    price: '600-1500',
  });

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.5]);
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Video */}
      <section className="relative h-[60vh] overflow-hidden">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <AnimatePresence>
            {!videoError ? (
              <motion.video
                key="rafting-video"
                autoPlay
                loop
                muted
                playsInline
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setVideoError(true)}
              >
                <source src="/videos/water-rafting.mp4" type="video/mp4" />
              </motion.video>
            ) : (
              <motion.div
                key="rafting-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${raftingImage})` }}
              />
            )}
          </AnimatePresence>
          
          {/* Enhanced High-Contrast overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </motion.div>

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-2 mb-6">
                <Waves className="h-6 w-6" />
              </div>
              <p className="text-sm uppercase tracking-[0.2em] mb-4 text-white/80">Adventure Activity</p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight" data-testid="heading-rafting-title">
                White Water Rafting
              </h1>
              <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
                Navigate Grade 2-3 rapids on the pristine Kali River
              </p>
            </motion.div>
          </div>
        </div>

        {/* Back to Home */}
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

      {/* Quick Info Cards */}
      <section className="py-12 px-6 bg-section-teal">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Duration</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-rafting-duration">30 min - 4 hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <IndianRupee className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Price Range</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-rafting-price">₹500 - ₹1,800</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Group Size</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-rafting-groupsize">6-8 per raft</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Best Season</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-rafting-season">Oct - June</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 bg-section-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">The Experience</p>
                <h2 className="font-heading text-3xl md:text-4xl font-medium mb-6 leading-tight">Experience the Thrill</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  White water rafting on the Kali River is one of Dandeli's most exhilarating adventures. 
                  Navigate through Grade 2-3 rapids as you paddle through dense Western Ghats forests, 
                  surrounded by stunning natural beauty and the sound of rushing water.
                </p>
                <p className="text-lg text-muted-foreground">
                  The river flows year-round thanks to water released from Supa Dam, making Dandeli a 
                  premier rafting destination in South India. Whether you're a beginner or experienced 
                  rafter, our trained guides ensure a safe and memorable experience.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-heading text-2xl font-bold mb-4">Rafting Options</h3>
                <div className="space-y-4">
                  <Card className="border-l-4 border-l-primary" data-testid="card-rafting-short">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-lg mb-2">Short Rafting (1-2 km)</h4>
                      <p className="text-muted-foreground mb-2">Perfect for first-timers and families</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> 30 minutes
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" /> ₹500-600
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-primary" data-testid="card-rafting-mid">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-lg mb-2">Mid Rafting (5-6 km)</h4>
                      <p className="text-muted-foreground mb-2">Great mix of excitement and scenery</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> 1-1.5 hours
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" /> ₹1,000-1,400
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-primary bg-primary/5" data-testid="card-rafting-long">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-lg">Long Rafting (7.5-9.5 km)</h4>
                        <span className="text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-full">
                          MOST POPULAR
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-2">Ultimate adventure with 8-10 rapids</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" /> 2-4 hours
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-4 w-4" /> ₹1,350-1,800
                        </span>
                      </div>
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
                <h3 className="font-heading text-2xl font-bold mb-4">Safety & Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Professional Equipment</h4>
                      <p className="text-sm text-muted-foreground">
                        Life jackets, helmets, and paddles provided
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Trained Guides</h4>
                      <p className="text-sm text-muted-foreground">
                        Expert raftsmen accompany each trip
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Age Requirements</h4>
                      <p className="text-sm text-muted-foreground">
                        12-60 years (with parental consent for minors)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Location</h4>
                      <p className="text-sm text-muted-foreground">
                        Ganeshgudi (22-27 km from Dandeli town)
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Images & CTA */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <img
                  src={raftingHero2}
                  alt="Rafting on Kali River"
                  className="rounded-lg w-full h-80 object-cover"
                />
                <img
                  src={raftingHero3}
                  alt="White Water Rapids"
                  className="rounded-lg w-full h-64 object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-8">
                    <h3 className="font-heading text-2xl font-bold mb-4">
                      Ready to Ride the Rapids?
                    </h3>
                    <p className="mb-6 opacity-90">
                      Book your white water rafting adventure and experience the thrill of a lifetime 
                      on the Kali River.
                    </p>
                    <Link href="/booking">
                      <Button size="lg" variant="secondary" className="w-full" data-testid="button-book-rafting">
                        Book Your Rafting Trip
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
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">What to Bring</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Quick-dry clothing (avoid jeans)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Secure footwear (no flip-flops)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Waterproof bags for valuables
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Hat/cap with strap + sunscreen
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Change of clothes
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Season Section */}
      <section className="py-12 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="font-heading text-3xl font-bold mb-6">Best Time to Visit</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">October - December</h4>
                  <p className="text-sm text-muted-foreground">
                    Post-monsoon season with best rapids and pleasant weather
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary border-2">
                <CardContent className="p-6">
                  <div className="text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-full inline-block mb-2">
                    PEAK SEASON
                  </div>
                  <h4 className="font-semibold mb-2">January - April</h4>
                  <p className="text-sm text-muted-foreground">
                    Ideal water levels and comfortable temperatures
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">February - March</h4>
                  <p className="text-sm text-muted-foreground">
                    Fewer crowds with potential discounts
                  </p>
                </CardContent>
              </Card>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Note: Rafting may be closed during monsoon season (June-September) for safety reasons
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
