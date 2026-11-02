import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from '../components/Confetti.jsx';
import { KittenThanks } from '../components/Stickers.jsx';
import { config } from '../config.js';

/**
 * Final — the big "I Love You" closer with a burst of falling hearts,
 * the "Thank you" strawberry kitten hugging the bottom-right corner,
 * and a soft pink Back button (matching the reference video).
 */
export default function Final() {
  const [burst, setBurst] = useState(0);

  // Fire falling-heart confetti once when this page opens
  useEffect(() => {
    setBurst(Date.now());
  }, []);

  return (
    <div className="page final">
      <Confetti burst={burst} />

      <header className="final-head">
        <p className="page-label final-label-left">FOR MY LOVE ✦</p>
        <span className="final-spark" aria-hidden="true">✦</span>
      </header>

      <h2 className="final-love">
        <span className="final-italic">I Love You</span>
        <span className="final-bold">MORE THAN ANYTHING</span>
        <motion.span
          className="final-hearts"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          💞
        </motion.span>
      </h2>

      <p className="intro-text final-story">
        In my worst days, you stood beside me like my safe place. When I hug you I
        feel a peace I can&apos;t explain, like the whole world becomes quiet and
        it&apos;s just us. You taught me how to be better, even when I made mistakes
        again and again but you never left me. Your patience, your love, and the way
        you hold me close means everything to me. In your arms, I feel like
        I&apos;ve finally found my home.
      </p>

      <div className="wish-card">
        <p className="wish-title">What I&apos;ve learned 🤍</p>
        <p className="wish-body">
          I&apos;ve learned that my words in anger can hurt you more than anything
          else. I&apos;ve learned to stop and think before I react, and to listen to
          you instead of the noise around me. These words come straight from my
          heart, and I genuinely hope you&apos;ll understand and give me one last
          chance. 🥺🫂
        </p>
      </div>

      <p className="intro-text">
        If you smiled even once while going through this, it was all worth it. Now
        come here, I owe you a hug. 🫂💗
      </p>

      <footer className="final-footer">
        made with 💗 by {config.yourName},
        <span className="final-tail">hugs, and a lot of missing you</span>
      </footer>

      {/* corner "Thank you" kitten sticker */}
      <div className="final-sticker">
        <KittenThanks size={104} />
      </div>

      <button className="pill pill-back final-back" onClick={() => window.history.back()}>
        ← Back
      </button>
    </div>
  );
}
