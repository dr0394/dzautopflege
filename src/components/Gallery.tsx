import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery: React.FC = () => { 
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      id: 1,
      video: 'https://i.imgur.com/1Dh8oTl.mp4',
      size: 'large',
      type: 'video'
    },
    {
      id: 2,
      video: 'https://i.imgur.com/h2YHHnq.mp4',
      type: 'video'
    },
    {
      id: 3,
      video: 'https://i.imgur.com/x8gT4fq.mp4',
      type: 'video'
    },
    {
      id: 4,
      video: 'https://i.imgur.com/0xahSMD.mp4',
      type: 'video'
    },
    {
      id: 5,
      video: 'https://i.imgur.com/GY6HnlT.mp4',
      type: 'video'
    },
    {
      id: 6,
      video: 'https://i.imgur.com/fSQS9z8.mp4',
      type: 'video'
    },
    {
      id: 7,
      video: 'https://i.imgur.com/v0QMsH6.mp4',
      type: 'video'
    },
    {
      id: 8,
      video: 'https://i.imgur.com/kOtTW1A.mp4',
      type: 'video'
    },
    {
      id: 9,
      video: 'https://i.imgur.com/5Os7Ffc.mp4',
      type: 'video'
    },
    {
      id: 11,
      image: 'https://i.imgur.com/sIcpBnM.jpg',
      type: 'image'
    },
    
    {
      id: 13,
      image: 'https://i.imgur.com/9dTq77a.jpg',
      type: 'image'
    },
    {
      id: 14,
      image: 'https://i.imgur.com/irAg3pI.jpg',
      type: 'image'
    },
    {
      id: 16,
      image: 'https://i.imgur.com/aLbjluv.jpg',
      type: 'image'
    },
    {
      id: 17,
      image: 'https://i.imgur.com/3yIAFkD.jpg',
      type: 'image'
    },
    {
      id: 18,
      image: 'https://i.imgur.com/sp1bltC.jpg',
      type: 'image'
    },
    {
      id: 19,
      image: 'https://i.imgur.com/W35qnet.jpg',
      type: 'image'
    },
    {
      id: 20,
      image: 'https://i.imgur.com/t91yJHA.jpg',
      type: 'image'
    },
    {
      id: 22,
      image: 'https://i.imgur.com/DPxRN9j.jpg',
      type: 'image'
    },
    {
      id: 23,
      image: 'https://i.imgur.com/wFro99T.jpg',
      type: 'image'
    },
    {
      id: 25,
      image: 'https://i.imgur.com/RRCzHHq.jpg',
      type: 'image'
    },
    {
      id: 28,
      image: 'https://i.imgur.com/wnqPkZ2.jpg',
      type: 'image'
    },
    {
      id: 29,
      image: 'https://i.imgur.com/VkNiFMV.jpg',
      type: 'image'
    },
    {
      id: 30,
      image: 'https://i.imgur.com/WA9o3Yt.jpg',
      type: 'image'
    },
    {
      id: 31,
      image: 'https://i.imgur.com/USQ5c8U.jpg',
      type: 'image'
    },
    {
      id: 32,
      image: 'https://i.imgur.com/uBI3Jim.jpg',
      type: 'image'
    },
    {
      id: 33,
      image: 'https://i.imgur.com/SJ4Wmef.jpeg',
      type: 'image'
    },
    {
      id: 34,
      image: 'https://i.imgur.com/8BvFsfn.jpeg',
      type: 'image'
    },
    {
      id: 35,
      image: 'https://i.imgur.com/oZA0k1G.jpeg',
      type: 'image'
    },
    {
      id: 36,
      image: 'https://i.imgur.com/rj2ctZi.jpeg',
      type: 'image'
    },
    {
      id: 38,
      image: 'https://i.imgur.com/SkvNBiv.jpeg',
      type: 'image'
    },
    {
      id: 39,
      image: 'https://i.imgur.com/xVk738y.jpeg',
      type: 'image'
    },
    {
      id: 40,
      image: 'https://i.imgur.com/BYMDz0Q.jpeg',
      type: 'image'
    },
    {
      id: 41,
      image: 'https://i.imgur.com/cWP6Evv.jpeg',
      type: 'image'
    },
    {
      id: 42,
      image: 'https://i.imgur.com/lVrM3Zn.jpeg',
      type: 'image'
    },
    {
      id: 43,
      image: 'https://i.imgur.com/08wmWqD.jpeg',
      type: 'image'
    },
    {
      id: 44,
      image: 'https://i.imgur.com/Hyr6DDS.jpeg',
      type: 'image'
    },
    {
      id: 45,
      image: 'https://i.imgur.com/octl9ow.jpeg',
      type: 'image'
    },
    {
      id: 46,
      image: 'https://i.imgur.com/9m4m9Jh.jpeg',
      type: 'image'
    },
    {
      id: 47,
      image: 'https://i.imgur.com/9zicgHn.jpeg',
      type: 'image'
    },
    {
      id: 48,
      image: 'https://i.imgur.com/VkVlj9t.jpeg',
      type: 'image'
    },
    {
      id: 49,
      image: 'https://i.imgur.com/ATJWRt5.jpeg',
      type: 'image'
    },
    {
      id: 50,
      image: 'https://i.imgur.com/Av7t2rs.jpeg',
      type: 'image'
    },
    {
      id: 51,
      image: 'https://i.imgur.com/tOYjDFT.jpeg',
      type: 'image'
    },
    {
      id: 52,
      image: 'https://i.imgur.com/QSotQaj.jpeg',
      type: 'image'
    },
    {
      id: 53,
      image: 'https://i.imgur.com/yQq6zfP.jpeg',
      type: 'image'
    },
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <section className="py-24 bg-gradient-to-br from-brand-black via-accent-dark/20 to-brand-black text-brand-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-glow rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-glow rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-glow rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 border border-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
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
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-metallic shadow-silver-lg animate-glow flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
                <Eye className="w-6 h-6 text-slate-700 relative z-10" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent font-poppins">
                Zufriedene Kunden
              </h2>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto font-montserrat">
              So sauber war Ihr Auto noch nie – überzeugen Sie sich selbst!
            </p>
          </motion.div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {galleryImages.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-slate-500/50 transition-all duration-500 hover:scale-105 cursor-pointer ${
                item.size === 'large' ? 'md:col-span-2 md:row-span-2' : 'aspect-[4/3]'
              }`}
              onClick={() => openLightbox(index)}
            >
              {/* Image or Video */}
              <div className="absolute inset-0">
                {item.type === 'video' ? (
                  <video
                    src={item.video}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                ) : (
                  <img
                    src={item.image}
                    alt="Autopflege Galerie"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </div>

              {/* Video Play Icon */}
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-black/70 transition-all duration-300">
                    <svg className="w-8 h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none group-hover:shadow-silver-lg"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div
            className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-shimmer opacity-10 animate-shimmer"></div>
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-poppins">
                Lust auf den gleichen Wow-Effekt? Jetzt Reinigung buchen.
              </h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto font-montserrat">
                Lassen Sie uns auch Ihr Fahrzeug in neuem Glanz erstrahlen
              </p>
              <a
                href="https://wa.me/4915755485029?text=Hallo!%20Ich%20interessiere%20mich%20für%20eine%20professionelle%20Fahrzeugaufbereitung%20und%20hätte%20gerne%20ein%20Angebot."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-metallic text-slate-700 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-silver-lg hover:shadow-silver-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer"></div>
                <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
                <span className="relative z-10 mr-3">Fahrzeugaufbereitung anfragen</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="fixed top-4 right-4 z-[70] w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div 
            className="relative max-w-7xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {galleryImages[selectedImage].type === 'video' ? (
              <video
                src={galleryImages[selectedImage].video}
                className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                controls
                autoPlay
                loop
                muted
              />
            ) : (
              <img
                src={galleryImages[selectedImage].image}
                alt="Autopflege Galerie"
                className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
              />
            )}
            

            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;