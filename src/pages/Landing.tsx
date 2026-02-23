import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Star, Shield, Clock, Phone, Mail, MapPin, Car, Sparkles, Users, Award, Zap, Droplets, Brush, Wrench, Truck, Bike, Building, Leaf, Droplet, Scissors, TreePine, Sun, Flower, FileText, MessageSquare, ThumbsUp, Heart, ChevronRight, Home, Calculator, Camera, TrendingUp, Gift, Timer, Euro, Percent, Play, ChevronDown, SprayCan as Spray, Gauge, Smile, MessageCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BeforeAfterSection from '../components/BeforeAfterSection';
import Gallery from '../components/Gallery';
import CleaningConfigurator from '../components/CleaningConfigurator';
import TrustSection from '../components/TrustSection';
import MapSection from '../components/MapSection';
import CeramicCoating from '../components/CeramicCoating';

const Landing = () => {
  const [showPriceCalculator, setShowPriceCalculator] = useState(false);
  const [calculatorData, setCalculatorData] = useState({
    vehicleType: 'PKW',
    services: [] as string[],
    frequency: 'einmalig'
  });
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const primaryColor = '#94A3B8'; // Silver-gray
  const cityName = 'deiner Stadt';

  const whatsappNumber = "4915755485029";
  const whatsappMessage = encodeURIComponent("Hallo, ich interessiere mich für eine professionelle Fahrzeugaufbereitung. Bitte kontaktieren Sie mich für weitere Informationen.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleCTAClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  const calculatePrice = () => {
    let basePrice = 0;
    
    // Base price by vehicle type
    switch(calculatorData.vehicleType) {
      case 'PKW': basePrice = 80; break;
      case 'SUV': basePrice = 100; break;
      case 'Transporter': basePrice = 120; break;
      case 'Sportwagen': basePrice = 150; break;
      default: basePrice = 80;
    }
    
    // Add service costs
    calculatorData.services.forEach(service => {
      switch(service) {
        case 'Innenraumreinigung': basePrice += 40; break;
        case 'Polieren': basePrice += 60; break;
        case 'Lederpflege': basePrice += 50; break;
        case 'Versiegelung': basePrice += 80; break;
        default: basePrice += 20;
      }
    });
    
    // Frequency discount
    const frequencyMultiplier = calculatorData.frequency === 'monatlich' ? 0.8 : 
                               calculatorData.frequency === 'quartalsweise' ? 0.9 : 1;
    return Math.round(basePrice * frequencyMultiplier);
  };

  const testimonials = [
    {
      name: "Thomas Müller",
      position: "Autobesitzer",
      company: "München",
      text: "Mein Auto sieht aus wie neu! Die Innenraumreinigung war besonders beeindruckend - alle Flecken sind verschwunden.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
      rating: 5,
      savings: "Wie neu aussehend"
    },
    {
      name: "Laura Schmidt",
      position: "Familienmutter",
      company: "Berlin",
      text: "Nach einem Jahr mit zwei Kindern war mein Auto in keinem guten Zustand. Der Autoreiniger hat wahre Wunder vollbracht!",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
      rating: 5,
      savings: "Perfekte Reinigung"
    },
    {
      name: "Michael Weber",
      position: "Geschäftsmann",
      company: "Hamburg",
      text: "Professionelle Autoreinigung für meinen Firmenwagen. Pünktlich, zuverlässig und das Ergebnis überzeugt.",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100",
      rating: 5,
      savings: "Top Service"
    },
    
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '50px 50px',
                 animation: 'grid-move 20s linear infinite'
               }}>
          </div>
        </div>
        {/* Glowing Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <Header />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ 
                backgroundImage: `url('https://i.imgur.com/E8I5jGF.jpeg')`,
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="inline-flex items-center gap-2
             bg-[#E10600]/10 backdrop-blur-md px-6 py-3 rounded-full
             border border-[#E10600]/30
             mt-24 sm:mt-28 md:mt-32 lg:mt-36 xl:mt-40
             mb-6 md:mb-8"
>
  <div className="w-2 h-2 rounded-full animate-pulse bg-gradient-metallic" />
  <span className="text-white font-medium font-poppins">Velberts Autoaufbereiter #1</span>
</motion.div>


              <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  lang="de"
  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight font-poppins break-words"
  style={{ hyphens: 'auto', textWrap: 'balance' }}
>
  {/* Soft-Hyphen erlaubt Umbruch zwischen Fahrzeug und aufbereitung */}
  Fahrzeug&shy;aufbereitung{' '}
  <span
    className="block md:inline bg-gradient-to-r from-[#8B0000] via-[#E10600] to-[#B50000] bg-clip-text text-transparent animate-pulse"
    style={{ textShadow: '0 0 30px rgba(225, 6, 0, 0.6)' }}
  >
    auf höchstem Niveau
  </span>
</motion.h1>



              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed font-poppins max-w-3xl mx-auto"
              >
                Bringen Sie mit unserer professionellen Autoreinigung & Fahrzeugaufbereitung in Velbert ihr Fahrzeug wieder zum Glänzen.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 overflow-hidden bg-gradient-metallic text-slate-700 shadow-silver-lg hover:shadow-silver-xl font-poppins"
                >
                  <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
                  <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
                  <MessageCircle className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">
                    Fahrzeugaufbereitung anfragen  
                  </span>
                  <ArrowRight className="w-5 h-5 ml-2 relative z-10" />
                </a>

                <div className="flex gap-4 justify-center">
                  
                  
                  
                </div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
              >
                {[
                  { icon: Percent, text: 'Sehr gute Preis Leistung', highlight: false },
                  { icon: Clock, text: 'Flexible Termine', highlight: true },
                  { icon: Star, text: '5/5 Sterne', highlight: false },
                  { icon: Car, text: 'Alle Fahrzeugtypen', highlight: true },
                ].map((item, index) => (
                  <div key={index} className={`flex items-center gap-2 backdrop-blur-sm rounded-lg p-3 border transition-all hover:scale-105 ${
                    item.highlight 
                      ? 'bg-gradient-metallic/20 border border-slate-400/30' 
                      : 'bg-white/5 border-white/10'
                  }`}>
                    <item.icon className={`w-5 h-5 ${item.highlight ? 'text-slate-300' : 'text-gray-300'}`} />
                    <span className={`text-sm font-medium font-poppins ${item.highlight ? 'text-slate-300' : 'text-gray-300'}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* Live Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 flex flex-wrap justify-center gap-6 text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-poppins">Privat und Gewerblich</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-poppins">Ø Schnelle Antwortzeit</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm font-poppins">100% Kundenzufriedenheit</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Google Reviews Section */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Google Logo */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <span className="text-lg font-medium text-gray-700">Google</span>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Rating Text */}
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-xl font-bold text-gray-900">5,0</span>
                <span className="text-sm">basierend auf</span>
                <span className="font-semibold text-primary">53 Bewertungen</span>
              </div>

              {/* Trust Badge */}
              <div className="hidden md:flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Verifizierte Bewertungen</span>
              </div>
            </div>

            {/* Mobile Trust Badge */}
            <div className="md:hidden flex justify-center mt-4">
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700">Verifizierte Bewertungen</span>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle Types Section */}
        <section id="fahrzeugtypen" className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          
          {/* Background Effects */}
          {/* Background Effects */}
<div className="absolute inset-0 opacity-20">
  <div className="absolute top-20 left-10 w-96 h-96 bg-[#E10600]/20 rounded-full blur-3xl animate-pulse"></div>
  <div
    className="absolute bottom-20 right-10 w-80 h-80 bg-[#8B0000]/20 rounded-full blur-3xl animate-pulse"
    style={{ animationDelay: '2s' }}
  ></div>
</div>

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
  <div className="text-center mb-16">
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="w-12 h-12 rounded-full bg-[#E10600]/20 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
        <Car className="w-6 h-6 text-[#E10600] relative z-10" />
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#8B0000] via-[#E10600] to-[#B50000] bg-clip-text text-transparent font-poppins pb-2">
        Für jeden Fahrzeugtyp
      </h2>
    </div>
    <p className="text-xl text-gray-300 max-w-3xl mx-auto font-poppins">
      Professionelle Autoreinigung für alle Fahrzeugklassen – vom Kleinwagen bis zum Luxusfahrzeug
    </p>
  </div>


            {/* Vehicle Cards */}
            <div className="w-full overflow-hidden">
              <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {[
                  {
                    id: 'kleinwagen',
                    name: 'KLEINWAGEN',
                    image: 'https://i.imgur.com/aWePZ1a.png',
                    icon: Car,
                    description: 'Kompakt & Effizient',
                    features: ['Außenwäsche', 'Innenreinigung', 'Schnell & günstig'],
                    details: {
                      title: 'Kleinwagen Pflege', 
                      subtitle: 'Kompakt, aber verdient die beste Pflege',
                      features: [
                        'Schnelle 45-60 Min Reinigung',
                        'Perfekt für Stadtfahrer',
                        'Günstige Komplettlösung',
                        'Ideal für regelmäßige Pflege'
                      ],
                      services: [
                        { name: 'Außenwäsche' },
                        { name: 'Innenraumreinigung' },
                        { name: 'Komplett-Paket' }
                      ],
                      tips: [
                        'Regelmäßige Pflege alle 4-6 Wochen empfohlen',
                        'Besonders wichtig: Salzreste im Winter entfernen',
                        'Kleine Kratzer lassen sich oft günstig polieren'
                      ],
                      specialties: 'Kleinwagen haben oft empfindlichere Lacke - wir verwenden schonende Produkte für optimalen Schutz.'
                    }
                  },
                  {
                    id: 'mittelklasse',
                    name: 'MITTELKLASSE',
                    image: 'https://i.imgur.com/1fOLBcp.png',
                    icon: Car,
                    description: 'Komfort & Stil',
                    features: ['Premium-Reinigung', 'Polieren', 'Detailing'],
                    details: {
                      title: 'Mittelklasse Pflege',
                      subtitle: 'Der perfekte Mix aus Komfort und Eleganz',
                      features: [
                        'Umfassende 60-90 Min Behandlung',
                        'Hochwertige Materialien',
                        'Detaillierte Innenraumpflege',
                        'Professionelle Lackaufbereitung'
                      ],
                      services: [
                        { name: 'Premium Außenwäsche' },
                        { name: 'Innenraum Deluxe' },
                        { name: 'Komplett Premium' }
                      ],
                      tips: [
                        'Ledersitze benötigen spezielle Pflege alle 3 Monate',
                        'Klimaanlagen-Reinigung für frische Luft',
                        'Felgen regelmäßig versiegeln gegen Bremsstaub'
                      ],
                      specialties: 'Mittelklasse-Fahrzeuge haben oft verschiedene Materialien - wir behandeln jeden Bereich individuell.'
                    }
                  },
                  {
                    id: 'suv',
                    name: 'SUV',
                    image: 'https://i.imgur.com/BH1Xocu.png',
                    icon: Car,
                    description: 'Robust & Geräumig',
                    features: ['Unterbodenwäsche', 'Felgenreinigung',],
                    details: {
                      title: 'SUV Pflege',
                      subtitle: 'Große Fahrzeuge, große Sauberkeit',
                      features: [
                        'Intensive 90-120 Min Reinigung',
                        'Unterbodenwäsche inklusive',
                        'Großer Innenraum komplett',
                        'Spezielle Geländereifen-Pflege'
                      ],
                      services: [
                        { name: 'SUV Außenwäsche' },
                        { name: 'Innenraum XXL' },
                        { name: 'SUV Komplett' }
                      ],
                      tips: [
                        'Unterboden nach Offroad-Fahrten reinigen lassen',
                        'Große Fensterflächen brauchen spezielle Behandlung',
                        'Kofferraum oft stark beansprucht - regelmäßig pflegen'
                      ],
                      specialties: 'SUVs sammeln mehr Schmutz - unsere Hochdruckreinigung entfernt auch hartnäckigsten Dreck.'
                    }
                   },
                  {
                    id: 'transporter',
                    name: 'TRANSPORTER',
                    image: 'https://i.imgur.com/JAMhbmW.png',
                    icon: Truck,
                    description: 'Nutzfahrzeug',
                    features: ['Großflächenreinigung', 'Laderaum', 'Gewerblich'],
                    details: {
                      title: 'Transporter Pflege',
                      subtitle: 'Professionell für Profis',
                      features: [
                        'Gewerbliche Reinigung 120-150 Min',
                        'Laderaum-Spezialreinigung',
                        'Firmenlogo-Schutz',
                        'Schnelle Abwicklung'
                      ],
                      services: [
                        { name: 'Transporter Basis' },
                        { name: 'Laderaum-Reinigung' },
                        { name: 'Gewerbe Komplett' }
                      ],
                      tips: [
                        'Regelmäßige Pflege erhält den Wiederverkaufswert',
                        'Saubere Fahrzeuge = professioneller Eindruck',
                        'Steuerlich absetzbar als Betriebsausgabe'
                      ],
                      specialties: 'Gewerbliche Fahrzeuge brauchen robuste Reinigung - wir kennen die Anforderungen.'
                    }
                  },
                  {
                    id: 'luxus',
                    name: 'LUXUSFAHRZEUG',
                    image: 'https://i.imgur.com/71vqTmW.png',
                    icon: Zap,
                    description: 'Premium & Exklusiv',
                    features: ['Handwäsche', 'Lederpflege', 'Versiegelung'],
                    details: {
                      title: 'Luxusfahrzeug Pflege',
                      subtitle: 'Exklusiv wie Ihr Fahrzeug',
                      features: [
                        'VIP-Behandlung 150-180 Min',
                        'Handwäsche mit Premium-Produkten',
                        'Leder & Alcantara Spezialpflege',
                        'Keramikversiegelung verfügbar'
                      ],
                      services: [
                        { name: 'Luxury Handwash' },
                        { name: 'Premium Interior' },
                        { name: 'VIP Komplett' }
                      ],
                      tips: [
                        'Nur pH-neutrale Premium-Produkte verwenden',
                        'Leder monatlich konditionieren',
                        'Keramikversiegelung alle 6 Monate erneuern'
                      ],
                      specialties: 'Luxusfahrzeuge verdienen Luxuspflege - wir behandeln jeden Wagen wie unseren eigenen.'
                    }
                  },
                  {
                    id: 'motorrad',
                    name: 'MOTORRAD',
                    image: 'https://i.imgur.com/uq00GTY.png',
                    icon: Bike,
                    description: 'Zweirad',
                    features: ['Spezialreinigung', 'Kettenpflege', 'Chrompolieren'],
                    details: {
                      title: 'Motorrad Pflege',
                      subtitle: 'Für echte Biker',
                      features: [
                        'Spezielle Motorrad-Reinigung 60-90 Min',
                        'Ketten- und Antriebspflege',
                        'Chrom-Politur inklusive',
                        'Wintereinlagerung-Vorbereitung'
                      ],
                      services: [
                        { name: 'Motorrad Basis' },
                        { name: 'Chrom-Politur' },
                        { name: 'Komplett + Kette' }
                      ],
                      tips: [
                        'Nach jeder längeren Tour reinigen',
                        'Kette regelmäßig fetten nach Reinigung',
                        'Chrom vor Korrosion schützen'
                      ],
                      specialties: 'Motorräder brauchen besondere Vorsicht - wir kennen jeden Winkel und jedes empfindliche Teil.'
                    }
                  },
                  {
                    id: 'Campingwagen',
                    name: 'Campingwagen',
                    image: 'https://i.imgur.com/PpEwDZc.png',
                    icon: Truck,
                    description: 'Wohnwagen',
                    features: ['Spezialreinigung', 'Innenreinigungen', 'Außenreinigung'],
                    details: {
                      title: 'Campingwagen Pflege',
                      subtitle: 'Bereit für das nächste Abenteuer',
                      features: [
                        'Großflächenreinigung 180-240 Min',
                        'Dach- und Seitenwand-Spezialbehandlung',
                        'Innenraum wie zu Hause',
                        'Markisen-Reinigung möglich'
                      ],
                      services: [
                        { name: 'Außenreinigung XXL' },
                        { name: 'Innenraum Camping' },
                        { name: 'Camping Komplett' }
                      ],
                      tips: [
                        'Vor und nach der Saison gründlich reinigen',
                        'Dach regelmäßig auf Dichtigkeit prüfen',
                        'Markisen trocken einfahren nach Reinigung'
                      ],
                      specialties: 'Wohnmobile sind wie ein zweites Zuhause - wir sorgen dafür, dass Sie sich wohlfühlen.'
                    }
                  },
                  {
                    id: 'Oldtimer',
                    name: 'Oldtimer',
                    image: 'https://i.imgur.com/JsbJHdY.png',
                    icon: Car,
                    description: 'Oldtimer',
                    features: ['Innenreinigung', 'Außenreinigung', 'Lackpflege', 'Polsterreinigung'],
                    details: {
                      title: 'Oldtimer Pflege',
                      subtitle: 'Klassiker verdienen klassische Pflege',
                      features: [
                        'Schonende Handwäsche 120-180 Min',
                        'Originalteile-schonende Behandlung',
                        'Spezial-Polituren für alten Lack',
                        'Chrom- und Messing-Restauration'
                      ],
                      services: [
                        { name: 'Oldtimer Handwash' },
                        { name: 'Chrom-Restauration' },
                        { name: 'Klassiker Komplett' }
                      ],
                      tips: [
                        'Nur pH-neutrale Produkte für alten Lack',
                        'Gummi-Dichtungen regelmäßig pflegen',
                        'Niemals Hochdruck auf empfindliche Teile'
                      ],
                      specialties: 'Oldtimer sind Schätze - wir behandeln sie mit der Ehrfurcht, die sie verdienen.'
                    }
                  }
                ].map((vehicle, index) => {
                  const IconComponent = vehicle.icon;
                  
                  return (
                    <div
                      key={vehicle.id}
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setShowVehicleModal(true);
                      }}
                      className="relative flex-shrink-0 w-48 h-80 md:w-56 md:h-96 cursor-pointer group transition-all duration-500 hover:scale-105"
                      style={{
                        transform: 'skewX(-8deg)',
                        transformOrigin: 'center'
                      }}
                    >
                      {/* Background Image */}
                      <div 
                        className="absolute inset-0 rounded-2xl overflow-hidden shadow-silver-lg group-hover:shadow-silver-xl transition-all duration-500"
                      >
                        {/* Clean Image */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 group-hover:opacity-0"
                          style={{ backgroundImage: `url(${vehicle.image})` }}
                        />
                        
                        {/* Dark overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                        
                      </div>

                      {/* Content */}
                      <div 
                        className="relative h-full flex flex-col justify-between p-6 text-white z-10"
                        style={{ transform: 'skewX(8deg)' }}
                      >
                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-slate-400/20 group-hover:border-slate-300 border border-white/20 flex items-center justify-center transition-all duration-300 relative overflow-hidden">
                            <IconComponent className="w-6 h-6 text-white group-hover:text-slate-300 relative z-10 transition-colors duration-300" />
                          </div>
                        </div>

                        {/* Vehicle Info */}
                        <div className="text-center">
                          <h3 className="font-poppins font-bold text-lg mb-2 text-white/90 group-hover:text-white transition-colors duration-300">
                            {vehicle.name}
                          </h3>
                          <p className="font-poppins text-sm text-white/70 group-hover:text-white/80 mb-4 transition-colors duration-300">
                            {vehicle.description}
                          </p>
                          
                          {/* Features */}
                          <div className="space-y-1">
                            {vehicle.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center justify-center text-xs text-white/60 group-hover:text-white/70 transition-colors duration-300 font-poppins">
                                <div className="w-1 h-1 bg-slate-300 rounded-full mr-2"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Scroll Indicator */}
              <div className="flex justify-center mt-6 md:hidden">
                <div className="flex space-x-1">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div 
                      key={index} 
                      className="w-2 h-2 rounded-full bg-gray-600 opacity-50"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="text-center mt-12"> 
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-metallic text-slate-700 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-silver-lg hover:shadow-silver-xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
                <MessageCircle className="w-6 h-6 relative z-10 mr-3" />
                <span className="relative z-10 mr-3">Fahrzeugaufbereitung anfragen</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </section>

        {/* Trust Section */}
        <TrustSection />

        {/* Before/After Section */}
        <BeforeAfterSection />

       {/* Car Cleaning Services Section */}
        <section id="leistungen" className="py-24 bg-gradient-to-b from-gray-900 to-black relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 to-slate-600/5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 bg-slate-500/10 text-slate-300 border border-slate-500/30 font-poppins">
                  Unsere Reinigungsarten
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-poppins">
                  Welche Autoreinigung brauchst du?
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto font-poppins">
                  Wähle aus unserem professionellen Reinigungsangebot - von der schnellen Außenwäsche bis zur kompletten Fahrzeugaufbereitung
                </p>
              </motion.div>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Basis-Paket',
                  description: 'Innen + Außen – günstig & schnell',
                  beforeImage: 'https://i.imgur.com/RjgCSI8.jpeg',
                  icon: Car,
                  features: ['Handwäsche außen (schonender als Waschstraße)', 'Innenreinigung (Saugen, Staubwischen, Scheibenreinigung)', 'Felgenreinigung (Bremsstaub & Teer entfernen)', 'Reifenpflege (Glanz & Schutz)'],
                  duration: '45-60 Min',
                  price: 'ab 40€',
                  originalPrice: null,
                  special: false,
                  whatsappMessage: 'Hallo, ich interessiere mich für das *Basis-Paket* (Innen + Außen – günstig & schnell). Bitte kontaktieren Sie mich für weitere Informationen und zur Terminvereinbarung.'
                },
                {
                  title: 'Premium-Paket',
                  description: 'Inkl. Politur & Versiegelung',
                  beforeImage: 'https://i.imgur.com/RjgCSI8.jpeg',
                  icon: Sparkles,
                  features: ['Alle Basisleistungen', 'Polster- & Teppichreinigung (Shampoonieren)', 'Politur (Kratzer & matte Stellen entfernen)', 'Wachsversiegelung (Schutzschicht, Glanz)', 'Lederpflege & -aufbereitung'],
                  duration: '3-4 Std',
                  price: 'auf Anfrage',
                  originalPrice: null,
                  special: false,
                  whatsappMessage: 'Hallo, ich interessiere mich für das *Premium-Paket* (Inkl. Politur & Versiegelung). Bitte kontaktieren Sie mich für ein individuelles Angebot und zur Terminvereinbarung.'
                },
                {
                  title: 'Exklusiv-Paket',
                  description: 'Komplette Aufbereitung – Showroom-Finish',
                  beforeImage: 'https://i.imgur.com/RjgCSI8.jpeg',
                  icon: Star,
                  features: ['Alle Premium-Leistungen', 'Keramikversiegelung (Langzeitschutz 2-5 Jahre)', 'Dampfreinigung (hygienisch, tiefenwirksam)', 'Ozonbehandlung (Geruchsbeseitigung)', 'Motorraumreinigung', 'Scheinwerferaufbereitung'],
                  duration: '5-8 Std',
                  price: 'auf Anfrage',
                  originalPrice: null,
                  special: false,
                  whatsappMessage: 'Hallo, ich interessiere mich für das *Exklusiv-Paket* (Komplette Aufbereitung – Showroom-Finish). Bitte kontaktieren Sie mich für ein individuelles Angebot und zur Terminvereinbarung.'
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-gradient-to-br from-slate-800/90 via-slate-700/80 to-slate-600/90 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-400/30 hover:border-slate-300/50 transition-all hover:scale-105 shadow-[0_0_30px_rgba(148,163,184,0.3)] hover:shadow-[0_0_50px_rgba(148,163,184,0.5)]"
                  style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}
                >
                  {/* Before Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.beforeImage}
                      alt={`${service.title} - Vorher`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {service.special && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 text-slate-900 px-4 py-2 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(148,163,184,0.8)] animate-pulse">
                        VERLÄNGERT!
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                      {service.duration}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <service.icon className="w-5 h-5" />
                        <span className="font-semibold font-poppins">{service.title}</span>
                      </div>
                      {service.price && (
                        <div className="flex items-center gap-2">
                          <div className="font-bold text-2xl font-poppins bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-clip-text text-transparent">{service.price}</div>
                          {service.originalPrice && (
                            <div className="text-gray-400 line-through text-sm font-poppins">{service.originalPrice}</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-white font-poppins">{service.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed font-poppins">{service.description}</p>
                    
                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2 font-poppins">Was ist enthalten:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-400 font-poppins">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-slate-300 to-slate-400 rounded-full mr-2 flex-shrink-0 shadow-[0_0_8px_rgba(148,163,184,0.6)]"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div>
                        {service.price && (
                          <div className="flex items-center gap-2">
                            <div className="text-lg font-bold font-poppins bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-clip-text text-transparent">{service.price}</div>
                            {service.originalPrice && (
                              <div className="text-gray-500 line-through text-sm font-poppins">{service.originalPrice}</div>
                            )}
                          </div>
                        )}
                        <div className="text-xs text-gray-500 font-poppins">{service.duration}</div>
                      </div>
                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(service.whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all overflow-hidden font-poppins ${service.special ? 'bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 text-slate-900 shadow-[0_0_20px_rgba(148,163,184,0.6)] hover:shadow-[0_0_30px_rgba(148,163,184,0.9)]' : 'bg-gradient-metallic text-slate-700 hover:shadow-silver'}`}
                      >
                        <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer opacity-0 group-hover:opacity-30"></div>
                        <span className="relative z-10">
                          Jetzt buchen
                        </span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-slate-500/10 to-slate-600/10 rounded-2xl p-8 border border-slate-500/20">
                <h3 className="text-2xl font-bold mb-4 text-white font-poppins">Nicht sicher welche Reinigung Sie benötigen?</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto font-poppins">
                  Unsere Experten beraten Sie kostenlos und finden die perfekte Reinigungslösung für Ihr Fahrzeug.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all overflow-hidden bg-gradient-metallic text-slate-700 shadow-silver hover:shadow-silver-lg font-poppins"
                  >
                    <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    <span className="relative z-10">
                      Fahrzeugaufbereitung anfragen 
                    </span>
                  </a>
                  <a
                    href="tel:+4915755485029"
                    className="group relative inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all overflow-hidden bg-gradient-silver-dark text-white shadow-silver hover:shadow-silver-lg font-poppins"
                  >
                    <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
                    <Phone className="w-5 h-5 mr-2" />
                    <span className="relative z-10">
                      Sofort anrufen
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-gradient-to-b from-black to-gray-900 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 bg-slate-500/10 text-slate-300 border border-slate-500/30 font-poppins">
                  So funktioniert's
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-poppins">
                  In nur 3 Schritten zu Ihrer Autoreinigung
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto font-poppins">
                  Einfach, schnell und professionell zu Ihrem sauberen Fahrzeug
                </p>
              </motion.div>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute top-24 left-16 right-16 h-1 bg-gradient-to-r from-slate-400/50 to-slate-500/50 z-0 hidden md:block rounded-full"></div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: FileText,
                      title: "Anfrage stellen",
                      description: "Beschreiben Sie Ihr Fahrzeug und Ihre Wünsche in unserem Whatsapp Chat.",
                      color: '#00FF88'
                    },
                    {
                      icon: MessageSquare,
                      title: "Beratung erhalten",
                      description: "Unser Experte meldet sich bei Ihnen für eine persönliche Beratung und Terminvereinbarung.",
                      color: '#00BFFF'
                    },
                    {
                      icon: ThumbsUp,
                      title: "Reinigung durchführen",
                      description: "Nach Ihrer Zustimmung reinigen wir Ihr Fahrzeug professionell vor Ort bei uns .",
                      color: '#FF6B6B'
                    }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 relative z-10 border border-gray-700/50 hover:border-slate-400/50 transition-all hover:scale-105"
                      style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}
                    >
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center text-black font-bold text-xl absolute -top-8 left-1/2 transform -translate-x-1/2 border-4 border-gray-900 font-poppins"
                        style={{ 
                          backgroundColor: step.color,
                          boxShadow: `0 0 20px ${step.color}50`
                        }}
                      >
                        {index + 1}
                      </div>
                      <div className="mt-10 text-center">
                        <div 
                          className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                          style={{ 
                            backgroundColor: `${step.color}15`,
                            boxShadow: `0 0 20px ${step.color}30`
                          }}
                        >
                          <step.icon className="w-8 h-8" style={{ color: step.color }} />
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-white font-poppins">{step.title}</h3>
                        <p className="text-gray-300 font-poppins">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ceramic Coating Section */}
        <CeramicCoating />

        {/* Gallery Section */}
        <div id="galerie">
          <Gallery />
        </div>
    

        {/* FAQ Section */}
        <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-500/5 to-slate-600/5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 bg-slate-500/10 text-slate-300 border border-slate-500/30 font-poppins">
                  Häufige Fragen
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-poppins">
                  Alles, was Sie wissen müssen
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto font-poppins">
                  Antworten auf die häufigsten Fragen zur Autoreinigung
                </p>
              </motion.div>
            </div>

            <div className="max-w-3xl mx-auto">
              {[
                {
                  question: "Welche Autoreinigungsleistungen bieten Sie an?",
                  answer: "Wir bieten ein umfassendes Leistungsspektrum an: Außenwäsche, Innenraumreinigung, Polieren, Versiegeln, Lederpflege, Polsterreinigung und Geruchsneutralisierung. Je nach Bedarf erstellen wir individuelle Reinigungspakete für einmalige oder regelmäßige Pflege." 
                },
                {
                  question: "Wie werden die Kosten für die Autoreinigung berechnet?",
                  answer: "Die Kosten basieren auf mehreren Faktoren: Fahrzeugtyp und -größe, Art und Umfang der Reinigungsarbeiten, Zustand des Fahrzeugs und gewünschte Zusatzleistungen.  Gerne erstellen wir Ihnen ein kostenloses, unverbindliches Angebot."
                },
                {
                  question: "Wie oft sollte eine professionelle Autoreinigung durchgeführt werden?",
                  answer: "Die optimale Häufigkeit hängt von der Nutzung und den Umweltbedingungen ab. Für Vielfahrer empfehlen wir eine Reinigung alle 4-6 Wochen, für Normalnutzer alle 2-3 Monate. Eine professionelle Versiegelung sollte 1-2 mal jährlich durchgeführt werden."
                },
                {
                  question: "Arbeiten Sie auch umweltfreundlich?",
                  answer: "Ja, Nachhaltigkeit ist uns wichtig. Wir verwenden biologisch abbaubare Reinigungsmittel, wassersparende Techniken und umweltschonende Pflegeprodukte. Gerne beraten wir Sie zu nachhaltigen Autoreinigungsoptionen."
                }
              ].map((faq, index) => (
                <motion.details
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="mb-4 group"
                >
                  <summary className="flex justify-between items-center cursor-pointer p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl hover:bg-gray-800/50 transition-all border border-gray-700/50 hover:border-slate-400/50">
                    <span className="font-semibold text-lg text-white font-poppins">{faq.question}</span>
                    <ChevronRight className="w-5 h-5 transform group-open:rotate-90 transition-transform text-slate-300" />
                  </summary>
                  <div className="p-6 bg-gray-900/30 backdrop-blur-sm rounded-b-xl mt-1 border border-gray-700/30">
                    <p className="text-gray-300 font-poppins">{faq.answer}</p>
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        

        

        {/* Price Calculator Modal */}
        {showPriceCalculator && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                 style={{ boxShadow: '0 0 40px rgba(0, 255, 136, 0.2)' }}>
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white font-poppins">💰 Preis-Kalkulator</h3>
                  <button
                    onClick={() => setShowPriceCalculator(false)}
                    className="text-gray-400 hover:text-white text-2xl transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 font-poppins">
                      Fahrzeugtyp:
                    </label>
                    <select
                      value={calculatorData.vehicleType}
                      onChange={(e) => setCalculatorData({...calculatorData, vehicleType: e.target.value})}
                      className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-transparent text-white font-poppins"
                    >
                      <option value="PKW">PKW / Limousine</option>
                      <option value="SUV">SUV / Geländewagen</option>
                      <option value="Transporter">Transporter / Van</option>
                      <option value="Sportwagen">Sportwagen / Cabrio</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3 font-poppins">
                      Gewünschte Leistungen:
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Außenwäsche', 'Innenraumreinigung', 'Polieren', 'Lederpflege', 'Versiegelung'].map(service => (
                        <label key={service} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={calculatorData.services.includes(service)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setCalculatorData({
                                  ...calculatorData,
                                  services: [...calculatorData.services, service]
                                });
                              } else {
                                setCalculatorData({
                                  ...calculatorData,
                                  services: calculatorData.services.filter(s => s !== service)
                                });
                              }
                            }}
                            className="mr-2 accent-slate-400"
                          />
                          <span className="text-sm text-gray-300 font-poppins">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vehicle Details Modal */}
        {showVehicleModal && selectedVehicle && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              {/* Background Effects */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-glow rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-glow rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              </div>

              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-metallic shadow-silver-lg flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
                      <selectedVehicle.icon className="w-8 h-8 text-slate-700 relative z-10" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white font-poppins">{selectedVehicle.details.title}</h2>
                      <p className="text-slate-300 font-montserrat">{selectedVehicle.details.subtitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowVehicleModal(false)}
                    className="text-slate-400 hover:text-white text-3xl transition-colors p-2 hover:bg-slate-800/50 rounded-full"
                  >
                    ×
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Vehicle Image */}
                    <div className="relative h-64 rounded-2xl overflow-hidden shadow-silver-lg">
                      <img 
                        src={selectedVehicle.image} 
                        alt={selectedVehicle.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold font-poppins">{selectedVehicle.name}</h3>
                        <p className="text-slate-200 font-montserrat">{selectedVehicle.description}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                      <h3 className="text-xl font-bold text-white mb-4 font-poppins flex items-center gap-2">
                        <Star className="w-5 h-5 text-slate-300" />
                        Besonderheiten
                      </h3>
                      <ul className="space-y-3">
                        {selectedVehicle.details.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-center gap-3 text-slate-300 font-montserrat">
                            <div className="w-2 h-2 bg-slate-300 rounded-full flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specialty Info */}
                    <div className="bg-gradient-to-r from-slate-500/10 to-slate-600/10 rounded-2xl p-6 border border-slate-500/20">
                      <h3 className="text-lg font-bold text-slate-300 mb-3 font-poppins flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        Unser Spezialwissen
                      </h3>
                      <p className="text-slate-300 font-montserrat leading-relaxed">
                        {selectedVehicle.details.specialties}
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Services & Prices */}
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                      <h3 className="text-xl font-bold text-white mb-4 font-poppins flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-slate-300" />
                        Unsere Leistungen
                      </h3>
                      <div className="space-y-4">
                        {selectedVehicle.details.services.map((service: any, index: number) => (
                          <div key={index} className="flex items-center p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                              <h4 className="font-semibold text-white font-poppins">{service.name}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                      <h3 className="text-xl font-bold text-white mb-4 font-poppins flex items-center gap-2">
                        <ThumbsUp className="w-5 h-5 text-yellow-400" />
                        Profi-Tipps
                      </h3>
                      <ul className="space-y-3">
                        {selectedVehicle.details.tips.map((tip: string, index: number) => (
                          <li key={index} className="flex items-start gap-3 text-slate-300 font-montserrat">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0 mt-2"></div>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="bg-gradient-primary rounded-2xl p-6 text-center">
                      <h4 className="text-xl font-bold text-white mb-2 font-poppins">Interesse geweckt?</h4>
                      <p className="text-white/80 text-sm mb-4 font-poppins">
                        Lassen Sie uns Ihr/Ihre {selectedVehicle.name} professionell pflegen
                      </p>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setShowVehicleModal(false)}
                        className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors font-poppins"
                      >
                        <Car className="w-5 h-5 mr-2" />
                        Jetzt anfragen
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      
      <MapSection />
      <Footer />

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Landing;