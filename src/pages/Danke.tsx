import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Home, Phone, Car, Clock, Users, Shield, Star, ArrowRight, Mail, MapPin } from 'lucide-react';
import Header from '../components/Header';

const Danke: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white">
      <Header minimal darkBackground />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center mb-16">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl animate-pulse">
              <CheckCircle className="h-16 w-16 text-white drop-shadow-lg" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 font-poppins">
            Vielen Dank für Ihre Anfrage!
          </h1>
          
          <p className="text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-montserrat leading-relaxed">
            Wir haben Ihre Anfrage erhalten und melden uns innerhalb von <span className="font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">24 Stunden</span> bei Ihnen.
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { icon: Clock, text: '< 24h Antwort', color: 'text-blue-600' },
              { icon: Shield, text: 'Faire Preise', color: 'text-green-600' },
              { icon: Star, text: '5/5 Sterne', color: 'text-yellow-600' },
              { icon: Users, text: '300+ Kunden', color: 'text-purple-600' }
            ].map((item, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-silver border border-white/50 hover:scale-105 transition-transform duration-300">
                <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                <p className="text-base font-semibold text-slate-700 font-poppins">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 mb-16 shadow-silver-xl border border-white/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-shimmer opacity-10 animate-shimmer"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center font-poppins">
            Was passiert als nächstes?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '1',
                title: 'Anfrage prüfen',
                description: 'Wir prüfen Ihre Anfrage und schauen nach dem passenden Reinigungsangebot.',
                icon: Car,
                color: 'from-blue-500 to-blue-600'
              },
              {
                step: '2',
                title: 'Persönlicher Kontakt',
                description: 'Wir melden uns telefonisch bei Ihnen um einen Termin zu vereinbaren.',
                icon: Phone,
                color: 'from-green-500 to-green-600'
              },
              {
                step: '3',
                title: 'Reinigung durchführen',
                description: 'Sie kommen zum vereinbarten Termin zu uns und wir reinigen Ihr Fahrzeug professionell.',
                icon: Star,
                color: 'from-purple-500 to-purple-600'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-8">
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-2xl shadow-xl`}>
                    {item.step}
                  </div>
                </div>
                <div className="mb-6">
                  <item.icon className="w-10 h-10 text-slate-600 mx-auto mb-4" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 font-poppins">{item.title}</h4>
                <p className="text-slate-600 font-montserrat leading-relaxed">{item.description}</p>
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-2xl font-bold hover:from-slate-700 hover:to-slate-800 transition-all duration-300 transform hover:scale-105 shadow-xl font-poppins"
          >
            <Home className="h-6 w-6 mr-3" />
            Zurück zur Startseite
          </Link>
          
          <a
            href="tel:015755485029"
            className="inline-flex items-center justify-center px-10 py-5 border-3 border-green-500 text-green-600 rounded-2xl font-bold hover:bg-green-50 hover:border-green-600 transition-all duration-300 transform hover:scale-105 shadow-xl font-poppins"
          >
            <Phone className="h-6 w-6 mr-3" />
            Sofort anrufen
          </a>
        </div>

        {/* Contact Information */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-12 border border-white/50 shadow-silver-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-shimmer opacity-10 animate-shimmer"></div>
          <div className="relative z-10">
            <h4 className="text-2xl font-bold text-slate-900 mb-8 text-center font-poppins">
            Haben Sie noch Fragen?
            </h4>
            <p className="text-lg text-slate-600 mb-8 text-center font-montserrat">
            Unser Kundenservice steht Ihnen gerne zur Verfügung
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <a 
              href="tel:01636218490" 
              className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 group transform hover:scale-105 shadow-lg"
            >
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-600 transition-colors shadow-lg">
                <Phone className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-base text-green-600 font-montserrat font-medium mb-2">Telefon</p>
                <p className="font-bold text-slate-900 font-poppins text-xl">+49 123 456 7890</p>
                <p className="text-sm text-slate-600 font-montserrat mt-2">Sofort erreichbar</p>
              </div>
            </a>
            
            <a 
              href="mailto:info@autopflege-profi.de"
              className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 group transform hover:scale-105 shadow-lg"
            >
              <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors shadow-lg">
                <Mail className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-base text-blue-600 font-montserrat font-medium mb-2">E-Mail</p>
                <p className="font-bold text-slate-900 font-poppins text-lg break-all">info@autopflege-profi.de</p>
                <p className="text-sm text-slate-600 font-montserrat mt-2">Antwort binnen 24h</p>
              </div>
            </a>

            <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg">
              <div className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-base text-purple-600 font-montserrat font-medium mb-2">Adresse</p>
                <p className="font-bold text-slate-900 font-poppins text-lg">
                  Musterstraße 123<br />
                  12345 Musterstadt
                </p>
                <p className="text-sm text-slate-600 font-montserrat mt-2">Direkt vor Ort</p>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-600 text-lg mb-6 font-montserrat">
            Möchten Sie eine weitere Autoreinigung anfragen?
          </p>
          <Link
            to="/anfrage"
            className="inline-flex items-center text-slate-700 hover:text-slate-900 transition-colors font-semibold font-poppins text-lg group"
          >
            <span>Neue Anfrage stellen</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Danke;