import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Award, Shield, Users, Leaf, Mountain, Waves, MapPin, CheckCircle2, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { useSEO, injectStructuredData } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ParallaxImage } from "@/components/ParallaxSection";
import { WaterDroplets, WildlifeSilhouette, FloatingLeaves } from "@/components/AdventureEffects";
import { Link } from "wouter";
import heroVideo from "@assets/hero-video-compressed.mp4";
import raftingHero from "@assets/stock_images/vibrant_water_raftin_9419a08c.jpg";
import safariImage from "@assets/stock_images/jungle_safari_wildli_f86a9bfa.jpg";
import trekkingImage from "@assets/generated_images/Forest_trekking_adventure_trail_14dd1cd1.png";
import campImage from "@assets/stock_images/forest_camping_tents_2caeb335.jpg";

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  useSEO({
    title: 'About Rapids & Roosts - Best Adventure Tourism Company in Dandeli, Karnataka | 15+ Years Experience',
    description: 'Discover Rapids & Roosts, Dandeli\'s #1 rated adventure tourism operator with 15+ years of experience and 10,000+ happy adventurers. Offering eco-friendly white water rafting, jungle safaris, trekking, and kayaking in Karnataka\'s Western Ghats. Certified guides, international safety standards, and sustainable tourism practices. Book your Dandeli adventure with the most trusted tour operator.',
    keywords: 'about Rapids Roosts Dandeli, best Dandeli tour operator, Dandeli adventure tourism company, Western Ghats adventures Karnataka, eco-friendly tourism Dandeli, sustainable adventure travel, best adventure company Karnataka, Dandeli tour packages, trusted Dandeli operator, adventure tourism Dandeli, Dandeli wildlife tourism, Kali river adventures',
  });

  injectStructuredData('organization');
  injectStructuredData('breadcrumb', {
    items: [
      { name: 'Home', url: '/' },
      { name: 'About Us' }
    ]
  });

  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [prefersReducedMotion ? "0%" : "0%", prefersReducedMotion ? "0%" : "20%"]);

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Your safety is our top priority. All activities are conducted with certified equipment and experienced guides following international safety standards.",
    },
    {
      icon: Leaf,
      title: "Eco-Conscious",
      description: "We're committed to sustainable tourism practices that preserve Dandeli's natural beauty for future generations.",
    },
    {
      icon: Heart,
      title: "Guest Experience",
      description: "Every adventure is crafted with care to ensure unforgettable memories and exceptional service throughout your journey.",
    },
    {
      icon: Award,
      title: "Expert Guidance",
      description: "Our team of certified professionals brings years of local knowledge and expertise to every adventure.",
    },
  ];

  const achievements = [
    { number: "15+", label: "Years of Excellence" },
    { number: "10,000+", label: "Happy Adventurers" },
    { number: "4", label: "Core Activities" },
    { number: "100%", label: "Safety Record" },
  ];

  const whyChooseUs = [
    "Certified and experienced adventure guides",
    "International safety standards and equipment",
    "Customizable packages for all group sizes",
    "24/7 customer support during your stay",
    "Eco-friendly and sustainable practices",
    "Local expertise and insider knowledge",
    "Comfortable accommodations and amenities",
    "Hassle-free booking and payment options",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[70vh] overflow-hidden -mt-20 pt-20">
        {/* Background Video with Parallax */}
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
            poster={raftingHero}
            onLoadedData={() => setVideoLoaded(true)}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          
          {!videoLoaded && (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${raftingHero})` }}
            />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 to-teal-900/30" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center px-6 pt-32 pb-20">
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-white/90 font-medium mb-6">
                <MapPin className="inline h-3 w-3 mr-2" />
                Since 2008
              </p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight" data-testid="text-about-hero-title">
                Crafting Adventures,<br/>Creating Memories
              </h1>
              <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed" data-testid="text-about-hero-subtitle">
                For over 15 years, we've been connecting adventure seekers with the wild heart of Dandeli. 
                Our passion is to deliver authentic, safe, and unforgettable experiences in nature's paradise.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6 bg-section-light relative overflow-hidden">
        <FloatingLeaves />
        <WildlifeSilhouette type="bird" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">Our Journey</p>
              <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight" data-testid="text-our-story-title">
                Where Passion Meets<br/>Adventure
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>
                  Rapids & Roosts began with a simple dream: to share the untamed beauty of Dandeli with the world. 
                  Nestled in the heart of Karnataka's Western Ghats, this pristine wilderness became our calling.
                </p>
                <p>
                  What started as a small team of adventure enthusiasts has grown into Dandeli's most trusted adventure 
                  tourism operator. We've guided thousands of travelers through thrilling rapids, dense jungles, and 
                  breathtaking landscapes, each journey fueled by our commitment to excellence and sustainability.
                </p>
                <p>
                  Today, we combine cutting-edge safety standards with authentic local experiences, ensuring every 
                  adventure is both exhilarating and responsible. Our deep connection to this land drives us to 
                  protect it while sharing its wonders with you.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <ParallaxImage
                  src={safariImage}
                  alt="Jungle Safari Adventure"
                  className="rounded-lg h-64 object-cover"
                  speed={0.3}
                />
                <ParallaxImage
                  src={trekkingImage}
                  alt="Forest Trekking"
                  className="rounded-lg h-64 object-cover mt-8"
                  speed={0.5}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-6 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
                data-testid={`stat-${index}`}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2" data-testid={`stat-number-${index}`}>
                  {achievement.number}
                </div>
                <div className="text-sm md:text-base text-primary-foreground/90" data-testid={`stat-label-${index}`}>
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-6 bg-section-teal relative overflow-hidden">
        <WaterDroplets />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">What We Stand For</p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6" data-testid="text-values-title">
              Our Core Values
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              These principles guide every adventure we create and every relationship we build
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  data-testid={`card-value-${index}`}
                >
                  <Card className="h-full hover-elevate transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-heading text-xl font-bold mb-3" data-testid={`text-value-title-${index}`}>
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-value-desc-${index}`}>
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-section-coral relative overflow-hidden">
        <WildlifeSilhouette type="deer" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 lg:order-1"
            >
              <ParallaxImage
                src={campImage}
                alt="Camping Experience"
                className="rounded-lg w-full h-96 object-cover shadow-2xl"
                speed={0.4}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">The Rapids & Roosts Difference</p>
              <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight" data-testid="text-why-choose-title">
                Why Choose Us
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyChooseUs.map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-start gap-3"
                    data-testid={`reason-${index}`}
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-muted-foreground">{reason}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/activities">
                  <Button size="lg" className="group" data-testid="button-explore-activities">
                    Explore Our Activities
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="py-20 px-6 bg-section-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">Sustainability</p>
            <h2 className="font-heading text-4xl md:text-5xl font-medium text-foreground mb-6" data-testid="text-commitment-title">
              Our Environmental Promise
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: "Zero Waste Policy",
                description: "We follow strict waste management practices, ensuring all our activities leave minimal environmental footprint.",
              },
              {
                icon: Users,
                title: "Community Partnership",
                description: "We work closely with local communities, supporting sustainable livelihoods and preserving cultural heritage.",
              },
              {
                icon: Mountain,
                title: "Conservation Efforts",
                description: "A portion of every booking goes toward wildlife conservation and forest preservation initiatives.",
              },
            ].map((commitment, index) => {
              const Icon = commitment.icon;
              return (
                <motion.div
                  key={commitment.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  data-testid={`card-commitment-${index}`}
                >
                  <Card className="h-full hover-elevate transition-all duration-300 text-center">
                    <CardContent className="p-8">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                        <Icon className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold mb-4" data-testid={`text-commitment-title-${index}`}>
                        {commitment.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed" data-testid={`text-commitment-desc-${index}`}>
                        {commitment.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary via-primary to-teal-600 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-primary/80 opacity-90" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight" data-testid="text-cta-title">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
              Join thousands of adventurers who've discovered the magic of Dandeli with Rapids & Roosts
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/booking">
                <Button size="lg" variant="secondary" className="text-lg px-8 shadow-xl hover-elevate" data-testid="button-book-now">
                  Book Your Adventure
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/activities">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary" data-testid="button-view-activities">
                  View Activities
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
