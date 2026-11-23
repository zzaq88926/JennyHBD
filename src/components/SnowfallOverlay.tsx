import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface Flake {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
}

export const SnowfallOverlay: React.FC = () => {
  const flakes = useMemo<Flake[]>(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: `${(i * 4.7 + (i % 3) * 2) % 98}%`,
      size: 6 + (i % 4) * 3,
      duration: 10 + (i % 5) * 3.5,
      delay: (i % 7) * 1.1,
      opacity: 0.35 + (i % 3) * 0.18,
      drift: i % 2 === 0 ? 22 : -22,
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {flakes.map((f) => (
        <motion.div
          key={f.id}
          initial={{ y: -20, x: 0, opacity: 0 }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, f.drift, 0],
            opacity: [0, f.opacity, f.opacity, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ left: f.left }}
          className="absolute top-0"
        >
          {f.id % 3 === 0 ? (
            /* 小雪花結晶 */
            <svg
              width={f.size + 4}
              height={f.size + 4}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#BAE6FD"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          ) : (
            /* 粉彩小雪點 */
            <div
              style={{ width: f.size, height: f.size }}
              className={`rounded-full ${
                f.id % 2 === 0 ? "bg-[#BAE6FD]" : "bg-[#FFEBF0]"
              } shadow-[0_0_8px_rgba(186,230,253,0.7)]`}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};
