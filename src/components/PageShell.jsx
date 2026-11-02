import FloatingHearts from './FloatingHearts.jsx';
import Sparkles from './Sparkles.jsx';

/**
 * PageShell — the pastel pink frame that wraps every page:
 * gradient background, floating hearts, sparkles, and a white card.
 */
export default function PageShell({ children }) {
  return (
    <div className="shell">
      <FloatingHearts />
      <Sparkles />
      <div className="card">{children}</div>
      <p className="shell-footer" aria-hidden="true">
        ✦ ✧ ✦
      </p>
    </div>
  );
}
