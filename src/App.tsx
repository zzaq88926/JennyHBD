import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, GraduationCap, Plane, Sparkles } from "lucide-react";
import { birthdayConfig } from "./data/birthdayConfig";
import { BoardingPassGate } from "./components/BoardingPassGate";
import { FlightTimeline } from "./components/FlightTimeline";
import { PolaroidWall } from "./components/PolaroidWall";
import { BirthdayCake } from "./components/BirthdayCake";
import { LoveLetterEnvelope } from "./components/LoveLetterEnvelope";
import { MusicPlayer } from "./components/MusicPlayer";
import { PatrickSticker } from "./components/PatrickSticker";
import { SideDecorations } from "./components/SideDecorations";
import { SnowfallOverlay } from "./components/SnowfallOverlay";

export function App() {
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = () => {
    setUnlocked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setUnlocked(false);
    }, 350);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#FFFDF9] text-[#4A3B47]">
      {/* 柔和耶誕雪花飄落背景 */}
      <SnowfallOverlay />

      {/* Floating Vinyl Music Controller */}
      <MusicPlayer unlocked={unlocked} />

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <BoardingPassGate key="gate" onUnlock={handleUnlock} />
        ) : (
          <motion.main
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="pastel-dots relative"
          >
            {/* 電腦版左右兩側比奇堡可愛裝飾（海綿寶寶、派大星、水母、花朵雲） */}
            <SideDecorations />

            {/* Welcome Hero Banner */}
            <header className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pt-20 pb-12 sm:pt-28 sm:pb-20 text-center">
              {/* Decorative Floating Icons */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute top-14 left-6 sm:left-16 text-[#BAE6FD]"
              >
                <Plane className="h-8 w-8 sm:h-10 sm:w-10 rotate-12" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute top-20 right-6 sm:right-20 text-[#FCD34D]"
              >
                <GraduationCap className="h-9 w-9 sm:h-11 sm:w-11" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#FF8DA1]/40 bg-[#FFEBF0]/80 px-4 py-1.5 font-display text-xs sm:text-sm font-semibold text-[#E11D48] shadow-xs"
              >
                <Sparkles className="h-4 w-4 text-[#FCD34D]" />
                <span>{birthdayConfig.heroBadge}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#4A3B47]"
              >
                {birthdayConfig.heroTitle}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 }}
                className="mt-4 max-w-3xl font-hand text-xl sm:text-2xl lg:text-[26px] leading-relaxed text-[#4A3B47]/80"
              >
                {birthdayConfig.heroSubtitle}
              </motion.p>

              {/* Hero Patrick Star Mascot */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-8"
              >
                <PatrickSticker
                  variant="grad"
                  size={142}
                  initialQuote="往下滑，展開妳的生日驚喜冒險吧！🌟"
                />
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="mt-8 flex flex-col items-center text-xs font-semibold text-[#FF8DA1]"
              >
                <span>往下滑動開始旅程</span>
                <ChevronDown className="mt-1 h-5 w-5" />
              </motion.div>
            </header>

            {/* Act 2A: Flight-Path Relationship Timeline */}
            <FlightTimeline />

            {/* Act 2B: Interactive Polaroid Photo Wall */}
            <PolaroidWall />

            {/* Act 3: Interactive Birthday Cake & Make-a-Wish */}
            <BirthdayCake />

            {/* Act 4: Cute Envelope & Handwritten Birthday Letter */}
            <LoveLetterEnvelope onReplay={handleReplay} />

            {/* Footer */}
            <footer className="border-t border-[#FF8DA1]/20 bg-[#FFEBF0]/45 py-8 text-center">
              <p className="font-hand text-lg sm:text-xl text-[#4A3B47]/75">
                {birthdayConfig.footerText}
              </p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
