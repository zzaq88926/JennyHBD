import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, X, Heart, Camera } from "lucide-react";
import { birthdayConfig, type PolaroidPhoto } from "../data/birthdayConfig";
import { PatrickSticker } from "./PatrickSticker";

export const PolaroidWall: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidPhoto | null>(null);

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-8 py-16 sm:py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative mb-14 flex flex-col items-center text-center"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFEBF0] px-4 py-1.5 font-display text-xs font-semibold tracking-wide text-[#E11D48] uppercase">
          <Camera className="h-3.5 w-3.5" />
          珍藏回憶相簿
        </span>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#4A3B47]">
          {birthdayConfig.polaroidTitle}
        </h2>
        <p className="mt-2 font-hand text-xl text-[#4A3B47]/75">
          {birthdayConfig.polaroidSubtitle}
        </p>

        {/* Cute Patrick Sticker peeking near the header on desktop */}
        <div className="mt-4 md:mt-0 md:absolute md:-top-4 md:right-8">
          <PatrickSticker
            variant="peek"
            size={88}
            initialQuote="哇～這些照片也太可愛了吧！📸✨"
          />
        </div>
      </motion.div>

      {/* Scattered Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8">
        {birthdayConfig.polaroids.map((photo, index) => (
          <motion.button
            key={photo.id}
            type="button"
            onClick={() => setSelectedPhoto(photo)}
            initial={{ opacity: 0, y: 28, rotate: photo.tiltDeg }}
            whileInView={{ opacity: 1, y: 0, rotate: photo.tiltDeg }}
            viewport={{ once: true, margin: "-40px" }}
            whileHover={{
              rotate: 0,
              scale: 1.05,
              y: -6,
              zIndex: 20,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: (index % 4) * 0.05,
            }}
            className="group relative flex flex-col rounded-sm bg-[#FFFFFF] p-3.5 pb-5 text-left shadow-[0_10px_28px_rgba(74,59,71,0.12)] ring-1 ring-[#4A3B47]/5 transition-shadow hover:shadow-[0_18px_40px_rgba(255,141,161,0.28)] cursor-pointer focus:outline-none"
          >
            {/* Washi Tape Accent */}
            <div
              className={`absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-16 rounded-xs opacity-80 shadow-xs ${
                index % 3 === 0
                  ? "bg-[#FF8DA1]/60"
                  : index % 3 === 1
                  ? "bg-[#BAE6FD]/75"
                  : "bg-[#B5E48C]/70"
              }`}
            />

            {/* Photo Frame */}
            <div className="relative aspect-[4/4.3] w-full overflow-hidden rounded-xs bg-[#FFEBF0]">
              <img
                src={photo.imageUrl}
                alt={photo.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Location Tag */}
              <div className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-[#FFFDF9]/90 px-2.5 py-0.5 text-[11px] font-bold text-[#4A3B47] shadow-sm backdrop-blur-xs">
                <MapPin className="h-3 w-3 text-[#FF8DA1]" />
                {photo.location}
              </div>
            </div>

            {/* Handwritten Caption & Date */}
            <div className="mt-3.5 px-1">
              <p className="font-hand text-xl leading-snug text-[#4A3B47]">
                {photo.caption}
              </p>
              <div className="mt-1.5 flex items-center justify-between text-[11px] font-semibold text-[#4A3B47]/50">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {photo.date}
                </span>
                <span className="text-[#FF8DA1] opacity-0 transition-opacity group-hover:opacity-100">
                  看小故事 →
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Cozy Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#4A3B47]/55 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid w-full max-w-4xl lg:max-w-5xl grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl border-2 border-[#FF8DA1]/30 bg-[#FFFDF9] shadow-2xl"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close photo modal"
                className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFDF9]/90 text-[#4A3B47] shadow-md transition hover:scale-105 hover:bg-[#FFEBF0] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Left: Photo */}
              <div className="bg-[#FFEBF0]/40 p-4 sm:p-5 flex items-center justify-center">
                <div className="w-full overflow-hidden rounded-2xl bg-white p-2.5 shadow-md">
                  <img
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.caption}
                    className="max-h-[380px] w-full rounded-xl object-cover"
                  />
                </div>
              </div>

              {/* Right: Memory Note */}
              <div className="flex flex-col justify-between p-6 sm:p-8 lined-paper">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#FF8DA1]">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#FFEBF0] px-3 py-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {selectedPhoto.location}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#E0F2FE] px-3 py-1 text-[#0369A1]">
                      <Calendar className="h-3.5 w-3.5" />
                      {selectedPhoto.date}
                    </span>
                  </div>

                  <h3 className="mt-4 font-hand text-2xl sm:text-3xl font-bold text-[#4A3B47]">
                    {selectedPhoto.caption}
                  </h3>

                  <p className="mt-4 font-hand text-xl leading-8 text-[#4A3B47]/90">
                    {selectedPhoto.memoryNote}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 pt-3 text-xs font-semibold text-[#FF8DA1]">
                  <Heart className="h-4 w-4 fill-[#FF8DA1]" />
                  <span>永久珍藏在我們的回憶相簿裡</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
