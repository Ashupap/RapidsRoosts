import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Thermometer,
  Waves,
  Mountain,
  Compass,
  Trees,
  Camera,
  Users,
  Home as HomeIcon,
  Utensils,
  Clock,
  Heart
} from "lucide-react";
import { useSEO, injectStructuredData } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function DandeliGuide() {
  useSEO({
    title: 'Complete Dandeli Travel Guide 2025 - Best Time to Visit, Activities, Hotels & Travel Tips',
    description: 'The ultimate Dandeli travel guide for 2025. Discover the best time to visit Dandeli, top adventure activities (white water rafting, wildlife safari, trekking), accommodation options, how to reach, weather, food, and travel tips. Plan your perfect Dandeli trip to Karnataka\'s adventure capital with this comprehensive guide.',
    keywords: 'Dandeli travel guide, Dandeli tourism guide 2025, best time to visit Dandeli, how to reach Dandeli, Dandeli weather, things to do in Dandeli, Dandeli hotels, Dandeli trip planning, Dandeli adventure guide, Karnataka tourism, Dandeli complete guide, Dandeli travel tips, Western Ghats tourism',
  });

  injectStructuredData('organization');
  injectStructuredData('breadcrumb', {
    items: [
      { name: 'Home', url: '/' },
      { name: 'Dandeli Travel Guide' }
    ]
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6" data-testid="heading-guide-title">
              Complete Dandeli Travel Guide 2025
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your comprehensive guide to exploring Dandeli, Karnataka's adventure capital. Everything you need to know for an unforgettable trip to the Western Ghats.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-lg">
          
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <MapPin className="text-primary" />
              About Dandeli - Karnataka's Adventure Capital
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Nestled in the Western Ghats of Karnataka, Dandeli is a hidden gem that offers the perfect blend of adventure, wildlife, and natural beauty. Located approximately 460 km from Bangalore and 100 km from Goa, this charming town sits on the banks of the pristine Kali River, surrounded by dense forests that are home to incredible biodiversity.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Dandeli is renowned as one of India's premier adventure tourism destinations, offering thrilling white water rafting, wildlife safaris in the 834 sq km Dandeli Wildlife Sanctuary, forest trekking through the Western Ghats, kayaking, and much more. Whether you're an adrenaline junkie, a nature enthusiast, or someone looking for a peaceful retreat, Dandeli has something special for everyone.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The town gained protected status with the establishment of the Dandeli Wildlife Sanctuary in 1956, which later became part of the Kali Tiger Reserve. Today, it stands as one of Karnataka's most important ecological zones and a must-visit destination for adventure tourism in India.
            </p>
          </motion.div>

          {/* Best Time to Visit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Calendar className="text-primary" />
              Best Time to Visit Dandeli
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="border-2 border-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Thermometer className="text-chart-3" />
                    October to February (Peak Season)
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    <strong>Best for:</strong> All activities, wildlife spotting, comfortable weather
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    <strong>Temperature:</strong> 15-28°C (Pleasant and cool)
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    This is the ideal time to visit Dandeli. The weather is perfect for all outdoor activities, wildlife sightings are frequent during morning and evening safaris, and the lush green landscapes after monsoon create stunning photo opportunities. Perfect for families and first-time visitors.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-amber-500/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Waves className="text-amber-500" />
                    March to May (Summer Season)
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    <strong>Best for:</strong> White water rafting, water activities
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    <strong>Temperature:</strong> 25-38°C (Hot and dry)
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Summer brings strong currents to the Kali River, making it the best time for thrilling white water rafting experiences. Grade 3 rapids are at their peak, offering maximum adventure. Early mornings and evenings are comfortable for trekking and safaris. Ideal for adventure enthusiasts.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-destructive/20 mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  June to September (Monsoon - Avoid)
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Not recommended:</strong> Most adventure activities including rafting, kayaking, and jungle safaris are closed during monsoon for safety reasons. The region receives heavy rainfall, and the Kali River becomes too dangerous for water sports. While the forests look lush and beautiful, outdoor activities are limited.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* How to Reach Dandeli */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">
              How to Reach Dandeli
            </h2>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    By Road (Most Popular)
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>From Bangalore:</strong> 460 km (8-9 hours) via NH48 and NH63. Well-maintained highway with scenic views</li>
                    <li><strong>From Mumbai:</strong> 500 km (10-11 hours) via Pune and Belgaum</li>
                    <li><strong>From Goa:</strong> 100 km (2-3 hours) via NH748</li>
                    <li><strong>From Pune:</strong> 380 km (7-8 hours)</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    <strong>Bus Services:</strong> Regular KSRTC buses from Bangalore Majestic Bus Stand, Hubli, and Belgaum. Private luxury buses also available with AC and sleeper options.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    By Train
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    <strong>Nearest Railway Stations:</strong>
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>Alnavar Junction:</strong> 32 km from Dandeli (Closest station)</li>
                    <li><strong>Londa Junction:</strong> 52 km from Dandeli (Better connectivity)</li>
                    <li><strong>Hubli Junction:</strong> 72 km from Dandeli (Major railway hub with excellent connections)</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    From these stations, you can hire taxis or take local buses to reach Dandeli. We provide pickup services from Hubli.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    By Air
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    <strong>Nearest Airports:</strong>
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>Hubli Airport:</strong> 72 km (2 hours) - Domestic flights from Bangalore</li>
                    <li><strong>Dabolim Airport (Goa):</strong> 120 km (3 hours) - International and domestic flights</li>
                    <li><strong>Belgaum Airport:</strong> 110 km (2.5 hours) - Limited domestic connectivity</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    Taxis are readily available from all airports. We can arrange airport pickups and transfers as part of your package.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Top Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Compass className="text-primary" />
              Top Things to Do in Dandeli
            </h2>

            <div className="space-y-6">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Waves className="text-primary" />
                    1. White Water Rafting on Kali River
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Dandeli is famous for offering some of India's best white water rafting experiences. The Kali River provides Grade 2-3 rapids that are perfect for both beginners and experienced rafters.
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-3">
                    <li><strong>Short Rafting:</strong> 1 km stretch (1 hour) - ₹600 per person - Perfect for families and first-timers</li>
                    <li><strong>Long Rafting:</strong> 9 km stretch (2-3 hours) - ₹1,500 per person - For adventure enthusiasts</li>
                    <li><strong>Best Time:</strong> March to May (strongest currents) and October to February</li>
                    <li><strong>Safety:</strong> Certified instructors, quality equipment, full training provided</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-chart-3">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Camera className="text-chart-3" />
                    2. Jungle Safari in Dandeli Wildlife Sanctuary
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Explore the 834 sq km Dandeli Wildlife Sanctuary (part of Kali Tiger Reserve) home to incredible biodiversity including Bengal tigers, black panthers, leopards, sloth bears, elephants, and over 300 bird species.
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-3">
                    <li><strong>Duration:</strong> 2-3 hours guided jeep safari</li>
                    <li><strong>Price:</strong> ₹600 per person</li>
                    <li><strong>Best Time:</strong> Early morning (6-9 AM) or evening (4-6 PM)</li>
                    <li><strong>Highlights:</strong> Tiger sightings (rare but possible), abundant deer, exotic birds, crocodiles near riverbanks</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-amber-500">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Mountain className="text-amber-500" />
                    3. Forest Trekking in Western Ghats
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Discover hidden trails through dense Western Ghats forests, visit ancient caves, scenic viewpoints, and pristine waterfalls.
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-3">
                    <li><strong>Syntheri Rocks:</strong> 3 km trek to 300-foot tall monolithic granite rocks</li>
                    <li><strong>Moulangi Eco-Park:</strong> Easy nature trails perfect for families</li>
                    <li><strong>Kavala Caves:</strong> Ancient limestone caves with stalactite formations</li>
                    <li><strong>Best Time:</strong> October to March for comfortable temperatures</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    4. Kayaking & Other Water Sports
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Peaceful kayaking on calm river sections, coracle boat rides, swimming, and river crossing activities.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    5. Bird Watching Paradise
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Over 300 bird species including Hornbills, Kingfishers, Eagles, and migratory birds. Best time: Early morning during October to March.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Accommodation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <HomeIcon className="text-primary" />
              Where to Stay in Dandeli
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Riverside Cottages</h3>
                  <p className="text-muted-foreground mb-2">₹2,500-4,000 per night</p>
                  <p className="text-sm text-muted-foreground">Scenic Kali River views, AC, private bathrooms, ideal for couples and families</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Luxury Jungle Tents</h3>
                  <p className="text-muted-foreground mb-2">₹3,000-5,000 per night</p>
                  <p className="text-sm text-muted-foreground">Glamping experience with modern amenities, perfect for adventure seekers</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Jungle Treehouses</h3>
                  <p className="text-muted-foreground mb-2">₹3,500-6,000 per night</p>
                  <p className="text-sm text-muted-foreground">Elevated stays amidst nature, unique experience with wildlife sounds</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Budget Dormitories</h3>
                  <p className="text-muted-foreground mb-2">₹500-1,000 per bed</p>
                  <p className="text-sm text-muted-foreground">Clean shared facilities, perfect for backpackers and groups</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Food & Dining */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Utensils className="text-primary" />
              Food & Dining in Dandeli
            </h2>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Dandeli offers a delightful mix of North Karnataka cuisine, seafood from nearby Goa, and popular Indian dishes. Most resorts and jungle lodges include meals in their packages.
            </p>

            <div className="space-y-3 text-muted-foreground">
              <p><strong>Must-Try Dishes:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Jolada Rotti (Sorghum flatbread) with spicy curries</li>
                <li>Bamboo shoot curry (local delicacy)</li>
                <li>Fresh river fish preparations</li>
                <li>Goan seafood dishes</li>
                <li>North Karnataka thali meals</li>
              </ul>

              <p className="mt-4"><strong>Popular Restaurants:</strong> Most visitors prefer dining at their resorts, which offer buffet-style meals featuring local and continental cuisine. A few local restaurants in Dandeli town serve authentic Karnataka food.</p>
            </div>
          </motion.div>

          {/* Travel Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Heart className="text-primary" />
              Essential Dandeli Travel Tips
            </h2>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">What to Pack</h3>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                    <li>Comfortable, quick-dry clothing for water activities</li>
                    <li>Sturdy trekking shoes and sandals</li>
                    <li>Swimwear and extra change of clothes</li>
                    <li>Sunscreen (SPF 50+), hat, and sunglasses</li>
                    <li>Insect repellent (essential for jungle areas)</li>
                    <li>Light jacket for evenings (October-February)</li>
                    <li>Waterproof bags for electronics</li>
                    <li>Binoculars for bird watching and wildlife spotting</li>
                    <li>Power bank and camera with extra batteries</li>
                    <li>Basic first-aid kit and personal medications</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Safety Guidelines</h3>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                    <li>Always follow guide instructions during rafting and safaris</li>
                    <li>Wear safety gear (helmets, life jackets) at all times during water activities</li>
                    <li>Don't venture into the forest alone; stick to marked trails</li>
                    <li>Maintain safe distance from wildlife; no feeding or provoking animals</li>
                    <li>Swimming only in designated areas with lifeguard supervision</li>
                    <li>Carry adequate water to stay hydrated during activities</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Budgeting for Dandeli Trip</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>Budget Trip (Per Person):</strong> ₹3,000-5,000 for 2 days/1 night</li>
                    <li><strong>Mid-Range Trip:</strong> ₹6,000-10,000 for 2 days/1 night</li>
                    <li><strong>Luxury Trip:</strong> ₹12,000-20,000 for 2 days/1 night</li>
                    <li className="text-sm mt-3">* Includes accommodation, meals, and 2-3 activities. Transport not included.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Connectivity & Facilities</h3>
                  <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                    <li>Mobile network available (Airtel, Jio, BSNF work best)</li>
                    <li>Limited internet in jungle resorts; disconnect to enjoy nature</li>
                    <li>ATMs available in Dandeli town (carry sufficient cash)</li>
                    <li>Basic medical facilities available; nearest hospital in Karwar (60 km)</li>
                    <li>Most resorts have 24/7 hot water and electricity backup</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Sample Itinerary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Clock className="text-primary" />
              Sample 2-Day Dandeli Itinerary
            </h2>

            <div className="space-y-6">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Day 1: Adventure & Wildlife</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li><strong>6:00 AM:</strong> Early morning jungle safari (best wildlife sightings)</li>
                    <li><strong>9:00 AM:</strong> Return to resort, freshen up & breakfast</li>
                    <li><strong>11:00 AM:</strong> White water rafting experience (9 km stretch)</li>
                    <li><strong>2:00 PM:</strong> Lunch at resort</li>
                    <li><strong>3:30 PM:</strong> Relax by the riverside or swimming</li>
                    <li><strong>5:00 PM:</strong> Sunset kayaking on Kali River</li>
                    <li><strong>8:00 PM:</strong> Dinner and campfire with stargazing</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-chart-3">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Day 2: Nature & Exploration</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li><strong>7:00 AM:</strong> Bird watching session</li>
                    <li><strong>8:30 AM:</strong> Breakfast at resort</li>
                    <li><strong>10:00 AM:</strong> Trek to Syntheri Rocks (3 km)</li>
                    <li><strong>12:30 PM:</strong> Visit Kavala Caves</li>
                    <li><strong>2:00 PM:</strong> Lunch and check-out</li>
                    <li><strong>3:00 PM:</strong> Departure with amazing memories!</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Why Choose Rapids & Roosts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-12"
          >
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                  Why Book Your Dandeli Trip with Rapids & Roosts?
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Users className="text-primary" />
                      15+ Years of Experience
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Trusted by 10,000+ adventurers, we're Dandeli's #1 rated tour operator
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Certified Safety Standards
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      International safety equipment, trained guides, and 100% safety record
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Customizable Packages
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Tailored experiences for families, couples, groups, and solo travelers
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Best Price Guarantee
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Transparent pricing with no hidden costs, best rates in Dandeli
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Eco-Friendly Tourism
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Sustainable practices preserving Dandeli's natural beauty
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      24/7 Customer Support
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Round-the-clock assistance before, during, and after your trip
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="my-12 text-center"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Experience Dandeli's Adventure?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book your Dandeli adventure package today and create memories that last a lifetime. Best prices, instant confirmation, and 100% safe experiences guaranteed.
            </p>
            <Link href="/booking">
              <Button size="lg" className="text-lg px-8" data-testid="button-book-from-guide">
                Book Your Dandeli Trip Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
