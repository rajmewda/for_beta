import { motion } from 'framer-motion';
import { config } from '../config.js';

/**
 * LoveNote — handwritten-style apology letter with a kitten-tulip
 * sticker top right and a dotted "LOVE ♥ STAMPED" round stamp that
 * stamps itself onto the page.
 */
export default function LoveNote() {
  return (
    <div className="page love-note">
      {/* kitten + tulip sticker, top right */}
      <motion.div
        className="note-sticker"
        role="img"
        aria-label="A cute kitten holding a bunch of tulips"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 240, damping: 15, delay: 0.15 }}
      >
        <KittenTulip size={86} />
      </motion.div>

      <header className="note-header">
        <p className="page-label note-sub">A NOTE</p>
        <p className="page-title note-title">Just for you ✦</p>
        <p className="note-dear">My love, 🥺💓</p>
      </header>

      <p className="note-body">
        There&apos;s something I&apos;ve been carrying in my heart for a while. I know
        I sometimes get upset when we can&apos;t meet, and I&apos;m truly sorry if it
        ever hurts you. The truth is, it&apos;s never because I&apos;m angry with
        you—it&apos;s because I miss you more than I know how to put into words.
        Being away from you for a whole month has made me realize even more how much
        your presence means to me.
      </p>

      <p className="note-body">
        You are my peace, my safest place, and the person who makes every bad day
        feel lighter. Every hug from you feels like home, and every moment with you
        becomes a memory I hold close to my heart. Thank you for loving me so
        patiently, for understanding me even when I&apos;m not the best at expressing
        my feelings, and for never giving up on us.
      </p>

      <p className="note-body">
        I don&apos;t need anything perfect. I just want us to keep choosing each
        other, no matter how busy life gets. Even if we can only meet once in a
        while, I&apos;ll treasure every second with you because those moments mean
        the world to me. I love you more than words can ever describe, and no
        distance or time apart will ever change that. You are my favorite person, my
        forever, and the most beautiful part of my life. I can&apos;t wait to hold
        you again. Until then, keep a little piece of my heart with you, because
        you&apos;ll always have all of yours with me. 🥺💞🤌💋🫂
      </p>

      <p className="note-sign">
        <span className="note-sign-bold">Yours always, {config.yourName}</span> 💌
      </p>

      <div className="note-footer" aria-hidden="true" />

      {/* dotted round LOVE stamp, bottom-left, stamps itself in */}
      <motion.div
        className="stamp"
        aria-hidden="true"
        initial={{ scale: 1.8, opacity: 0, rotate: -4 }}
        animate={{ scale: 1, opacity: 1, rotate: -12 }}
        transition={{ type: 'spring', stiffness: 300, damping: 11, delay: 0.5 }}
      >
        <svg viewBox="0 0 100 100" className="stamp-svg">
          {/* dotted ring */}
          <circle
            cx="50" cy="50" r="42"
            fill="none" stroke="#d94f6e" strokeWidth="3"
            strokeDasharray="2.5 5" strokeLinecap="round"
          />
          {/* inner thin ring */}
          <circle cx="50" cy="50" r="34" fill="none" stroke="#d94f6e" strokeWidth="1.6" />
          {/* heart */}
          <path
            d="M50 62 C42 55 34 50 34 43 C34 37 40 34 45 37 L50 41 L55 37 C60 34 66 37 66 43 C66 50 58 55 50 62 Z"
            fill="#d94f6e"
          />
          {/* LOVE / STAMPED curved text */}
          <path id="stamp-top" d="M18 50 A32 32 0 0 1 82 50" fill="none" />
          <text fontSize="9.5" fontWeight="800" letterSpacing="4" fill="#d94f6e">
            <textPath href="#stamp-top" startOffset="50%" textAnchor="middle">LOVE</textPath>
          </text>
          <path id="stamp-bottom" d="M16 56 A34 34 0 0 0 84 56" fill="none" />
          <text fontSize="8" fontWeight="800" letterSpacing="3" fill="#d94f6e">
            <textPath href="#stamp-bottom" startOffset="50%" textAnchor="middle">stamped</textPath>
          </text>
        </svg>
      </motion.div>
    </div>
  );
}

/** Kitten holding a bunch of tulips (original inline SVG) */
function KittenTulip({ size = 86 }) {
  const S = { fill: '#fff', stroke: '#3c3242', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  return (
    <svg width={size} height={size * 1.12} viewBox="0 0 90 100">
      {/* tulips */}
      {[
        { x: 66, y: 30, r: -8 },
        { x: 74, y: 22, r: 6 },
      ].map((t, i) => (
        <g key={i} transform={`translate(${t.x} ${t.y}) rotate(${t.r})`}>
          <path d="M0 0 C-4 -6 -5 -12 -4 -16 Q0 -13 4 -16 C5 -12 4 -6 0 0 Z" fill="#f4a7bd" stroke="#e07a95" strokeWidth="1.4" />
          <path d="M-4 -9 Q0 -7 4 -10" fill="none" stroke="#e07a95" strokeWidth="1" />
        </g>
      ))}
      <path d="M69 30 Q72 46 66 56" fill="none" stroke="#7a9e6d" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M74 24 Q78 42 70 58" fill="none" stroke="#7a9e6d" strokeWidth="2.4" strokeLinecap="round" />
      {/* ears */}
      <path d="M22 34 L18 18 L36 26 Z" {...S} />
      <path d="M60 34 L64 18 L46 26 Z" {...S} />
      {/* body + head */}
      <ellipse cx="40" cy="76" rx="24" ry="20" {...S} />
      <ellipse cx="40" cy="50" rx="22" ry="19" {...S} />
      <circle cx="33" cy="49" r="2.4" fill="#3c3242" />
      <circle cx="47" cy="49" r="2.4" fill="#3c3242" />
      <path d="M37 57 Q40 60 43 57" fill="none" stroke="#3c3242" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="28" cy="55" rx="3.4" ry="2.3" fill="#f9c2ce" />
      <ellipse cx="52" cy="55" rx="3.4" ry="2.3" fill="#f9c2ce" />
      {/* paw up holding stems */}
      <ellipse cx="58" cy="62" rx="7.5" ry="6" {...S} />
    </svg>
  );
}
