import { motion } from 'framer-motion';
import { config } from '../config.js';
import { KittenBow } from '../components/Stickers.jsx';

/**
 * Intro — the welcome page. Big apologetic-and-cute opener:
 * "I'm so SORRY (so so so)". A red squiggle heart draws itself
 * around the kitten sticker. Ends with the "Come in →" button.
 */
export default function Intro({ goTo }) {
  return (
    <div className="page intro">
      <p className="page-label">{config.herName} ✦</p>

      <h1 className="intro-heading">
        <span className="script">I&apos;m so</span>
        <span className="intro-sorry">SORRY</span>
        <span className="sorry-tag">so so so</span>
      </h1>

      {/* The promise — soft letter card, like pressing it into the page */}
      <motion.p
        className="intro-promise"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Baby, I realize my mistake now. You have every right to be angry, and I&apos;m
        not trying to justify what I did. Just give me one last chance, I promise
        I&apos;ll make you feel the difference. I loveeeee you so muchhhhh baby{' '}
        <span aria-hidden="true">🥺🧿🤍🫂</span>
      </motion.p>

      {/* Kitten sticker circled by a hand-drawn heart that draws itself */}
      <motion.div
        className="intro-sticker"
        role="img"
        aria-label="A hand-drawn red heart around a cute white kitten"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
      >
        <svg viewBox="0 0 140 150" width="150" height="160">
          {/* Squiggle heart, two overlapping strokes for a handmade sketch feel.
              Both animate via stroke-dashoffset (see .squiggle draw animations). */}
          <path
            className="squiggle squiggle-a"
            d="M70 128 C30 100 12 74 16 50 C20 28 44 22 62 40 Q68 47 70 54 Q72 47 78 40 C96 22 120 28 124 50 C128 74 110 100 70 128 Z"
            fill="none" stroke="#e2435c" strokeWidth="5" strokeLinecap="round"
          />
          <path
            className="squiggle squiggle-b"
            d="M70 122 C38 98 22 76 26 56 C30 38 50 34 64 48 Q69 54 70 58 Q71 54 76 48 C90 34 110 38 114 56 C118 76 102 98 70 122 Z"
            fill="none" stroke="#f06c86" strokeWidth="2.6" strokeLinecap="round" opacity="0.85"
          />
          {/* kitten inside */}
          <g transform="translate(46 52)">
            <KittenBow size={56} />
          </g>
        </svg>
      </motion.div>

      <button className="pill pill-next intro-enter" onClick={() => goTo(1)}>
        Come in →
      </button>
    </div>
  );
}
