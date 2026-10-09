'use client';

import { useState } from 'react';

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color.slice(0, 6), 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder = ({
  color = '#E5D5B8',
  backColor = '#F1E5CF',
  size = 1,
  items = [],
  className = ''
}) => {
  const maxItems = 10;
  const papers = items && items.length > 0 ? items.slice(0, maxItems) : [null, null, null];
  const paperCount = papers.length;

  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(Array.from({ length: paperCount }, () => ({ x: 0, y: 0 })));

  const isFlapOpen = open || isHovered;

  const handleClick = () => {
    setOpen(prev => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: paperCount }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e, index) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  const handlePaperMouseLeave = (e, index) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  const scaleStyle = { transform: `scale(${size})`, transformOrigin: 'center center' };

  const getOpenTransform = (index, count) => {
    if (count === 1) {
      return 'translate(-50%, -90%) rotate(0deg)';
    }
    if (count === 2) {
      if (index === 0) return 'translate(-104%, -65%) rotate(-10deg)';
      if (index === 1) return 'translate(4%, -65%) rotate(10deg)';
    }
    if (count === 3) {
      if (index === 0) return 'translate(-115%, -60%) rotate(-14deg)';
      if (index === 1) return 'translate(15%, -60%) rotate(14deg)';
      if (index === 2) return 'translate(-50%, -95%) rotate(0deg)';
    }
    if (count === 4) {
      if (index === 0) return 'translate(-135%, -60%) rotate(-16deg)';
      if (index === 1) return 'translate(-80%, -85%) rotate(-6deg)';
      if (index === 2) return 'translate(-20%, -85%) rotate(6deg)';
      if (index === 3) return 'translate(35%, -60%) rotate(16deg)';
    }
    if (count >= 5) {
      const positions = [
        'translate(-135%, -48%) rotate(-16deg)',
        'translate(-90%, -62%) rotate(-8deg)',
        'translate(-50%, -76%) rotate(0deg)',
        'translate(-10%, -62%) rotate(8deg)',
        'translate(35%, -48%) rotate(16deg)'
      ];
      return positions[index] || 'translate(-50%, -76%) rotate(0deg)';
    }
    return '';
  };

  return (
    <div style={scaleStyle} className={`transition-transform duration-300 ${className}`}>
      {/* Global Paper Texture Definitions */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Authentic Letter Paper Texture extracted directly from Section Letter (birthday-letter.jpg) */}
          <pattern id="letterPaperTexture" width="120" height="120" patternUnits="userSpaceOnUse">
            <image href="/letter-paper-emboss.png" width="120" height="120" preserveAspectRatio="none" />
          </pattern>

          {/* Deep Burgundy Floral Wax Seal Shading */}
          <linearGradient id="sealOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8A131F" />
            <stop offset="45%" stopColor="#680B14" />
            <stop offset="100%" stopColor="#44040A" />
          </linearGradient>
          <radialGradient id="sealInnerGrad" cx="45%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#80121D" />
            <stop offset="65%" stopColor="#5B0810" />
            <stop offset="100%" stopColor="#3B0308" />
          </radialGradient>
          <filter id="sealDropShadow" x="-25%" y="-25%" width="150%" height="160%">
            <feDropShadow dx="0" dy="3.5" stdDeviation="3.5" floodColor="#230407" floodOpacity="0.4" />
          </filter>
        </defs>
      </svg>

      <div
        className="group relative transition-all duration-300 ease-in-out cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E5D5B8] focus-visible:ring-offset-2"
        style={{
          transform: open ? 'translateY(-10px)' : isHovered ? 'translateY(-6px)' : undefined
        }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-label={open ? 'Tutup amplop surat' : 'Buka amplop surat'}
      >
        {/* Envelope Container: 340px x 230px */}
        <div
          className="relative w-[340px] h-[230px] rounded-2xl shadow-2xl shadow-stone-800/15"
          style={{ perspective: '1000px' }}
        >
          {/* 1. Envelope Back Wall (Interior Liner) */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden z-0" style={{ isolation: 'isolate' }}>
            <svg viewBox="0 0 340 230" className="w-full h-full">
              <defs>
                <linearGradient id="envelopeInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FAF5EC" />
                  <stop offset="50%" stopColor="#F1E5CF" />
                  <stop offset="100%" stopColor="#E5D5B8" />
                </linearGradient>
              </defs>
              <rect width="340" height="230" rx="16" fill="url(#envelopeInnerGrad)" />
              {/* Subtle Letter Paper Texture on Interior Liner */}
              <rect width="340" height="230" rx="16" fill="url(#letterPaperTexture)" opacity="0.35" />
            </svg>
          </div>

          {/* 2. Top Flap (Triangular Lid) with 3D Flip */}
          <div
            className="absolute top-0 left-0 w-[340px] h-[142px] origin-top pointer-events-none"
            style={{
              transformStyle: 'preserve-3d',
              isolation: 'isolate',
              transform: isFlapOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
              zIndex: isFlapOpen ? 10 : 40,
              transition: isFlapOpen
                ? 'transform 520ms cubic-bezier(0.34, 1.25, 0.64, 1), z-index 0s ease 220ms'
                : 'transform 520ms cubic-bezier(0.34, 1.25, 0.64, 1), z-index 0s ease 250ms'
            }}
          >
            {/* 2A. Front Face (Visible when flap is CLOSED, points DOWN) */}
            <div className="absolute inset-0 w-full h-full [backface-visibility:hidden]">
              <svg viewBox="0 0 340 142" className="w-full h-full overflow-visible filter drop-shadow-md">
                <defs>
                  <linearGradient id="flapFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F9F2E6" />
                    <stop offset="50%" stopColor="#F1E5CF" />
                    <stop offset="100%" stopColor="#EBDEC8" />
                  </linearGradient>
                </defs>

                {/* Triangular flap pointing DOWN from (0,0) and (340,0) to center tip */}
                <path
                  d="M 0 0 L 340 0 C 335 10, 192 128, 178 135 C 173 137, 167 137, 162 135 C 148 128, 5 10, 0 0 Z"
                  fill="url(#flapFrontGrad)"
                />

                {/* Subtle Letter Paper Texture on Top Flap (Soft / Semu) */}
                <path
                  d="M 0 0 L 340 0 C 335 10, 192 128, 178 135 C 173 137, 167 137, 162 135 C 148 128, 5 10, 0 0 Z"
                  fill="url(#letterPaperTexture)"
                  opacity="0.4"
                />

                {/* Delicate edge stroke highlight */}
                <path
                  d="M 4 2 L 165 133 C 168 135, 172 135, 175 133 L 336 2"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.45)"
                  strokeWidth="1.2"
                />

                {/* Deep Burgundy Floral Wax Seal (Matching Reference Image) */}
                <g transform="translate(170, 118)">
                  {/* 1. Organic Melted Wax Outer Rim with natural pooled ridges */}
                  <path
                    d="M 0 -17 C 5.5 -17.5, 12 -15, 15.5 -10.5 C 19 -5.5, 18.5 2, 17 8 C 15.2 13.5, 10.5 17.5, 4.5 17.8 C -2 18, -8.5 18.5, -13.5 14.8 C -18 11.2, -19 4.5, -17.8 -2.5 C -16.8 -9.5, -11 -15.8, 0 -17 Z"
                    fill="url(#sealOuterGrad)"
                    filter="url(#sealDropShadow)"
                  />

                  {/* 2. Soft Rim Highlight / Bevel Ridge */}
                  <path
                    d="M -14.5 -4 C -13.5 -11, -8 -15.5, 0 -15.5 C 8 -15.5, 13.5 -11, 14.5 -4"
                    fill="none"
                    stroke="rgba(255, 180, 190, 0.35)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />

                  {/* 3. Sunken Stamped Center Face */}
                  <circle r="11" fill="url(#sealInnerGrad)" stroke="#3E0409" strokeWidth="0.75" />

                  {/* 4. Embossed 5-Petal Flower Motif */}
                  <g transform="scale(0.85)">
                    {[0, 72, 144, 216, 288].map(deg => (
                      <path
                        key={deg}
                        transform={`rotate(${deg}) translate(0, -4.6)`}
                        d="M 0 -3.4 C 2.4 -3.4, 3.2 -1.4, 2.7 1.2 C 2.2 3.4, 0 4.4, 0 4.4 C 0 4.4, -2.2 3.4, -2.7 1.2 C -3.2 -1.4, -2.4 -3.4, 0 -3.4 Z"
                        fill="#9A1725"
                        stroke="#42050B"
                        strokeWidth="0.5"
                      />
                    ))}
                    {/* Flower center pistil */}
                    <circle r="2" fill="#B32030" stroke="#42050B" strokeWidth="0.5" />
                    <circle cx="-0.6" cy="-0.6" r="0.7" fill="rgba(255, 230, 235, 0.7)" />
                  </g>

                  {/* 5. Specular Glossy Arc */}
                  <path
                    d="M -11 -7 C -7 -12.5, 4 -13, 9 -8"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.38)"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </div>

            {/* 2B. Back/Inner Face (Visible when flap is OPEN, points UPWARDS behind cards) */}
            <div
              className="absolute inset-0 w-full h-full [backface-visibility:hidden]"
              style={{ transform: 'rotateY(180deg)' }}
            >
              <svg viewBox="0 0 340 142" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="flapInnerGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#FAF5EB" />
                    <stop offset="100%" stopColor="#F1E5CF" />
                  </linearGradient>
                </defs>

                {/* Inner flap background (points UP when rotated) */}
                <path
                  d="M 0 0 L 340 0 C 335 10, 192 128, 178 135 C 173 137, 167 137, 162 135 C 148 128, 5 10, 0 0 Z"
                  fill="url(#flapInnerGrad)"
                />

                {/* Subtle Letter Paper Texture on Inner Flap */}
                <path
                  d="M 0 0 L 340 0 C 335 10, 192 128, 178 135 C 173 137, 167 137, 162 135 C 148 128, 5 10, 0 0 Z"
                  fill="url(#letterPaperTexture)"
                  opacity="0.35"
                />

                {/* White inner border line matching reference image */}
                <path
                  d="M 18 10 L 165 126 C 168 128, 172 128, 175 126 L 322 10"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.9)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* 3. Cards / Polaroid Photos (z-20) */}
          {papers.map((item, i) => {
            const currentOffset = paperOffsets[i] || { x: 0, y: 0 };

            // When closed: Tucked safely and deeply inside the envelope (never visible from outside!)
            // When hovered: Peeks up gently (-32px) so ONLY the photo header peeks out
            // When open: Fans out in full glory
            const transformStyle = open
              ? `${getOpenTransform(i, paperCount)} translate(${currentOffset.x}px, ${currentOffset.y}px)`
              : isHovered
              ? `translate(-50%, -36px) scale(0.98)`
              : 'translate(-50%, 20px) scale(0.94)';

            const cardHeight = open ? '245px' : isHovered ? '210px' : '155px';

            return (
              <div
                key={i}
                onMouseMove={e => handlePaperMouseMove(e, i)}
                onMouseLeave={e => handlePaperMouseLeave(e, i)}
                className={`absolute z-20 bottom-[20px] left-1/2 transition-all duration-500 ease-out shadow-xl border border-neutral-300/80 overflow-hidden ${
                  open
                    ? 'w-[200px] hover:scale-110 hover:z-50 hover:shadow-2xl pointer-events-auto'
                    : 'w-[200px] pointer-events-none'
                }`}
                style={{
                  height: cardHeight,
                  transform: transformStyle,
                  backgroundColor: '#ffffff',
                  borderRadius: '0px'
                }}
              >
                {item || (
                  <div className="w-full h-full flex flex-col justify-center gap-2 p-4 opacity-40">
                    <div className="h-3 bg-amber-200/80 rounded-full w-3/4"></div>
                    <div className="h-2.5 bg-amber-100 rounded-full w-full"></div>
                    <div className="h-2.5 bg-amber-100 rounded-full w-5/6"></div>
                  </div>
                )}
              </div>
            );
          })}

          {/* 4. Envelope Front Pocket (Left, Right, Bottom Flaps) (z-30) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl z-30"
            style={{ isolation: 'isolate' }}
          >
            <svg viewBox="0 0 340 230" className="w-full h-full">
              <defs>
                <linearGradient id="pocketBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E8D9BD" />
                  <stop offset="100%" stopColor="#DEC9A8" />
                </linearGradient>
                <linearGradient id="sideFlapLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EFE4D0" />
                  <stop offset="45%" stopColor="#E5D5B8" />
                  <stop offset="100%" stopColor="#DDC5A3" />
                </linearGradient>
                <linearGradient id="sideFlapRightGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#EAE0CA" />
                  <stop offset="45%" stopColor="#E1CFB0" />
                  <stop offset="100%" stopColor="#D7BE9B" />
                </linearGradient>
                <linearGradient id="bottomFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#EDE1C9" />
                  <stop offset="40%" stopColor="#E5D5B8" />
                  <stop offset="100%" stopColor="#DCBFA0" />
                </linearGradient>
                <filter id="bottomFlapShadow" x="-10%" y="-15%" width="120%" height="130%">
                  <feDropShadow dx="0" dy="-2.5" stdDeviation="3.5" floodColor="#5C4228" floodOpacity="0.14" />
                </filter>
                {/* Clip Path defining ONLY the front pocket flaps - opening where photos peek is 100% excluded */}
                <clipPath id="pocketFlapsClip">
                  <path d="M 0 95 L 170 150 L 340 95 L 340 230 L 0 230 Z" />
                  <path d="M 0 0 L 175 100 L 0 230 Z" />
                  <path d="M 340 0 L 165 100 L 340 230 Z" />
                  <path d="M 0 230 L 0 205 C 15 165, 130 88, 170 88 C 210 88, 325 165, 340 205 L 340 230 Z" />
                </clipPath>
              </defs>

              {/* Pocket Base Wall: Fills the entire lower pocket from y=95 to 230 */}
              <path
                d="M 0 95 L 170 150 L 340 95 L 340 230 L 0 230 Z"
                fill="url(#pocketBaseGrad)"
              />

              {/* Left Side Flap: Starts from (0,0) down to (175, 100) and (0,230) - 100% covers left side of card */}
              <path
                d="M 0 0 L 175 100 L 0 230 Z"
                fill="url(#sideFlapLeftGrad)"
              />

              {/* Right Side Flap: Starts from (340,0) down to (165, 100) and (340,230) - 100% covers right side of card */}
              <path
                d="M 340 0 L 165 100 L 340 230 Z"
                fill="url(#sideFlapRightGrad)"
              />

              {/* Bottom Flap: Gentle upward curve covering up to y=88 with shadow */}
              <path
                d="M 0 230 L 0 205 C 15 165, 130 88, 170 88 C 210 88, 325 165, 340 205 L 340 230 Z"
                fill="url(#bottomFlapGrad)"
                filter="url(#bottomFlapShadow)"
              />

              {/* White Rim Curved Highlight on Bottom Flap */}
              <path
                d="M 12 205 C 35 162, 135 89, 170 89 C 205 89, 305 162, 328 205"
                fill="none"
                stroke="rgba(255, 255, 255, 0.35)"
                strokeWidth="1"
                strokeLinecap="round"
              />

              {/* Subtle Letter Paper Texture ONLY inside Front Pocket Flaps (Soft / Semu) */}
              <g clipPath="url(#pocketFlapsClip)">
                <rect
                  width="340"
                  height="230"
                  fill="url(#letterPaperTexture)"
                  opacity="0.38"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
