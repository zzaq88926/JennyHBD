import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plane, MapPin } from "lucide-react";
import { birthdayConfig, type TimelineMilestone } from "../data/birthdayConfig";

const ACCENT_STYLES: Record<
  TimelineMilestone["accentColor"],
  { badge: string; border: string; dot: string }
> = {
  pink: {
    badge: "bg-[#FFEBF0] text-[#E11D48]",
    border: "border-[#FF8DA1]/45",
    dot: "bg-[#FF8DA1]",
  },
  sky: {
    badge: "bg-[#E0F2FE] text-[#0369A1]",
    border: "border-[#BAE6FD]",
    dot: "bg-[#38BDF8]",
  },
  lime: {
    badge: "bg-[#ECFCCB] text-[#4D7C0F]",
    border: "border-[#B5E48C]",
    dot: "bg-[#A3E635]",
  },
  gold: {
    badge: "bg-[#FEF3C7] text-[#B45309]",
    border: "border-[#FCD34D]",
    dot: "bg-[#FBBF24]",
  },
};

export const FlightTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 70%"],
  });

  // Moves the little plane vertically along the flight path
  const planeTop = useTransform(scrollYProgress, [0, 1], ["4%", "92%"]);
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.05, 1]);

  return (
    <section className="relative mx-auto max-w-6xl xl:max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="mb-14 text-center"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E0F2FE] px-4 py-1.5 font-display text-xs font-semibold tracking-wide text-[#0369A1] uppercase">
          <Plane className="h-3.5 w-3.5" />
          飛行日誌 • TPE ➔ BRS (UWE Bristol)
        </span>
        <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#4A3B47]">
          {birthdayConfig.timelineTitle}
        </h2>
        <p className="mt-2 font-hand text-xl text-[#4A3B47]/75">
          {birthdayConfig.timelineSubtitle}
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative">
        {/* Center / Left Dotted SVG Flight Path */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-10 flex justify-center">
          <svg
            className="h-full w-10 overflow-visible"
            viewBox="0 0 40 800"
            preserveAspectRatio="none"
          >
            {/* Background faint dotted path */}
            <path
              d="M20 0 Q 38 140, 20 260 T 20 530 T 20 800"
              fill="none"
              stroke="#BAE6FD"
              strokeWidth="3"
              strokeDasharray="8 8"
            />
            {/* Animated progress path */}
            <motion.path
              d="M20 0 Q 38 140, 20 260 T 20 530 T 20 800"
              fill="none"
              stroke="#FF8DA1"
              strokeWidth="3.5"
              strokeDasharray="8 8"
              style={{ pathLength }}
            />
          </svg>

          {/* Moving Plane Icon */}
          <motion.div
            style={{ top: planeTop }}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#FF8DA1] bg-[#FFFDF9] text-[#FF8DA1] shadow-[0_4px_14px_rgba(255,141,161,0.35)]"
          >
            <Plane className="h-5 w-5 rotate-[135deg]" />
          </motion.div>
        </div>

        {/* Milestones */}
        <div className="space-y-10 sm:space-y-14">
          {birthdayConfig.timelineEvents.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const style = ACCENT_STYLES[item.accentColor];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.55, delay: 0.08 }}
                className={`relative flex items-center md:justify-between ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Spacer for opposite side on desktop */}
                <div className="hidden md:block md:w-[44%]" />

                {/* Center Dot Marker */}
                <div
                  className={`absolute left-6 md:left-1/2 -translate-x-1/2 z-10 h-4 w-4 rounded-full border-4 border-[#FFFDF9] shadow ${style.dot}`}
                />

                {/* Milestone Card */}
                <div className="ml-14 w-full md:ml-0 md:w-[44%]">
                  <div
                    className={`rounded-3xl border-2 ${style.border} bg-[#FFFDF9] p-5 sm:p-6 shadow-[0_10px_28px_rgba(74,59,71,0.06)] transition-transform duration-300 hover:-translate-y-1`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${style.badge}`}
                      >
                        <span>{item.badgeEmoji}</span>
                        <span>{item.date}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A3B47]/65">
                        <MapPin className="h-3.5 w-3.5 text-[#FF8DA1]" />
                        {item.location}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#4A3B47]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#4A3B47]/80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
