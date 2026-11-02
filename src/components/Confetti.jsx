import { useEffect, useState } from 'react';

/**
 * Confetti — falling hearts burst, used on the Final page.
 * Renders ~24 hearts across the screen, animated purely with CSS.
 */
export default function Confetti({ burst = 0 }) {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (!burst) return;
    const make = ['💗', '💕', '💖', '🩷', '💗'].flatMap((h, group) =>
      Array.from({ length: 5 }, (_, i) => ({
        id: `${burst}-${group}-${i}`,
        emoji: h,
        left: Math.random() * 96,
        delay: Math.random() * 1.2,
        size: 14 + Math.random() * 16,
        duration: 2.6 + Math.random() * 2,
      }))
    );
    setHearts(make);
    const t = setTimeout(() => setHearts([]), 5200);
    return () => clearTimeout(t);
  }, [burst]);

  return (
    <div className="confetti" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="confetti-heart"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
