import { Waves, Compass, Mountain, Send } from "lucide-react";
import raftingHero2 from "@assets/stock_images/vibrant_water_raftin_5f8fedad.jpg";
import safariImage from "@assets/generated_images/Jungle_safari_wildlife_adventure_3300876a.png";
import trekkingImage from "@assets/generated_images/Forest_trekking_adventure_trail_14dd1cd1.png";
import kayakingImage from "@assets/generated_images/Peaceful_kayaking_river_adventure_e3974c90.png";

export const activities = [
  {
    id: "rafting",
    slug: "rafting",
    title: "White Water Rafting",
    shortDescription: "Navigate through Grade 2-3 rapids on the Kali River",
    description: "Experience the ultimate adrenaline rush as you navigate through Grade 2-3 rapids on the pristine Kali River. Our expert guides ensure your safety while you enjoy the thrill of conquering the wild waters of Dandeli.",
    fullDescription: `Embark on an unforgettable white water rafting adventure on the majestic Kali River, one of Karnataka's most pristine and thrilling waterways. Our rafting experiences range from beginner-friendly short routes to challenging long stretches that will test even experienced rafters.

The Kali River offers a perfect blend of excitement and scenic beauty, with rapids graded from 2 to 3, making it ideal for both novices and adventure enthusiasts. As you paddle through the rushing waters, you'll be surrounded by dense forests of the Western Ghats, creating an immersive experience that combines adventure with nature.

Our professional guides are certified and trained in river safety, first aid, and rescue operations. They'll provide comprehensive safety briefings, demonstrate proper paddling techniques, and ensure your journey is both thrilling and secure. All safety equipment including life jackets, helmets, and rafts are internationally certified and regularly maintained.`,
    image: raftingHero2,
    icon: Waves,
    duration: "1-3 hours",
    difficulty: "Moderate to Advanced",
    price: "₹600 - ₹1,500",
    minPrice: 600,
    maxPrice: 1500,
    capacity: "6-8 per raft",
    bestSeason: "October to June",
    includes: [
      "Certified professional guide",
      "Safety equipment (life jacket, helmet)",
      "Rafting gear and paddle",
      "Safety briefing and training",
      "River insurance coverage"
    ],
    highlights: [
      "Navigate Grade 2-3 rapids",
      "9 km long rafting route (3 hours)",
      "Short 1 km route for beginners",
      "Scenic Western Ghats views",
      "Professional safety team",
      "Photo opportunities mid-river"
    ],
    requirements: [
      "Minimum age: 12 years",
      "Swimming not mandatory but recommended",
      "Good physical health",
      "No heart/back problems",
      "Signed safety waiver required"
    ],
  },
  {
    id: "safari",
    slug: "safari",
    title: "Jungle Safari",
    shortDescription: "Explore 834 sq km wildlife sanctuary with expert naturalists",
    description: "Venture into the 834 sq km Dandeli Wildlife Sanctuary, home to tigers, leopards, sloth bears, and over 200 species of exotic birds. Our guided jeep safaris offer intimate encounters with nature's wonders.",
    fullDescription: `Step into the wild heart of Karnataka with our expertly guided jungle safari through the magnificent Dandeli Wildlife Sanctuary, spanning an impressive 834 square kilometers of pristine forest ecosystem. This protected area is part of the Western Ghats biodiversity hotspot and serves as a crucial habitat for numerous endangered species.

As you traverse through dense forests, bamboo groves, and grasslands, keep your eyes peeled for the elusive Bengal tiger, black panthers, Indian elephants, and sloth bears. The sanctuary is also a paradise for bird watchers, hosting over 200 avian species including the great pied hornbill, Malabar pied hornbill, and numerous species of kingfishers, eagles, and migratory birds.

Our experienced naturalists and trackers bring years of expertise, sharing fascinating insights about animal behavior, forest ecology, and conservation efforts. Safari timings are strategically planned during peak wildlife activity hours - early morning (6:30 AM) and late afternoon (3:00 PM) - to maximize your chances of wildlife sightings. The open-top jeeps provide unobstructed views and excellent photography opportunities.`,
    image: safariImage,
    icon: Compass,
    duration: "2-3 hours",
    difficulty: "Easy",
    price: "₹600/person",
    minPrice: 600,
    maxPrice: 600,
    capacity: "6 per jeep",
    bestSeason: "October to May",
    includes: [
      "Experienced naturalist guide",
      "Open-top jeep safari",
      "Forest department permits",
      "Binoculars (on request)",
      "Wildlife spotting assistance"
    ],
    highlights: [
      "834 sq km wildlife sanctuary",
      "Tiger and leopard sightings",
      "Over 200 bird species",
      "Indian elephants and sloth bears",
      "Expert naturalist commentary",
      "Photography opportunities"
    ],
    requirements: [
      "All ages welcome",
      "Wear neutral colored clothing",
      "Maintain silence during safari",
      "No littering in forest",
      "Follow guide instructions strictly"
    ],
  },
  {
    id: "trekking",
    slug: "trekking",
    title: "Forest Trekking",
    shortDescription: "Discover hidden trails through Western Ghats biodiversity",
    description: "Trek through ancient forests of the Western Ghats, discovering hidden waterfalls, diverse flora, and breathtaking viewpoints. Multiple trails cater to all fitness levels, from easy nature walks to challenging summit hikes.",
    fullDescription: `Immerse yourself in the untouched beauty of the Western Ghats with our curated forest trekking experiences. These ancient mountains, recognized as one of the world's eight hottest biodiversity hotspots, offer an incredible variety of trekking routes through dense evergreen forests, across crystal-clear streams, and up to stunning viewpoints.

Our trekking programs range from leisurely nature walks perfect for families to challenging summit climbs for adventure enthusiasts. Popular routes include the Shiroli Peak trek (1,934 ft), which rewards trekkers with panoramic views of the surrounding valleys, and the Kavala Caves expedition, combining adventure with spelunking. The Syntheri Rocks trail takes you through pristine forests to a magnificent rock formation carved by the Kaneri River over millennia.

Each trek is led by certified guides who are intimately familiar with the terrain and local ecology. They'll point out medicinal plants used by indigenous tribes, help you spot rare orchids and butterflies, and share stories about the region's rich biodiversity. The trails wind through diverse ecosystems - from thick bamboo groves to open grasslands, from moss-covered ancient trees to cascading waterfalls hidden deep in the forest.`,
    image: trekkingImage,
    icon: Mountain,
    duration: "2-6 hours",
    difficulty: "Easy to Moderate",
    price: "Included in package",
    minPrice: 0,
    maxPrice: 0,
    capacity: "10-15 per group",
    bestSeason: "October to March",
    includes: [
      "Certified trekking guide",
      "Trail permits",
      "First aid kit",
      "Light refreshments and water",
      "Nature interpretation"
    ],
    highlights: [
      "Shiroli Peak (1,934 ft)",
      "Kavala Caves exploration",
      "Syntheri Rocks visit",
      "Magod Falls viewpoint",
      "Rare flora and fauna spotting",
      "Waterfall photography"
    ],
    requirements: [
      "Minimum age: 8 years",
      "Good fitness level",
      "Proper trekking shoes",
      "Long pants recommended",
      "Carry sufficient water"
    ],
  },
  {
    id: "kayaking",
    slug: "kayaking",
    title: "Kayaking Adventure",
    shortDescription: "Paddle through serene Kali River backwaters",
    description: "Glide through the calm backwaters of the Kali River in a kayak, perfect for beginners and experienced paddlers alike. Enjoy the tranquility of nature while building your kayaking skills under expert supervision.",
    fullDescription: `Discover the serene beauty of the Kali River from a unique perspective with our kayaking adventures. Unlike the adrenaline-pumping rafting experience, kayaking offers a more intimate and peaceful way to explore the river's calm stretches and picturesque backwaters.

Our kayaking programs cater to all skill levels. Beginners start with flatwater kayaking in protected coves, learning basic paddle strokes, balance, and maneuvering techniques under the watchful guidance of our certified instructors. As you gain confidence, you can progress to gentle river sections with mild currents, and eventually tackle more challenging whitewater kayaking for the ultimate thrill.

The kayaking routes take you through some of Dandeli's most scenic landscapes. Paddle past towering riverside cliffs, glide through narrow channels lined with dense vegetation, and drift across mirror-like backwaters that reflect the sky and surrounding forests. The slower pace allows for wildlife observation - you might spot kingfishers diving for fish, otters playing along the banks, or crocodiles basking on riverside rocks.

All equipment is provided, including stable touring kayaks, adjustable paddles, spray skirts, and safety gear. Our kayaks are easy to maneuver and specifically chosen for their stability, making them ideal for beginners while still providing enough performance for experienced paddlers.`,
    image: kayakingImage,
    icon: Send,
    duration: "2-3 hours",
    difficulty: "Easy to Moderate",
    price: "₹150 - ₹300/hour",
    minPrice: 150,
    maxPrice: 300,
    capacity: "1-2 per kayak",
    bestSeason: "October to June",
    includes: [
      "Single/double kayaks",
      "Paddles and spray skirt",
      "Life jacket and safety gear",
      "Basic kayaking instruction",
      "Riverside support team"
    ],
    highlights: [
      "Flatwater and whitewater options",
      "Suitable for all skill levels",
      "Wildlife watching opportunities",
      "Peaceful river exploration",
      "Professional instruction",
      "Scenic backwater routes"
    ],
    requirements: [
      "Minimum age: 10 years",
      "Basic swimming ability",
      "No prior experience needed",
      "Follow safety instructions",
      "Comfortable athletic wear"
    ],
  },
];

export const getActivityBySlug = (slug: string) => {
  return activities.find(activity => activity.slug === slug);
};

export const getAllActivities = () => {
  return activities;
};
