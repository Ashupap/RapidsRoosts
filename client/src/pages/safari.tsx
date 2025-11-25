import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Calendar, Clock, Users, Shield, MapPin, ChevronRight, Compass, Binoculars } from "lucide-react";
import { useState } from "react";
import safariImage from "@assets/generated_images/Jungle_safari_wildlife_adventure_3300876a.png";
import safariImage2 from "@assets/stock_images/jungle_safari_wildli_5c354858.jpg";
import { useSEO, injectStructuredData } from "@/lib/seo";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function SafariDetail() {
  useSEO({
    title: 'Jungle Safari - Wildlife Safari in Dandeli Wildlife Sanctuary',
    description: 'Explore the 834 sq km Dandeli Wildlife Sanctuary on a guided jungle safari. Spot tigers, leopards, elephants, sloth bears, and 200+ bird species.',
    keywords: 'jungle safari Dandeli, Dandeli wildlife sanctuary, tiger safari Karnataka, wildlife tour Dandeli, bird watching Karnataka, jeep safari Western Ghats',
  });

  injectStructuredData('organization');

  const { scrollYProgress} = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.5]);
  const [videoError, setVideoError] = useState(false);

  const wildlife = [
    { name: "Tigers", count: "11-40" },
    { name: "Black Panthers", count: "Frequent sightings" },
    { name: "Elephants", count: "Elephant Reserve" },
    { name: "Sloth Bears", count: "Common" },
    { name: "Indian Bison", count: "Large herds" },
    { name: "Leopards", count: "Regular sightings" },
  ];

  const birds = [
    "Great Hornbill",
    "Malabar Pied Hornbill",
    "Malabar Trogon",
    "Paradise Flycatcher",
    "Crested Serpent Eagle",
    "Kingfishers",
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Video */}
      <section className="relative h-[60vh] overflow-hidden -mt-20 pt-20">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <AnimatePresence>
            {!videoError ? (
              <motion.video
                key="safari-video"
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
                <source src="/videos/jungle-safari.mp4" type="video/mp4" />
              </motion.video>
            ) : (
              <motion.div
                key="safari-image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${safariImage})` }}
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
                <Compass className="h-6 w-6" />
              </div>
              <p className="text-sm uppercase tracking-[0.2em] mb-4 text-white/80">Adventure Activity</p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium mb-6 leading-tight" data-testid="heading-safari-title">
                Jungle Safari
              </h1>
              <p className="text-base md:text-lg lg:text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
                Explore 834 sq km of pristine wilderness in Dandeli Wildlife Sanctuary
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
                <p className="text-sm text-muted-foreground" data-testid="text-safari-duration">2-3 hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Safety</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-safari-safety">Expert Naturalists</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Jeep Capacity</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-safari-capacity">8 persons</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Best Season</h3>
                <p className="text-sm text-muted-foreground" data-testid="text-safari-season">Oct - May</p>
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
                <h2 className="font-heading text-3xl font-bold mb-4">Wildlife Sanctuary Experience</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  Dandeli Wildlife Sanctuary spans 834-866 sq km, making it Karnataka's second-largest sanctuary 
                  and part of the prestigious Anshi-Dandeli Tiger Reserve. Embark on an unforgettable journey 
                  through dense forests, home to tigers, black panthers, elephants, and over 200 bird species.
                </p>
                <p className="text-lg text-muted-foreground">
                  Our expert guides navigate open-top jeeps through 10-30 km forest trails, offering the best 
                  chances to spot wildlife in their natural habitat. Early morning and late afternoon safaris 
                  provide optimal viewing opportunities when animals are most active.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-heading text-2xl font-bold mb-4">Major Wildlife</h3>
                <div className="grid grid-cols-2 gap-3">
                  {wildlife.map((animal, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-1">{animal.name}</h4>
                        <p className="text-xs text-muted-foreground">{animal.count}</p>
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
                <h3 className="font-heading text-2xl font-bold mb-4">Bird Watching Paradise</h3>
                <p className="text-muted-foreground mb-4">
                  With 200-300+ bird species, Dandeli is a birdwatcher's dream. The sanctuary is famous for 
                  its hornbills, especially the spectacular Great Hornbill and Malabar Pied Hornbill.
                </p>
                <div className="flex flex-wrap gap-2">
                  {birds.map((bird, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {bird}
                    </span>
                  ))}
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
                <img
                  src={safariImage2}
                  alt="Dandeli Jungle Safari"
                  className="rounded-lg w-full h-96 object-cover"
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
                      Ready for Wild Encounters?
                    </h3>
                    <p className="mb-6 opacity-90">
                      Explore the incredible biodiversity of Dandeli Wildlife Sanctuary. Contact us to learn more.
                    </p>
                    <Link href="/about">
                      <Button size="lg" variant="secondary" className="w-full" data-testid="button-contact-safari">
                        Contact Us
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
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Binoculars className="h-5 w-5 text-primary" />
                      Safari Timings
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <p className="font-medium">Morning Safari</p>
                        <p className="text-sm text-muted-foreground">6:00 AM - 9:00 AM</p>
                      </div>
                      <div className="h-px bg-border" />
                      <div>
                        <p className="font-medium">Evening Safari</p>
                        <p className="text-sm text-muted-foreground">3:00 PM - 6:00 PM</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      Note: Advance booking recommended during peak season
                    </p>
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
                    <h4 className="font-semibold mb-4">What to Bring</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Binoculars for better viewing
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Camera with zoom lens
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Comfortable shoes
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Sunscreen and hat
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        Mosquito repellent
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Safari Tips */}
      <section className="py-12 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-3xl font-bold mb-8 text-center">Safari Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Dress Code</h4>
                  <p className="text-sm text-muted-foreground">
                    Wear green, olive, or brown clothing to blend with nature. Avoid bright colors 
                    that might disturb wildlife.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Best Spotting Times</h4>
                  <p className="text-sm text-muted-foreground">
                    Early morning (6-9 AM) and late afternoon (4-6 PM) when animals are most active 
                    and temperatures are comfortable.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Follow Guide Instructions</h4>
                  <p className="text-sm text-muted-foreground">
                    Listen to your expert guide, maintain silence when required, and respect the 
                    natural habitat of wildlife.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
