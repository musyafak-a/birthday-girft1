import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface AutoConfettiProps {
  duration?: number; // duration in ms (default 3500)
  colors?: string[];
  scalar?: number; // scale / ukuran confetti (default 1.35)
}

export function AutoConfetti({
  duration = 4000,
  colors = [
    '#FFFFFF', // Putih
    '#FF4081', // Pink Cerah
    '#00C853', // Hijau Cerah
    '#FF1744', // Merah Cerah
    '#2979FF'  // Biru Cerah
  ],
  scalar = 1.45
}: AutoConfettiProps) {
  useEffect(() => {
    // Mulai seketika tanpa jeda saat halaman dibuka
    const end = Date.now() + duration;

    // Semburan pembuka instan langsung saat pertama kali terbuka
    confetti({
      particleCount: 15,
      angle: 60,
      spread: 60,
      startVelocity: 60,
      origin: { x: 0, y: 0.65 },
      colors: colors,
      scalar: scalar,
      zIndex: 9999
    });
    confetti({
      particleCount: 15,
      angle: 120,
      spread: 60,
      startVelocity: 60,
      origin: { x: 1, y: 0.65 },
      colors: colors,
      scalar: scalar,
      zIndex: 9999
    });

    let animationFrameId: number;

    const frame = () => {
      if (Date.now() > end) return;

      // Side Cannon Kiri (menembak ke arah kanan atas)
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        startVelocity: 55,
        origin: { x: 0, y: 0.65 },
        colors: colors,
        scalar: scalar,
        zIndex: 9999
      });

      // Side Cannon Kanan (menembak ke arah kiri atas)
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        startVelocity: 55,
        origin: { x: 1, y: 0.65 },
        colors: colors,
        scalar: scalar,
        zIndex: 9999
      });

      animationFrameId = requestAnimationFrame(frame);
    };

    frame();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [duration, colors, scalar]);

  return null;
}

export default AutoConfetti;
