import React from 'react';

interface PetalConfig {
  id: number;
  src: string;
  left: number; // percentage (0-100)
  top: number; // pixels down the page (0 to ~2200px)
  size: number; // px width
  duration: number; // seconds (slow speed: 13s - 19s)
  delay: number; // negative seconds so petals are already in mid-air
  animationClass: string;
  opacity: number;
}

// 36 kelopak bunga yang tersebar di sepanjang halaman (Section 1, Section 2, Section 3)
// Menempel pada posisi halaman (absolute), sehingga ketika di-scroll kelopak bergerak mengikuti halaman (bukan kamera)
const PETAL_LIST: PetalConfig[] = [
  // --- ZONA SECTION 1: HERO BEACH & INSTAGRAM CARD (y: 20px - 750px) ---
  { id: 1, src: '/petal-1.png', left: 4, top: 40, size: 34, duration: 15.2, delay: -2.3, animationClass: 'animate-petal-fall-1', opacity: 0.9 },
  { id: 2, src: '/petal-2.png', left: 14, top: 120, size: 26, duration: 17.5, delay: -9.8, animationClass: 'animate-petal-fall-2', opacity: 0.8 },
  { id: 3, src: '/petal-3.png', left: 23, top: 60, size: 40, duration: 14.1, delay: -5.1, animationClass: 'animate-petal-fall-3', opacity: 0.95 },
  { id: 4, src: '/petal-4.png', left: 32, top: 220, size: 28, duration: 16.3, delay: -12.4, animationClass: 'animate-petal-fall-1', opacity: 0.85 },
  { id: 5, src: '/petal-5.png', left: 42, top: 80, size: 42, duration: 13.8, delay: -7.5, animationClass: 'animate-petal-fall-2', opacity: 0.9 },
  { id: 6, src: '/petal-6.png', left: 53, top: 310, size: 24, duration: 18.2, delay: -3.8, animationClass: 'animate-petal-fall-3', opacity: 0.75 },
  { id: 7, src: '/petal-7.png', left: 64, top: 150, size: 36, duration: 15.0, delay: -14.2, animationClass: 'animate-petal-fall-1', opacity: 0.9 },
  { id: 8, src: '/petal-8.png', left: 74, top: 280, size: 27, duration: 16.8, delay: -8.7, animationClass: 'animate-petal-fall-2', opacity: 0.85 },
  { id: 9, src: '/petal-9.png', left: 83, top: 70, size: 39, duration: 14.2, delay: -1.6, animationClass: 'animate-petal-fall-3', opacity: 0.95 },
  { id: 10, src: '/petal-10.png', left: 92, top: 240, size: 30, duration: 16.0, delay: -11.3, animationClass: 'animate-petal-fall-1', opacity: 0.85 },
  { id: 11, src: '/petal-11.png', left: 8, top: 460, size: 37, duration: 14.5, delay: -6.4, animationClass: 'animate-petal-fall-2', opacity: 0.9 },
  { id: 12, src: '/petal-12.png', left: 88, top: 490, size: 25, duration: 17.8, delay: -13.6, animationClass: 'animate-petal-fall-3', opacity: 0.8 },

  // --- ZONA SECTION 2: SURAT PAPER CRUMPLE & ORNAMEN (y: 750px - 1650px) ---
  { id: 13, src: '/petal-1.png', left: 6, top: 750, size: 35, duration: 14.4, delay: -4.7, animationClass: 'animate-petal-fall-1', opacity: 0.9 },
  { id: 14, src: '/petal-2.png', left: 18, top: 860, size: 38, duration: 15.5, delay: -15.1, animationClass: 'animate-petal-fall-2', opacity: 0.9 },
  { id: 15, src: '/petal-3.png', left: 27, top: 1020, size: 25, duration: 18.6, delay: -10.3, animationClass: 'animate-petal-fall-3', opacity: 0.8 },
  { id: 16, src: '/petal-4.png', left: 36, top: 820, size: 44, duration: 13.5, delay: -3.2, animationClass: 'animate-petal-fall-1', opacity: 0.95 },
  { id: 17, src: '/petal-5.png', left: 47, top: 980, size: 29, duration: 17.1, delay: -16.0, animationClass: 'animate-petal-fall-2', opacity: 0.85 },
  { id: 18, src: '/petal-6.png', left: 58, top: 1140, size: 35, duration: 14.9, delay: -8.1, animationClass: 'animate-petal-fall-3', opacity: 0.9 },
  { id: 19, src: '/petal-7.png', left: 68, top: 840, size: 23, duration: 19.0, delay: -2.9, animationClass: 'animate-petal-fall-1', opacity: 0.75 },
  { id: 20, src: '/petal-8.png', left: 78, top: 1060, size: 41, duration: 13.7, delay: -12.8, animationClass: 'animate-petal-fall-2', opacity: 0.95 },
  { id: 21, src: '/petal-9.png', left: 87, top: 910, size: 27, duration: 17.4, delay: -5.7, animationClass: 'animate-petal-fall-3', opacity: 0.8 },
  { id: 22, src: '/petal-10.png', left: 12, top: 1240, size: 33, duration: 15.9, delay: -14.6, animationClass: 'animate-petal-fall-1', opacity: 0.9 },
  { id: 23, src: '/petal-11.png', left: 40, top: 1350, size: 29, duration: 16.5, delay: -7.2, animationClass: 'animate-petal-fall-2', opacity: 0.85 },
  { id: 24, src: '/petal-12.png', left: 84, top: 1380, size: 36, duration: 15.1, delay: -11.9, animationClass: 'animate-petal-fall-3', opacity: 0.9 },

  // --- ZONA SECTION 3: FOLDER MEMORI & POLAROID (y: 1650px - 2500px) ---
  { id: 25, src: '/petal-1.png', left: 5, top: 1600, size: 33, duration: 14.8, delay: -3.5, animationClass: 'animate-petal-fall-1', opacity: 0.9 },
  { id: 26, src: '/petal-2.png', left: 16, top: 1720, size: 28, duration: 17.0, delay: -10.5, animationClass: 'animate-petal-fall-2', opacity: 0.8 },
  { id: 27, src: '/petal-3.png', left: 25, top: 1880, size: 39, duration: 13.9, delay: -6.2, animationClass: 'animate-petal-fall-3', opacity: 0.95 },
  { id: 28, src: '/petal-4.png', left: 35, top: 1650, size: 27, duration: 16.2, delay: -13.0, animationClass: 'animate-petal-fall-1', opacity: 0.85 },
  { id: 29, src: '/petal-5.png', left: 46, top: 1800, size: 41, duration: 13.6, delay: -8.4, animationClass: 'animate-petal-fall-2', opacity: 0.9 },
  { id: 30, src: '/petal-6.png', left: 56, top: 1960, size: 24, duration: 18.5, delay: -4.1, animationClass: 'animate-petal-fall-3', opacity: 0.75 },
  { id: 31, src: '/petal-7.png', left: 66, top: 1670, size: 35, duration: 15.3, delay: -14.9, animationClass: 'animate-petal-fall-1', opacity: 0.9 },
  { id: 32, src: '/petal-8.png', left: 76, top: 1840, size: 29, duration: 16.6, delay: -9.1, animationClass: 'animate-petal-fall-2', opacity: 0.85 },
  { id: 33, src: '/petal-9.png', left: 86, top: 1740, size: 38, duration: 14.0, delay: -2.0, animationClass: 'animate-petal-fall-3', opacity: 0.95 },
  { id: 34, src: '/petal-10.png', left: 94, top: 1910, size: 28, duration: 16.1, delay: -11.7, animationClass: 'animate-petal-fall-1', opacity: 0.85 },
  { id: 35, src: '/petal-11.png', left: 22, top: 2050, size: 36, duration: 14.7, delay: -7.6, animationClass: 'animate-petal-fall-2', opacity: 0.9 },
  { id: 36, src: '/petal-12.png', left: 72, top: 2120, size: 26, duration: 17.6, delay: -12.3, animationClass: 'animate-petal-fall-3', opacity: 0.8 },
];

export const FallingPetals: React.FC = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-hidden select-none"
      aria-hidden="true"
    >
      {PETAL_LIST.map(petal => (
        <div
          key={petal.id}
          className={`absolute ${petal.animationClass}`}
          style={{
            left: `${petal.left}%`,
            top: `${petal.top}px`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            opacity: petal.opacity,
          }}
        >
          <img
            src={petal.src}
            alt=""
            className="h-auto pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
            style={{ width: `${petal.size}px` }}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default FallingPetals;
