import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Folder from './components/Folder';
import FlipCard from './components/FlipCard';
import PaperCrumple from './components/PaperCrumple';
import PatternWaves from './components/PatternWaves';
import FallingPetals from './components/FallingPetals';
import { Camera, X, RotateCw, Sparkles, ChevronDown, Image as ImageIcon, Heart, MessageCircle, Repeat2, Send, Bookmark, MoreHorizontal } from 'lucide-react';

interface CardItem {
  id: string;
  title: string;
  caption: string;
  date: string;
  image: string | null;
  backMessage: string;
  backSignature: string;
  stampText: string;
}

const INITIAL_CARDS: CardItem[] = [
  {
    id: '1',
    title: 'Foto 1: Ucapan Selamat',
    caption: 'Momen Spesial Ulang Tahun 🎉',
    date: '10.10.2026',
    image: null,
    backMessage:
      'Selamat ulang tahun! Semoga di hari yang istimewa ini, setiap doa dan impian terindahmu menjadi kenyataan. Terima kasih telah selalu membawa tawa dan kehangatan bagi semua orang di sekitarmu! ✨🎂',
    backSignature: 'Sahabat Terbaikmu 💌',
    stampText: 'AIR MAIL • 10 OCT'
  },
  {
    id: '2',
    title: 'Foto 2: Kenangan Kita',
    caption: 'Tawa & Cerita Indah 💖',
    date: 'Memori Abadi',
    image: null,
    backMessage:
      'Setiap petualangan, canda tawa, dan cerita yang kita lalui bersama adalah kenangan yang tak ternilai harganya. Mari kita ciptakan lebih banyak cerita seru di tahun-tahun mendatang! 📸💫',
    backSignature: 'Kenangan Manis 💖',
    stampText: 'MEMORIES • 2026'
  },
  {
    id: '3',
    title: 'Foto 3: Harapan & Doa',
    caption: 'Semoga Bahagia Selalu 🌟',
    date: '',
    image: null,
    backMessage:
      'Doa tulus untuk umur barumu: semoga senantiasa dilimpahkan kesehatan yang prima, rezeki yang berkah melimpah, dan ketenangan jiwa dalam setiap langkah perjalanan hidupmu! :)',
    backSignature: '',
    stampText: 'BEST WISHES 🕊️'
  },
  {
    id: '4',
    title: 'Foto 4: Soundtrack Bahagia',
    caption: 'Melodi Perayaan Spesial 🎵',
    date: 'Playlist 2026',
    image: null,
    backMessage:
      'Hidup adalah simfoni yang indah. Biarkan lagu-lagu keceriaan selalu berputar menemani hari-harimu. Jangan pernah berhenti berdansa dan menikmati melodi kebahagiaan! 🎧🎶',
    backSignature: 'Putar Musik Favoritmu 🎵',
    stampText: 'SOUNDTRACK 🎵'
  },
  {
    id: '5',
    title: 'Foto 5: Hadiah Spesial',
    caption: 'Kejutan Manis Buatmu 🎁',
    date: 'Hari Bahagia',
    image: null,
    backMessage:
      'Hadiah terbesar adalah kehangatan orang-orang tersayang. Namun sebuah kejutan manis telah dipersiapkan spesial untuk merayakan senyum manismu hari ini! Buka dan nikmati! 🎉🎁',
    backSignature: 'Kado Rahasia 🎁',
    stampText: 'SPECIAL GIFT 🎁'
  }
];

export function App() {
  const [cards, setCards] = useState<CardItem[]>(INITIAL_CARDS);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [paperImage, setPaperImage] = useState<string>('/birthday-letter.jpg');
  const paperFileInputRef = useRef<HTMLInputElement>(null);
  const popupFileInputRef = useRef<HTMLInputElement>(null);

  const selectedCard = cards.find(c => c.id === selectedCardId) || null;

  const [paperResetKey, setPaperResetKey] = useState(0);
  const [ornamentPhotos, setOrnamentPhotos] = useState<string[]>([
    '/ornament-photo-1.png',
    '/ornament-photo-2.png',
    '/ornament-photo-3.png'
  ]);
  const ornamentFileInputRef0 = useRef<HTMLInputElement>(null);
  const ornamentFileInputRef1 = useRef<HTMLInputElement>(null);
  const ornamentFileInputRef2 = useRef<HTMLInputElement>(null);

  // Instagram Card State
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // Handle upload foto untuk kartu tertentu
  const handlePhotoUpload = (id: string, file: File) => {
    const url = URL.createObjectURL(file);
    setCards(prev =>
      prev.map(c => (c.id === id ? { ...c, image: url } : c))
    );
  };

  // Handle upload foto untuk ornamen polaroid di samping surat
  const handleOrnamentPhotoUpload = (index: number, file: File) => {
    const url = URL.createObjectURL(file);
    setOrnamentPhotos(prev => {
      const copy = [...prev];
      copy[index] = url;
      return copy;
    });
  };

  // Handle upload gambar untuk PaperCrumple
  const handlePaperImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setPaperImage(url);
  };

  // Section 1: Beach Halftone Waves Configuration
  const wavePreset = 'ocean';
  const wavePattern = 'heart';
  const halftoneStyle = 'overlay';
  const waveSpeed = 0.08; // Animasi gerak lambat
  const fullCoverage = true; // Menutupi 1 gambar full
  const halftoneSize = 'large'; // Ukuran love default

  const getSpacing = (size: 'standard' | 'large' | 'xl') => {
    switch (size) {
      case 'standard':
        return 12; // Ukuran standar sebelumnya
      case 'xl':
        return 24; // Ukuran ekstra besar
      case 'large':
      default:
        return 17; // Sedikit lebih besar (default baru)
    }
  };

  const getHalftoneConfig = (style: 'overlay' | 'pink' | 'cyan' | 'gold' | 'soft') => {
    switch (style) {
      case 'pink':
        return {
          blendMode: 'screen' as React.CSSProperties['mixBlendMode'],
          color: '#ffd6e7',
          label: 'Pink Love'
        };
      case 'cyan':
        return {
          blendMode: 'screen' as React.CSSProperties['mixBlendMode'],
          color: '#38bdf8',
          label: 'Tropical Cyan'
        };
      case 'gold':
        return {
          blendMode: 'overlay' as React.CSSProperties['mixBlendMode'],
          color: '#fef08a',
          label: 'Golden Sand'
        };
      case 'soft':
        return {
          blendMode: 'soft-light' as React.CSSProperties['mixBlendMode'],
          color: '#ffffff',
          label: 'Soft Light'
        };
      case 'overlay':
      default:
        return {
          blendMode: 'overlay' as React.CSSProperties['mixBlendMode'],
          color: '#ffffff',
          label: 'Shimmer Overlay'
        };
    }
  };

  const halftoneConfig = getHalftoneConfig(halftoneStyle);

  // Keyboard shortcut ESC to close popup
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCardId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#F2F2F2] pb-24 selection:bg-[#FF6100]/20 selection:text-[#2F2F2F] relative overflow-x-hidden w-full">
      {/* Kelopak Bunga Jatuh Melayang Looping 1 Halaman Penuh */}
      <FallingPetals />
      {/* ========================================================
          SECTION 1: HERO BEACH + INTERACTIVE HALFTONE (PATTERNWAVES) + INSTAGRAM POST CARD
          ======================================================== */}
      <section className="relative w-full min-h-[660px] md:min-h-[740px] flex items-center justify-center overflow-hidden select-none mb-14 py-10">
        {/* Layer 1: Beach Background Image (beach.jpe) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src="/tropical-beach.jpg"
            alt="Beach Background"
            className="w-full h-full object-cover object-center transform scale-105"
          />
        </div>

        {/* Layer 2: Interactive Halftone Waves (React Bits PatternWaves - Full Coverage, Lambat, Tidak Monokrom) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-auto transition-all duration-500"
          style={{ mixBlendMode: halftoneConfig.blendMode }}
        >
          <PatternWaves
            preset={wavePreset}
            pattern={wavePattern}
            spacing={getSpacing(halftoneSize)}
            markSize={0.95}
            minMarkRatio={fullCoverage ? 0.42 : 0.04}
            depth={0.35}
            shine={1.1}
            contrast={1.1}
            speed={waveSpeed}
            scale={1.6}
            color={halftoneConfig.color}
            pinkColor="#ff2a85"
            backgroundColor="rgba(0, 0, 0, 0)"
            interactive={true}
            cursorSize={95}
            cursorStrength={0.8}
            fade="none"
            className="w-full h-full"
          />
        </div>

        {/* Layer 3: Soft subtle ambient lighting */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-transparent z-[5]" />

        {/* Layer 4: Bottom Fade Out Gradient into page background #F2F2F2 */}
        <div className="absolute inset-x-0 bottom-0 h-48 md:h-64 bg-gradient-to-t from-[#F2F2F2] via-[#F2F2F2]/85 via-40% to-transparent pointer-events-none z-10" />

        {/* Layer 5: Instagram Post Card with 3D Popout Effect & Floating Typography */}
        <div className="relative z-20 flex items-center justify-center w-full px-4 pointer-events-auto">
          {/* Card & Floating Typography Wrapper */}
          <div className="relative flex items-center justify-center">
            {/* Top Left: Happy */}
            <div className="absolute -top-16 sm:-top-20 md:-top-24 -left-12 sm:-left-36 md:-left-56 lg:-left-64 z-30 pointer-events-none select-none rotate-[-8deg] flex items-baseline">
              <span
                className="font-my-soul text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none inline-block relative z-10"
                style={{
                  color: '#FDB101',
                  WebkitTextStroke: '3px #F45535',
                  paintOrder: 'stroke fill',
                }}
              >
                H
              </span>
              <span
                className="font-public-sans font-black tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl -ml-2 sm:-ml-3 leading-none inline-block relative z-0"
                style={{
                  color: '#FED904',
                  WebkitTextStroke: '2.5px #FC5236',
                  paintOrder: 'stroke fill',
                }}
              >
                appy
              </span>
            </div>

            {/* Top Right: Birthday!! */}
            <div className="absolute -top-12 sm:-top-16 md:-top-20 -right-12 sm:-right-36 md:-right-56 lg:-right-64 z-30 pointer-events-none select-none rotate-[6deg] flex items-baseline">
              <span
                className="font-my-soul text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none inline-block relative z-10"
                style={{
                  color: '#FDB101',
                  WebkitTextStroke: '3px #F45535',
                  paintOrder: 'stroke fill',
                }}
              >
                B
              </span>
              <span
                className="font-public-sans font-black tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl -ml-2 sm:-ml-3 leading-none inline-block relative z-0"
                style={{
                  color: '#FED904',
                  WebkitTextStroke: '2.5px #FC5236',
                  paintOrder: 'stroke fill',
                }}
              >
                irthday!!
              </span>
            </div>

            {/* Bottom Left: Jude */}
            <div className="absolute -bottom-8 sm:-bottom-12 -left-8 sm:-left-24 md:-left-36 z-30 pointer-events-none select-none rotate-[-6deg] flex items-baseline">
              <span
                className="font-my-soul text-7xl sm:text-8xl md:text-9xl leading-none inline-block relative z-10"
                style={{
                  color: '#DD8ED4',
                  WebkitTextStroke: '3px #B02EAE',
                  paintOrder: 'stroke fill',
                }}
              >
                J
              </span>
              <span
                className="font-public-sans font-black tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl -ml-2 sm:-ml-3 leading-none inline-block relative z-0"
                style={{
                  color: '#FECCF4',
                  WebkitTextStroke: '2.5px #FC36A3',
                  paintOrder: 'stroke fill',
                }}
              >
                ude
              </span>
            </div>

            {/* Bottom Right: 29 y.o */}
            <div className="absolute -bottom-8 sm:-bottom-12 -right-8 sm:-right-24 md:-right-36 z-30 pointer-events-none select-none rotate-[8deg] flex items-baseline">
              <span
                className="font-public-sans font-black tracking-tight text-5xl sm:text-6xl md:text-7xl leading-none inline-block relative z-0"
                style={{
                  color: '#FECCF4',
                  WebkitTextStroke: '3px #FC36A3',
                  paintOrder: 'stroke fill',
                }}
              >
                29
              </span>
              <span
                className="font-my-soul text-5xl sm:text-6xl md:text-7xl leading-none inline-block -ml-4 sm:-ml-5 relative z-10"
                style={{
                  color: '#DD8ED4',
                  WebkitTextStroke: '2.5px #B02EAE',
                  paintOrder: 'stroke fill',
                }}
              >
                y.o
              </span>
            </div>

            {/* The Instagram Post Card */}
            <div
              className="relative w-[310px] sm:w-[350px] bg-white rounded-[2px] shadow-[0_20px_60px_rgba(0,0,0,0.22)] p-3 sm:p-3.5 transition-all duration-300 hover:rotate-0 hover:scale-[1.02]"
              style={{ transform: 'rotate(-3.5deg)' }}
            >
            {/* Header: Avatar, Username, More */}
            <div className="flex items-center justify-between pb-2.5 px-0.5">
              <div className="flex items-center gap-2">
                {/* Avatar Circle */}
                <div className="w-7 h-7 rounded-full bg-neutral-300 flex-shrink-0" />
                {/* Username */}
                <span className="text-xs font-semibold text-neutral-800 tracking-tight">
                  username_
                </span>
              </div>
              {/* More button */}
              <button
                type="button"
                className="text-neutral-700 hover:text-black p-0.5 transition-colors focus:outline-none"
                title="More options"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Photo Frame Container (Tanpa stroke / border) */}
            <div className="relative w-full h-[295px] sm:h-[320px] rounded-[2px] bg-neutral-100 overflow-visible">
              {/* 1. Base Photo (Frame 2.png) - Clipped strictly inside frame */}
              <div className="absolute inset-0 overflow-hidden rounded-[2px]">
                <img
                  src="/Frame 2.png"
                  alt="Base Photo"
                  className="w-full absolute left-0 top-[-92px] object-cover pointer-events-none select-none"
                />
              </div>

              {/* 2. Popout Subject (Frame 2s.png) - Top side pops out, left and right sides cropped to frame */}
              <div
                className="absolute inset-0 pointer-events-none select-none z-10"
                style={{ clipPath: 'inset(-180px 0 0 0)' }}
              >
                <img
                  src="/Frame 2s.png"
                  alt="Popout Subject"
                  className="w-full absolute left-0 top-[-92px] object-cover pointer-events-none select-none"
                />
              </div>
            </div>

            {/* Action Buttons: Liked, Comment, Repost, Share, Bookmark */}
            <div className="flex items-center justify-between pt-2.5 pb-1 px-0.5">
              <div className="flex items-center gap-3 text-neutral-800">
                {/* Liked */}
                <button
                  type="button"
                  onClick={() => setIsLiked(prev => !prev)}
                  className="transition-transform active:scale-125 focus:outline-none"
                  title="Like"
                >
                  <Heart
                    className={`w-[19px] h-[19px] transition-colors ${
                      isLiked ? 'fill-red-500 text-red-500' : 'text-neutral-800 hover:text-neutral-600'
                    }`}
                  />
                </button>

                {/* Comment */}
                <button
                  type="button"
                  className="hover:text-neutral-600 transition-colors focus:outline-none"
                  title="Comment"
                >
                  <MessageCircle className="w-[19px] h-[19px]" />
                </button>

                {/* Repost */}
                <button
                  type="button"
                  className="hover:text-neutral-600 transition-colors focus:outline-none"
                  title="Repost"
                >
                  <Repeat2 className="w-[19px] h-[19px]" />
                </button>

                {/* Share */}
                <button
                  type="button"
                  className="hover:text-neutral-600 transition-colors focus:outline-none"
                  title="Share"
                >
                  <Send className="w-[19px] h-[19px]" />
                </button>
              </div>

              {/* Bookmark */}
              <button
                type="button"
                onClick={() => setIsBookmarked(prev => !prev)}
                className="hover:text-neutral-600 transition-colors focus:outline-none"
                title="Save"
              >
                <Bookmark
                  className={`w-[19px] h-[19px] transition-colors ${
                    isBookmarked ? 'fill-neutral-900 text-neutral-900' : 'text-neutral-800'
                  }`}
                />
              </button>
            </div>

            {/* Caption & Verified Badge */}
            <div className="px-0.5 pt-0.5 text-left">
              <p className="text-[11px] sm:text-xs text-neutral-800 leading-snug">
                <span className="font-semibold text-neutral-900 mr-1">username_</span>
                {/* Official Instagram Verified Badge */}
                <svg
                  className="w-3 h-3 text-[#0095F6] inline-block mr-1.5 align-middle"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M19.998 3.333c1.373 0 2.68.567 3.633 1.554l1.45 1.503c.576.597 1.345.98 2.181 1.071l2.08.228c1.365.15 2.584.887 3.313 1.999.728 1.113.882 2.479.418 3.714l-.707 1.882c-.285.759-.285 1.597 0 2.356l.707 1.882c.464 1.235.31 2.601-.418 3.714-.729 1.112-1.948 1.849-3.313 1.999l-2.08.228c-.836.091-1.605.474-2.181 1.071l-1.45 1.503c-.953.987-2.26 1.554-3.633 1.554s-2.68-.567-3.633-1.554l-1.45-1.503c-.576-.597-1.345-.98-2.181-1.071l-2.08-.228c-1.365-.15-2.584-.887-3.313-1.999-.728-1.113-.882-2.479-.418-3.714l.707-1.882c.285-.759.285-1.597 0-2.356l-.707-1.882c-.464-1.235-.31-2.601.418-3.714.729-1.112 1.948-1.849 3.313-1.999l2.08-.228c.836-.091 1.605-.474 2.181-1.071l1.45-1.503c.953-.987 2.26-1.554 3.633-1.554z"
                    fill="#0095F6"
                  />
                  <path
                    d="M17.5 24.5l-5-5 1.77-1.77 3.23 3.23 7.73-7.73 1.77 1.77-9.5 9.5z"
                    fill="#FFFFFF"
                  />
                </svg>
                <span className="text-neutral-700">lorem ipsum dolor sit amet</span>
              </p>
            </div>
          </div>

          {/* Draggable Bouquet (Buket Bunga Satunya - bouquet2.png) */}
          <motion.div
            drag
            dragMomentum={false}
            whileHover={{ scale: 1.05 }}
            whileDrag={{ scale: 1.12, cursor: 'grabbing' }}
            className="absolute -bottom-10 -right-6 sm:-bottom-14 sm:-right-10 z-40 cursor-grab active:cursor-grabbing select-none touch-none"
            title="Buket Bunga 💐 (Tahan & seret kursor untuk memindahkan)"
          >
            <img
              src="/bouquet2.png"
              alt="Buket Bunga"
              className="w-48 sm:w-56 md:w-64 h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] pointer-events-none select-none transform rotate-[-6deg]"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>

      {/* ========================================================
          SECTION 2: PAPER CRUMPLE + ORNAMEN POLAROID, BUKET, & KELOPAK
          ======================================================== */}
      <section className="w-full flex flex-col items-center mb-20 relative overflow-hidden px-2 md:px-6">
        <div className="text-center mb-4 px-4 z-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6100] bg-[#FF6100]/10 px-3.5 py-1 rounded-full border border-[#FF6100]/20">
            Section 2 • Interactive Paper & Ornaments
          </span>
          <h2 className="text-[#2F2F2F] text-2xl font-bold mt-2.5">
            Surat Ucapan Interaktif 💌
          </h2>
          <p className="text-xs md:text-sm text-[#FF6100] font-medium mt-1">
            Surat diputar ke kanan dengan ornamen polaroid foto, buket bunga, dan kelopak bunga bertaburan!
          </p>
        </div>

        {/* Hidden inputs untuk upload foto ornamen */}
        <input
          ref={paperFileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) handlePaperImageUpload(file);
          }}
        />
        <input
          ref={ornamentFileInputRef0}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) handleOrnamentPhotoUpload(0, file);
          }}
        />
        <input
          ref={ornamentFileInputRef1}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) handleOrnamentPhotoUpload(1, file);
          }}
        />
        <input
          ref={ornamentFileInputRef2}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) handleOrnamentPhotoUpload(2, file);
          }}
        />

        {/* CONTAINER PANGGUNG INTERAKTIF DENGAN ORNAMEN LENGKAP */}
        <div className="relative w-full max-w-5xl min-h-[620px] flex items-center justify-center my-2">

          {/* 2. SURAT 3D PAPER CRUMPLE (ROTATE KE KANAN CLOCKWISE) */}
          <div className="w-full flex justify-center items-center relative z-0">
            <PaperCrumple
              src={paperImage}
              alt="Surat Ucapan Ulang Tahun"
              width={310}
              height={470}
              sceneHeight={600}
              rotation={-3.5} /* Rotate ke kanan clockwise */
              releaseBehavior="restore"
              crumpleAmount={0.85}
              crumpleDuration={0.55}
              releaseDuration={0.4}
              foldCount={7}
              foldSharpness={0.65}
              wrinkleDepth={0.7}
              paperColor="#fdfbf7"
              shadow={true}
              shadowOpacity={0.12}
              draggable={true}
              dragRadius={3000}
              returnToOrigin={false}
              resetKey={paperResetKey}
              className="w-full"
            />
          </div>

          {/* 3. ORNAMEN BUKET BUNGA (DI SUDUT KIRI BAWAH SURAT - DRAGGABLE & SCALE BESAR) */}
          <motion.div
            drag
            dragMomentum={false}
            whileHover={{ scale: 1.05 }}
            whileDrag={{ scale: 1.12, cursor: 'grabbing' }}
            className="absolute left-2 md:left-8 bottom-4 md:bottom-8 z-30 cursor-grab active:cursor-grabbing select-none touch-none"
            title="Buket Bunga 💐 (Tahan & seret kursor untuk memindahkan)"
          >
            <img
              src="/bouquet.png"
              alt="Buket Bunga"
              className="w-48 sm:w-56 md:w-64 h-auto drop-shadow-2xl pointer-events-none select-none"
              draggable={false}
            />
          </motion.div>

          {/* 4. ORNAMEN POLAROID FOTO (DI SISI KANAN SURAT BERTINGKAT ROTASI) */}
          <div className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 z-20 pointer-events-auto scale-90 sm:scale-100 origin-right">
            {/* Polaroid 1 (Atas: Border Ungu / Lilac seperti referensi) */}
            <div
              onClick={() => ornamentFileInputRef0.current?.click()}
              className="group/p1 relative bg-white p-2 pb-3.5 shadow-xl border-2 border-purple-500 rounded-sm transform rotate-6 hover:rotate-0 hover:scale-110 hover:z-30 transition-all duration-300 cursor-pointer w-28 md:w-32"
              title="Klik untuk ganti foto polaroid 1"
            >
              <div className="w-full aspect-[4/3] bg-neutral-900 overflow-hidden relative">
                <img
                  src={ornamentPhotos[0]}
                  alt="Polaroid 1"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/p1:opacity-100 flex items-center justify-center transition-opacity text-white text-[9px] font-semibold">
                  <Camera className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-1 text-center">
                <span className="text-[8px] font-bold text-neutral-600 tracking-tight">Memories 💜</span>
              </div>
            </div>

            {/* Polaroid 2 (Tengah: Miring ke kiri) */}
            <div
              onClick={() => ornamentFileInputRef1.current?.click()}
              className="group/p2 relative bg-white p-2 pb-3.5 shadow-xl border border-neutral-300 rounded-sm transform -rotate-4 hover:rotate-0 hover:scale-110 hover:z-30 transition-all duration-300 cursor-pointer w-28 md:w-32"
              title="Klik untuk ganti foto polaroid 2"
            >
              <div className="w-full aspect-[4/3] bg-neutral-900 overflow-hidden relative">
                <img
                  src={ornamentPhotos[1]}
                  alt="Polaroid 2"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/p2:opacity-100 flex items-center justify-center transition-opacity text-white text-[9px] font-semibold">
                  <Camera className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-1 text-center">
                <span className="text-[8px] font-bold text-neutral-600 tracking-tight">Sweet Moments ✨</span>
              </div>
            </div>

            {/* Polaroid 3 (Bawah: Miring ke kanan dengan ornamen hati) */}
            <div
              onClick={() => ornamentFileInputRef2.current?.click()}
              className="group/p3 relative bg-white p-2 pb-3.5 shadow-xl border border-neutral-300 rounded-sm transform rotate-4 hover:rotate-0 hover:scale-110 hover:z-30 transition-all duration-300 cursor-pointer w-28 md:w-32"
              title="Klik untuk ganti foto polaroid 3"
            >
              <div className="w-full aspect-[4/3] bg-neutral-900 overflow-hidden relative">
                <img
                  src={ornamentPhotos[2]}
                  alt="Polaroid 3"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/p3:opacity-100 flex items-center justify-center transition-opacity text-white text-[9px] font-semibold">
                  <Camera className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-1 flex items-center justify-center gap-1">
                <span className="text-[8px] font-bold text-neutral-600 tracking-tight">Forever & Ever</span>
                <span className="text-[9px] text-[#FF6100]">💖</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons & Petunjuk Section 1 */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 px-4 text-center z-10">
          <button
            onClick={() => paperFileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#2F2F2F] bg-white border border-neutral-300 hover:border-[#FF6100] hover:text-[#FF6100] shadow-sm transition-all"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Ganti Gambar Surat</span>
          </button>

          <button
            onClick={() => setPaperResetKey(k => k + 1)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#2F2F2F] bg-white border border-neutral-300 hover:border-[#FF6100] hover:text-[#FF6100] shadow-sm transition-all"
            title="Kembalikan posisi kertas ke tengah"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Reset Posisi Tengah</span>
          </button>

          <span className="text-xs text-[#2F2F2F]/60">
            • Tahan & seret buket bunga • Klik kartu polaroid untuk ganti foto • Tahan kertas untuk remas 3D
          </span>
        </div>

        {/* Petunjuk Scroll ke Section Folder */}
        <div className="flex flex-col items-center gap-1 mt-10 text-[#FF6100] z-10">
          <span className="text-xs font-semibold tracking-wide">
            Scroll ke bawah untuk melihat Section Folder 📂
          </span>
          <div className="animate-bounce mt-1">
            <ChevronDown className="w-4 h-4 text-[#FF6100]" />
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: FOLDER & POLAROID PHOTO CARDS (DI BAWAH PAPER)
          ======================================================== */}
      <section className="w-full max-w-4xl flex flex-col items-center pt-10 relative border-t border-neutral-300/80">
        <div className="text-center mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF6100] bg-[#FF6100]/10 px-3.5 py-1 rounded-full border border-[#FF6100]/20">
            Section 3 • Memory Folder
          </span>
          <h2 className="text-[#2F2F2F] text-2xl font-bold mt-2.5">
            Folder Foto Polaroid 📸
          </h2>
          <p className="text-xs md:text-sm text-[#FF6100] font-medium mt-1">
            Klik folder kuning untuk membuka koleksi foto dan flip kartu ucapan 3D!
          </p>
        </div>

        {/* Komponen Folder React Bits */}
        <div className="flex justify-center items-center w-full mt-36 md:mt-40 mb-10 py-4 min-h-[380px] overflow-visible">
          <Folder
            color="#FED904"
            backColor="#FDB101"
            size={1.05}
            items={cards.map(card => {
              const cardFileInputRef = React.createRef<HTMLInputElement>();

              const handleCardClick = (e: React.MouseEvent) => {
                e.stopPropagation();
                setSelectedCardId(card.id);
              };

              const handleCardFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) {
                  handlePhotoUpload(card.id, file);
                }
              };

              return (
                <div
                  key={card.id}
                  onClick={handleCardClick}
                  className="w-full h-full bg-white p-2.5 pb-4 flex flex-col justify-between select-none shadow-md border border-neutral-300 rounded-none relative group/item cursor-pointer"
                  title="Klik untuk membuka secara besar & flip kartu 3D"
                >
                  <input
                    ref={cardFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCardFileChange}
                  />

                  {/* Area Hitam Tengah untuk Foto Custom (Border Radius Lancip) */}
                  <div
                    className="relative w-full aspect-square bg-[#151a21] border border-black/30 rounded-none overflow-hidden flex flex-col items-center justify-center transition-all group-hover/item:brightness-105"
                  >
                    {card.image ? (
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover rounded-none"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-2 text-center text-slate-400">
                        <div className="p-2 rounded-none bg-white/5 border border-white/10 mb-1.5 group-hover/item:border-white/30 group-hover/item:scale-105 transition-all">
                          <Camera className="w-5 h-5 text-slate-400 group-hover/item:text-white" />
                        </div>
                        <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 group-hover/item:text-slate-200">
                          Foto Custom
                        </span>
                        <span className="text-[8px] text-slate-500 group-hover/item:text-slate-400 mt-0.5">
                          Klik untuk perbesar & flip
                        </span>
                      </div>
                    )}

                    {/* Badge Buka & Flip */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/item:opacity-100 flex flex-col items-center justify-center transition-opacity text-white text-[10px] font-medium p-2 text-center">
                      <Sparkles className="w-4 h-4 mb-1 text-amber-300" />
                      <span>Lihat Full & Flip 3D</span>
                    </div>
                  </div>

                  {/* Bagian Bawah Polaroid (Chin/Caption) */}
                  <div className="pt-2 px-1 flex flex-col items-center text-center">
                    <h4 className="text-[11px] font-bold text-[#2F2F2F] tracking-tight leading-tight truncate w-full">
                      {card.title}
                    </h4>
                    <p className="text-[9px] font-medium text-[#FF6100] line-clamp-1 mt-0.5">
                      {card.caption}
                    </p>
                    <span className="text-[8px] font-mono text-[#2F2F2F]/60 mt-1">
                      {card.date}
                    </span>
                  </div>
                </div>
              );
            })}
          />
        </div>

        <div className="text-center space-y-2 mt-4">
          <p className="text-xs font-medium text-[#FF6100]">
            💡 Tips: Klik kartu polaroid mana saja untuk melihatnya dalam ukuran besar dan membaliknya dalam efek 3D Flip Card!
          </p>
          <div className="font-mono text-xs text-[#2F2F2F]/70">
            (Press <kbd className="px-1.5 py-0.5 bg-neutral-200 border border-neutral-300 rounded text-[#2F2F2F] font-semibold">d</kbd> to toggle dark mode)
          </div>
        </div>
      </section>

      {/* MODAL POPUP: FULL VIEW + REACT BITS 3D FLIP CARD */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 transition-all animate-in fade-in duration-200"
          onClick={() => setSelectedCardId(null)}
        >
          {/* Container Modal */}
          <div
            className="relative flex flex-col items-center max-w-lg w-full"
            onClick={e => e.stopPropagation()}
          >
            {/* Tombol Tutup */}
            <button
              onClick={() => setSelectedCardId(null)}
              className="absolute -top-12 right-0 md:-right-10 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors focus:outline-none"
              title="Tutup (ESC)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Input File Tersembunyi untuk Popup */}
            <input
              ref={popupFileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file && selectedCard) {
                  handlePhotoUpload(selectedCard.id, file);
                }
              }}
            />

            {/* KOMPONEN REACT BITS FLIPCARD (POLAROID EDITION) */}
            <FlipCard
              width={330}
              height={430}
              radius={0} // Sharp/lancip!
              background="#ffffff"
              color="#2F2F2F"
              axis="y"
              flipOnClick={true}
              draggable={true}
              dragDistance={0}
              tilt={true}
              tiltMax={14}
              glare={true}
              glareOpacity={0.2}
              hoverScale={1.02}
              perspective={1100}
              stiffness={180}
              damping={22}
              shadow={true}
              shadowColor="#000000"
              shadowOpacity={0.5}
              // SISI DEPAN: FOTO POLAROID PENUH
              front={
                <div className="w-full h-full bg-white p-3.5 pb-6 flex flex-col justify-between select-none rounded-none border border-neutral-300 relative">
                  {/* Area Hitam Foto Polaroid */}
                  <div
                    onClick={e => {
                      e.stopPropagation();
                      popupFileInputRef.current?.click();
                    }}
                    className="relative w-full aspect-square bg-[#151a21] border border-black/40 rounded-none overflow-hidden flex flex-col items-center justify-center cursor-pointer group/innerphoto transition-all"
                    title="Klik untuk memilih foto custom"
                  >
                    {selectedCard.image ? (
                      <>
                        <img
                          src={selectedCard.image}
                          alt={selectedCard.title}
                          className="w-full h-full object-cover rounded-none"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-innerphoto:opacity-100 group-hover/innerphoto:opacity-100 flex flex-col items-center justify-center transition-opacity text-white">
                          <Camera className="w-6 h-6 mb-1 text-white" />
                          <span className="text-xs font-semibold">Ganti Foto 📷</span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center text-slate-400">
                        <div className="p-3 bg-white/10 rounded-none border border-white/20 mb-2 group-hover/innerphoto:scale-110 transition-transform">
                          <Camera className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                          Area Foto Custom
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1">
                          Klik di sini untuk upload foto 🖼️
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Dagu (Chin) Polaroid Depan */}
                  <div className="pt-3 px-1 flex flex-col items-center text-center">
                    <h3 className="text-sm font-bold text-[#2F2F2F] tracking-tight">
                      {selectedCard.title}
                    </h3>
                    <p className="text-xs font-medium text-[#FF6100] mt-0.5">
                      {selectedCard.caption}
                    </p>
                    <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#2F2F2F]/60 border-t border-neutral-200/80 pt-2 mt-2">
                      <span>{selectedCard.date}</span>
                      <span className="text-[#FF6100] font-semibold flex items-center gap-1">
                        <RotateCw className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              }
              // SISI BELAKANG: PESAN SURAT POLAROID (PUTIH BERSIH, TANPA GARIS BIRU / WARNA BACKGROUND)
              back={
                <div className="w-full h-full bg-white p-6 flex flex-col justify-between select-none rounded-none border border-neutral-300 relative text-[#2F2F2F]">
                  {/* Bagian Tengah: Pesan Tulisan Ucapan */}
                  <div className="my-auto py-4 text-left">
                    <p
                      style={{ fontFamily: "'Caveat', cursive" }}
                      className="text-2xl md:text-[27px] font-semibold text-[#2F2F2F] leading-relaxed tracking-wide px-1"
                    >
                      "{selectedCard.backMessage}"
                    </p>
                  </div>

                  {/* Bagian Bawah: Tanda Tangan & Tombol Balik */}
                  <div className="border-t border-neutral-200 pt-3 flex items-center justify-between">
                    <div className="text-left">
                      {selectedCard.backSignature && (
                        <span
                          style={{ fontFamily: "'Caveat', cursive" }}
                          className="text-xl font-bold text-[#2F2F2F] tracking-wide"
                        >
                          {selectedCard.backSignature}
                        </span>
                      )}
                    </div>

                    <div className="text-right">
                      <span
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                        className="text-[10px] font-medium text-[#FF6100] flex items-center gap-1"
                      >
                        <RotateCw className="w-3 h-3 text-[#FF6100]" />
                      </span>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;