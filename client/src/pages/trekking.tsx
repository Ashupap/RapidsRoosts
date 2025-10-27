import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Calendar, Clock, Users, Shield, MapPin, ChevronRight, Mountain, IndianRupee, Compass } from "lucide-react";
import { useState } from "react";
import trekkingImage from "@assets/generated_images/Forest_trekking_adventure_trail_14dd1cd1.png";
import { useSEO, injectStructuredData } from "@/lib/seo";

export default function TrekkingDetail() {
  useSEO({
    title: 'Forest Trekking - Guided Treks in Western Ghats Dandeli',
    description: 'Discover hidden forest trails through Western Ghats biodiversity hotspot. Trek to Shiroli Peak, Kavala Caves, Syntheri Rocks, and Magod Falls with expert guides. Multiple difficulty levels available.',
    keywords: 'forest trekking Dandeli, Western Ghats treks, Shiroli Peak trek, Kavala Caves, Syntheri Rocks, nature trails Dandeli, trekking Karnataka, jungle trek India',
  });

  injectStructuredData('activity', {
    name: 'Forest Trekking',
    description: 'Discover hidden trails through Western Ghats biodiversity',
    image: trekkingImage,
    url: '/trekking',
    price: 'Included in package',
  });

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.5]);
  const [videoError, setVideoError] = useState(false);

  const trails = [
    { name: "Shiroli Peak", distance: "25 km", difficulty: "Moderate", highlight: "360° panoramic views" },
    { name: "Kavala Caves Trek", distance: "3-4 km", difficulty: "Easy-Moderate", highlight: "Ancient limestone caves" },
    { name: "Potoli-Shiroli Trek", distance: "13 km", difficulty: "Moderate", highlight: "400+ bird species" },
    { name: "Kulgi-Nagzari Valley", distance: "13 km", difficulty: "Easy-Moderate", highlight: "Panoramic valley views" },
    { name: "Syntheri Rocks Trek", distance: "2.5 hrs", difficulty: "Easy", highlight: "Magnificent rock formations" },
    { name: "Moulangi Eco Park", distance: "Variable", difficulty: "Moderate", highlight: "Rock climbing & bamboo forests" },
  ];

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
                key="trekking-video"
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
                <source src="/videos/forest-trekking.mp4" type="video/mp4" />
              </motion.video>
            ) : (
              <motion.div
                key="trekking-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${trekkingImage})` }}
              />
            )}
          </AnimatePresence>
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
                <Mountain className="h-6 w-6" />
              </div>
              <p className="text-sm uppercase tracking-[0.2em] mb-4 text-white/80">Adventure Activity</p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight" data-testid="heading-trekking-title">
                Forest Trekking
              </h1>
              <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
                Discover hidden trails through Western Ghats biodiversity hotspot
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
      <section className="py-12 px-6 bg-section-teal">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Duration</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-trekking-duration">2-6 hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <IndianRupee className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Price Range</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-trekking-price">₹500-₹1,000</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Mountain className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Elevation</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-trekking-elevation">Up to 1,934 ft</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Best Season</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-trekking-season">Oct - March</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 bg-section-light">
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
                <h2 className="font-heading text-3xl font-bold mb-4">Trek Through Pristine Forests</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Dandeli, part of the Western Ghats biodiversity hotspot, offers diverse trekking experiences 
                  through dense forests, scenic peaks, ancient caves, and pristine rivers. Each trail reveals 
                  unique landscapes, from bamboo forests to evergreen canopy, rocky paths to stream crossings.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our expert local guides, trained by Karnataka Tourism, know the flora and fauna intimately. 
                  Trek responsibly through one of the world's most biodiverse regions, home to tigers, leopards, 
                  elephants, and over 400 bird species including the magnificent Great Hornbill.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-heading text-2xl font-bold mb-4">Popular Trekking Trails</h3>
                <div className="space-y-3">
                  {trails.map((trail, index) => (
                    <Card key={index} className="hover-elevate active-elevate-2 transition-all cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{trail.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{trail.highlight}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Compass className="h-3 w-3" /> {trail.distance}
                              </span>
                              <span className="flex items-center gap-1">
                                <Mountain className="h-3 w-3" /> {trail.difficulty}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="font-heading text-2xl font-bold mb-4">What to Expect</h3>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Wildlife Encounters</h4>
                      <p className="text-sm text-muted-foreground">
                        Spot tigers, leopards, elephants, sloth bears, gaur, sambar deer, Malabar squirrels, 
                        and numerous bird species including hornbills, minivets, and thrushes.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Diverse Terrain</h4>
                      <p className="text-sm text-muted-foreground">
                        Navigate dense bamboo forests, evergreen canopy, rocky paths, stream crossings, 
                        steep ascents, narrow ridges, and seasonal waterfalls.
                      </p>
                    </CardContent>
                  </Card>
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
                      Ready for Adventure?
                    </h3>
                    <p className="mb-6 opacity-90">
                      Book your trekking expedition and explore the breathtaking Western Ghats trails 
                      with expert local guides.
                    </p>
                    <Link href="/booking">
                      <Button size="lg" variant="secondary" className="w-full" data-testid="button-book-trekking">
                        Book Your Trek
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
                    <h4 className="font-semibold mb-4">Essential Gear</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Sturdy hiking boots (ankle-height minimum)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Water bottle & energy snacks
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Lemon & salt (for leech removal)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Mosquito repellent & sunscreen
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Camera & binoculars
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Flashlight/headlamp for cave treks
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Fully charged phone & offline maps
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
                    <h4 className="font-semibold mb-4">Permits & Booking</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Many trails require Forest Department permission. Our packages include:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Forest Department permits arranged</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Users className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Experienced local guides</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>Transportation to trail starts</span>
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
                    <h4 className="font-semibold mb-4">Safety Tips</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Trek in groups for safety
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Inform someone of your itinerary
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Maintain safe distance from wildlife
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Follow Leave No Trace principles
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Season Guide */}
      <section className="py-12 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-3xl font-bold mb-8 text-center">Seasonal Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-primary border-2">
                <CardContent className="p-6">
                  <div className="text-xs font-semibold bg-primary text-primary-foreground px-2 py-1 rounded-full inline-block mb-2">
                    BEST SEASON
                  </div>
                  <h4 className="font-semibold mb-2">Winter (Oct-Mar)</h4>
                  <p className="text-sm text-muted-foreground">
                    Perfect trekking weather with mild temperatures (20-30°C), clear skies, and pleasant trails. 
                    Best wildlife sightings and photography conditions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Summer (Apr-Jun)</h4>
                  <p className="text-sm text-muted-foreground">
                    Hot and humid (35°C+) but better wildlife sightings near water sources. Early morning 
                    treks recommended. Carry extra water.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Monsoon (Jul-Sep)</h4>
                  <p className="text-sm text-muted-foreground">
                    Lush greenery and waterfalls at peak, but trails slippery and leeches active. 
                    For experienced trekkers only.
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
