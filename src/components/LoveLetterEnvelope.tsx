import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Mail, Plane, RotateCcw, GraduationCap, Sparkles } from "lucide-react";
import { birthdayConfig } from "../data/birthdayConfig";
import { PatrickSticker } from "./PatrickSticker";

interface LoveLetterEnvelopeProps {
  onReplay: () => void;
}

export const LoveLetterEnvelope: React.FC<LoveLetterEnvelopeProps> = ({
  onReplay,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { letter } = birthdayConfig;

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#FF8DA1", "#BAE6FD", "#FCD34D", "#A3E635"],
      shapes: ["star", "circle"],
    });
  };

  return (
    <section className="relative mx-auto max-w-5xl xl:max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mb-12 text-center"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFEBF0] px-4 py-1.5 font-display text-xs font-semibold tracking-wide text-[#E11D48] uppercase">
          <Mail className="h-3.5 w-3.5" />
          航空信件 • 專人急件送達
        </span>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#4A3B47]">
          {letter.heading}
        </h2>
        {!isOpen && (
          <p className="mt-2 font-hand text-xl text-[#4A3B47]/75">
            點一下蠟封，打開專屬妳的生日驚喜信 ✨
          </p>
        )}
      </motion.div>

      {/* Envelope / Letter Container */}
      <div className="relative mx-auto flex max-w-3xl lg:max-w-4xl flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Sealed Airmail Envelope */
            <motion.button
              key="sealed-envelope"
              type="button"
              onClick={handleOpenEnvelope}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -12 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full max-w-md lg:max-w-xl cursor-pointer rounded-3xl p-2 airmail-border shadow-[0_20px_50px_rgba(255,141,161,0.28)] focus:outline-none"
            >
              <div className="relative overflow-hidden rounded-2xl bg-[#FFEBF0] px-6 py-14 sm:py-16">
                {/* Top Envelope Flap */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-28 origin-top border-b-2 border-[#FF8DA1]/30 bg-gradient-to-b from-[#FFD6E0] to-[#FFEBF0]"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                />

                {/* Par Avion Badge */}
                <div className="relative z-10 mb-8 flex items-center justify-between text-xs font-bold tracking-widest text-[#0284C7] uppercase">
                  <span className="inline-flex items-center gap-1 rounded-md border border-[#BAE6FD] bg-[#FFFDF9]/90 px-2.5 py-1">
                    <Plane className="h-3.5 w-3.5" />
                    PAR AVION
                  </span>
                  <span className="rounded-md border border-[#FF8DA1]/40 bg-[#FFFDF9]/90 px-2.5 py-1 text-[#FF8DA1]">
                    TPE ➔ BRS
                  </span>
                </div>

                {/* Wax Seal Button */}
                <div className="relative z-20 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FF8DA1] to-[#E11D48] text-[#FFFDF9] shadow-[0_8px_20px_rgba(225,29,72,0.35)] ring-4 ring-[#FFFDF9]/70 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <div className="flex flex-col items-center">
                    <GraduationCap className="h-7 w-7" />
                    <Sparkles className="h-3.5 w-3.5 -mt-0.5 text-[#FCD34D]" />
                  </div>
                </div>

                <p className="relative z-10 mt-6 font-hand text-2xl text-[#4A3B47]">
                  收件人：{birthdayConfig.boardingPass.passengerDisplayName}
                </p>
                <p className="relative z-10 mt-1 text-xs font-semibold text-[#FF8DA1]">
                  輕輕點一下拆開信封 💌
                </p>
              </div>
            </motion.button>
          ) : (
            /* Opened Lined Stationery Letter Card */
            <motion.div
              key="opened-letter"
              initial={{ opacity: 0, y: 40, rotateX: -12 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 180, damping: 20 }}
              className="relative w-full rounded-3xl p-2 airmail-border shadow-[0_24px_60px_rgba(74,59,71,0.14)]"
            >
              <div className="relative rounded-2xl lined-paper px-6 py-8 sm:px-10 sm:py-12">
                {/* Cute Patrick holding cake sticker in corner */}
                <div className="float-right ml-3 mb-2 -mt-2">
                  <PatrickSticker
                    variant="cake"
                    size={86}
                    initialQuote="24 歲生日快樂！派大星批准妳多吃兩塊蛋糕喔！🍰🍰"
                  />
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="font-hand text-2xl sm:text-3xl font-bold text-[#E11D48]"
                >
                  {letter.salutation}
                </motion.p>

                <div className="mt-5 space-y-5">
                  {letter.paragraphs.map((para, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.14, duration: 0.5 }}
                      className="font-hand text-xl sm:text-[22px] leading-8 text-[#4A3B47]"
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-8 border-t border-dashed border-[#FF8DA1]/40 pt-5"
                >
                  <p className="font-hand text-xl text-[#4A3B47]/80">
                    {letter.signOff}
                  </p>
                  <p className="font-hand text-2xl sm:text-3xl font-bold text-[#FF8DA1]">
                    {letter.senderName}
                  </p>
                  <p className="mt-2 font-hand text-lg text-[#0369A1]">
                    {letter.postscript}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Replay Celebration Button */}
        {isOpen && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            onClick={onReplay}
            className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-[#BAE6FD] bg-[#FFFDF9] px-6 py-3 font-display text-sm font-semibold text-[#0369A1] shadow-md transition-all hover:scale-105 hover:bg-[#E0F2FE]/60 cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>重播這趟驚喜旅程</span>
          </motion.button>
        )}
      </div>
    </section>
  );
};
