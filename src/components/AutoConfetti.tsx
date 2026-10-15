import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface AutoConfettiProps {
  duration?: number; // duration in ms (default 3500)
  colors?: string[];
}

export function AutoConfetti({
  duration = 3500,
  colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1', '#d4af37']
}: AutoConfettiProps) {
  useEffect(() => {
    // Delay singkat 300ms agar halaman web selesai render terlebih dahulu
    const timer = setTimeout(() => {
      const end = Date.now() + duration;

      const frame = () => {
        if (Date.now() > end) return;

        // Side Cannon Kiri
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.6 },
          colors: colors,
          zIndex: 9999
        });

        // Side Cannon Kanan
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.6 },
          colors: colors,
          zIndex: 9999
        });

        requestAnimationFrame(frame);
      };

      frame();
    }, 300);

    return () => clearTimeout(timer);
  }, [duration, colors]);

  return null;
}

export default AutoConfetti;
