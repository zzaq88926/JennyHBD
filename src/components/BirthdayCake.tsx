import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Wind, Mic, MicOff, Sparkles, RotateCcw, Heart, X } from "lucide-react";
import { birthdayConfig, type FriendBlessing } from "../data/birthdayConfig";
import { PatrickSticker } from "./PatrickSticker";

const TAG_STYLES: Record<FriendBlessing["tagColor"], string> = {
  pink: "bg-[#FFEBF0] text-[#E11D48] border-[#FF8DA1]/40",
  sky: "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
  gold: "bg-[#FEF3C7] text-[#B45309] border-[#FCD34D]",
  lime: "bg-[#ECFCCB] text-[#4D7C0F] border-[#B5E48C]",
};

export const BirthdayCake: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [micActive, setMicActive] = useState(false);
  const [micStatus, setMicStatus] = useState<string>("");
  const [revealedCount, setRevealedCount] = useState(0);
  const [selectedBlessing, setSelectedBlessing] = useState<FriendBlessing | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  const stopMic = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setMicActive(false);
  };

  useEffect(() => {
    return () => stopMic();
  }, []);

  // 吹熄蠟燭後，每隔 500ms 陸續可愛彈出一張親友祝福卡片
  useEffect(() => {
    if (candlesLit) {
      setRevealedCount(0);
      return;
    }

    const total = birthdayConfig.wishBlessings.length;
    if (revealedCount >= total) return;

    const timer = setTimeout(
      () => {
        setRevealedCount((c) => Math.min(c + 1, total));
      },
      revealedCount === 0 ? 550 : 520
    );

    return () => clearTimeout(timer);
  }, [candlesLit, revealedCount]);

  const triggerCelebrationFireworks = () => {
    const colors = ["#FF8DA1", "#FCD34D", "#BAE6FD", "#A3E635", "#C084FC"];
    confetti({
      particleCount: 95,
      spread: 100,
      origin: { y: 0.6 },
      colors,
      shapes: ["star", "circle"],
    });
    setTimeout(() => {
      confetti({
        particleCount: 55,
        angle: 60,
        spread: 70,
        origin: { x: 0.15, y: 0.65 },
        colors,
      });
      confetti({
        particleCount: 55,
        angle: 120,
        spread: 70,
        origin: { x: 0.85, y: 0.65 },
        colors,
      });
    }, 300);
  };

  const blowOutCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    stopMic();
    setMicStatus("");
    triggerCelebrationFireworks();
  };

  const relightCandles = () => {
    setCandlesLit(true);
    setRevealedCount(0);
    setMicStatus("");
  };

  const toggleMicDetection = async () => {
    if (micActive) {
      stopMic();
      setMicStatus("");
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setMicStatus("這個瀏覽器不支援麥克風偵測～直接點「許願吹蠟燭」按鈕就可以囉 💕");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      setMicActive(true);
      setMicStatus("對著麥克風輕輕吹一口氣吧... 🌬️");

      const checkVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg =
          dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;
        if (avg > 48) {
          blowOutCandles();
          return;
        }
        rafRef.current = requestAnimationFrame(checkVolume);
      };

      rafRef.current = requestAnimationFrame(checkVolume);
    } catch {
      setMicStatus("沒有開啟麥克風權限也沒關係～直接點按鈕吹蠟燭吧 ✨");
      stopMic();
    }
  };

  const candlePositions = [88, 124, 160, 196, 232];
  const visibleBlessings = birthdayConfig.wishBlessings.slice(0, revealedCount);

  return (
    <section className="relative mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-[#FF8DA1]/30 bg-gradient-to-b from-[#FFFDF9] via-[#FFEBF0]/45 to-[#FFFDF9] px-5 py-12 sm:px-10 sm:py-16 text-center shadow-[0_20px_50px_rgba(255,141,161,0.16)]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FEF3C7] px-4 py-1.5 font-display text-xs font-semibold tracking-wide text-[#B45309] uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            生日許願時間
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#4A3B47]">
            {birthdayConfig.cakeTitle}
          </h2>
          <p className="mx-auto mt-2 max-w-xl font-hand text-xl text-[#4A3B47]/80">
            {birthdayConfig.cakeSubtitle}
          </p>
        </motion.div>

        {/* Illustrated Layered Pastel Birthday Cake */}
        <div className="relative mx-auto mt-10 flex max-w-lg flex-col items-center">
          <svg
            viewBox="0 0 320 260"
            className="w-full max-w-[340px] lg:max-w-[420px] drop-shadow-[0_14px_24px_rgba(255,141,161,0.22)]"
          >
            {/* Cake Stand */}
            <ellipse cx="160" cy="236" rx="115" ry="12" fill="#BAE6FD" />
            <rect x="142" y="218" width="36" height="18" rx="4" fill="#7DD3FC" />
            <ellipse cx="160" cy="218" rx="128" ry="14" fill="#FFFDF9" stroke="#BAE6FD" strokeWidth="3" />

            {/* Bottom Cake Layer */}
            <rect x="52" y="152" width="216" height="64" rx="18" fill="#FFB3C1" stroke="#FF8DA1" strokeWidth="2.5" />
            <path
              d="M52 162 Q66 178 80 164 Q95 182 110 164 Q125 180 140 164 Q158 184 176 164 Q194 180 212 164 Q230 180 248 164 Q260 174 268 162 L268 152 Q268 144 256 144 L64 144 Q52 144 52 152 Z"
              fill="#FFFDF9"
            />

            {/* Top Cake Layer */}
            <rect x="78" y="98" width="164" height="54" rx="16" fill="#FFEBF0" stroke="#FF8DA1" strokeWidth="2.5" />
            <path
              d="M78 108 Q92 122 106 108 Q120 124 134 108 Q148 122 162 108 Q176 124 190 108 Q204 122 218 108 Q232 120 242 108 L242 98 Q242 90 230 90 L90 90 Q78 90 78 98 Z"
              fill="#FFFDF9"
            />

            {/* Sprinkles */}
            <circle cx="96" cy="190" r="4" fill="#FCD34D" />
            <circle cx="132" cy="198" r="3.5" fill="#A3E635" />
            <circle cx="170" cy="192" r="4" fill="#BAE6FD" />
            <circle cx="206" cy="197" r="3.5" fill="#FCD34D" />
            <circle cx="236" cy="188" r="4" fill="#A3E635" />

            {/* Strawberries */}
            {[96, 160, 224].map((sx, idx) => (
              <g key={idx} transform={`translate(${sx}, 86)`}>
                <path
                  d="M0,8 C-8,8 -10,-2 -6,-6 C-2,-10 2,-10 6,-6 C10,-2 8,8 0,8 Z"
                  fill="#FB7185"
                  stroke="#E11D48"
                  strokeWidth="1.5"
                />
                <path d="M-5,-7 L0,-4 L5,-7 L2,-10 L-2,-10 Z" fill="#A3E635" />
              </g>
            ))}

            {/* 5 Birthday Candles */}
            {candlePositions.map((cx, i) => (
              <g key={cx}>
                <rect
                  x={cx - 4.5}
                  y="54"
                  width="9"
                  height="38"
                  rx="3"
                  fill={i % 2 === 0 ? "#BAE6FD" : "#FCD34D"}
                  stroke="#4A3B47"
                  strokeWidth="1.5"
                />
                <line
                  x1={cx - 4}
                  y1="66"
                  x2={cx + 4}
                  y2="72"
                  stroke="#FFFDF9"
                  strokeWidth="2"
                />
                <line x1={cx} y1="48" x2={cx} y2="54" stroke="#4A3B47" strokeWidth="1.8" />

                {candlesLit ? (
                  <motion.g
                    animate={{
                      scale: [1, 1.12, 0.96, 1.08, 1],
                      rotate: [-2, 3, -3, 2, 0],
                    }}
                    transition={{
                      duration: 1.1 + i * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ originX: `${cx}px`, originY: "48px" }}
                  >
                    <circle cx={cx} cy="38" r="13" fill="#FCD34D" opacity="0.32" />
                    <path
                      d={`M${cx} 24 Q${cx + 8} 38 ${cx} 48 Q${cx - 8} 38 ${cx} 24 Z`}
                      fill="#FB923C"
                    />
                    <path
                      d={`M${cx} 32 Q${cx + 4} 40 ${cx} 46 Q${cx - 4} 40 ${cx} 32 Z`}
                      fill="#FEF08A"
                    />
                  </motion.g>
                ) : (
                  <motion.g
                    initial={{ opacity: 0.9, y: 0, scale: 0.6 }}
                    animate={{ opacity: 0, y: -28, scale: 1.4 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                  >
                    <circle cx={cx} cy="40" r="4" fill="#CBD5E1" />
                    <circle cx={cx + 4} cy="33" r="3" fill="#E2E8F0" />
                  </motion.g>
                )}
              </g>
            ))}
          </svg>

          {/* Cheering Patrick Star Pop-Up */}
          <AnimatePresence>
            {!candlesLit && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="mt-2 flex flex-col items-center"
              >
                <PatrickSticker
                  variant="cheer"
                  size={112}
                  showBubbleByDefault
                  initialQuote="耶！！大寶寶 Jenny 24 歲耶誕夜生日快樂！！今天可以多吃兩塊蛋糕喔！！🎂🎄"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-col items-center gap-3">
          {candlesLit ? (
            <>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={blowOutCandles}
                  className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#FF8DA1] to-[#F4728D] px-7 py-3.5 font-display text-base sm:text-lg font-semibold text-[#FFFDF9] shadow-[0_10px_26px_rgba(255,141,161,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Wind className="h-5 w-5" />
                  <span>許願並吹熄蠟燭 🌬️</span>
                </button>

                <button
                  type="button"
                  onClick={toggleMicDetection}
                  className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-3 font-display text-sm font-semibold transition-all cursor-pointer ${
                    micActive
                      ? "border-[#A3E635] bg-[#ECFCCB] text-[#4D7C0F]"
                      : "border-[#BAE6FD] bg-[#FFFDF9] text-[#0369A1] hover:bg-[#E0F2FE]/60"
                  }`}
                >
                  {micActive ? (
                    <>
                      <Mic className="h-4 w-4 animate-pulse" />
                      <span>正在聆聽吹氣...</span>
                    </>
                  ) : (
                    <>
                      <MicOff className="h-4 w-4" />
                      <span>用麥克風吹</span>
                    </>
                  )}
                </button>
              </div>
              {micStatus && (
                <p className="text-xs sm:text-sm font-semibold text-[#0369A1]">
                  {micStatus}
                </p>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full space-y-8"
            >
              <div className="mx-auto max-w-md rounded-2xl border border-[#FCD34D] bg-[#FEF3C7]/60 px-6 py-4">
                <h3 className="font-display text-xl font-bold text-[#B45309]">
                  {birthdayConfig.cakeWishGrantedTitle}
                </h3>
                <p className="mt-1 text-sm sm:text-base text-[#4A3B47]/85">
                  {birthdayConfig.cakeWishGrantedText}
                </p>
              </div>

              {/* 陸續可愛跳出的英國朋友 ＆ 家人照片祝福牆 */}
              <div className="pt-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mb-6"
                >
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#4A3B47]">
                    {birthdayConfig.blessingsHeading}
                  </h3>
                  <p className="mt-1 font-hand text-lg sm:text-xl text-[#4A3B47]/75">
                    {birthdayConfig.blessingsSubheading}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
                  <AnimatePresence>
                    {visibleBlessings.map((item, idx) => (
                      <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedBlessing(item)}
                        initial={{
                          opacity: 0,
                          scale: 0.55,
                          y: 36,
                          rotate: idx % 2 === 0 ? -6 : 6,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          rotate: idx % 2 === 0 ? -1.5 : 1.5,
                        }}
                        whileHover={{ scale: 1.04, rotate: 0, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 18,
                        }}
                        className="group flex flex-col overflow-hidden rounded-3xl border-2 border-[#FF8DA1]/30 bg-[#FFFDF9] p-3.5 shadow-[0_12px_28px_rgba(255,141,161,0.18)] transition-shadow hover:shadow-[0_18px_36px_rgba(255,141,161,0.3)] cursor-pointer focus:outline-none"
                      >
                        {/* 親友照片 */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#FFEBF0]">
                          <img
                            src={item.photoUrl}
                            alt={item.senderName}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span
                            className={`absolute top-2.5 left-2.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold shadow-xs backdrop-blur-xs ${
                              TAG_STYLES[item.tagColor]
                            }`}
                          >
                            {item.relationTag}
                          </span>
                        </div>

                        {/* 名字與簡短祝福 */}
                        <div className="mt-3 px-1 pb-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-display text-base font-bold text-[#4A3B47]">
                              {item.senderName}
                            </h4>
                            <Heart className="h-4 w-4 text-[#FF8DA1] fill-[#FF8DA1]/30 group-hover:fill-[#FF8DA1] transition-colors" />
                          </div>
                          <p className="mt-1.5 font-hand text-lg leading-snug text-[#4A3B47]/85 line-clamp-3">
                            「{item.message}」
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <button
                type="button"
                onClick={relightCandles}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#FF8DA1]/40 bg-[#FFFDF9] px-4 py-2 text-xs font-semibold text-[#FF8DA1] transition hover:bg-[#FFEBF0] cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>重新點亮蠟燭</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* 點擊親友祝福卡片放大的燈箱 */}
      <AnimatePresence>
        {selectedBlessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBlessing(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#4A3B47]/55 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl lg:max-w-2xl overflow-hidden rounded-3xl border-2 border-[#FF8DA1]/40 bg-[#FFFDF9] p-5 sm:p-7 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedBlessing(null)}
                aria-label="關閉祝福卡片"
                className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFDF9]/90 text-[#4A3B47] shadow-md transition hover:scale-105 hover:bg-[#FFEBF0] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="overflow-hidden rounded-2xl bg-[#FFEBF0]">
                <img
                  src={selectedBlessing.photoUrl}
                  alt={selectedBlessing.senderName}
                  className="max-h-[340px] w-full object-cover"
                />
              </div>

              <div className="mt-4 text-left">
                <span
                  className={`inline-block rounded-full border px-3 py-0.5 text-xs font-bold ${
                    TAG_STYLES[selectedBlessing.tagColor]
                  }`}
                >
                  {selectedBlessing.relationTag}
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-[#4A3B47]">
                  {selectedBlessing.senderName}
                </h3>
                <p className="mt-2 font-hand text-xl leading-relaxed text-[#4A3B47]/90">
                  「{selectedBlessing.message}」
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
