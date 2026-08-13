import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FaCheck } from "react-icons/fa";

function BallotBox() {
  const tiltRef = useRef(null);
  const shieldRef = useRef(null);
  const sweepRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // subtle continuous 3D tilt — gives the glass real depth as it "breathes"
      gsap.to(tiltRef.current, {
        rotateY: 8,
        rotateX: -4,
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // light sweep across the glass front face, looping
      gsap.fromTo(
        sweepRef.current,
        { xPercent: -150 },
        {
          xPercent: 250,
          duration: 2.6,
          repeat: -1,
          repeatDelay: 1.4,
          ease: "power1.inOut",
        }
      );

      // shield "pulse" — timed roughly to the paper drop, like a vote landing
      gsap.to(shieldRef.current, {
        scale: 1.08,
        transformOrigin: "50% 50%",
        duration: 0.4,
        repeat: -1,
        repeatDelay: 2.6,
        yoyo: true,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-[300px] h-[380px] z-20"
      style={{ perspective: 900 }}
    >
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-24 bg-indigo-400/25 blur-3xl rounded-full" />

      {/* ballot paper dropping into the slot */}
      <motion.div
        animate={{ y: [-6, 10, -6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 -translate-x-1/2 top-[100px] z-30"
      >
        <div className="w-16 h-20 rounded-md bg-white shadow-xl border border-slate-100 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <FaCheck className="text-white text-xs" />
          </div>
        </div>
      </motion.div>

      {/* GSAP-tilted glass shell */}
      <div ref={tiltRef} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>

        {/* light sweep, roughly clipped to the front glass panel */}
        <div className="absolute left-[26%] top-[44%] w-[45%] h-[43%] overflow-hidden rounded-b-2xl pointer-events-none">
          <div
            ref={sweepRef}
            className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg]"
          />
        </div>

        <svg viewBox="0 0 300 340" className="absolute inset-0 w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="frontGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="45%" stopColor="#e0e7ff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="sideGlass" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="rimGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="pedestalTop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e0e7ff" />
            </linearGradient>
            <linearGradient id="pedestalRim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#3730a3" />
            </linearGradient>
            <radialGradient id="shieldGrad" cx="35%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#4338ca" />
            </radialGradient>
          </defs>

          <ellipse cx="150" cy="322" rx="110" ry="20" fill="url(#pedestalRim)" />
          <ellipse cx="150" cy="314" rx="110" ry="20" fill="url(#pedestalTop)" />
          <ellipse cx="150" cy="312" rx="94" ry="15" fill="#eef1ff" />

          <path d="M60 150 L95 150 L92 296 L74 296 Z" fill="url(#sideGlass)" />

          <path
            d="M78 150 L222 150 L208 296 L92 296 Z"
            fill="url(#frontGlass)"
            stroke="#ffffff"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />

          <path d="M110 158 L124 158 L112 288 L100 288 Z" fill="#ffffff" opacity="0.35" />

          <path d="M68 150 L232 150 L214 168 L86 168 Z" fill="url(#rimGlass)" stroke="#ffffff" />
          <rect x="128" y="148" width="44" height="9" rx="4" fill="#818cf8" opacity="0.6" />

          <g ref={shieldRef} transform="translate(150,222)">
            <path
              d="M0 -32 L28 -20 C28 6 15 28 0 34 C-15 28 -28 6 -28 -20 Z"
              fill="url(#shieldGrad)"
              opacity="0.92"
            />
            <path
              d="M-11 0 L-3 9 L15 -11"
              fill="none"
              stroke="#ffffff"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
    </motion.div>
  );
}

export default BallotBox;