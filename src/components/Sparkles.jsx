/**
 * Sparkles — a few static ✦ sparkles scattered on the card,
 * like tiny hand-placed stars.
 */
import SparkleSVG from './SparkleSVG.jsx';

const SPARKS = [
  { top: '4%', left: '8%' },
  { top: '6%', right: '10%' },
  { top: '40%', left: '3%' },
  { top: '70%', right: '4%' },
];

export default function Sparkles() {
  return (
    <div className="sparkles" aria-hidden="true">
      {SPARKS.map((pos, i) => (
        <span key={i} className="sparkle-pos" style={pos}>
          <SparkleSVG size={10 + (i % 2) * 4} />
        </span>
      ))}
    </div>
  );
}
