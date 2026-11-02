/**
 * NavButtons — pill shaped Back / Next controls.
 * Back is baby blue, Next is light pink.
 */
export default function NavButtons({ onBack, onNext, canBack, canNext }) {
  return (
    <div className="nav-buttons">
      <button
        className="pill pill-back"
        onClick={onBack}
        disabled={!canBack}
        aria-label="Go to previous page"
      >
        ← Back
      </button>
      <button
        className="pill pill-next"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Go to next page"
      >
        Next →
      </button>
    </div>
  );
}
