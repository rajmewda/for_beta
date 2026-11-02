import SparkleSVG from './SparkleSVG.jsx';

/**
 * ProgressDots — one dot per page. The active dot is bigger;
 * past dots can be clicked to jump back to a page you've seen.
 */
export default function ProgressDots({ count, active, onSelect }) {
  return (
    <nav className="dots" aria-label="Page progress">
      {Array.from({ length: count }, (_, i) => (
        <SparkleSVG key={i} filled={i <= active} dim={i > active} />
      ))}
      <span className="dots-label" aria-live="polite">
        {active + 1} / {count}
      </span>
    </nav>
  );
}
