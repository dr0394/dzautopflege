import React from 'react';
import { Car, Truck, Bike, Zap } from 'lucide-react';

interface VehicleSelectionProps {
  selectedVehicle: string;
  onVehicleSelect: (vehicle: string) => void;
}

const VehicleSelection: React.FC<VehicleSelectionProps> = ({ selectedVehicle, onVehicleSelect }) => {
  const vehicles = [
    {
      id: 'KLeinwagen',
      name: 'KLEINWAGEN',
      image: 'https://i.imgur.com/aWePZ1a.png',
      icon: Car,
      description: 'Kompakt & Effizient'
    },
    {
      id: 'Mittelklasse',
      name: 'MITTELKLASSE',
      image: 'https://i.imgur.com/1fOLBcp.png',
      icon: Car,
      description: 'Komfort & Stil'
    },
    {
      id: 'SUV',
      name: 'SUV',
      image: 'https://i.imgur.com/BH1Xocu.png',
      icon: Truck,
      description: 'Robust & Geräumig'
    },
    {
      id: 'Transporter',
      name: 'TRANSPORTER/VAN',
      image: 'https://i.imgur.com/JAMhbmW.png',
      icon: Truck,
      description: 'Nutzfahrzeug'
    },
    {
      id: 'Luxusfahrzeug',
      name: 'LUXUSFAHRZEUG',
      image: 'https://i.imgur.com/71vqTmW.png',
      icon: Zap,
      description: 'Premium & Exklusiv'
    },
    {
      id: 'Motorraf',
      name: 'MOTORRAD',
      image: 'https://i.imgur.com/uq00GTY.png',
      icon: Bike,
      description: 'Zweirad'
    },
    {
      id: 'Oldtimer',
      name: 'OLDTIMER',
      image: 'https://i.imgur.com/JsbJHdY.png',
      icon: Car,
      description: 'Klassiker & Vintage'
    },
    {
      id: 'Campingwagen',
      name: 'CAMPINGWAGEN',
      image: 'https://i.imgur.com/PpEwDZc.png',
      icon: Truck,
      description: 'Wohnmobil & Caravan'
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {vehicles.map((vehicle, index) => {
          const isSelected = selectedVehicle === vehicle.id;
          const IconComponent = vehicle.icon;
          
          return (
            <div
              key={vehicle.id}
              onClick={() => onVehicleSelect(vehicle.id)}
              className={`relative flex-shrink-0 w-48 h-64 md:w-56 md:h-72 cursor-pointer group transition-all duration-500 hover:scale-105 ${
                isSelected ? 'scale-105 z-10' : ''
              }`}
              style={{
                transform: `skewX(-8deg) ${isSelected ? 'scale(1.05)' : ''}`,
                transformOrigin: 'center'
              }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-2xl overflow-hidden shadow-silver-lg"
                style={{ backgroundImage: `url(${vehicle.image})` }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 transition-all duration-500 ${
                  isSelected 
                    ? 'bg-gradient-to-t from-slate-900/90 via-slate-800/60 to-transparent' 
                    : 'bg-gradient-to-t from-slate-900/80 via-slate-800/40 to-slate-600/20 group-hover:from-slate-900/90'
                }`}>
                  {/* Shimmer Effect */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer opacity-30"></div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div 
                className="relative h-full flex flex-col justify-between p-6 text-white z-10"
                style={{ transform: 'skewX(8deg)' }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isSelected 
                      ? 'bg-gradient-metallic shadow-silver-lg animate-glow' 
                      : 'bg-white/20 backdrop-blur-sm group-hover:bg-white/30'
                  }`}>
                    {isSelected && (
                      <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer rounded-full"></div>
                    )}
                    <IconComponent className={`w-6 h-6 relative z-10 ${
                      isSelected ? 'text-slate-700' : 'text-white'
                    }`} />
                  </div>
                </div>

                {/* Vehicle Name */}
                <div className="text-center">
                  <h3 className={`font-poppins font-bold text-lg mb-2 transition-all duration-300 ${
                    isSelected 
                      ? 'text-white drop-shadow-lg text-xl' 
                      : 'text-white/90 group-hover:text-white'
                  }`}>
                    {vehicle.name}
                  </h3>
                  <p className={`font-montserrat text-sm transition-all duration-300 ${
                    isSelected 
                      ? 'text-white/90 drop-shadow-md' 
                      : 'text-white/70 group-hover:text-white/80'
                  }`}>
                    {vehicle.description}
                  </p>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-metallic shadow-silver-lg flex items-center justify-center animate-glow">
                      <div className="absolute inset-0 bg-gradient-shimmer animate-shimmer rounded-full"></div>
                      <svg className="w-5 h-5 text-slate-700 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
                  isSelected 
                    ? 'shadow-silver-xl' 
                    : 'group-hover:shadow-silver-lg'
                }`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll Indicator */}
      <div className="flex justify-center mt-4 md:hidden">
        <div className="flex space-x-1">
          {vehicles.map((_, index) => (
            <div 
              key={index} 
              className="w-2 h-2 rounded-full bg-slate-300 opacity-50"
            ></div>
          ))}
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
    </div>
  );
};

export default VehicleSelection;