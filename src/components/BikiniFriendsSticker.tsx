import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type FriendCharacter = "gary" | "sandy";

interface BikiniFriendsStickerProps {
  character: FriendCharacter;
  className?: string;
  size?: number;
  quotes: string[];
}

const STAR_COLORS = ["#BAE6FD", "#FF8DA1", "#FCD34D", "#C084FC"];

export const BikiniFriendsSticker: React.FC<BikiniFriendsStickerProps> = ({
  character,
  className = "",
  size = 108,
  quotes,
}) => {
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [bounceKey, setBounceKey] = useState(0);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; color: string }[]
  >([]);

  const handleClick = () => {
    setBounceKey((k) => k + 1);
    setShowBubble(true);
    setQuoteIdx((i) => (i + 1) % quotes.length);

    const newP = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 95,
      y: -28 - Math.random() * 50,
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
            className="absolute -top-16 left-1/2 -translate-x-1/2 z-30 w-max max-w-[225px] cursor-pointer rounded-2xl border-2 border-[#7DD3FC]/70 bg-[#FFFDF9] px-3.5 py-2 text-center shadow-lg"
          >
            <p className="font-hand text-sm sm:text-base leading-snug text-[#4A3B47]">
              {quotes[quoteIdx % quotes.length]}
            </p>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-3.5 w-3.5 rotate-45 border-b-2 border-r-2 border-[#7DD3FC]/70 bg-[#FFFDF9]" />
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
        aria-label={character === "gary" ? "小蝸 Gary 貼紙" : "松鼠珊迪 Sandy 貼紙"}
        whileHover={{ scale: 1.08, rotate: [-2, 2, 0] }}
        whileTap={{ scale: 0.92 }}
        animate={
          bounceKey > 0
            ? { y: [0, -14, 0, -6, 0], rotate: [0, -6, 6, 0] }
            : { y: [0, -4, 0] }
        }
        transition={
          bounceKey > 0
            ? { duration: 0.5 }
            : { duration: 3.6, repeat: Infinity, ease: "easeInOut" }
        }
        className="group relative cursor-pointer focus:outline-none"
        style={{ width: size, height: size }}
      >
        {character === "gary" ? (
          /* 小蝸 Gary SVG */
          <svg
            viewBox="0 0 160 150"
            className="h-full w-full drop-shadow-[0_6px_12px_rgba(186,230,253,0.45)]"
          >
            {/* 白色貼紙描邊底 */}
            <ellipse cx="82" cy="112" rx="56" ry="20" fill="#FFFDF9" stroke="#FFFDF9" strokeWidth="8" />
            <circle cx="96" cy="76" r="42" fill="#FFFDF9" stroke="#FFFDF9" strokeWidth="8" />

            {/* 天藍色蝸牛身體 */}
            <path
              d="M28 118 Q22 104 36 96 Q54 92 64 102 L126 102 Q140 104 136 118 Q132 128 116 128 L42 128 Q28 128 28 118 Z"
              fill="#7DD3FC"
              stroke="#0284C7"
              strokeWidth="2.5"
            />
            {/* 粉紅底邊 */}
            <path d="M34 123 L130 123" stroke="#FF8DA1" strokeWidth="5" strokeLinecap="round" />

            {/* 蝸牛觸角眼睛 */}
            <line x1="42" y1="96" x2="36" y2="54" stroke="#7DD3FC" strokeWidth="5.5" strokeLinecap="round" />
            <line x1="56" y1="96" x2="58" y2="52" stroke="#7DD3FC" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="35" cy="48" r="11" fill="#FFFDF9" stroke="#4A3B47" strokeWidth="2.2" />
            <circle cx="59" cy="46" r="11" fill="#FFFDF9" stroke="#4A3B47" strokeWidth="2.2" />
            <circle cx="35" cy="48" r="4.5" fill="#FB7185" />
            <circle cx="59" cy="46" r="4.5" fill="#FB7185" />
            <circle cx="35" cy="48" r="2" fill="#4A3B47" />
            <circle cx="59" cy="46" r="2" fill="#4A3B47" />

            {/* 可愛微笑 */}
            <path d="M36 109 Q45 115 54 109" fill="none" stroke="#4A3B47" strokeWidth="2" strokeLinecap="round" />

            {/* 粉紅螺旋蝸牛殼 */}
            <circle cx="96" cy="76" r="38" fill="#FFB3C1" stroke="#E16B82" strokeWidth="2.5" />
            <path
              d="M96 76 C96 68 106 68 106 76 C106 88 86 88 86 74 C86 58 116 58 116 78 C116 96 78 96 76 74"
              fill="none"
              stroke="#C084FC"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="80" cy="52" r="4" fill="#A855F7" opacity="0.65" />
            <circle cx="114" cy="96" r="4.5" fill="#A855F7" opacity="0.65" />
          </svg>
        ) : (
          /* 可愛松鼠珊迪 Sandy SVG（太空頭盔 + 粉紅小花 + 蓬鬆尾巴） */
          <svg
            viewBox="0 0 165 175"
            className="h-full w-full drop-shadow-[0_6px_12px_rgba(186,230,253,0.45)]"
          >
            {/* 蓬鬆松鼠大尾巴 */}
            <path
              d="M44 128 C12 122 8 84 26 76 C40 70 46 92 48 112 Z"
              fill="#B47B56"
              stroke="#7C4D32"
              strokeWidth="2.5"
            />

            {/* 白色太空服身體 */}
            <rect
              x="54"
              y="98"
              width="52"
              height="44"
              rx="16"
              fill="#FFFDF9"
              stroke="#94A3B8"
              strokeWidth="2.4"
            />
            {/* 太空服紫色領環與橡果徽章 */}
            <rect x="52" y="94" width="56" height="8" rx="4" fill="#C084FC" />
            <circle cx="80" cy="120" r="6" fill="#FCD34D" stroke="#CA8A04" strokeWidth="1.5" />

            {/* 太空服雙手與雙腳 */}
            <path d="M54 108 Q38 112 40 124 Q48 128 56 120" fill="#FFFDF9" stroke="#94A3B8" strokeWidth="2.2" />
            <path d="M106 108 Q122 112 120 124 Q112 128 104 120" fill="#FFFDF9" stroke="#94A3B8" strokeWidth="2.2" />
            <ellipse cx="66" cy="146" rx="10" ry="6" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
            <ellipse cx="94" cy="146" rx="10" ry="6" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />

            {/* 透明玻璃太空頭盔外框 */}
            <circle
              cx="80"
              cy="60"
              r="42"
              fill="#E0F2FE"
              fillOpacity="0.45"
              stroke="#7DD3FC"
              strokeWidth="3"
            />

            {/* 松鼠小耳朵 */}
            <ellipse cx="58" cy="34" rx="7" ry="11" transform="rotate(-15 58 34)" fill="#B47B56" stroke="#7C4D32" strokeWidth="2" />
            <ellipse cx="102" cy="34" rx="7" ry="11" transform="rotate(15 102 34)" fill="#B47B56" stroke="#7C4D32" strokeWidth="2" />

            {/* 松鼠圓圓臉 */}
            <circle cx="80" cy="63" r="26" fill="#B47B56" stroke="#7C4D32" strokeWidth="2.2" />
            <ellipse cx="80" cy="70" rx="18" ry="14" fill="#E6C2A5" />

            {/* 大眼睛 */}
            <circle cx="70" cy="56" r="6.5" fill="#FFFDF9" stroke="#4A3B47" strokeWidth="1.8" />
            <circle cx="90" cy="56" r="6.5" fill="#FFFDF9" stroke="#4A3B47" strokeWidth="1.8" />
            <circle cx="71" cy="56" r="3" fill="#4A3B47" />
            <circle cx="89" cy="56" r="3" fill="#4A3B47" />
            <circle cx="72" cy="54.5" r="1.2" fill="#FFFFFF" />
            <circle cx="90" cy="54.5" r="1.2" fill="#FFFFFF" />

            {/* 可愛鼻頭、腮紅與微笑 */}
            <ellipse cx="80" cy="65" rx="4" ry="2.8" fill="#4A3B47" />
            <ellipse cx="60" cy="67" rx="4" ry="2.5" fill="#FF8DA1" opacity="0.55" />
            <ellipse cx="100" cy="67" rx="4" ry="2.5" fill="#FF8DA1" opacity="0.55" />
            <path d="M71 73 Q80 81 89 73" fill="none" stroke="#4A3B47" strokeWidth="2.2" strokeLinecap="round" />

            {/* 頭盔玻璃反光 */}
            <path d="M48 45 Q54 30 68 26" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.8" />

            {/* 頭盔頂端經典粉紅小花 */}
            <g transform="translate(106, 28) rotate(20)">
              <circle cx="0" cy="-6" r="5" fill="#FF8DA1" />
              <circle cx="6" cy="-2" r="5" fill="#FF8DA1" />
              <circle cx="4" cy="5" r="5" fill="#FF8DA1" />
              <circle cx="-4" cy="5" r="5" fill="#FF8DA1" />
              <circle cx="-6" cy="-2" r="5" fill="#FF8DA1" />
              <circle cx="0" cy="0" r="4" fill="#FDE047" />
            </g>
          </svg>
        )}
        <span className="mt-0.5 block text-[11px] font-hand text-[#4A3B47]/60 opacity-0 transition-opacity group-hover:opacity-100">
          {character === "gary" ? "喵～點我！🐚" : "耶哈！點我 🌸"}
        </span>
      </motion.button>
    </div>
  );
};
