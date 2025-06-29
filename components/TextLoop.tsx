'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const texts = ["WAPI Cloud", "Whatsapp API", "Smart Automation"];

export default function TextLoop() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(
      () => setIndex((i) => (i + 1) % texts.length),
      2000,
    );

    return () => clearTimeout(timeout);
  }, [index]);

  // Measure the widest text for minWidth
  const maxText = texts.reduce((a, b) => (a.length > b.length ? a : b), "");

  return (
    <span
      className="relative inline-block"
      style={{ minWidth: `${maxText.length}ch` }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          animate={{
            opacity: 1,
            y: 0,
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
          }}
          className="text-success"
          exit={{
            opacity: 0,
            y: -20,
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
          }}
          initial={{
            opacity: 0,
            y: 20,
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
          }}
          transition={{ duration: 0.5 }}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
