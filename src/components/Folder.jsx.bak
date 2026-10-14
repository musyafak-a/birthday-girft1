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

const Folder = ({ color = '#FED904', backColor = '#FDB101', size = 1, items = [], className = '' }) => {
  const maxItems = 10;
  const papers = items && items.length > 0 ? items.slice(0, maxItems) : [null, null, null];
  const paperCount = papers.length;

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState(Array.from({ length: paperCount }, () => ({ x: 0, y: 0 })));

  const folderBackColor = backColor || darkenColor(color, 0.08);
  const paperColors = [
    darkenColor('#ffffff', 0.08),
    darkenColor('#ffffff', 0.06),
    darkenColor('#ffffff', 0.04),
    darkenColor('#ffffff', 0.02),
    '#ffffff',
    darkenColor('#ffffff', 0.05)
  ];

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

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor
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
        'translate(-50%, -75%) rotate(0deg)',
        'translate(-10%, -62%) rotate(8deg)',
        'translate(35%, -48%) rotate(16deg)'
      ];
      return positions[index] || 'translate(-50%, -75%) rotate(0deg)';
    }
    return '';
  };

  return (
    <div style={scaleStyle} className={`transition-transform duration-300 ${className}`}>
      <div
        className={`group relative transition-all duration-300 ease-in-out cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6100] focus-visible:ring-offset-2 ${
          !open ? 'hover:-translate-y-2' : ''
        }`}
        style={{
          ...folderStyle,
          transform: open ? 'translateY(-10px)' : undefined
        }}
        onClick={handleClick}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-label={open ? 'Close folder' : 'Open folder'}
      >
        <div
          className="relative w-[260px] h-[180px] rounded-tl-0 rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] shadow-2xl shadow-amber-950/15"
          style={{ backgroundColor: folderBackColor }}
        >
          {/* Folder Tab */}
          <span
            className="absolute z-0 bottom-[98%] left-0 w-[80px] h-[22px] rounded-tl-[8px] rounded-tr-[8px] rounded-bl-0 rounded-br-0"
            style={{ backgroundColor: folderBackColor }}
          ></span>

          {/* Papers / Polaroid Cards */}
          {papers.map((item, i) => {
            const currentOffset = paperOffsets[i] || { x: 0, y: 0 };
            const transformStyle = open
              ? `${getOpenTransform(i, paperCount)} translate(${currentOffset.x}px, ${currentOffset.y}px)`
              : undefined;

            // Closed stacked heights
            const closedHeight = `${Math.max(65, 88 - i * 4)}%`;

            return (
              <div
                key={i}
                onMouseMove={e => handlePaperMouseMove(e, i)}
                onMouseLeave={e => handlePaperMouseLeave(e, i)}
                className={`absolute z-20 bottom-[8%] left-1/2 transition-all duration-300 ease-out shadow-xl border border-neutral-300/80 overflow-hidden ${
                  !open
                    ? 'w-[200px] transform -translate-x-1/2 translate-y-[8%] group-hover:translate-y-0'
                    : 'w-[200px] h-[245px] hover:scale-110 hover:z-50 hover:shadow-2xl'
                }`}
                style={{
                  ...(!open ? { height: closedHeight } : { transform: transformStyle }),
                  backgroundColor: '#ffffff',
                  borderRadius: '0px'
                }}
              >
                {item || (
                  <div className="w-full h-full flex flex-col justify-center gap-2 p-4 opacity-40">
                    <div className="h-3 bg-slate-400 rounded-full w-3/4"></div>
                    <div className="h-2.5 bg-slate-300 rounded-full w-full"></div>
                    <div className="h-2.5 bg-slate-300 rounded-full w-5/6"></div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Folder Front Flaps */}
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(14deg)_scaleY(0.6)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '8px 16px 16px 16px',
              ...(open && { transform: 'skew(14deg) scaleY(0.6)' })
            }}
          ></div>
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(-14deg)_scaleY(0.6)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '8px 16px 16px 16px',
              ...(open && { transform: 'skew(-14deg) scaleY(0.6)' })
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
