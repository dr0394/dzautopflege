import React from 'react';
import { Shield, Star, CheckCircle, Droplet, Sun, Sparkles, Clock, Award, TrendingUp, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const CeramicCoating: React.FC = () => {
  const whatsappNumber = "4915755485029";
  const whatsappMessage = encodeURIComponent("Hallo, ich interessiere mich für eine Keramikversiegelung. Bitte kontaktieren Sie mich für weitere Informationen.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const benefits = [
    {
      icon: Shield,
      title: 'Langanhaltender Schutz',
      description: 'Schützt den Lack vor Umwelteinflüssen, UV-Strahlung und Verschmutzung für Jahre'
    },
    {
      icon: Droplet,
      title: 'Hydrophober Effekt',
      description: 'Wasser perlt ab, Schmutz haftet nicht - Ihr Auto bleibt länger sauber'
    },
    {
      icon: Sun,
      title: 'UV-Beständig',
      description: 'Verhindert das Ausbleichen und Verblassen der Lackfarbe durch Sonneneinstrahlung'
    },
    {
      icon: Sparkles,
      title: 'Brillanter Glanz',
      description: 'Verstärkt die Farbtiefe und sorgt für einen dauerhaften Hochglanz-Effekt'
    },
    {
      icon: Clock,
      title: 'Zeitersparnis',
      description: 'Leichtere Reinigung und weniger häufige Autowäschen notwendig'
    },
    {
      icon: Award,
      title: 'Wertsteigerung',
      description: 'Erhält den Wiederverkaufswert Ihres Fahrzeugs durch perfekten Lackzustand'
    }
  ];

  const process = [
    {
      step: '1',
      title: 'Gründliche Vorreinigung',
      description: 'Intensive Reinigung und Dekontamination des Lacks von allen Verunreinigungen',
      duration: '1-2 Std'
    },
    {
      step: '2',
      title: 'Lackpolitur',
      description: 'Entfernung von Kratzern und Hologrammen für eine perfekte Oberfläche',
      duration: '2-4 Std'
    },
    {
      step: '3',
      title: 'Keramikauftrag',
      description: 'Professioneller Auftrag der Keramikversiegelung in mehreren Schichten',
      duration: '2-3 Std'
    },
    {
      step: '4',
      title: 'Aushärtung',
      description: 'Kontrollierte Aushärtung für optimale Verbindung mit dem Lack',
      duration: '12-24 Std'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 bg-red-500/10 text-red-400 border border-red-500/30 font-poppins">
              Premium Lackschutz
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-poppins">
              Keramikversiegelung
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-poppins">
              Der ultimative Schutz für Ihren Lack - Langlebig, glänzend und pflegeleicht
            </p>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Benefits */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-8 font-poppins flex items-center gap-3">
                <Star className="w-8 h-8 text-red-400" />
                Ihre Vorteile
              </h3>
              <div className="grid gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-red-500/50 transition-all group"
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/30 transition-colors">
                        <benefit.icon className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-2 font-poppins">
                          {benefit.title}
                        </h4>
                        <p className="text-gray-400 text-sm font-poppins">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Process */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-white mb-8 font-poppins flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-red-400" />
                Unser Prozess
              </h3>
              <div className="space-y-6">
                {process.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Connecting Line */}
                    {index < process.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-red-500 to-transparent"></div>
                    )}

                    <div className="flex gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                          {item.step}
                        </div>
                      </div>
                      <div className="flex-1 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-bold text-white font-poppins">
                            {item.title}
                          </h4>
                          <span className="text-xs text-gray-400 font-poppins bg-gray-700/50 px-3 py-1 rounded-full">
                            {item.duration}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm font-poppins">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { value: '5-7 Jahre', label: 'Schutz' },
            { value: '9H', label: 'Härte' },
            { value: '120°', label: 'Kontaktwinkel' },
            { value: '100%', label: 'Zufriedenheit' }
          ].map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center">
              <div className="text-3xl md:text-4xl font-bold text-red-400 mb-2 font-poppins">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm font-poppins">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-2xl p-8 md:p-12 border border-red-500/20 text-center"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 font-poppins">
            Interessiert an einer Keramikversiegelung?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto font-poppins">
            Kontaktieren Sie uns für eine persönliche Beratung und ein individuelles Angebot
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-metallic text-slate-700 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-silver-lg hover:shadow-silver-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
              <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
              <MessageCircle className="w-6 h-6 relative z-10 mr-3" />
              <span className="relative z-10">Jetzt anfragen</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CeramicCoating;
