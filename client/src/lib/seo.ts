import { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
}

const defaultSEO = {
  siteName: 'Rapids & Roosts Dandeli',
  title: 'Rapids & Roosts Dandeli - Adventure Tourism & Activities in Karnataka',
  description: 'Experience thrilling white water rafting, jungle safaris, forest trekking, and kayaking in Dandeli, Karnataka. Book your adventure tour package with Rapids & Roosts - Premium adventure tourism operator in Western Ghats.',
  image: '/og-image.jpg',
  url: 'https://rapidsroosts.com',
  keywords: 'Dandeli adventure, white water rafting Dandeli, jungle safari Karnataka, Dandeli tour packages, forest trekking, kayaking Dandeli, Dandeli tourism, Western Ghats adventure, Karnataka adventure sports, Dandeli resorts, Kali river rafting',
  phone: '+91 94839 40400',
  email: 'info@rapidsroosts.com',
  address: 'Dandeli, Karnataka 581325, India',
};

export function useSEO({ title, description, image, url, type = 'website', keywords }: SEOProps = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${defaultSEO.siteName}` : defaultSEO.title;
    const finalDescription = description || defaultSEO.description;
    const finalImage = image || defaultSEO.image;
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : defaultSEO.url;
    const finalUrl = url || `${baseUrl}${currentPath}`;
    const finalKeywords = keywords || defaultSEO.keywords;

    document.title = fullTitle;

    const metaTags = [
      { name: 'description', content: finalDescription },
      { name: 'keywords', content: finalKeywords },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: finalDescription },
      { property: 'og:image', content: finalImage },
      { property: 'og:url', content: finalUrl },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: defaultSEO.siteName },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: finalDescription },
      { name: 'twitter:image', content: finalImage },
      { name: 'geo.region', content: 'IN-KA' },
      { name: 'geo.placename', content: 'Dandeli' },
      { name: 'geo.position', content: '15.2667;74.6167' },
      { name: 'ICBM', content: '15.2667, 74.6167' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector);
      
      if (!element) {
        element = document.createElement('meta');
        if (name) element.setAttribute('name', name);
        if (property) element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    });

    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', finalUrl);
    if (!document.querySelector('link[rel="canonical"]')) {
      document.head.appendChild(canonical);
    }
  }, [title, description, image, url, type, keywords]);
}

export function generateStructuredData(
  type: 'organization' | 'localBusiness' | 'activity' | 'touristDestination' | 'faqPage' | 'breadcrumb' | 'touristTrip', 
  data?: any
) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : defaultSEO.url;

  const schemas: Record<string, any> = {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      'name': defaultSEO.siteName,
      'description': defaultSEO.description,
      'url': baseUrl,
      'telephone': defaultSEO.phone,
      'email': defaultSEO.email,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Dandeli',
        'addressRegion': 'Karnataka',
        'postalCode': '581325',
        'addressCountry': 'IN',
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': '15.2667',
        'longitude': '74.6167',
      },
      'sameAs': [
        'https://www.facebook.com/rapidsroostsdandeli',
        'https://www.instagram.com/rapidsroostsdandeli',
      ],
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.8',
        'reviewCount': '127',
        'bestRating': '5',
        'worstRating': '1'
      }
    },
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': ['TouristInformationCenter', 'TravelAgency'],
      'name': defaultSEO.siteName,
      'image': `${baseUrl}/og-image.jpg`,
      'description': defaultSEO.description,
      'telephone': defaultSEO.phone,
      'email': defaultSEO.email,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Dandeli',
        'addressLocality': 'Dandeli',
        'addressRegion': 'Karnataka',
        'postalCode': '581325',
        'addressCountry': 'IN',
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': '15.2667',
        'longitude': '74.6167',
      },
      'url': baseUrl,
      'priceRange': '₹₹',
      'areaServed': {
        '@type': 'GeoCircle',
        'geoMidpoint': {
          '@type': 'GeoCoordinates',
          'latitude': '15.2667',
          'longitude': '74.6167',
        },
        'geoRadius': '50',
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          'opens': '07:00',
          'closes': '20:00'
        }
      ],
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.8',
        'reviewCount': '127'
      }
    },
    touristDestination: {
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      'name': 'Dandeli - Adventure Tourism Capital of Karnataka',
      'description': 'Dandeli is the adventure capital of Karnataka, featuring pristine forests, the Kali River, wildlife sanctuaries, and thrilling activities like white water rafting, jungle safaris, trekking, and kayaking in the Western Ghats.',
      'url': baseUrl,
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': '15.2667',
        'longitude': '74.6167'
      },
      'touristType': {
        '@type': 'Audience',
        'audienceType': ['Adventure tourism', 'Nature tourism', 'Wildlife tourism', 'Eco-tourism']
      },
      'isAccessibleForFree': false,
      'publicAccess': true,
      'includesAttraction': [
        {
          '@type': 'TouristAttraction',
          'name': 'Kali River White Water Rafting',
          'description': 'Grade 2-3 rapids white water rafting on the pristine Kali River'
        },
        {
          '@type': 'TouristAttraction',
          'name': 'Dandeli Wildlife Sanctuary',
          'description': '834 sq km sanctuary home to tigers, leopards, black panthers, and exotic birds'
        },
        {
          '@type': 'TouristAttraction',
          'name': 'Western Ghats Trekking',
          'description': 'Scenic trekking trails through dense forests and hills'
        },
        {
          '@type': 'TouristAttraction',
          'name': 'Kali River Kayaking',
          'description': 'Peaceful kayaking experience on calm river waters'
        }
      ]
    },
    activity: data ? {
      '@context': 'https://schema.org',
      '@type': ['TouristAttraction', 'SportsActivityLocation', 'Product'],
      'name': data.name || 'Adventure Activity',
      'description': data.description,
      'image': data.image,
      'url': `${baseUrl}${data.url}`,
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': '15.2667',
        'longitude': '74.6167',
      },
      'category': 'Adventure Sports',
      'touristType': 'Adventure tourism',
      'offers': {
        '@type': 'Offer',
        'price': data.price,
        'priceCurrency': 'INR',
        'availability': 'https://schema.org/InStock',
        'validFrom': new Date().toISOString().split('T')[0],
        'url': `${baseUrl}${data.url}`
      },
    } : null,
    faqPage: data ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': data.faqs?.map((faq: any) => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    } : null,
    breadcrumb: data ? {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': data.items?.map((item: any, index: number) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url ? `${baseUrl}${item.url}` : undefined
      }))
    } : null,
    touristTrip: data ? {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      'name': data.name || 'Dandeli Adventure Package',
      'description': data.description,
      'touristType': ['Adventure tourism', 'Eco-tourism'],
      'itinerary': data.itinerary ? {
        '@type': 'ItemList',
        'numberOfItems': data.itinerary.length,
        'itemListElement': data.itinerary.map((item: any, index: number) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'item': {
            '@type': 'TouristAttraction',
            'name': item.name,
            'description': item.description
          }
        }))
      } : undefined,
      'offers': {
        '@type': 'Offer',
        'name': data.packageName || 'Complete Adventure Package',
        'price': data.price,
        'priceCurrency': 'INR',
        'availability': 'https://schema.org/InStock',
        'validFrom': new Date().toISOString().split('T')[0]
      },
      'provider': {
        '@type': 'TouristInformationCenter',
        'name': defaultSEO.siteName,
        'telephone': defaultSEO.phone
      }
    } : null,
  };

  return schemas[type];
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

export function injectStructuredData(
  type: 'organization' | 'localBusiness' | 'activity' | 'touristDestination' | 'faqPage' | 'breadcrumb' | 'touristTrip',
  data?: any
) {
  useEffect(() => {
    const structuredData = generateStructuredData(type, data);
    if (!structuredData) return;

    const dataHash = data ? simpleHash(JSON.stringify(data)) : '';
    const scriptId = `structured-data-${type}${dataHash ? `-${dataHash}` : ''}`;
    
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement;
    if (existingScript) {
      existingScript.textContent = JSON.stringify(structuredData);
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove && scriptToRemove.parentNode === document.head) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [type, data]);
}
