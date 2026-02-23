import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Clock, Star, Award, Shield, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-glow rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-glow rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-glow rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img
                src="https://i.imgur.com/od6vWRK.jpeg"
                alt="DZ Autopflege Lounge Logo"
                className="h-20 w-auto object-contain mb-4"
              />
              <p className="text-primary text-sm font-medium font-poppins">Professionelle Fahrzeugpflege</p>
            </div>
            <p className="text-accent mb-6 leading-relaxed max-w-md font-poppins">
              DZ Autopflege Lounge - Ihr professioneller Partner für Autoreinigung und Fahrzeugaufbereitung in Velbert.
              Wir bringen Ihr Fahrzeug zum Strahlen mit höchster Qualität und Leidenschaft.
            </p>
            
            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Award, text: 'Profi-Service' },
                { icon: Shield, text: 'Versichert' },
                { icon: Star, text: '5.0/5 Sterne' },
                { icon: Heart, text: 'Top-Bewertungen' }
              ].map((badge, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/5 rounded-lg p-3 backdrop-blur-sm border border-accent/20">
                  <badge.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm text-accent font-poppins">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-poppins font-bold mb-6 text-brand-white">Kontakt</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-accent text-sm font-poppins">Telefon</p>
                  <a href="tel:+4915755485029" className="text-brand-white font-medium hover:text-primary transition-colors font-poppins">
                    +49 157 554 850 29
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-accent text-sm font-poppins">E-Mail</p>
                  <a href="mailto:Kontakt@dzautopflege.de" className="text-brand-white font-medium hover:text-primary transition-colors font-poppins">
                    Kontakt@dzautopflege.de
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-accent text-sm font-poppins">Adresse</p>
                  <p className="text-brand-white font-medium font-poppins">
                    Schwanenstr. 48<br />
                    42551 Velbert
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 group">
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-accent text-sm font-poppins">Öffnungszeiten</p>
                  <p className="text-brand-white font-medium font-poppins">
                    Mo-Fr: 9:00 - 18:00 Uhr<br />
                    Sa: 10:00 - 14:00 Uhr
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Services & Links */}
          <div>
            <h3 className="text-xl font-poppins font-bold mb-6 text-brand-white">Leistungen</h3>
            <ul className="space-y-3">
              {[
                'Außenwäsche',
                'Innenraumreinigung',
                'Polieren & Versiegeln',
                'Lederpflege',
                'Polsterreinigung ',
                'Dampfreinigung',
                'Firmenkunden',
                'Cabrioverdeckreinigung'
      
              ].map((service, index) => (
                <li key={index}>
                  <a href="#" className="text-accent hover:text-primary transition-colors flex items-center gap-2 group font-poppins">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-125 transition-transform"></div>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-accent/30 mb-8"></div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-accent text-sm font-poppins">
              &copy; 2025 DZ Autopflege Lounge. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://wa.me/4915755485029?text=Hallo!%20Ich%20interessiere%20mich%20für%20eine%20professionelle%20Fahrzeugaufbereitung%20und%20hätte%20gerne%20ein%20Angebot."
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-primary transition-colors text-sm font-poppins"
              >
                Fahrzeugaufbereitung anfragen
              </a>
              <Link to="/impressum" className="text-accent hover:text-primary transition-colors text-sm font-poppins">
                Impressum
              </Link>
              <Link to="/datenschutz" className="text-accent hover:text-primary transition-colors text-sm font-poppins">
                Datenschutz
              </Link>
              <Link to="/agb" className="text-accent hover:text-primary transition-colors text-sm font-poppins">
                AGB
              </Link>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <p className="text-accent text-sm hidden md:block font-poppins">Bereit für Ihre Autoreinigung?</p>
            <a
              href="https://wa.me/4915755485029?text=Hallo!%20Ich%20interessiere%20mich%20für%20eine%20professionelle%20Fahrzeugaufbereitung%20und%20hätte%20gerne%20ein%20Angebot."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gradient-primary text-brand-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-brand-lg hover:shadow-brand-xl overflow-hidden font-poppins"
            >
              <span className="relative z-10">
              Jetzt anfragen
              </span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom Accent */}
      <div className="h-1 bg-gradient-primary"></div>
    </footer>
  );
};

export default Footer;