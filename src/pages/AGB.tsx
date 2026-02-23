import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Clock, DollarSign, Shield, Car } from 'lucide-react';
import Header from '../components/Header';

const AGB: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-glow rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-glow rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
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
            <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-slate-700 relative z-10" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white-900 mb-3 sm:mb-4 font-poppins px-4">
            Allgemeine Geschäftsbedingungen
          </h1>
          <p className="text-lg sm:text-xl text-white-600 font-montserrat px-4">
            & Haftungshinweise
          </p>
        </div>

        {/* Content */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-silver-xl p-4 sm:p-6 md:p-8 lg:p-12 border border-white/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-shimmer opacity-10 animate-shimmer"></div>

          <div className="relative z-10 space-y-6 sm:space-y-8">
            {/* Einleitung */}
            <div className="bg-slate-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/50">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-metallic shadow-silver flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
                  Geltungsbereich
                </h2>
              </div>

              <div className="space-y-3 sm:space-y-4 text-slate-700 font-montserrat text-sm sm:text-base">
                <p className="leading-relaxed">
                  Mit der Übergabe des Fahrzeugs an <strong>DZ Autopflege Lounge</strong> erkennt der Kunde folgende Bedingungen an:
                </p>
              </div>
            </div>

            {/* Leistungen */}
            <div className="bg-slate-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/50">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-metallic shadow-silver flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
                  Leistungen
                </h2>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Wir bieten professionelle Autopflege- und Aufbereitungsarbeiten (z. B. Innen- & Außenreinigung, Polieren etc.) nach vorheriger Absprache an.
              </p>
            </div>

            {/* Preise & Zahlung */}
            <div className="bg-slate-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/50">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-metallic shadow-silver flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
                  Preise & Zahlung
                </h2>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Die Preise richten sich nach Art und Umfang der Leistung und werden vor Arbeitsbeginn vereinbart. Die Zahlung erfolgt nach Fertigstellung der Arbeiten.
              </p>
            </div>

            {/* Termine */}
            <div className="bg-slate-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/50">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-metallic shadow-silver flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
                  Termine
                </h2>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Vereinbarte Termine sind verbindlich. Nicht rechtzeitig abgesagte Termine können zukünftig abgelehnt werden.
              </p>
            </div>

            {/* Haftung */}
            <div className="bg-slate-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/50">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-metallic shadow-silver flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
                  Haftung
                </h2>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="bg-orange-50/80 p-3 sm:p-4 rounded-lg border border-orange-200/50">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0" />
                    <h3 className="text-base sm:text-lg font-semibold text-orange-900">Haftungsausschluss</h3>
                  </div>
                  <ul className="text-orange-800 text-xs sm:text-sm space-y-2 ml-6 list-disc leading-relaxed">
                    <li>Keine Haftung für bereits vorhandene Schäden (z. B. Kratzer, Steinschläge, Lackschäden, Abnutzung)</li>
                    <li>Keine Haftung für lose oder nicht fest verbaute Teile (z. B. Zierleisten, Antennen, Spoiler)</li>
                    <li>Keine Haftung für Wertgegenstände im Fahrzeug – bitte vorher entfernen</li>
                    <li>Haftung nur bei Vorsatz oder grober Fahrlässigkeit</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Fahrzeugzustand */}
            <div className="bg-slate-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/50">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-metallic shadow-silver flex items-center justify-center flex-shrink-0">
                  <Car className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
                  Fahrzeugzustand
                </h2>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Starke Verschmutzungen (z. B. Tierhaare, extreme Innenverschmutzung) können Mehraufwand bedeuten und zu einer Preisänderung nach Absprache führen.
              </p>
            </div>

            {/* Abnahme */}
            <div className="bg-slate-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/50">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-metallic shadow-silver flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-poppins">
                  Abnahme
                </h2>
              </div>

              <div className="bg-blue-50/80 p-3 sm:p-4 rounded-lg border border-blue-200/50">
                <p className="text-blue-900 text-sm sm:text-base leading-relaxed font-medium">
                  Das Fahrzeug ist direkt nach Übergabe zu prüfen. Spätere Reklamationen können nicht berücksichtigt werden.
                </p>
              </div>
            </div>

            {/* Kontakt */}
            <div className="bg-slate-50/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/50">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 font-poppins">
                Fragen zu den AGB?
              </h2>

              <p className="text-slate-700 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                Bei Fragen zu unseren Allgemeinen Geschäftsbedingungen wenden Sie sich bitte an:
              </p>

              <div className="bg-white/80 p-3 sm:p-4 rounded-lg border border-slate-200/50">
                <p className="text-slate-700 text-sm sm:text-base">
                  <strong>DZ Autopflege Lounge</strong><br />
                  Schwanenstraße 48<br />
                  42551 Velbert<br />
                  E-Mail: <a href="mailto:Kontakt@dzautopflege.de" className="text-blue-600 hover:text-blue-800 break-all">Kontakt@dzautopflege.de</a><br />
                  Telefon: <a href="tel:015755485029" className="text-blue-600 hover:text-blue-800">01575 5485029</a>
                </p>
              </div>
            </div>

            {/* Stand */}
            <div className="text-center pt-4 sm:pt-6 border-t border-slate-200/50">
              <p className="text-xs sm:text-sm text-slate-500">
                Stand dieser AGB: Januar 2025
              </p>
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

export default AGB;
