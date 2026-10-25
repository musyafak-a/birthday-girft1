import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface AutoConfettiProps {
  colors?: string[];
  scalar?: number;
}

const DEFAULT_COLORS = [
  '#FFFFFF', // Putih
  '#FF4081', // Pink Cerah
  '#00C853', // Hijau Cerah
  '#FF1744', // Merah Cerah
  '#2979FF', // Biru Cerah
  '#FFD700', // Gold
  '#FFA000', // Amber
];

export function AutoConfetti({
  colors = DEFAULT_COLORS,
  scalar = 1.35
}: AutoConfettiProps) {
  const hasFired = useRef(false);

  useEffect(() => {
    // Pastikan party popper hanya meledak sekali saat web dibuka
    if (hasFired.current) return;
    hasFired.current = true;

    // Ledakan party popper satu kali: sisi kiri & sisi kanan
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 65,
      startVelocity: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
      scalar: scalar,
      zIndex: 9999,
      ticks: 240
    });

    confetti({
      particleCount: 50,
      angle: 120,
      spread: 65,
      startVelocity: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
      scalar: scalar,
      zIndex: 9999,
      ticks: 240
    });
  }, [colors, scalar]);

  return null;
}

export default AutoConfetti;
