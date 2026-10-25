import React, { useRef, useEffect } from 'react';

export interface LetterCanvasProps {
  /** Optional Monogram text displayed beneath top flowers (e.g. 'S & E') */
  monogram?: string;
  /** Header title displayed in metallic gold calligraphy (e.g. 'Happy Birthday') */
  title?: string;
  /** Greeting recipient line (e.g. 'My Dearest Eleanor,') */
  recipient?: string;
  /** Message body text - supports multi-paragraph separated by newlines */
  message: string;
  /** Optional closing remark (e.g. 'With love always,') */
  closing?: string;
  /** Optional signature text placed near bottom (e.g. 'Sarah xo') */
  signature?: string;
  /** Optional postal stamp text displayed at the lower right */
  stamp?: string;
  /** Whether to display the golden leaf flourish divider between paragraphs */
  showDivider?: boolean;
  /** Background template image path (defaults to clean paper with watercolor ornaments) */
  backgroundSrc?: string;
  /** Golden divider flourish image path */
  dividerSrc?: string;
  /** Multiplier for font size (default 1.0) */
  fontScale?: number;
  /** Callback receiving the generated data URL */
  onRender: (dataUrl: string) => void;
}

export const LetterCanvas: React.FC<LetterCanvasProps> = ({
  monogram = 'S & E',
  title = 'Happy Birthday',
  recipient = 'My Dearest Eleanor,',
  message,
  closing = 'With love always,',
  signature = 'Sarah xo',
  stamp,
  showDivider = true,
  backgroundSrc = '/letter-template.png',
  dividerSrc = '/gold-divider.png',
  fontScale = 1.0,
  onRender,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let isCancelled = false;

    const renderLetter = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Ensure Alex Brush and Ephesis fonts are fully loaded before drawing
      try {
        if ('fonts' in document) {
          await Promise.all([
            document.fonts.load('44px "Alex Brush"'),
            document.fonts.load('44px "Ephesis"'),
          ]);
          await document.fonts.ready;
        }
      } catch (err) {
        console.warn('Font load check warning:', err);
      }

      if (isCancelled) return;

      // Helper to load image
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = src;
          img.onload = () => resolve(img);
          img.onerror = reject;
        });
      };

      try {
        // Load background and optional divider
        const [bgImg, dividerImg] = await Promise.all([
          loadImage(backgroundSrc),
          showDivider && dividerSrc ? loadImage(dividerSrc).catch(() => null) : Promise.resolve(null),
        ]);

        if (isCancelled) return;

        const width = bgImg.width || 628;
        const height = bgImg.height || 996;
        canvas.width = width;
        canvas.height = height;

        // 1. Draw clean floral template background
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(bgImg, 0, 0, width, height);

        // Effective scale
        const scale = Math.max(0.85, Math.min(1.4, fontScale));

        // 2. Draw Monogram (e.g. 'S & E') - Larger & bolder cursive
        if (monogram && monogram.trim()) {
          const monogramSize = Math.round(38 * scale);
          ctx.save();
          ctx.font = `${monogramSize}px "Alex Brush", cursive`;
          ctx.fillStyle = '#342921';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = 'rgba(52, 41, 33, 0.20)';
          ctx.shadowBlur = 3;
          ctx.shadowOffsetX = 0.5;
          ctx.shadowOffsetY = 1;
          ctx.fillText(monogram.trim(), width / 2, 204);
          ctx.restore();
        }

        // 3. Draw Title in Luxurious Metallic Gold Calligraphy
        if (title && title.trim()) {
          const titleText = title.trim();
          const titleY = monogram && monogram.trim() ? 282 : 252;

          // Dynamically scale font size if title is long
          let titleFontSize = Math.round(76 * scale);
          if (titleText.length > 18) titleFontSize = Math.round(62 * scale);
          if (titleText.length > 26) titleFontSize = Math.round(50 * scale);

          ctx.save();
          // Metallic Gold Gradient with highlights and antique bronze depths
          const grad = ctx.createLinearGradient(0, titleY - 34, 0, titleY + 28);
          grad.addColorStop(0.0, '#987126'); // rich antique gold
          grad.addColorStop(0.22, '#d8b054'); // warm glowing gold
          grad.addColorStop(0.44, '#fff0bd'); // luminous champagne highlight
          grad.addColorStop(0.68, '#c89d3c'); // classic gold
          grad.addColorStop(1.0, '#7b5314'); // deep shaded gold

          // Warm soft shadow
          ctx.shadowColor = 'rgba(110, 75, 20, 0.35)';
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 1;
          ctx.shadowOffsetY = 2;

          ctx.font = `${titleFontSize}px "Alex Brush", cursive`;
          ctx.fillStyle = grad;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(titleText, width / 2, titleY);

          // Subtle gold bevel definition stroke
          ctx.shadowColor = 'transparent';
          ctx.strokeStyle = 'rgba(102, 68, 16, 0.45)';
          ctx.lineWidth = 0.9;
          ctx.strokeText(titleText, width / 2, titleY);
          ctx.restore();
        }

        // Common text styling parameters
        const marginLeft = 64;
        const marginRight = 64;
        const maxWidth = width - marginLeft - marginRight;
        const textColor = '#2B221C';

        let currentY = 376;

        // 4. Draw Recipient Greeting (e.g. 'My Dearest Eleanor,')
        if (recipient && recipient.trim()) {
          const recipientSize = Math.round(42 * scale);
          ctx.save();
          ctx.font = `${recipientSize}px "Ephesis", cursive`;
          ctx.fillStyle = textColor;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'alphabetic';
          ctx.shadowColor = 'rgba(43, 34, 28, 0.15)';
          ctx.shadowBlur = 2;
          ctx.shadowOffsetX = 0.5;
          ctx.shadowOffsetY = 1;
          ctx.fillText(recipient.trim(), marginLeft, currentY);
          ctx.restore();
          currentY += Math.round(44 * scale);
        }

        // 5. Draw Body Message (Word wrapped, paragraph by paragraph)
        const rawMessage = message || '';
        const paragraphs = rawMessage
          .split(/\n\s*\n/)
          .map((p) => p.trim())
          .filter(Boolean);

        // Word wrapping helper
        const wrapText = (text: string, font: string, maxW: number): string[] => {
          ctx.font = font;
          const words = text.split(/\s+/);
          const lines: string[] = [];
          let currentLine = '';

          for (let n = 0; n < words.length; n++) {
            const testLine = currentLine ? `${currentLine} ${words[n]}` : words[n];
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxW && n > 0) {
              lines.push(currentLine);
              currentLine = words[n];
            } else {
              currentLine = testLine;
            }
          }
          if (currentLine) lines.push(currentLine);
          return lines;
        };

        // Well-proportioned body font (34px base) and compact line height (43px base)
        let bodyFontSize = Math.round(34 * scale);
        let lineHeight = Math.round(44 * scale);

        // Responsive adjustment if message is long
        const totalEstimatedWords = rawMessage.split(/\s+/).length;
        if (totalEstimatedWords > 75) {
          bodyFontSize = Math.round(28 * scale);
          lineHeight = Math.round(36 * scale);
        } else if (totalEstimatedWords > 55) {
          bodyFontSize = Math.round(31 * scale);
          lineHeight = Math.round(40 * scale);
        }

        const bodyFont = `${bodyFontSize}px "Ephesis", cursive`;

        paragraphs.forEach((paragraph, pIndex) => {
          const lines = wrapText(paragraph, bodyFont, maxWidth);

          ctx.save();
          ctx.font = bodyFont;
          ctx.fillStyle = textColor;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'alphabetic';
          ctx.shadowColor = 'rgba(43, 34, 28, 0.12)';
          ctx.shadowBlur = 1.8;
          ctx.shadowOffsetX = 0.5;
          ctx.shadowOffsetY = 1;

          lines.forEach((line) => {
            ctx.fillText(line, marginLeft, currentY);
            currentY += lineHeight;
          });
          ctx.restore();

          // If there is another paragraph and divider is enabled, draw gold divider
          if (pIndex < paragraphs.length - 1 && showDivider && dividerImg) {
            currentY += 4;
            const dw = Math.min(175, dividerImg.width * 0.9);
            const dh = (dw / dividerImg.width) * dividerImg.height;
            const dx = (width - dw) / 2;
            ctx.drawImage(dividerImg, dx, currentY, dw, dh);
            currentY += dh + 14;
          } else if (pIndex < paragraphs.length - 1) {
            currentY += 14;
          }
        });

        // 6. Draw Closing and Signature (Centered, safe gap below message)
        if (closing || signature) {
          // Add clean breathing gap after the last line of the message
          currentY += Math.round(36 * scale);

          if (closing && closing.trim()) {
            const closingSize = Math.round(38 * scale);
            ctx.save();
            ctx.font = `${closingSize}px "Ephesis", cursive`;
            ctx.fillStyle = textColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            ctx.shadowColor = 'rgba(43, 34, 28, 0.14)';
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = 0.5;
            ctx.shadowOffsetY = 1;
            ctx.fillText(closing.trim(), width / 2, currentY);
            ctx.restore();
            currentY += Math.round(44 * scale);
          }

          if (signature && signature.trim()) {
            const signatureSize = Math.round(44 * scale);
            ctx.save();
            ctx.font = `${signatureSize}px "Ephesis", cursive`;
            ctx.fillStyle = textColor;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            ctx.shadowColor = 'rgba(43, 34, 28, 0.14)';
            ctx.shadowBlur = 2;
            ctx.shadowOffsetX = 0.5;
            ctx.shadowOffsetY = 1;
            ctx.fillText(signature.trim(), width / 2, currentY);
            ctx.restore();
          }
        }

        // 7. Optional Stamp text in lower right corner
        if (stamp && stamp.trim()) {
          ctx.save();
          ctx.font = '15px "DM Sans", sans-serif';
          ctx.fillStyle = 'rgba(120, 100, 85, 0.65)';
          ctx.textAlign = 'right';
          ctx.textBaseline = 'bottom';
          ctx.fillText(stamp.trim(), width - 42, height - 38);
          ctx.restore();
        }

        // Emit final rendered image URL
        const dataUrl = canvas.toDataURL('image/png');
        onRender(dataUrl);
      } catch (error) {
        console.error('Failed to render letter canvas:', error);
      }
    };

    renderLetter();

    return () => {
      isCancelled = true;
    };
  }, [
    monogram,
    title,
    recipient,
    message,
    closing,
    signature,
    stamp,
    showDivider,
    backgroundSrc,
    dividerSrc,
    fontScale,
    onRender,
  ]);

  return <canvas ref={canvasRef} style={{ display: 'none' }} />;
};
