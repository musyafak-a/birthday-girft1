import React from 'react';
import { X, Sparkles, Download, RotateCcw, Check } from 'lucide-react';

export interface LetterContent {
  monogram: string;
  title: string;
  recipient: string;
  message: string;
  closing: string;
  signature: string;
  stamp: string;
  showDivider: boolean;
  fontScale?: number;
}

export const DEFAULT_LETTER_CONTENT: LetterContent = {
  monogram: 'S & E',
  title: 'Happy Birthday',
  recipient: 'My Dearest Eleanor,',
  message:
    'Wishing you the most magical and beautiful birthday yet! May this coming year be filled with warmth, joy, laughter, and countless wonderful moments that make your heart happy.\n\nI hope today is surrounded by love and everything you cherish. You deserve all the happiness in the world.',
  closing: 'With love always,',
  signature: 'Sarah xo',
  stamp: 'AIR MAIL • 10 OCT',
  showDivider: true,
  fontScale: 1.1,
};

interface LetterCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: LetterContent;
  onChange: (updated: LetterContent) => void;
  onDownload: () => void;
  onReset: () => void;
}

const PRESETS: { name: string; icon: string; data: LetterContent }[] = [
  {
    name: 'Eleanor & Sarah (Original)',
    icon: '🌸',
    data: DEFAULT_LETTER_CONTENT,
  },
  {
    name: 'Romantis Pasangan',
    icon: '💖',
    data: {
      monogram: 'M & Y',
      title: 'Happy Birthday, My Love',
      recipient: 'Untuk Belahan Jiwaku Tersayang,',
      message:
        'Terima kasih telah hadir dan memberi warna paling indah dalam setiap detik hidupku. Di hari ulang tahunmu ini, aku berharap segala kebahagiaan dan kehangatan memelukmu selamanya.\n\nSetiap langkah dan impianmu akan selalu kusertai dengan doa terbaikku. Selamat bertambah usia, sayangku.',
      closing: 'Peluk & Cinta Terdalam,',
      signature: 'Kekasih Hatimu ❤️',
      stamp: 'LOVE & CARE • 2026',
      showDivider: true,
    },
  },
  {
    name: 'Sahabat Sejati',
    icon: '🎂',
    data: {
      monogram: 'B & F',
      title: 'Happy Birthday Bestie!',
      recipient: 'Hai Sahabat Terbaikku,',
      message:
        'Selamat ulang tahun untuk orang paling seru dan luar biasa! Terima kasih telah selalu ada dalam tawa maupun duka, serta menemani setiap momen konyol kita.\n\nSemoga tahun ini membawamu kepada kesuksesan besar, kesehatan prima, dan kebahagiaan yang melimpah ruah!',
      closing: 'Sahabat Terbaikmu Selamanya,',
      signature: 'Teman Setiamu ✨',
      stamp: 'MEMORIES • 2026',
      showDivider: true,
    },
  },
  {
    name: 'Doa & Berkah',
    icon: '✨',
    data: {
      monogram: 'A & D',
      title: 'Barakallah Fii Umrik',
      recipient: 'Yang Terkasih,',
      message:
        'Semoga dengan bertambahnya usiamu, Allah senantiasa melimpahkan berkah kesehatan, kelapangan rezeki, dan ketentraman hati dalam setiap langkah.\n\nSemoga setiap harapan muliamu dimudahkan dan terwujud dengan cara yang paling indah.',
      closing: 'Doa Tulus Selalu,',
      signature: 'Keluarga Tercinta 🌸',
      stamp: 'BLESSED • 2026',
      showDivider: true,
    },
  },
];

export const LetterCustomizerModal: React.FC<LetterCustomizerModalProps> = ({
  isOpen,
  onClose,
  content,
  onChange,
  onDownload,
  onReset,
}) => {
  if (!isOpen) return null;

  const handleFieldChange = <K extends keyof LetterContent>(
    field: K,
    value: LetterContent[K]
  ) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF7F2] text-neutral-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col border border-amber-900/15 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 pt-5 pb-4 border-b border-amber-900/10 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-700">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-cormorant text-neutral-900 tracking-tight">
                Kustomisasi Teks Surat Ucapan
              </h3>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Font kaligrafi elegan <span className="font-semibold text-amber-800">Alex Brush</span> & gaya emas tetap terjaga persis seperti desain aslinya.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/50 rounded-full transition-colors focus:outline-none"
            title="Tutup (ESC)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-left text-sm">
          {/* Preset Buttons */}
          <div>
            <label className="block text-xs font-semibold text-neutral-600 uppercase tracking-wider mb-2">
              Pilihan Cepat (Presets):
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => {
                const isActive = content.title === preset.data.title;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => onChange(preset.data)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-white hover:bg-amber-50 text-neutral-700 border-neutral-300 hover:border-amber-300'
                    }`}
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.name}</span>
                    {isActive && <Check className="w-3.5 h-3.5 ml-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid: Monogram & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Monogram Inisial
              </label>
              <input
                type="text"
                value={content.monogram}
                onChange={(e) => handleFieldChange('monogram', e.target.value)}
                placeholder="Contoh: S & E"
                className="w-full px-3 py-2 bg-white rounded-lg border border-neutral-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-neutral-900 text-sm outline-none transition"
              />
              <span className="text-[10px] text-neutral-400 mt-0.5 block">Di bawah buket bunga atas</span>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Judul Kaligrafi Emas
              </label>
              <input
                type="text"
                value={content.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                placeholder="Contoh: Happy Birthday"
                className="w-full px-3 py-2 bg-white rounded-lg border border-neutral-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-neutral-900 text-sm outline-none transition"
              />
              <span className="text-[10px] text-neutral-400 mt-0.5 block">Ditampilkan dalam efek emas berkilau mewah</span>
            </div>
          </div>

          {/* Recipient */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Baris Sapaan / Penerima
            </label>
            <input
              type="text"
              value={content.recipient}
              onChange={(e) => handleFieldChange('recipient', e.target.value)}
              placeholder="Contoh: My Dearest Eleanor,"
              className="w-full px-3 py-2 bg-white rounded-lg border border-neutral-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-neutral-900 text-sm outline-none transition"
            />
          </div>

          {/* Message Body */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-neutral-700">
                Isi Surat Ucapan
              </label>
              <span className="text-[11px] text-neutral-400">
                Gunakan baris baru (Enter ganda) untuk memisahkan paragraf
              </span>
            </div>
            <textarea
              rows={5}
              value={content.message}
              onChange={(e) => handleFieldChange('message', e.target.value)}
              placeholder="Tuliskan ucapan atau doa tulus di sini..."
              className="w-full px-3 py-2.5 bg-white rounded-lg border border-neutral-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-neutral-900 text-sm outline-none transition resize-y leading-relaxed"
            />
          </div>

          {/* Ukuran Font / Font Scale Selector */}
          <div className="p-3 bg-white rounded-lg border border-neutral-300 flex flex-wrap items-center justify-between gap-2.5">
            <div>
              <span className="text-xs font-semibold text-neutral-800 block">
                Ukuran Font Tulisan Surat
              </span>
              <span className="text-[11px] text-neutral-500">
                Pilih ukuran tampilan huruf kaligrafi
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-lg border border-neutral-200">
              {[
                { label: 'Normal', scale: 0.95 },
                { label: 'Besar', scale: 1.1 },
                { label: 'Lebih Besar', scale: 1.2 },
                { label: 'Maksimal', scale: 1.3 },
              ].map((opt) => {
                const currentScale = content.fontScale ?? 1.1;
                const isSelected = Math.abs(currentScale - opt.scale) < 0.04;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleFieldChange('fontScale', opt.scale)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'text-neutral-700 hover:text-neutral-900 hover:bg-neutral-200/60'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toggle Gold Leaf Divider */}
          <div className="flex items-center justify-between p-3 bg-amber-500/5 rounded-lg border border-amber-900/10">
            <div className="flex items-center gap-2">
              <img
                src="/gold-divider.png"
                alt="Flourish"
                className="h-4 w-auto object-contain opacity-90"
              />
              <span className="text-xs font-semibold text-neutral-800">
                Tampilkan Ornamen Pembatas Ranting Emas
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={content.showDivider}
                onChange={(e) => handleFieldChange('showDivider', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
            </label>
          </div>

          {/* Closing & Signature */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Kalimat Penutup
              </label>
              <input
                type="text"
                value={content.closing}
                onChange={(e) => handleFieldChange('closing', e.target.value)}
                placeholder="Contoh: With love always,"
                className="w-full px-3 py-2 bg-white rounded-lg border border-neutral-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-neutral-900 text-sm outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Nama Pengirim / Tanda Tangan
              </label>
              <input
                type="text"
                value={content.signature}
                onChange={(e) => handleFieldChange('signature', e.target.value)}
                placeholder="Contoh: Sarah xo"
                className="w-full px-3 py-2 bg-white rounded-lg border border-neutral-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-neutral-900 text-sm outline-none transition"
              />
            </div>
          </div>

          {/* Live Preview Box styled with Alex Brush */}
          <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-sm text-center">
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block mb-2">
              Pratinjau Gaya Font Asli:
            </span>
            <div style={{ fontFamily: '"Alex Brush", cursive' }} className="space-y-1.5 select-none">
              {content.monogram && (
                <div className="text-xl text-neutral-800">{content.monogram}</div>
              )}
              {content.title && (
                <div className="text-3xl text-amber-700 font-normal drop-shadow-sm">
                  {content.title}
                </div>
              )}
              {content.recipient && (
                <div className="text-xl text-neutral-800 text-left px-4">
                  {content.recipient}
                </div>
              )}
              <div className="text-base text-neutral-700 text-left px-4 line-clamp-3">
                {content.message}
              </div>
              {content.closing && (
                <div className="text-xl text-neutral-800 pt-1">{content.closing}</div>
              )}
              {content.signature && (
                <div className="text-2xl text-neutral-800">{content.signature}</div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-neutral-100/80 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-2.5">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Bawaan</span>
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white hover:bg-amber-50 text-neutral-800 border border-neutral-300 hover:border-amber-400 shadow-sm transition-all cursor-pointer"
              title="Unduh surat hasil render canvas dalam resolusi tinggi"
            >
              <Download className="w-3.5 h-3.5 text-amber-700" />
              <span>Unduh PNG</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-md shadow-amber-600/20 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Terapkan & Simpan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
