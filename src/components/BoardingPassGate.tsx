import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Plane, Sparkles, HelpCircle, GraduationCap, ArrowRight, Ticket } from "lucide-react";
import { birthdayConfig } from "../data/birthdayConfig";
import { PatrickSticker } from "./PatrickSticker";
import { SpongeBobSticker } from "./SpongeBobSticker";

interface BoardingPassGateProps {
  onUnlock: () => void;
}

export const BoardingPassGate: React.FC<BoardingPassGateProps> = ({ onUnlock }) => {
  const { boardingPass } = birthdayConfig;
  const [typedText, setTypedText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  // Typewriter effect for the prompt
  useEffect(() => {
    const fullText = boardingPass.typewriterPrompt;
    let index = 0;
    const timer = setInterval(() => {
      index += 1;
      setTypedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(timer);
      }
    }, 45);
    return () => clearInterval(timer);
  }, [boardingPass.typewriterPrompt]);

  const fireStarConfetti = () => {
    const colors = ["#FF8DA1", "#BAE6FD", "#FCD34D", "#A3E635", "#FFEBF0"];
    confetti({
      particleCount: 80,
      spread: 85,
      origin: { y: 0.55 },
      colors,
      shapes: ["star", "circle"],
      scalar: 1.1,
    });
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 65,
        origin: { x: 0.1, y: 0.65 },
        colors,
        shapes: ["star", "circle"],
      });
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 65,
        origin: { x: 0.9, y: 0.65 },
        colors,
        shapes: ["star", "circle"],
      });
    }, 220);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isApproved) return;

    const normalized = inputValue.trim().toLowerCase();
    const isMatch = boardingPass.acceptedNames.some(
      (name) => name.toLowerCase() === normalized
    );

    if (isMatch) {
      setErrorMsg("");
      setIsApproved(true);
      fireStarConfetti();
      setTimeout(() => {
        onUnlock();
      }, 1550);
    } else {
      setErrorShake(true);
      setErrorMsg("咦，好像不在 VIP 乘客名單上喔！點一下提示看看 💕");
      setTimeout(() => setErrorShake(false), 500);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.97 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#FFEBF0] to-[#E0F2FE] px-4 py-10"
    >
      {/* Subtle floating clouds & paper planes background */}
      <motion.div
        animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-12 left-8 text-[#BAE6FD] opacity-60"
      >
        <Plane className="h-10 w-10 rotate-12" />
      </motion.div>
      <motion.div
        animate={{ x: [0, -16, 0], y: [0, 12, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-14 right-10 text-[#FF8DA1] opacity-40"
      >
        <Sparkles className="h-12 w-12" />
      </motion.div>

      {/* Main Boarding Pass Card */}
      <div className="relative w-full max-w-3xl lg:max-w-4xl">
        {/* Peeking Patrick Star with Graduation Cap */}
        <div className="absolute -top-16 right-2 sm:-top-16 sm:right-6 z-20">
          <PatrickSticker
            variant="grad"
            size={96}
            initialQuote="準備好起飛了嗎，今日壽星 Jenny？🎓✈️"
          />
        </div>

        {/* Peeking SpongeBob on bottom-left for desktop */}
        <div className="hidden lg:block absolute -bottom-12 -left-16 z-20">
          <SpongeBobSticker
            size={105}
            initialQuote="快輸入通關密語登機囉！🍍✨"
          />
        </div>

        <motion.div
          animate={
            errorShake
              ? { x: [-10, 10, -8, 8, -4, 4, 0] }
              : isApproved
              ? { scale: [1, 1.02, 0.98], y: [0, -6, 0] }
              : {}
          }
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl border-2 border-[#FF8DA1]/35 bg-[#FFFDF9] shadow-[0_20px_60px_rgba(255,141,161,0.22)]"
        >
          {/* Top Airline Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-[#FF8DA1] via-[#FFA6B6] to-[#BAE6FD] px-6 py-4 text-[#FFFDF9]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFDF9]/25 backdrop-blur-sm">
                <Ticket className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-sm sm:text-base font-bold tracking-wide uppercase">
                  派大星航空 • 專屬登機證
                </p>
                <p className="text-xs font-semibold text-[#FFFDF9]/90">
                  頭等艙生日驚喜專機
                </p>
              </div>
            </div>
            <span className="rounded-full bg-[#FFFDF9]/90 px-3 py-1 font-display text-xs font-bold text-[#FF8DA1] shadow-sm">
              班次 {boardingPass.flightNumber}
            </span>
          </div>

          {/* Route Banner: FROM TAIWAN -> UK & GRADUATION -> YOUR BIRTHDAY */}
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 border-b-2 border-dashed border-[#FF8DA1]/30 bg-[#FFFDF9] px-6 py-6">
            <div className="text-center sm:text-left">
              <span className="text-[11px] font-bold tracking-widest text-[#FF8DA1] uppercase">
                出發地 From
              </span>
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#4A3B47]">
                {boardingPass.fromCode}
              </p>
              <p className="text-xs font-bold tracking-wider text-[#4A3B47]/65 uppercase">
                {boardingPass.fromCity}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="flex w-full items-center justify-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FF8DA1]" />
                <div className="h-[2px] flex-1 border-t-2 border-dashed border-[#BAE6FD]" />
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-full bg-[#E0F2FE] p-2 text-[#0284C7]"
                >
                  <Plane className="h-4 w-4 rotate-45" />
                </motion.div>
                <div className="h-[2px] flex-1 border-t-2 border-dashed border-[#BAE6FD]" />
                <span className="h-2 w-2 rounded-full bg-[#A3E635]" />
              </div>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#FEF3C7] px-3 py-0.5 text-[11px] font-bold text-[#B45309]">
                <GraduationCap className="h-3.5 w-3.5" />
                {boardingPass.toCity}
              </span>
            </div>

            <div className="text-center sm:text-right">
              <span className="text-[11px] font-bold tracking-widest text-[#0284C7] uppercase">
                目的地 Destination
              </span>
              <p className="font-display text-2xl sm:text-3xl font-bold text-[#4A3B47]">
                {boardingPass.toCode}
              </p>
              <p className="text-xs font-bold tracking-wider text-[#FF8DA1] uppercase">
                {boardingPass.destinationTag}
              </p>
            </div>
          </div>

          {/* Perforated Ticket Cutout Circles */}
          <div className="relative">
            <div className="absolute -left-3.5 -top-3.5 h-7 w-7 rounded-full bg-[#FFEBF0] border-r-2 border-[#FF8DA1]/30" />
            <div className="absolute -right-3.5 -top-3.5 h-7 w-7 rounded-full bg-[#E0F2FE] border-l-2 border-[#FF8DA1]/30" />
          </div>

          {/* Gate Verification Body */}
          <div className="px-6 py-7 sm:px-8">
            {/* Metadata Pills */}
            <div className="mb-6 grid grid-cols-3 gap-2 rounded-2xl bg-[#FFEBF0]/55 p-3 text-center text-xs">
              <div>
                <p className="text-[10px] font-bold uppercase text-[#4A3B47]/55">登機門 Gate</p>
                <p className="font-display font-semibold text-[#4A3B47]">{boardingPass.gate}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-[#4A3B47]/55">座位 Seat</p>
                <p className="font-display font-semibold text-[#4A3B47]">{boardingPass.seat}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-[#4A3B47]/55">日期 Date</p>
                <p className="font-display font-semibold text-[#FF8DA1]">12/24 耶誕夜 🎄</p>
              </div>
            </div>

            {/* Typewriter Prompt */}
            <div className="mb-4 text-center">
              <p className="font-hand text-xl sm:text-2xl text-[#4A3B47]">
                {typedText}
                <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-[#FF8DA1] align-middle" />
              </p>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isApproved}
                  placeholder="輸入妳的名字或小暱稱..."
                  className="flex-1 rounded-2xl border-2 border-[#FF8DA1]/35 bg-[#FFFDF9] px-4 py-3 text-center sm:text-left font-display text-base text-[#4A3B47] placeholder-[#4A3B47]/40 outline-none transition-all focus:border-[#FF8DA1] focus:ring-4 focus:ring-[#FF8DA1]/15"
                />
                <button
                  type="submit"
                  disabled={isApproved}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF8DA1] to-[#F4728D] px-6 py-3 font-display text-base font-semibold text-[#FFFDF9] shadow-[0_6px_18px_rgba(255,141,161,0.38)] transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                >
                  <span>登機出發</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Error or Hint Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowHint((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0284C7] hover:text-[#0369A1] cursor-pointer"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>{showHint ? "隱藏小提示" : "需要一點小提示嗎？"}</span>
                </button>

                {errorMsg && (
                  <p className="text-xs font-semibold text-[#E11D48]">{errorMsg}</p>
                )}
              </div>

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-xl border border-[#BAE6FD] bg-[#E0F2FE]/60 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#0369A1]">
                      {boardingPass.hintText}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* APPROVED Stamp Overlay */}
          <AnimatePresence>
            {isApproved && (
              <motion.div
                initial={{ opacity: 0, scale: 2.2, rotate: -18 }}
                animate={{ opacity: 1, scale: 1, rotate: -10 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-[#FFFDF9]/55 backdrop-blur-[2px]"
              >
                <div className="rounded-2xl border-4 border-[#A3E635] bg-[#FFFDF9]/95 px-8 py-4 text-center shadow-2xl">
                  <p className="font-display text-2xl sm:text-4xl font-bold tracking-wider text-[#65A30D]">
                    登機通過 APPROVED ✨
                  </p>
                  <p className="mt-1 font-hand text-lg text-[#4A3B47]">
                    歡迎登機，{boardingPass.passengerDisplayName}！
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
};
