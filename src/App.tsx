import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Folder from './components/Folder';
import FlipCard from './components/FlipCard';
import PaperCrumple from './components/PaperCrumple';
import FallingPetals from './components/FallingPetals';
import AutoConfetti from './components/AutoConfetti';
import {
  Camera,
  X,
  RotateCw,
  Sparkles,
  ChevronDown,
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  Bookmark,
  MoreHorizontal
} from 'lucide-react';
import { LetterCanvas } from './components/LetterCanvas';

const USERNAME = 'watasiwadisa_';

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
    image: '/fotosurat1.jpeg',
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
    image: '/fotosurat2.jpeg',
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
    image: '/fotosurat3.jpeg',
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
    image: '/fotosurat4.jpeg',
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
    image: '/fotosurat5.jpeg',
    backMessage:
      'Hadiah terbesar adalah kehangatan orang-orang tersayang. Namun sebuah kejutan manis telah dipersiapkan spesial untuk merayakan senyum manismu hari ini! Buka dan nikmati! 🎉🎁',
    backSignature: 'Kado Rahasia 🎁',
    stampText: 'SPECIAL GIFT 🎁'
  }
];

// =========================================================================
// 💌 KUSTOMISASI ISI SURAT (Ubah isi tulisan surat langsung di sini)
// =========================================================================
export const CUSTOM_LETTER = {
  /** Inisial monogram di bawah buket bunga (kosongkan '' jika tidak ingin) */
  monogram: 'S & E',
  /** Judul utama dengan kaligrafi warna emas */
  title: 'Happy Birthday',
  /** Sapaan pembuka / nama penerima */
  recipient: 'My Dearest Dian,',
  /** Isi pesan surat ucapan */
  message:
    'Di hari spesialmu ini, tarik napas dulu sebentar ya. Semoga di usia baru ini, semua usahamu terbayar lunas dengan nilai ujian yang memuaskan, rezeki lancar sampai tiap minggu bisa ndaki gunung baru.\nAku tahu belakangan ini kamu lagi struggle banget hadapin musim ujian dan deretan angka yang nggak ada habisnya. Tapi lihat kamu tetap bertahan dan berusaha keras sampai detik ini bikin aku bangga luar bias.',
  /** Kalimat penutup sebelum tanda tangan */
  closing: 'With love,',
  /** Nama pengirim / tanda tangan */
  signature: 'your man',
  /** Teks cap pos di sudut kanan bawah */
  stamp: 'AIR MAIL • 10 OCT',
  /** Tampilkan ornamen pembatas ranting daun emas di antara paragraf */
  showDivider: true,
  /** Skala ukuran font (1.0 = normal, 1.1 = besar, 1.2 = ekstra besar) */
  fontScale: 1.1
};

// Konfigurasi 3 polaroid ornamen di samping surat
const ORNAMENT_CONFIGS = [
  {
    label: 'Memories 💜',
    rotation: 'rotate-6',
    borderClass: 'border-2 border-purple-500',
    objectPosition: 'object-center'
  },
  {
    label: 'Sweet Moments ✨',
    rotation: '-rotate-4',
    borderClass: 'border border-neutral-300',
    objectPosition: 'object-[center_15%]'
  },
  {
    label: 'Forever & Ever 💖',
    rotation: 'rotate-4',
    borderClass: 'border border-neutral-300',
    objectPosition: 'object-[center_30%]'
  }
];

// Reusable Official Instagram Verified Badge
function VerifiedBadge({ className = 'w-3 h-3 text-[#0095F6] inline-block mr-1.5 align-middle' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none">
      <path
        d="M19.998 3.333c1.373 0 2.68.567 3.633 1.554l1.45 1.503c.576.597 1.345.98 2.181 1.071l2.08.228c1.365.15 2.584.887 3.313 1.999.728 1.113.882 2.479.418 3.714l-.707 1.882c-.285.759-.285 1.597 0 2.356l.707 1.882c.464 1.235.31 2.601-.418 3.714-.729 1.112-1.948 1.849-3.313 1.999l-2.08.228c-.836.091-1.605.474-2.181 1.071l-1.45 1.503c-.953.987-2.26 1.554-3.633 1.554s-2.68-.567-3.633-1.554l-1.45-1.503c-.576-.597-1.345-.98-2.181-1.071l-2.08-.228c-1.365-.15-2.584-.887-3.313-1.999-.728-1.113-.882-2.479-.418-3.714l.707-1.882c.285-.759.285-1.597 0-2.356l-.707-1.882c-.464-1.235-.31-2.601.418-3.714.729-1.112 1.948-1.849 3.313-1.999l2.08-.228c.836-.091 1.605-.474 2.181-1.071l1.45-1.503c.953-.987 2.26-1.554 3.633-1.554z"
        fill="#0095F6"
      />
      <path d="M17.5 24.5l-5-5 1.77-1.77 3.23 3.23 7.73-7.73 1.77 1.77-9.5 9.5z" fill="#FFFFFF" />
    </svg>
  );
}

// Reusable Section Heading with Torn Paper Scrap Background
function SectionHeading({
  goldWord,
  text,
  rotate = 0.6
}: {
  goldWord: string;
  text: string;
  rotate?: number;
}) {
  return (
    <div className="relative inline-flex items-center justify-center my-1 px-8 py-2.5 sm:px-10 sm:py-3">
      <div
        className="absolute inset-0 paper-scrap-bg pointer-events-none"
        style={{ transform: `rotate(${rotate}deg)` }}
      />
      <h2 className="relative z-10 text-[#2F2F2F] text-2xl sm:text-3xl md:text-4xl font-bold font-cormorant tracking-tight flex items-center justify-center">
        <span className="gold-heading-gradient mr-1.5 sm:mr-2">{goldWord}</span>
        {text}
      </h2>
    </div>
  );
}

export function App() {
  const [cards] = useState<CardItem[]>(INITIAL_CARDS);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [paperImage, setPaperImage] = useState<string>('/letter-template.png');
  const [letterDataUrl, setLetterDataUrl] = useState<string>(paperImage);
  const [ornamentPhotos] = useState<string[]>([
    '/photobox-batik.jpeg',
    '/photobox-almet.jpeg',
    '/photobox-bunga.jpeg'
  ]);

  // Instagram Card Interactivity
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // File Input References
  const paperFileInputRef = useRef<HTMLInputElement>(null);

  const selectedCard = cards.find(c => c.id === selectedCardId) || null;

  // Handle upload gambar untuk PaperCrumple
  const handlePaperImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setPaperImage(url);
  };

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
    <div className="flex flex-col items-center justify-start min-h-screen page-looping-bg pb-24 selection:bg-[#FF6100]/20 selection:text-[#2F2F2F] relative overflow-x-hidden w-full">
      {/* Efek Confetti / Party Popper Side Cannons saat web dibuka */}
      <AutoConfetti />

      {/* Kelopak Bunga Jatuh Melayang Looping 1 Halaman Penuh */}
      <FallingPetals />

      {/* ========================================================
          SECTION 1: HERO BEACH + INSTAGRAM POST CARD
          ======================================================== */}
      <section className="relative w-full min-h-[660px] md:min-h-[740px] flex items-center justify-center overflow-hidden select-none mb-14 py-10">
        {/* Ambient lighting */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/15 via-transparent to-transparent z-[5]" />

        {/* SVG Filter for Organic Watercolor Paint & Torn Paper Scrap Edge */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
          <defs>
            <filter id="watercolor-bleed" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="paper-torn-filter" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* Instagram Post Card with 3D Popout Effect & Floating Typography */}
        <div className="relative z-20 flex items-center justify-center w-full px-4 pointer-events-auto">
          <div className="relative flex items-center justify-center">
            {/* Top Left: Happy */}
            <div className="absolute -top-16 sm:-top-20 md:-top-24 -left-12 sm:-left-36 md:-left-56 lg:-left-64 z-30 pointer-events-none select-none rotate-[-8deg] flex items-baseline">
              <span className="font-my-soul text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none inline-block relative z-10 watercolor-gold watercolor-filter">
                H
              </span>
              <span className="font-merriweather font-normal tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl -ml-2 sm:-ml-3 leading-none inline-block relative z-0 watercolor-gold watercolor-filter">
                appy
              </span>
            </div>

            {/* Top Right: Birthday!! */}
            <div className="absolute -top-12 sm:-top-16 md:-top-20 -right-12 sm:-right-36 md:-right-56 lg:-right-64 z-30 pointer-events-none select-none rotate-[6deg] flex items-baseline">
              <span className="font-my-soul text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none inline-block relative z-10 watercolor-gold watercolor-filter">
                B
              </span>
              <span className="font-merriweather font-normal tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl -ml-2 sm:-ml-3 leading-none inline-block relative z-0 watercolor-gold watercolor-filter">
                irthday!!
              </span>
            </div>

            {/* Bottom Left: Jude */}
            <div className="absolute -bottom-8 sm:-bottom-12 -left-8 sm:-left-24 md:-left-36 z-30 pointer-events-none select-none rotate-[-6deg] flex items-baseline">
              <span className="font-my-soul text-7xl sm:text-8xl md:text-9xl leading-none inline-block relative z-10 watercolor-pink watercolor-filter">
                D
              </span>
              <span className="font-merriweather font-normal tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl -ml-2 sm:-ml-3 leading-none inline-block relative z-0 watercolor-pink watercolor-filter">
                ian
              </span>
            </div>

            {/* Bottom Right: 21 y.o */}
            <div className="absolute -bottom-8 sm:-bottom-12 -right-8 sm:-right-24 md:-right-36 z-30 pointer-events-none select-none rotate-[8deg] flex items-baseline">
              <span className="font-merriweather font-normal tracking-tight text-5xl sm:text-6xl md:text-7xl leading-none inline-block relative z-0 watercolor-pink watercolor-filter">
                21
              </span>
              <span className="font-my-soul text-5xl sm:text-6xl md:text-7xl leading-none inline-block -ml-4 sm:-ml-5 relative z-10 watercolor-pink watercolor-filter">
                y.o
              </span>
            </div>

            {/* The Instagram Post Card */}
            <div
              className="relative w-[310px] sm:w-[350px] bg-white/80 backdrop-blur-md rounded-[2px] border border-white/50 shadow-[0_20px_60px_rgba(0,0,0,0.22)] p-3 sm:p-3.5 transition-all duration-300 hover:rotate-0 hover:scale-[1.02]"
              style={{ transform: 'rotate(-3.5deg)' }}
            >
              {/* Header: Avatar, Username, More */}
              <div className="flex items-center justify-between pb-2.5 px-0.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-neutral-300 flex-shrink-0" />
                  <span className="text-xs font-semibold text-neutral-800 tracking-tight">
                    {USERNAME}
                  </span>
                </div>
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
                {/* 1. Base Photo (dian-bg.jpeg) - Clipped strictly inside frame */}
                <div className="absolute inset-0 overflow-hidden rounded-[2px]">
                  <img
                    src="/dian-bg.jpeg"
                    alt="Base Photo"
                    className="w-full absolute left-0 top-[-92px] object-cover pointer-events-none select-none"
                  />
                </div>

                {/* 2. Popout Subject (dian-nobg.png) - Top side pops out, left and right sides cropped to frame */}
                <div
                  className="absolute inset-0 pointer-events-none select-none z-10"
                  style={{ clipPath: 'inset(-180px 0 0 0)' }}
                >
                  <img
                    src="/dian-nobg.png"
                    alt="Popout Subject"
                    className="w-full absolute left-0 top-[-92px] object-cover pointer-events-none select-none scale-[1.35] origin-bottom"
                  />
                </div>
              </div>

              {/* Action Buttons: Liked, Comment, Repost, Share, Bookmark */}
              <div className="flex items-center justify-between pt-2.5 pb-1 px-0.5">
                <div className="flex items-center gap-3 text-neutral-800">
                  <button
                    type="button"
                    onClick={() => setIsLiked(prev => !prev)}
                    className="transition-transform active:scale-125 focus:outline-none"
                    title="Like"
                  >
                    <Heart
                      className={`w-[19px] h-[19px] transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-neutral-800 hover:text-neutral-600'
                        }`}
                    />
                  </button>

                  <button
                    type="button"
                    className="hover:text-neutral-600 transition-colors focus:outline-none"
                    title="Comment"
                  >
                    <MessageCircle className="w-[19px] h-[19px]" />
                  </button>

                  <button
                    type="button"
                    className="hover:text-neutral-600 transition-colors focus:outline-none"
                    title="Repost"
                  >
                    <Repeat2 className="w-[19px] h-[19px]" />
                  </button>

                  <button
                    type="button"
                    className="hover:text-neutral-600 transition-colors focus:outline-none"
                    title="Share"
                  >
                    <Send className="w-[19px] h-[19px]" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsBookmarked(prev => !prev)}
                  className="hover:text-neutral-600 transition-colors focus:outline-none"
                  title="Save"
                >
                  <Bookmark
                    className={`w-[19px] h-[19px] transition-colors ${isBookmarked ? 'fill-neutral-900 text-neutral-900' : 'text-neutral-800'
                      }`}
                  />
                </button>
              </div>

              {/* Caption & Verified Badge */}
              <div className="px-0.5 pt-0.5 text-left">
                <p className="text-[11px] sm:text-xs text-neutral-800 leading-snug">
                  <span className="font-semibold text-neutral-900 mr-1">{USERNAME}</span>
                  <VerifiedBadge />
                  <span className="text-neutral-700">lorem ipsum dolor sit amet</span>
                </p>
              </div>
            </div>

            {/* Draggable Bouquet */}
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
        <div className="text-center mb-4 px-4 z-10 flex flex-col items-center">
          <SectionHeading goldWord="Suratnya" text="dibaca yah!" rotate={-0.6} />
          <p className="text-xs md:text-sm text-[#FF6100] font-medium mt-1">
            Surat diputar ke kanan dengan ornamen polaroid foto, buket bunga, dan kelopak bunga bertaburan!
          </p>
        </div>

        {/* Hidden input untuk upload gambar paper */}
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

        {/* Panggung Interaktif Surat & Ornamen */}
        <div className="relative w-full max-w-5xl min-h-[680px] flex items-center justify-center my-2">
          {/* 3D Paper Crumple Letter */}
          <div className="w-full flex justify-center items-center relative z-0">
            <LetterCanvas
              monogram={CUSTOM_LETTER.monogram}
              title={CUSTOM_LETTER.title}
              recipient={selectedCard ? CUSTOM_LETTER.recipient || 'Sahabat Tersayang,' : CUSTOM_LETTER.recipient}
              message={selectedCard ? selectedCard.backMessage : CUSTOM_LETTER.message}
              closing={CUSTOM_LETTER.closing}
              signature={selectedCard ? selectedCard.backSignature : CUSTOM_LETTER.signature}
              stamp={selectedCard ? selectedCard.stampText : CUSTOM_LETTER.stamp}
              showDivider={CUSTOM_LETTER.showDivider}
              fontScale={CUSTOM_LETTER.fontScale}
              backgroundSrc={paperImage}
              dividerSrc="/gold-divider.png"
              onRender={setLetterDataUrl}
            />
            <PaperCrumple
              src={letterDataUrl}
              alt="Surat Ucapan Ulang Tahun"
              width={385}
              height={560}
              sceneHeight={680}
              rotation={-3.5}
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
              resetKey={0}
              className="w-full"
            />
          </div>

          {/* Ornamen Buket Bunga */}
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

          {/* Ornamen Polaroid Bertingkat */}
          <div className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2.5 z-20 pointer-events-auto scale-90 sm:scale-100 origin-right">
            {ORNAMENT_CONFIGS.map((config, index) => (
              <div
                key={index}
                className={`relative bg-white p-2 pb-3.5 shadow-xl ${config.borderClass} rounded-sm transform ${config.rotation} hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-300 w-28 md:w-32 select-none`}
              >
                <div className="w-full aspect-[4/3] bg-neutral-900 overflow-hidden relative">
                  <img
                    src={ornamentPhotos[index]}
                    alt={config.label}
                    className={`w-full h-full object-cover pointer-events-none select-none ${config.objectPosition}`}
                  />
                </div>
                <div className="mt-1 text-center">
                  <span className="text-[8px] font-bold text-neutral-600 tracking-tight">
                    {config.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedCard && (
          <div className="mt-1 mb-2 px-4 py-1.5 bg-amber-50 border border-amber-200/80 rounded-full text-xs text-amber-900 flex items-center gap-2 shadow-sm animate-in fade-in duration-200">
            <span>
              Menampilkan pesan dari kartu: <strong>{selectedCard.title}</strong>
            </span>
            <button
              type="button"
              onClick={() => setSelectedCardId(null)}
              className="text-[#FF6100] hover:underline font-semibold ml-1 cursor-pointer"
            >
              (Kembali ke Surat Utama)
            </button>
          </div>
        )}

        {/* Petunjuk Interaksi */}
        <div className="flex flex-wrap items-center justify-center mt-2 px-4 text-center z-10">
          <span className="text-xs text-[#2F2F2F]/60">
            • Tahan & seret buket bunga • Tahan kertas untuk remas 3D
          </span>
        </div>

        {/* Petunjuk Scroll ke Bawah */}
        <div className="flex flex-col items-center gap-1 mt-10 text-[#FF6100] z-10">
          <span className="text-xs font-semibold tracking-wide">
            Scroll ke bawah untuk melihat Surat Kenangan 💌
          </span>
          <div className="animate-bounce mt-1">
            <ChevronDown className="w-4 h-4 text-[#FF6100]" />
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: MEMORY LETTER & POLAROID PHOTO CARDS
          ======================================================== */}
      <section className="w-full max-w-4xl flex flex-col items-center pt-10 relative border-t border-amber-900/15">
        <div className="text-center mb-2 flex flex-col items-center">
          <SectionHeading goldWord="buka" text="mail ini" rotate={0.6} />
          <p className="text-xs md:text-sm text-[#FF6100] font-medium mt-1">
            Arahkan kursor untuk mengintip, klik amplop untuk membuka seluruh foto!
          </p>
        </div>

        {/* Komponen Amplop Surat */}
        <div className="flex justify-center items-center w-full mt-36 md:mt-40 mb-10 py-4 min-h-[380px] overflow-visible">
          <Folder
            color="#E5D5B8"
            backColor="#F1E5CF"
            size={1.05}
            items={cards.map(card => (
              <div
                key={card.id}
                onClick={e => {
                  e.stopPropagation();
                  setSelectedCardId(card.id);
                }}
                className="w-full h-full bg-white p-2.5 pb-4 flex flex-col justify-between select-none shadow-md border border-neutral-300 rounded-none relative group/item cursor-pointer"
                title="Klik untuk membuka secara besar & flip kartu 3D"
              >
                {/* Area Foto Polaroid */}
                <div className="relative w-full aspect-square bg-[#151a21] border border-black/30 rounded-none overflow-hidden flex flex-col items-center justify-center transition-all group-hover/item:brightness-105">
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

                {/* Chin / Caption Bawah Polaroid */}
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
            ))}
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

      {/* ========================================================
          MODAL POPUP: FULL VIEW + REACT BITS 3D FLIP CARD
          ======================================================== */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 transition-all animate-in fade-in duration-200"
          onClick={() => setSelectedCardId(null)}
        >
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



            {/* Komponen React Bits FlipCard */}
            <FlipCard
              width={330}
              height={430}
              radius={0}
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
              front={
                <div className="w-full h-full bg-white p-3.5 pb-6 flex flex-col justify-between select-none rounded-none border border-neutral-300 relative">
                  <div className="relative w-full aspect-square bg-[#151a21] border border-black/40 rounded-none overflow-hidden flex flex-col items-center justify-center">
                    {selectedCard.image ? (
                      <img
                        src={selectedCard.image}
                        alt={selectedCard.title}
                        className="w-full h-full object-cover rounded-none pointer-events-none select-none"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4 text-center text-slate-400">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                          {selectedCard.title}
                        </span>
                      </div>
                    )}
                  </div>

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
              back={
                <div className="w-full h-full bg-white p-6 flex flex-col justify-between select-none rounded-none border border-neutral-300 relative text-[#2F2F2F]">
                  <div className="my-auto py-4 text-left">
                    <p
                      style={{ fontFamily: "'Caveat', cursive" }}
                      className="text-2xl md:text-[27px] font-semibold text-[#2F2F2F] leading-relaxed tracking-wide px-1"
                    >
                      "{selectedCard.backMessage}"
                    </p>
                  </div>

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