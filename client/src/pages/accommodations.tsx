import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bed,
  Wifi,
  Coffee,
  Utensils,
  Car,
  TreePine,
  Waves,
  CheckCircle2,
  Star,
  Users,
  MapPin,
  Phone,
  ArrowRight,
  Home,
  Building2,
  Sparkles
} from "lucide-react";
import { useSEO } from "@/lib/seo";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useRef, useState } from "react";
import activityVideo from "@assets/activity-video-compressed.mp4";
import fallbackImage from "@assets/stock_images/vibrant_water_raftin_9419a08c.jpg";
import resort1 from "@assets/stock_images/luxury_resort_accomm_d96d2ca3.jpg";
import resort2 from "@assets/stock_images/luxury_resort_accomm_00f4efc3.jpg";
import resort3 from "@assets/stock_images/luxury_resort_accomm_57bf8350.jpg";
import homestay1 from "@assets/stock_images/cozy_homestay_cottag_37c83eba.jpg";
import homestay2 from "@assets/stock_images/cozy_homestay_cottag_32f18974.jpg";

const accommodations = [
  {
    id: "resort-deluxe",
    type: "resort",
    name: "Rapids Resort - Deluxe Rooms",
    tagline: "Luxury Meets Adventure",
    description: "Experience premium comfort in our deluxe rooms with modern amenities, stunning forest views, and direct access to adventure activities.",
    image: resort1,
    pricePerNight: 3500,
    capacity: "2-3 guests",
    amenities: ["AC Rooms", "Attached Bathroom", "WiFi", "TV", "Mini Bar", "Balcony"],
    features: ["Swimming Pool", "Multi-Cuisine Restaurant", "Adventure Desk", "Bonfire Area", "24/7 Security"],
    rating: 4.8,
    reviews: 245
  },
  {
    id: "resort-standard",
    type: "resort",
    name: "Rapids Resort - Standard Rooms",
    tagline: "Comfort & Value",
    description: "Comfortable accommodations with all essential amenities, perfect for adventurers who want quality stay at affordable rates.",
    image: resort2,
    pricePerNight: 2200,
    capacity: "2-3 guests",
    amenities: ["AC Rooms", "Attached Bathroom", "WiFi", "TV", "Hot Water"],
    features: ["Restaurant Access", "Adventure Activities", "Parking", "Common Areas"],
    rating: 4.6,
    reviews: 312
  },
  {
    id: "riverside-cottage",
    type: "resort",
    name: "Riverside Cottages",
    tagline: "Nature's Embrace",
    description: "Private cottages nestled by the Kali River offering tranquil views and an authentic nature experience.",
    image: resort3,
    pricePerNight: 4200,
    capacity: "4-6 guests",
    amenities: ["2 Bedrooms", "Living Area", "Kitchenette", "Private Garden", "River View"],
    features: ["BBQ Facilities", "Outdoor Seating", "Nature Trails", "Bird Watching"],
    rating: 4.9,
    reviews: 178
  },
  {
    id: "homestay-traditional",
    type: "homestay",
    name: "Traditional Homestay",
    tagline: "Local Culture & Hospitality",
    description: "Experience authentic Dandeli hospitality with home-cooked meals and personalized attention from local families.",
    image: homestay1,
    pricePerNight: 1500,
    capacity: "2-4 guests",
    amenities: ["Clean Rooms", "Attached Bathroom", "Home Food", "Cultural Experience"],
    features: ["Family Environment", "Local Cuisine", "Village Tours", "Authentic Experience"],
    rating: 4.7,
    reviews: 189
  },
  {
    id: "homestay-modern",
    type: "homestay",
    name: "Modern Homestay Villa",
    tagline: "Home Away From Home",
    description: "Contemporary homestay combining modern comforts with traditional warmth, ideal for families and groups.",
    image: homestay2,
    pricePerNight: 2800,
    capacity: "6-8 guests",
    amenities: ["3 Bedrooms", "AC Available", "Full Kitchen", "Parking", "WiFi"],
    features: ["Family-Friendly", "Home Cooked Meals", "Spacious Halls", "Garden Area"],
    rating: 4.8,
    reviews: 156
  }
];

export default function Accommodations() {
  const prefersReducedMotion = useReducedMotion();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? "0%" : "0%", prefersReducedMotion ? "0%" : "20%"]);

  useSEO({
    title: 'Resorts & Homestays - Accommodation in Dandeli',
    description: 'Book comfortable resorts and authentic homestays in Dandeli. From luxury riverside cottages to traditional family homestays, find the perfect accommodation for your adventure getaway.',
    keywords: 'Dandeli resorts, Dandeli homestays, accommodation Dandeli, hotels Dandeli, riverside cottages, family homestays, Dandeli lodging',
  });

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] overflow-hidden -mt-20 pt-20">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0"
        >
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

          {!videoLoaded && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${fallbackImage})` }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-teal-900/30" />
        </motion.div>

        <div className="relative z-10 flex items-center justify-center px-6 pt-32 pb-20">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-white/90 font-medium mb-6">
                <Home className="inline h-3 w-3 mr-2" />
                Your Home in the Wilderness
              </p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                Resorts & Homestays
              </h1>
              <p className="text-base md:text-lg text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                From luxury riverside resorts to authentic family homestays, discover comfortable
                accommodations that complement your Dandeli adventure perfectly.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a href="#accommodations">
                  <Button size="lg" className="text-base">
                    View Options
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="text-base bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Stay With Us */}
      <section className="py-20 px-6 bg-section-teal">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">
              Why Choose Us
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Experience Comfort & Nature
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MapPin, title: "Prime Location", desc: "Close to all adventure activities and nature spots" },
              { icon: Sparkles, title: "Clean & Hygienic", desc: "Sanitized rooms with highest cleanliness standards" },
              { icon: Utensils, title: "Delicious Food", desc: "Multi-cuisine options and local authentic flavors" },
              { icon: CheckCircle2, title: "All Inclusive", desc: "Activities, meals, and sightseeing in packages" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover-elevate transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <feature.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodations List */}
      <section id="accommodations" className="py-20 px-6 bg-section-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Choose Your Perfect Stay
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select from our range of comfortable resorts and authentic homestays
            </p>
          </motion.div>

          <div className="space-y-8">
            {accommodations.map((accommodation, index) => (
              <motion.div
                key={accommodation.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/50">
                  <div className="grid lg:grid-cols-5 gap-0">
                    {/* Image */}
                    <div className="lg:col-span-2 relative h-64 lg:h-auto overflow-hidden">
                      <img
                        src={accommodation.image}
                        alt={accommodation.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-white flex items-center gap-1">
                          {accommodation.type === "resort" ? <Building2 className="h-3 w-3" /> : <Home className="h-3 w-3" />}
                          {accommodation.type === "resort" ? "Resort" : "Homestay"}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-sm">{accommodation.rating}</span>
                        <span className="text-xs text-muted-foreground">({accommodation.reviews})</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3 p-6 lg:p-8">
                      <div className="mb-4">
                        <h3 className="font-heading text-2xl font-bold mb-2">{accommodation.name}</h3>
                        <p className="text-sm text-primary font-medium mb-3">{accommodation.tagline}</p>
                        <p className="text-muted-foreground mb-4">{accommodation.description}</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-xs text-muted-foreground mb-2 font-medium">AMENITIES</p>
                          <div className="flex flex-wrap gap-2">
                            {accommodation.amenities.slice(0, 4).map((amenity, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-2 font-medium">FEATURES</p>
                          <div className="flex flex-wrap gap-2">
                            {accommodation.features.slice(0, 3).map((feature, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {accommodation.capacity}
                          </p>
                        </div>
                        <Link href="/about">
                          <Button className="text-base" data-testid={`button-contact-${accommodation.id}`}>
                            Contact Us
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Info */}
      <section className="py-20 px-6 bg-primary/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="font-heading text-3xl font-bold mb-4">Complete Adventure Packages</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  All our accommodations can be enjoyed as part of complete adventure packages including
                  stay, meals, activities, and sightseeing. Contact us to learn more!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/about">
                    <Button size="lg" className="text-base">
                      Contact Us
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <a href="tel:+919483940400">
                    <Button size="lg" variant="outline" className="text-base">
                      <Phone className="mr-2 h-5 w-5" />
                      Call Us
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
