import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type SpongeBobVariant = "classic" | "party" | "heart";

interface SpongeBobStickerProps {
  variant?: SpongeBobVariant;
  className?: string;
  size?: number;
  initialQuote?: string;
  quotes?: string[];
}

const SPONGEBOB_QUOTES = [
  "我準備好了！Jenny 生日快樂！！🍍✨",
  "派大星，今天是 Jenny 的大日子耶！🎂",
  "在英國 UWE 也要像我一樣充滿活力喔！💛",
  "嗶嗶～收到來自台灣的超級想念電波！📡💕",
];

const STAR_COLORS = ["#FDE047", "#FF8DA1", "#BAE6FD", "#A3E635"];

export const SpongeBobSticker: React.FC<SpongeBobStickerProps> = ({
  variant = "classic",
  className = "",
  size = 110,
  initialQuote,
  quotes,
}) => {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [bounceKey, setBounceKey] = useState(0);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; color: string }[]
  >([]);

  const quoteList = quotes && quotes.length > 0 ? quotes : SPONGEBOB_QUOTES;

  const quote =
    initialQuote && quoteIdx === 0
      ? initialQuote
      : quoteList[quoteIdx % quoteList.length];

  const handleClick = () => {
    setBounceKey((k) => k + 1);
    setShowBubble(true);
    setQuoteIdx((i) => (i + 1) % quoteList.length);

    const newP = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 100,
      y: -30 - Math.random() * 55,
      color: STAR_COLORS[i % STAR_COLORS.length],
    }));
    setParticles(newP);
    setTimeout(() => setParticles([]), 850);
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.85 }}
            onClick={() => setShowBubble(false)}
            className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 w-max max-w-[220px] cursor-pointer rounded-2xl border-2 border-[#FACC15]/70 bg-[#FFFDF9] px-3.5 py-2 text-center shadow-lg"
          >
            <p className="font-hand text-sm sm:text-base leading-snug text-[#4A3B47]">
              {quote}
            </p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-3.5 w-3.5 rotate-45 border-b-2 border-r-2 border-[#FACC15]/70 bg-[#FFFDF9]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 星星粒子 */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible z-20">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.svg
              key={p.id}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={p.color}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.4 }}
              animate={{ opacity: 0, x: p.x, y: p.y, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute"
            >
              <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
            </motion.svg>
          ))}
        </AnimatePresence>
      </div>

      <motion.button
        key={bounceKey}
        type="button"
        onClick={handleClick}
        aria-label="海綿寶寶可愛貼紙"
        whileHover={{ scale: 1.08, rotate: [-2, 2, 0] }}
        whileTap={{ scale: 0.92 }}
        animate={
          bounceKey > 0
            ? { y: [0, -14, 0, -7, 0], rotate: [0, -6, 6, 0] }
            : { y: [0, -4, 0] }
        }
        transition={
          bounceKey > 0
            ? { duration: 0.5 }
            : { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
        }
        className="group relative cursor-pointer focus:outline-none"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 160 175"
          className="h-full w-full drop-shadow-[0_6px_12px_rgba(250,204,21,0.32)]"
        >
          {/* 白色貼紙外框 */}
          <rect
            x="28"
            y="18"
            width="104"
            height="118"
            rx="16"
            fill="#FFFDF9"
            stroke="#FFFDF9"
            strokeWidth="10"
          />

          {/* 雙手 */}
          <path
            d="M32 82 C16 74 14 58 22 52 C28 48 34 64 36 74 Z"
            fill="#FDE047"
            stroke="#CA8A04"
            strokeWidth="2.2"
          />
          <path
            d="M128 82 C144 74 146 58 138 52 C132 48 126 64 124 74 Z"
            fill="#FDE047"
            stroke="#CA8A04"
            strokeWidth="2.2"
          />

          {/* 雙腳與可愛小黑鞋 */}
          <rect x="54" y="132" width="8" height="22" rx="3" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <rect x="98" y="132" width="8" height="22" rx="3" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <ellipse cx="56" cy="156" rx="11" ry="6" fill="#4A3B47" />
          <ellipse cx="104" cy="156" rx="11" ry="6" fill="#4A3B47" />

          {/* 黃色海綿主體（波浪微圓角） */}
          <rect
            x="32"
            y="22"
            width="96"
            height="86"
            rx="14"
            fill="#FDE047"
            stroke="#CA8A04"
            strokeWidth="2.5"
          />

          {/* 海綿小洞洞 */}
          <circle cx="46" cy="36" r="4.5" fill="#EAB308" opacity="0.55" />
          <circle cx="114" cy="38" r="5" fill="#EAB308" opacity="0.55" />
          <circle cx="44" cy="86" r="3.5" fill="#EAB308" opacity="0.55" />
          <circle cx="116" cy="82" r="4" fill="#EAB308" opacity="0.55" />

          {/* 白襯衫與咖啡色方褲子 */}
          <rect x="32" y="96" width="96" height="16" fill="#FFFDF9" stroke="#CA8A04" strokeWidth="2" />
          <rect x="32" y="112" width="96" height="22" rx="4" fill="#A16207" stroke="#713F12" strokeWidth="2.2" />
          {/* 紅領帶 */}
          <polygon points="80,96 74,108 80,118 86,108" fill="#FB7185" stroke="#E11D48" strokeWidth="1.5" />

          {/* 眼睛 */}
          <circle cx="64" cy="56" r="13" fill="#FFFDF9" stroke="#4A3B47" strokeWidth="2.2" />
          <circle cx="96" cy="56" r="13" fill="#FFFDF9" stroke="#4A3B47" strokeWidth="2.2" />
          <circle cx="66" cy="56" r="6.5" fill="#38BDF8" />
          <circle cx="94" cy="56" r="6.5" fill="#38BDF8" />
          <circle cx="66" cy="56" r="3.2" fill="#4A3B47" />
          <circle cx="94" cy="56" r="3.2" fill="#4A3B47" />
          <circle cx="68" cy="53.5" r="1.5" fill="#FFFFFF" />
          <circle cx="96" cy="53.5" r="1.5" fill="#FFFFFF" />

          {/* 睫毛 */}
          <line x1="58" y1="43" x2="55" y2="38" stroke="#4A3B47" strokeWidth="2" strokeLinecap="round" />
          <line x1="64" y1="42" x2="64" y2="36" stroke="#4A3B47" strokeWidth="2" strokeLinecap="round" />
          <line x1="70" y1="43" x2="73" y2="38" stroke="#4A3B47" strokeWidth="2" strokeLinecap="round" />
          <line x1="90" y1="43" x2="87" y2="38" stroke="#4A3B47" strokeWidth="2" strokeLinecap="round" />
          <line x1="96" y1="42" x2="96" y2="36" stroke="#4A3B47" strokeWidth="2" strokeLinecap="round" />
          <line x1="102" y1="43" x2="105" y2="38" stroke="#4A3B47" strokeWidth="2" strokeLinecap="round" />

          {/* 可愛鼻子與腮紅 */}
          <ellipse cx="48" cy="68" rx="5.5" ry="3.5" fill="#FB7185" opacity="0.45" />
          <ellipse cx="112" cy="68" rx="5.5" ry="3.5" fill="#FB7185" opacity="0.45" />
          <path d="M77 62 Q80 54 84 62" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />

          {/* 開心露齒笑 */}
          <path d="M58 72 Q80 88 102 72" fill="#F43F5E" stroke="#4A3B47" strokeWidth="2.2" strokeLinecap="round" />
          <rect x="72" y="74" width="6.5" height="6" rx="1" fill="#FFFDF9" stroke="#4A3B47" strokeWidth="1.2" />
          <rect x="81.5" y="74" width="6.5" height="6" rx="1" fill="#FFFDF9" stroke="#4A3B47" strokeWidth="1.2" />

          {/* 造型一：戴可愛生日派對帽 */}
          {variant === "party" && (
            <g transform="translate(80, 18) rotate(-8)">
              <polygon points="0,-24 18,8 -18,8" fill="#FF8DA1" stroke="#E11D48" strokeWidth="2" />
              <circle cx="-4" cy="-6" r="2.8" fill="#BAE6FD" />
              <circle cx="5" cy="-1" r="2.8" fill="#FDE047" />
              <circle cx="0" cy="-25" r="4.5" fill="#FCD34D" />
            </g>
          )}

          {/* 造型二：舉著粉紅小愛心 */}
          {variant === "heart" && (
            <g transform="translate(136, 46) rotate(12)">
              <path
                d="M0,12 C-12,2 -14,-8 -6,-11 C-1,-13 0,-7 0,-7 C0,-7 1,-13 6,-11 C14,-8 12,2 0,12 Z"
                fill="#FF8DA1"
                stroke="#E11D48"
                strokeWidth="1.8"
              />
            </g>
          )}
        </svg>
        <span className="mt-0.5 block text-[11px] font-hand text-[#4A3B47]/60 opacity-0 transition-opacity group-hover:opacity-100">
          點我一下！🍍
        </span>
      </motion.button>
    </div>
  );
};
