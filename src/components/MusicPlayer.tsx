import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Disc3, Volume2, VolumeX } from "lucide-react";
import { birthdayConfig } from "../data/birthdayConfig";

interface MusicPlayerProps {
  unlocked: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ unlocked }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(birthdayConfig.musicUrl);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (unlocked && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Graceful fallback if browser blocks autoplay
          setIsPlaying(false);
        });
    }
  }, [unlocked]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  if (!unlocked) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed top-4 right-4 z-50"
    >
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
        className="group flex items-center gap-2.5 rounded-full border-2 border-[#FF8DA1]/40 bg-[#FFFDF9]/90 px-3.5 py-2 shadow-[0_8px_24px_rgba(255,141,161,0.22)] backdrop-blur-md transition-all hover:scale-105 hover:border-[#FF8DA1]"
      >
        <div
          className={`relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#4A3B47] to-[#6E5A6A] text-[#FFFDF9] shadow-inner ${
            isPlaying ? "animate-spin-slow" : ""
          }`}
        >
          <Disc3 className="h-5 w-5 text-[#FF8DA1]" />
          <span className="absolute h-2 w-2 rounded-full bg-[#FCD34D]" />
        </div>

        <div className="hidden sm:flex flex-col items-start text-left pr-1">
          <span className="font-display text-xs font-semibold text-[#4A3B47]">
            {birthdayConfig.musicTitle}
          </span>
          <span className="text-[11px] font-medium text-[#FF8DA1]">
            {isPlaying ? "播放中..." : "已暫停"}
          </span>
        </div>

        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFEBF0] text-[#FF8DA1]">
          {isPlaying ? (
            <Volume2 className="h-3.5 w-3.5" />
          ) : (
            <VolumeX className="h-3.5 w-3.5" />
          )}
        </span>
      </button>
    </motion.div>
  );
};
