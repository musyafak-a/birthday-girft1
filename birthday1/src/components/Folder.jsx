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
  color = '#F472B6',
  backColor = '#FDF2F8',
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
      <div
        className="group relative transition-all duration-300 ease-in-out cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
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
          className="relative w-[340px] h-[230px] rounded-2xl shadow-2xl shadow-pink-500/20"
          style={{ perspective: '1000px' }}
        >
          {/* 1. Envelope Back Wall (Interior Liner) */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden z-0">
            <svg viewBox="0 0 340 230" className="w-full h-full">
              <defs>
                <linearGradient id="envelopeInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fdf2f4" />
                  <stop offset="50%" stopColor="#fed7e2" />
                  <stop offset="100%" stopColor="#fca5bc" />
                </linearGradient>
              </defs>
              <rect width="340" height="230" rx="16" fill="url(#envelopeInnerGrad)" />
            </svg>
          </div>

          {/* 2. Top Flap (Triangular Lid) with 3D Flip */}
          <div
            className="absolute top-0 left-0 w-[340px] h-[142px] origin-top pointer-events-none"
            style={{
              transformStyle: 'preserve-3d',
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
                    <stop offset="0%" stopColor="#f99cb5" />
                    <stop offset="100%" stopColor="#f57999" />
                  </linearGradient>
                  <linearGradient id="sealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fb7185" />
                    <stop offset="100%" stopColor="#e11d48" />
                  </linearGradient>
                </defs>

                {/* Triangular flap pointing DOWN from (0,0) and (340,0) to center tip */}
                <path
                  d="M 0 0 L 340 0 C 335 10, 192 128, 178 135 C 173 137, 167 137, 162 135 C 148 128, 5 10, 0 0 Z"
                  fill="url(#flapFrontGrad)"
                />

                {/* Delicate edge stroke highlight */}
                <path
                  d="M 4 2 L 165 133 C 168 135, 172 135, 175 133 L 336 2"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.45)"
                  strokeWidth="1.5"
                />

                {/* Heart Wax Seal / Button at the tip */}
                <g transform="translate(170, 118)">
                  <circle r="14" fill="url(#sealGrad)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />
                  <path
                    d="M 0 -4 C -2 -7, -6 -7, -6 -4 C -6 -1, 0 4, 0 5 C 0 4, 6 -1, 6 -4 C 6 -7, 2 -7, 0 -4 Z"
                    fill="#ffffff"
                    transform="scale(1.1) translate(0, -0.5)"
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
                    <stop offset="0%" stopColor="#fdf2f4" />
                    <stop offset="100%" stopColor="#fed7e2" />
                  </linearGradient>
                </defs>

                {/* Inner flap background (points UP when rotated) */}
                <path
                  d="M 0 0 L 340 0 C 335 10, 192 128, 178 135 C 173 137, 167 137, 162 135 C 148 128, 5 10, 0 0 Z"
                  fill="url(#flapInnerGrad)"
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
              ? `translate(-50%, -32px) scale(0.98)`
              : 'translate(-50%, 15px) scale(0.94)';

            const cardHeight = open ? '245px' : isHovered ? '210px' : '160px';

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
                    <div className="h-3 bg-pink-300 rounded-full w-3/4"></div>
                    <div className="h-2.5 bg-pink-200 rounded-full w-full"></div>
                    <div className="h-2.5 bg-pink-200 rounded-full w-5/6"></div>
                  </div>
                )}
              </div>
            );
          })}

          {/* 4. Envelope Front Pocket (Left, Right, Bottom Flaps) (z-30) */}
          {/* Side flaps start directly from (0,0) and (340,0) to completely overlap the top flap and cover the sides */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl z-30">
            <svg viewBox="0 0 340 230" className="w-full h-full">
              <defs>
                <linearGradient id="pocketBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f89cb4" />
                  <stop offset="100%" stopColor="#f5809e" />
                </linearGradient>
                <linearGradient id="sideFlapLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f9a3ba" />
                  <stop offset="100%" stopColor="#f57b9b" />
                </linearGradient>
                <linearGradient id="sideFlapRightGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f798b1" />
                  <stop offset="100%" stopColor="#f47495" />
                </linearGradient>
                <linearGradient id="bottomFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fbaec2" />
                  <stop offset="100%" stopColor="#f5799a" />
                </linearGradient>
                <filter id="bottomFlapShadow" x="-10%" y="-15%" width="120%" height="130%">
                  <feDropShadow dx="0" dy="-3" stdDeviation="4" floodColor="#881337" floodOpacity="0.16" />
                </filter>
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

              {/* White Rim Curved Highlight on Bottom Flap (Matching reference image) */}
              <path
                d="M 12 205 C 35 162, 135 89, 170 89 C 205 89, 305 162, 328 205"
                fill="none"
                stroke="rgba(255, 255, 255, 0.75)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
