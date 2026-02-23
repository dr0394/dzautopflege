import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ 
  beforeImage = 'https://image.jimcdn.com/app/cms/image/transf/none/path/sda27861925bed8a3/image/i0c955180a4d0cf0f/version/1600421817/image.jpg',
  afterImage = 'https://image.jimcdn.com/app/cms/image/transf/none/path/sda27861925bed8a3/image/i89b2602e50487594/version/1600422081/image.jpg'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updateSliderPosition(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    updateSliderPosition(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updateSliderPosition(e.touches[0]);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    updateSliderPosition(e.touches[0]);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const updateSliderPosition = (e: MouseEvent | Touch | React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-96 md:h-[500px] overflow-hidden cursor-col-resize select-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <img 
          src={afterImage}
          alt="Fahrzeug nach der Reinigung"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-lg font-semibold shadow-lg">
          Nachher ✨
        </div>
      </div>

      {/* Before Image (Overlay) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage}
          alt="Fahrzeug vor der Reinigung"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-2 rounded-lg font-semibold shadow-lg">
          Vorher 😔
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize z-10"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-300 flex items-center justify-center">
          <div className="flex space-x-0.5">
            <div className="w-0.5 h-4 bg-gray-400 rounded"></div>
            <div className="w-0.5 h-4 bg-gray-400 rounded"></div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-sm">
        ← Ziehen Sie den Regler →
      </div>
    </div>
  );
};

export default BeforeAfterSlider;