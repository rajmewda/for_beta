/**
 * FloatingHearts — soft hearts drifting slowly upward in the background.
 * Pure CSS animation, seeded so it looks the same every load.
 */
const HEARTS = ['💗', '🩷', '💕', '🌸', '💗', '🌷'];

export default function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {HEARTS.map((h, i) => (
        <span
          key={i}
          className="float-heart"
          style={{
            left: `${8 + i * 15}%`,
            animationDuration: `${14 + i * 3}s`,
            animationDelay: `${i * 2.5}s`,
            fontSize: `${16 + (i % 3) * 6}px`,
          }}
        >
          {h}
        </span>
      ))}
    </div>
  );
}
