import React, { useState, useEffect } from 'react';
import { CheckCircle, Star, Clock, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const TrustSection: React.FC = () => {
  const [currentReview, setCurrentReview] = useState(0);

  const trustPoints = [
    { text: 'Professionelle Fahrzeugaufbereitung', icon: CheckCircle },
    { text: 'Modernste Reinigungstechnik', icon: Sparkles },
    { text: 'Faire & transparente Preise', icon: Heart },
    { text: 'Schnelle Terminvergabe', icon: Clock }
  ];

  const reviews = [
    {
      id: 1,
      name: "Samed Özbey",
      rating: 5,
      text: "Ich habe mein Auto für eine Innen- und Außenwäsche gebracht und bin wirklich sehr zufrieden! Alles war super – das Auto glänzt von außen wie neu und innen ist es bis ins kleinste Detail sauber. Sehr freundliches Team, schnelle und professionelle Arbeit. Absolut empfehlenswert!",
      date: "vor 3 Wochen"
    },
    {
      id: 2,
      name: "Souad Laaroussi",
      rating: 5,
      text: "Ich habe mein Auto zur Aufbereitung in die DZ Lounge gebracht und bin absolut begeistert vom Ergebnis! Der Wagen sieht innen wie außen aus wie neu – jede Kleinigkeit wurde gründlich und mit viel Liebe zum Detail gereinigt. Besonders gefallen hat mir die freundliche Beratung und der professionelle Service. Man merkt sofort, dass hier echte Profis am Werk sind, die ihr Handwerk verstehen. Das Preis-Leistungs-Verhältnis ist ebenfalls top. Für mich ist die DZ Lounge die erste Adresse, wenn es um Autopflege geht – absolute Empfehlung!",
      date: "vor 2 Monaten"
    },
    {
      id: 3,
      name: "Cihan T.",
      rating: 5,
      text: "Top Service! Mein Auto sah nach der Pflege wirklich wie neu aus – Lack glänzt, Felgen sauber, Innenraum perfekt. Sehr freundliches Team, schnelle Abwicklung und absolut professionell. Kann ich nur weiterempfehlen!",
      date: "vor einem Monat"
    },
    {
      id: 4,
      name: "Levent A",
      rating: 5,
      text: "Ich kann die DZ Autopflege Lounge nur wärmstens empfehlen! Mein Fahrzeug wurde bis ins kleinste Detail gereinigt und gepflegt – das Ergebnis war einfach beeindruckend. Der Lack glänzt wie neu, der Innenraum ist porentief sauber, und sogar hartnäckige Verschmutzungen wurden mühelos entfernt. Das Team arbeitet äußerst professionell, zuverlässig und mit viel Leidenschaft. Schon beim ersten Kontakt fühlte ich mich bestens aufgehoben – freundlicher Service, transparente Beratung und pünktliche Abwicklung inklusive. Hier wird Qualität noch großgeschrieben! Wer seinem Auto eine hochwertige Pflege gönnen möchte, ist bei der DZ Autopflege Lounge genau richtig. Ich komme definitiv wieder!",
      date: "vor 5 Monaten"
    },
    {
      id: 5,
      name: "Esma Nur Durna",
      rating: 5,
      text: "Ich möchte mich ganz herzlich bei Deniz dem Chef bedanken! Er hat meinen unschönen Kratzer entfernt und mein Auto sieht jetzt wieder aus wie neu ich bin total begeistert. Die Arbeit war super professionell, dabei aber sehr freundlich und sympathisch. Ich fühle mich hier wirklich gut aufgehoben und kann Dz Autopflege von Herzen weiterempfehlen!",
      date: "vor einem Monat"
    }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div>
            <div className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 bg-slate-100 text-slate-700 border border-slate-200 font-montserrat">
                Warum Kunden uns wählen
              </span>
              <h3 className="text-3xl md:text-4xl font-bold text-white-800 font-poppins leading-tight mb-6">
                Premium Qualität garantiert
              </h3>
              <p className="text-lg text-white-600 font-medium mb-8 font-montserrat leading-relaxed">
                Bei uns steht Ihre Zufriedenheit an erster Stelle. Erleben Sie den Unterschied professioneller Fahrzeugpflege.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {trustPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-5 h-5 text-slate-600" />
                  </div>
                  <span className="text-lg text-slate-800 font-semibold font-montserrat">
                    {point.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Google Reviews */}
          <div className="space-y-6">
            {/* Google Reviews Header */}
            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100">
              <div className="mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-slate-200 rounded-2xl flex items-center justify-center">
                    <span className="text-xl font-bold text-slate-700">G</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-800 font-poppins">Google</span>
                  <span className="text-slate-600 font-medium font-montserrat">Bewertungen</span>
                </div>
                
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-slate-800 font-poppins">5.0</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-slate-600 font-medium font-montserrat">(44)</span>
                </div>
              </div>

              {/* Reviews Slider */}
              <div className="relative bg-white rounded-xl p-6 border border-slate-200 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={prevReview}
                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-slate-600" />
                  </button>
                  
                  <div className="flex gap-2">
                    {reviews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentReview(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentReview ? 'bg-slate-600' : 'bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={nextReview}
                    className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                </div>

                <div className="min-h-[200px] flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-slate-700 text-sm leading-relaxed mb-4 font-montserrat">
                      "{reviews[currentReview].text}"
                    </p>
                    
                    <div className="text-center">
                      <p className="font-semibold text-slate-800 font-poppins">
                        {reviews[currentReview].name}
                      </p>
                      <p className="text-xs text-slate-500 font-montserrat">
                        {reviews[currentReview].date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/search?sca_esv=bbe3debe957613b7&sxsrf=AE3TifN4LvLo-BDvRJWoKuxxd1ojopThXg:1759771340839&q=dz+autopflege+velbert&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-Ex5KyEW2JqTycqPjGTK6GAxJaL4OgUjYU35XESfdYXDYkJg6t2_a2uKShcElZVhdMIdib2M%3D&uds=AOm0WdFBvY2LKXs9H9KYsBlzmzqjgU4rb6gLmSuXwGHRvDET9wVfCjKO7V79B7r41bpMq1NkP_bSr_BtBl9MqZWaxUVCcQ1u--8j4tWJ3lrYwlxy5gixIG_-p5KT-1lCOf5388J5ozlI&sa=X&sqi=2&ved=2ahUKEwjQm6CNi5CQAxXC9QIHHeoJLsUQ3PALegQIGxAE&biw=1728&bih=958&dpr=2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-colors"
              >
                <span>Bewerten Sie uns auf Google</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;