"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function SplashLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("dh-booted")) return;
    setVisible(true);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("dh-booted", "1");
      document.body.style.overflow = "";
    }, 1200);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.06em" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl font-bold tracking-tight text-paper"
          >
            Meridian
          </motion.span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 h-px w-20 origin-center bg-accent/60"
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-4 font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-paper/30"
          >
            Exceptional Spaces. Better Living.
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
