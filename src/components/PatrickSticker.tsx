import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "../data/birthdayConfig";

export type PatrickVariant = "cake" | "grad" | "cheer" | "peek";

interface PatrickStickerProps {
  variant?: PatrickVariant;
  className?: string;
  size?: number;
  initialQuote?: string;
  /** 傳入專屬台詞清單，讓不同位置的派大星講不同的話 */
  quotes?: string[];
  showBubbleByDefault?: boolean;
}

interface StarParticle {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
}

const STAR_COLORS = ["#FF8DA1", "#FCD34D", "#A3E635", "#BAE6FD", "#C084FC"];

export const PatrickSticker: React.FC<PatrickStickerProps> = ({
  variant = "peek",
  className = "",
  size = 110,
  initialQuote,
  quotes,
  showBubbleByDefault = false,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(showBubbleByDefault);
  const [bounceKey, setBounceKey] = useState(0);
  const [particles, setParticles] = useState<StarParticle[]>([]);

  const quoteList = quotes && quotes.length > 0 ? quotes : birthdayConfig.patrickQuotes;

  const currentQuote =
    initialQuote && quoteIndex === 0
      ? initialQuote
      : quoteList[quoteIndex % quoteList.length];

  const handleClick = () => {
    setBounceKey((k) => k + 1);
    setShowBubble(true);
    setQuoteIndex((i) => (i + 1) % quoteList.length);

    // Spawn floating star particles
    const newParticles: StarParticle[] = Array.from({ length: 7 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 110,
      y: -35 - Math.random() * 65,
      rotate: (Math.random() - 0.5) * 180,
      color: STAR_COLORS[i % STAR_COLORS.length],
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 900);
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 360, damping: 22 }}
            onClick={() => setShowBubble(false)}
            className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 w-max max-w-[230px] cursor-pointer rounded-2xl border-2 border-[#FF8DA1]/50 bg-[#FFFDF9] px-3.5 py-2 text-center shadow-lg"
          >
            <p className="font-hand text-sm sm:text-base leading-snug text-[#4A3B47]">
              {currentQuote}
            </p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-3.5 w-3.5 rotate-45 border-b-2 border-r-2 border-[#FF8DA1]/50 bg-[#FFFDF9]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Star Particles */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible z-20">
        <AnimatePresence>
          {particles.map((p) => (
            <motion.svg
              key={p.id}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={p.color}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.4, rotate: 0 }}
              animate={{
                opacity: 0,
                x: p.x,
                y: p.y,
                scale: 1.15,
                rotate: p.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="absolute"
            >
              <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
            </motion.svg>
          ))}
        </AnimatePresence>
      </div>

      {/* Patrick Star Inspired Cute SVG Sticker */}
      <motion.button
        key={bounceKey}
        type="button"
        onClick={handleClick}
        aria-label="Cute Patrick Star sticker - click for a surprise!"
        whileHover={{ scale: 1.08, rotate: [-2, 2, 0] }}
        whileTap={{ scale: 0.92 }}
        animate={
          bounceKey > 0
            ? {
                y: [0, -16, 0, -8, 0],
                rotate: [0, -8, 8, -4, 0],
              }
            : {
                y: [0, -4, 0],
              }
        }
        transition={
          bounceKey > 0
            ? { duration: 0.55, ease: "easeOut" }
            : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
        }
        className="group relative cursor-pointer focus:outline-none"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 160 175"
          className="h-full w-full drop-shadow-[0_6px_12px_rgba(255,141,161,0.32)]"
        >
          {/* White sticker outline */}
          <g stroke="#FFFDF9" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" fill="none">
            <path d="M80 18 C95 18 103 48 108 66 C126 62 146 66 146 80 C146 92 126 100 116 104 C122 128 124 152 106 156 C92 158 86 142 80 136 C74 142 68 158 54 156 C36 152 38 128 44 104 C34 100 14 92 14 80 C14 66 34 62 52 66 C57 48 65 18 80 18 Z" />
          </g>

          {/* Left Arm */}
          <path
            d={
              variant === "cheer"
                ? "M52 72 C32 52 22 40 30 32 C38 24 52 44 60 64 Z"
                : "M54 74 C32 70 16 74 16 84 C16 94 34 98 52 96 Z"
            }
            fill="#FF8DA1"
            stroke="#E16B82"
            strokeWidth="2.5"
          />

          {/* Right Arm */}
          <path
            d={
              variant === "cheer"
                ? "M108 72 C128 52 138 40 130 32 C122 24 108 44 100 64 Z"
                : "M106 74 C128 70 144 74 144 84 C144 94 126 98 108 96 Z"
            }
            fill="#FF8DA1"
            stroke="#E16B82"
            strokeWidth="2.5"
          />

          {/* Legs */}
          <path
            d="M46 126 C40 146 42 156 54 156 C64 156 68 142 72 130 Z"
            fill="#FF8DA1"
            stroke="#E16B82"
            strokeWidth="2.5"
          />
          <path
            d="M114 126 C120 146 118 156 106 156 C96 156 92 142 88 130 Z"
            fill="#FF8DA1"
            stroke="#E16B82"
            strokeWidth="2.5"
          />

          {/* Main Starfish Body */}
          <path
            d="M80 18 C97 18 106 54 114 82 C120 104 120 128 80 132 C40 128 40 104 46 82 C54 54 63 18 80 18 Z"
            fill="#FF8DA1"
            stroke="#E16B82"
            strokeWidth="2.5"
          />

          {/* Soft Belly Highlight */}
          <ellipse cx="80" cy="98" rx="22" ry="16" fill="#FFA6B6" opacity="0.55" />

          {/* Iconic Lime-Green Shorts with Purple Flowers */}
          <path
            d="M45 104 Q80 112 115 104 L118 130 Q98 135 84 130 L80 124 L76 130 Q62 135 42 130 Z"
            fill="#A3E635"
            stroke="#65A30D"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Shorts Waistband */}
          <path
            d="M45 104 Q80 112 115 104"
            fill="none"
            stroke="#65A30D"
            strokeWidth="2.5"
          />
          {/* Purple Flower Pattern on Shorts */}
          <g fill="#A855F7" opacity="0.9">
            <circle cx="58" cy="119" r="4.5" />
            <circle cx="62" cy="115" r="3" />
            <circle cx="54" cy="115" r="3" />
            <circle cx="96" cy="117" r="4.5" />
            <circle cx="101" cy="121" r="3" />
            <circle cx="92" cy="121" r="3" />
            <circle cx="78" cy="118" r="2.5" />
          </g>

          {/* Cute Belly Button */}
          <path d="M77 99 Q80 102 83 99" fill="none" stroke="#E16B82" strokeWidth="2" strokeLinecap="round" />

          {/* Eyes */}
          <ellipse cx="70" cy="58" rx="7" ry="9.5" fill="#FFFDF9" stroke="#4A3B47" strokeWidth="2" />
          <ellipse cx="90" cy="58" rx="7" ry="9.5" fill="#FFFDF9" stroke="#4A3B47" strokeWidth="2" />
          <circle cx="71.5" cy="59" r="3.2" fill="#4A3B47" />
          <circle cx="88.5" cy="59" r="3.2" fill="#4A3B47" />
          <circle cx="72.5" cy="57.5" r="1.1" fill="#FFFFFF" />
          <circle cx="89.5" cy="57.5" r="1.1" fill="#FFFFFF" />

          {/* Cute Eyebrows */}
          <path d="M63 45 Q70 41 76 46" fill="none" stroke="#4A3B47" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M84 46 Q90 41 97 45" fill="none" stroke="#4A3B47" strokeWidth="2.2" strokeLinecap="round" />

          {/* Rosy Cheeks */}
          <ellipse cx="58" cy="69" rx="5" ry="3" fill="#FB7185" opacity="0.45" />
          <ellipse cx="102" cy="69" rx="5" ry="3" fill="#FB7185" opacity="0.45" />

          {/* Happy Smile */}
          <path
            d="M68 72 Q80 84 92 72"
            fill="#F43F5E"
            stroke="#4A3B47"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path d="M74 77 Q80 75 86 77" fill="#FDA4AF" />

          {/* Variant: Graduation Cap */}
          {variant === "grad" && (
            <g transform="translate(80, 18) rotate(-8)">
              <polygon
                points="0,-14 26,-4 0,6 -26,-4"
                fill="#4A3B47"
                stroke="#2D222B"
                strokeWidth="2"
              />
              <path d="M-14,1 L-14,11 Q0,16 14,11 L14,1" fill="#4A3B47" stroke="#2D222B" strokeWidth="2" />
              <path d="M0,-4 L20,4 L20,16" fill="none" stroke="#FCD34D" strokeWidth="2.2" strokeLinecap="round" />
              <circle cx="20" cy="17" r="3" fill="#FCD34D" />
            </g>
          )}

          {/* Variant: Holding a Tiny Birthday Cupcake */}
          {variant === "cake" && (
            <g transform="translate(120, 62)">
              <path d="M-10,10 L10,10 L7,24 L-7,24 Z" fill="#BAE6FD" stroke="#4A3B47" strokeWidth="1.8" />
              <path d="M-12,10 Q-6,2 0,6 Q6,2 12,10 Z" fill="#FFFDF9" stroke="#FF8DA1" strokeWidth="1.8" />
              <rect x="-1.5" y="-4" width="3" height="8" rx="1" fill="#FCD34D" />
              <path d="M0,-10 Q3,-6 0,-4 Q-3,-6 0,-10 Z" fill="#FB923C" />
            </g>
          )}

          {/* Variant: Cheer Sign */}
          {variant === "cheer" && (
            <g transform="translate(115, 22) rotate(12)">
              <rect x="-2" y="14" width="4" height="22" rx="2" fill="#FCD34D" />
              <rect x="-22" y="-8" width="44" height="24" rx="8" fill="#FFFDF9" stroke="#FF8DA1" strokeWidth="2.2" />
              <text
                x="0"
                y="8"
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill="#FF8DA1"
                fontFamily="Fredoka, sans-serif"
              >
                YAY! 🎓
              </text>
            </g>
          )}
        </svg>
        <span className="mt-0.5 block text-[11px] font-hand text-[#4A3B47]/60 opacity-0 transition-opacity group-hover:opacity-100">
          點我一下！✨
        </span>
      </motion.button>
    </div>
  );
};
