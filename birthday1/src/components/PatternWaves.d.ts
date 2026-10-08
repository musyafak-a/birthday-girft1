import React from 'react';

export interface PatternWavesProps {
  preset?: 'silk' | 'ocean' | 'pond' | 'lines' | 'terminal' | 'mesh';
  pattern?: 'dot' | 'square' | 'plus' | 'line' | 'glyph' | 'heart';
  wave?: 'silk' | 'swell' | 'ripple';
  spacing?: number;
  markSize?: number;
  minMarkRatio?: number;
  depth?: number;
  light?: number;
  shine?: number;
  contrast?: number;
  speed?: number;
  scale?: number;
  direction?: number;
  color?: string;
  backgroundColor?: string;
  pinkColor?: string;
  opacity?: number;
  fade?: 'none' | 'edges' | 'center' | 'bottom' | 'top';
  fadeSize?: number;
  characters?: string;
  interactive?: boolean;
  cursorSize?: number;
  cursorStrength?: number;
  intro?: boolean;
  paused?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

declare const PatternWaves: React.FC<PatternWavesProps>;
export default PatternWaves;
