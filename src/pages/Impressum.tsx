import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Mail, Phone, FileText, Building } from 'lucide-react';
import Header from '../components/Header';

const Impressum: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-glow rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-glow rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <Header minimal />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 md:pt-40 lg:pt-44 pb-8 sm:pb-12 lg:pb-16 relative z-10">
        {/* Back Button */}
        <div className="mb-6 sm:mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors group text-sm sm:text-base"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Zurück zur Startseite
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-metallic shadow-silver-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white-700 relative z-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white-900 mb-3 sm:mb-4 font-poppins px-4">
            Impressum
          </h1>
          <p className="text-lg sm:text-xl text-white-600 font-montserrat px-4">
            Angaben gemäß § 5 TMG
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-silver-xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-shimmer opacity-10 animate-shimmer"></div>
          
          <div className="relative z-10 space-y-6 sm:space-y-8">
            {/* Company Information */}
            <div className="bg-slate-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/50">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-metallic shadow-silver flex items-center justify-center flex-shrink-0">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
                  Unternehmensinfo
                </h2>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 font-poppins">
                    DZ Autopflege Lounge
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 font-montserrat">
                    Inhaber: Deniz Armutlidere
                  </p>
                  <p className="text-sm sm:text-base text-slate-700 font-montserrat">
                    Dienst für professionelle Autopflege in Velbert
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-slate-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/50">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-metallic shadow-silver flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
                  Kontaktdaten
                </h2>
              </div>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <MapPin className="w-5 h-5 text-slate-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm sm:text-base font-medium text-slate-900 mb-1">Adresse</p>
                      <p className="text-sm sm:text-base text-slate-700 font-montserrat">
                        Schwanenstr. 48<br />
                        42551 Velbert
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Phone className="w-5 h-5 text-slate-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm sm:text-base font-medium text-slate-900 mb-1">Telefon</p>
                      <a
                        href="tel:+4915755485029"
                        className="text-sm sm:text-base text-slate-700 hover:text-slate-900 transition-colors font-montserrat"
                      >
                        +49 157 554 850 29
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Mail className="w-5 h-5 text-slate-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm sm:text-base font-medium text-slate-900 mb-1">E-Mail</p>
                      <a
                        href="mailto:Kontakt@dzautopflege.de"
                        className="text-sm sm:text-base text-slate-700 hover:text-slate-900 transition-colors font-montserrat break-all"
                      >
                        Kontakt@dzautopflege.de
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Information */}
            <div className="bg-slate-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/50">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-metallic shadow-silver flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
                  Steuernummer
                </h2>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start gap-2 sm:gap-3">
                  <FileText className="w-5 h-5 text-slate-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm sm:text-base font-medium text-slate-900 mb-1">Steuernummer</p>
                    <p className="text-sm sm:text-base text-slate-700 font-montserrat">
                      139/5004/4208
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-slate-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/50">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-metallic shadow-silver flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
                  Öffnungszeiten
                </h2>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="font-medium text-slate-900">Montag:</span>
                  <span className="text-slate-700 font-montserrat">09:00–18:00</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="font-medium text-slate-900">Dienstag:</span>
                  <span className="text-slate-700 font-montserrat">09:00–18:00</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="font-medium text-slate-900">Mittwoch:</span>
                  <span className="text-slate-700 font-montserrat">09:00–18:00</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="font-medium text-slate-900">Donnerstag:</span>
                  <span className="text-slate-700 font-montserrat">09:00–18:00</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="font-medium text-slate-900">Freitag:</span>
                  <span className="text-slate-700 font-montserrat">09:00–18:00</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="font-medium text-slate-900">Samstag:</span>
                  <span className="text-slate-700 font-montserrat">10:00–14:00</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="font-medium text-slate-900">Sonntag:</span>
                  <span className="text-slate-700 font-montserrat">Geschlossen</span>
                </div>
              </div>
            </div>

            {/* Legal Notice */}
            <div className="bg-slate-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/50">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 font-poppins">
                Rechtliche Hinweise
              </h2>
              
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-700 font-montserrat">
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">Haftung für Inhalte</h3>
                  <p className="leading-relaxed">
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">Haftung für Links</h3>
                  <p className="leading-relaxed">
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mb-2">Urheberrecht</h3>
                  <p className="leading-relaxed">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            to="/"
            className="group relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-metallic text-slate-700 rounded-xl sm:rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-silver-lg hover:shadow-silver-xl overflow-hidden text-sm sm:text-base"
          >
            <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
            <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2 relative z-10 group-hover:-translate-x-1 transition-transform" />
            <span className="relative z-10">Zurück zur Startseite</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Impressum;