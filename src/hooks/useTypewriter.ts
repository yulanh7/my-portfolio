"use client";

import { useState, useEffect, useRef } from "react";

export function useTypewriter(phrases: string[], typeSpeed = 60, deleteSpeed = 40, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState("");
  const phraseIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);

  useEffect(() => {
    if (!phrases.length) return;

    const tick = () => {
      const current = phrases[phraseIndex.current];

      if (!isDeleting.current) {
        charIndex.current += 1;
        setDisplayed(current.slice(0, charIndex.current));

        if (charIndex.current === current.length) {
          isDeleting.current = true;
          return setTimeout(tick, pauseMs);
        }
        return setTimeout(tick, typeSpeed);
      } else {
        charIndex.current -= 1;
        setDisplayed(current.slice(0, charIndex.current));

        if (charIndex.current === 0) {
          isDeleting.current = false;
          phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
        }
        return setTimeout(tick, deleteSpeed);
      }
    };

    const id = setTimeout(tick, typeSpeed);
    return () => clearTimeout(id);
  }, [phrases, typeSpeed, deleteSpeed, pauseMs]);

  return displayed;
}
