import React from "react";
import { motion } from "framer-motion";
import { PatrickSticker } from "./PatrickSticker";
import { SpongeBobSticker } from "./SpongeBobSticker";
import { BikiniFriendsSticker } from "./BikiniFriendsSticker";

/** 粉彩小花朵雲 SVG（比奇堡經典天空花朵元素） */
const FlowerCloud: React.FC<{ color: string; className?: string }> = ({
  color,
  className = "",
}) => (
  <svg
    viewBox="0 0 80 80"
    className={`w-14 h-14 opacity-55 pointer-events-none ${className}`}
    fill="none"
  >
    <path
      d="M40 12 C47 12 50 22 46 28 C54 24 64 28 64 36 C64 43 56 46 50 44 C56 50 54 62 46 64 C40 66 36 58 38 52 C32 58 22 56 20 48 C18 40 26 36 32 38 C24 34 22 22 30 18 C34 14 36 12 40 12 Z"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** 可愛粉紅小水母 SVG */
const CuteJellyfish: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 80 90" className={`w-14 h-16 opacity-80 pointer-events-none ${className}`}>
    <path
      d="M16 42 C16 18 64 18 64 42 C64 48 16 48 16 42 Z"
      fill="#FF8DA1"
      stroke="#E16B82"
      strokeWidth="2.5"
    />
    <ellipse cx="32" cy="30" rx="6" ry="3.5" fill="#FFEBF0" opacity="0.7" />
    <path d="M26 46 Q22 62 28 74" fill="none" stroke="#FF8DA1" strokeWidth="3" strokeLinecap="round" />
    <path d="M40 46 Q44 64 38 78" fill="none" stroke="#BAE6FD" strokeWidth="3" strokeLinecap="round" />
    <path d="M54 46 Q58 60 52 72" fill="none" stroke="#FF8DA1" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/** 粉彩可愛小耶誕樹 SVG */
const CuteXmasTree: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 90 110" className={`w-16 h-20 opacity-90 pointer-events-none drop-shadow-sm ${className}`}>
    {/* 樹幹 */}
    <rect x="38" y="84" width="14" height="16" rx="3" fill="#D4A373" stroke="#9C6644" strokeWidth="2" />
    {/* 三層粉綠耶誕樹 */}
    <polygon points="45,38 14,86 76,86" fill="#86EFAC" stroke="#22C55E" strokeWidth="2.2" strokeLinejoin="round" />
    <polygon points="45,24 20,62 70,62" fill="#A3E635" stroke="#65A30D" strokeWidth="2.2" strokeLinejoin="round" />
    <polygon points="45,12 28,40 62,40" fill="#BEF264" stroke="#65A30D" strokeWidth="2.2" strokeLinejoin="round" />
    {/* 頂端星星 */}
    <path
      d="M45 2 L47.5 8 L54 8.5 L49 12.5 L50.5 19 L45 15.5 L39.5 19 L41 12.5 L36 8.5 L42.5 8 Z"
      fill="#FCD34D"
      stroke="#CA8A04"
      strokeWidth="1.2"
    />
    {/* 裝飾彩球 */}
    <circle cx="38" cy="52" r="3.5" fill="#FF8DA1" />
    <circle cx="54" cy="48" r="3.5" fill="#BAE6FD" />
    <circle cx="32" cy="74" r="4" fill="#FCD34D" />
    <circle cx="56" cy="72" r="4" fill="#FF8DA1" />
    <circle cx="44" cy="66" r="3" fill="#C084FC" />
  </svg>
);

export const SideDecorations: React.FC = () => {
  return (
    <div className="hidden xl:block pointer-events-none absolute inset-0 overflow-hidden z-10">
      {/* === 左側裝飾群 === */}
      {/* 1. 左上：海綿寶寶（戴派對帽造型） */}
      <div className="pointer-events-auto absolute top-[12%] left-6 2xl:left-12">
        <SpongeBobSticker
          variant="party"
          size={118}
          quotes={[
            "叮叮噹！12/24 耶誕夜大寶寶 Jenny 24 歲生日快樂！🎄🎉",
            "比奇堡居民全體祝我們的以淇生日大快樂！🍍",
            "耶誕老公公說，今天小貪吃鬼可以多吃好幾口甜點喔！🍰",
          ]}
        />
      </div>

      {/* 耶誕小樹 */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[22%] left-12 2xl:left-20"
      >
        <CuteXmasTree />
      </motion.div>

      {/* 2. 左中上：小蝸 Gary */}
      <div className="pointer-events-auto absolute top-[32%] left-8 2xl:left-16">
        <BikiniFriendsSticker
          character="gary"
          size={104}
          quotes={[
            "喵～（翻譯：以淇 24 歲生日快樂，耶誕夜要開開心心！）🐚🎄",
            "喵喵～（翻譯：阿母跟大家都在台灣超想妳的喔！）💕",
            "喵～✨（翻譯：今天不准當小笨蛋，要穿暖暖吃飽飽！）",
          ]}
        />
      </div>

      <motion.div
        animate={{ y: [0, 16, 0], x: [0, 6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[47%] left-10 2xl:left-16"
      >
        <CuteJellyfish />
      </motion.div>

      {/* 3. 左中下：派大星（舉蛋糕造型） */}
      <div className="pointer-events-auto absolute top-[61%] left-6 2xl:left-12">
        <PatrickSticker
          variant="cake"
          size={116}
          quotes={[
            "派大星說妳今天有特權可以多吃兩塊蛋糕喔！🍰🍰",
            "許個 24 歲的大願望吧，派大星跟耶誕爺爺會幫妳守護！⭐",
            "聽說大寶寶廚藝大漲了！回台灣也要煮給我們吃喔！🍓",
          ]}
        />
      </div>

      {/* 4. 左下：海綿寶寶（舉愛心造型） */}
      <div className="pointer-events-auto absolute top-[82%] left-8 2xl:left-14">
        <SpongeBobSticker
          variant="heart"
          size={112}
          quotes={[
            "這顆愛心剛從台中飛過一萬公里送到布里斯托囉！❤️",
            "我們已經一起撐過一半了，期待大寶寶畢業歸來！🎓",
            "就算變成小豬我也一樣最愛妳啦，愛妳愛妳喔！🐷💕",
          ]}
        />
      </div>

      {/* === 右側裝飾群 === */}
      {/* 1. 右上：粉色花朵雲 + 耶誕樹 */}
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[11%] right-10 2xl:right-16"
      >
        <FlowerCloud color="#FF8DA1" />
      </motion.div>

      {/* 2. 右中上：派大星（歡呼造型） */}
      <div className="pointer-events-auto absolute top-[21%] right-6 2xl:right-12">
        <PatrickSticker
          variant="cheer"
          size={118}
          quotes={[
            "喔耶！12/24 耶誕夜寶寶 Jenny 24 歲生日快樂！🎄🌟",
            "謝謝 Arica 他們代替我陪大寶寶一起慶祝～乾杯！🥂",
            "妳的笑聲跟上銀實習時一樣超可愛、超有感染力！💖",
          ]}
        />
      </div>

      {/* 3. 右中：可愛松鼠珊迪 Sandy */}
      <div className="pointer-events-auto absolute top-[43%] right-7 2xl:right-14">
        <BikiniFriendsSticker
          character="sandy"
          size={114}
          quotes={[
            "耶哈！祝 24 歲的 Jenny 耶誕節＆生日雙重快樂！🐿️🎄",
            "從台灣到東京再到英國，妳是最棒的神仙旅伴！✈️✨",
            "空手道劈出一整年的好運氣，學業順利過關！🥋💕",
          ]}
        />
      </div>

      {/* 4. 右中下：耶誕樹 + 水母 */}
      <motion.div
        animate={{ y: [0, -14, 0], x: [0, -6, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[60%] right-12 2xl:right-20"
      >
        <CuteJellyfish />
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0], rotate: [2, -2, 2] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[73%] right-8 2xl:right-16"
      >
        <CuteXmasTree />
      </motion.div>

      {/* 5. 右下：派大星（戴學士帽造型） */}
      <div className="pointer-events-auto absolute top-[86%] right-6 2xl:right-12">
        <PatrickSticker
          variant="grad"
          size={116}
          quotes={[
            "先幫妳試戴學士帽！祝 Jenny 剩下的留學時光一路綠燈！🎓",
            "在布里斯托加油喔，阿母跟大家都等妳回來一起打鬧！🇬🇧💕",
            "12/24 耶誕夜快樂，今天記得多吃兩塊蛋糕喔～🍰",
          ]}
        />
      </div>
    </div>
  );
};
