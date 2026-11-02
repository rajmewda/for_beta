/**
 * Stickers.jsx — hand-drawn style kitten stickers used across the site.
 * All are original inline SVG drawings (no copyrighted characters).
 */

const sharedShading = {
  fill: '#fff',
  stroke: '#3c3242',
  strokeWidth: 2.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

/** White kitten with a red bow — used on Intro (inside squiggle heart) */
export function KittenBow({ size = 96 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="A cute white kitten with a red bow">
      {/* ears */}
      <path d="M28 26 L20 8 L42 16 Z" {...sharedShading} fill="#fff" />
      <path d="M72 26 L80 8 L58 16 Z" {...sharedShading} />
      {/* head */}
      <ellipse cx="50" cy="48" rx="32" ry="28" {...sharedShading} />
      {/* bow */}
      <path d="M50 22 L38 14 L40 26 Z" fill="#e8455f" stroke="#b3253f" strokeWidth="1.6" />
      <path d="M50 22 L62 14 L60 26 Z" fill="#e8455f" stroke="#b3253f" strokeWidth="1.6" />
      <circle cx="50" cy="21" r="4" fill="#c22e4a" stroke="#b3253f" strokeWidth="1.4" />
      {/* face */}
      <circle cx="38" cy="48" r="3" fill="#3c3242" />
      <circle cx="62" cy="48" r="3" fill="#3c3242" />
      <path d="M46 57 L50 61 L54 57" fill="none" stroke="#3c3242" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 58 Q57 60 60 56" fill="none" stroke="#3c3242" strokeWidth="1.8" strokeLinecap="round" />
      {/* whiskers */}
      <path d="M16 46 L28 48 M16 54 L28 52 M84 46 L72 48 M84 54 L72 52" fill="none" stroke="#3c3242" strokeWidth="1.6" strokeLinecap="round" />
      {/* blush */}
      <ellipse cx="32" cy="56" rx="4.5" ry="3" fill="#f9c2ce" />
      <ellipse cx="68" cy="56" rx="4.5" ry="3" fill="#f9c2ce" />
      {/* tiny paw waving */}
      <ellipse cx="26" cy="76" rx="8" ry="6" {...sharedShading} />
    </svg>
  );
}

/** White cat hugging a big flower with "FOR YOU" text — Surprises carousel */
export function CatFlower({ size = 150 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" role="img" aria-label="A cartoon white cat holding a big pink flower, with FOR YOU written above">
      {/* FOR YOU text */}
      <text x="72" y="26" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontWeight="800" fontSize="17" fill="#3c3242" letterSpacing="2">FOR YOU</text>
      {/* sparkle doodle next to text */}
      <path d="M116 14 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2 z" fill="none" stroke="#e8859d" strokeWidth="1.6" />
      <path d="M28 18 q-6 4 -2 10 q4 4 -2 8" fill="none" stroke="#e8859d" strokeWidth="1.8" strokeLinecap="round" />
      {/* body */}
      <ellipse cx="62" cy="102" rx="34" ry="26" {...sharedShading} />
      {/* ears */}
      <path d="M36 62 L30 42 L52 54 Z" {...sharedShading} />
      <path d="M84 62 L90 42 L68 54 Z" {...sharedShading} />
      {/* head tilted */}
      <ellipse cx="60" cy="80" rx="27" ry="23" {...sharedShading} />
      <circle cx="52" cy="80" r="2.6" fill="#3c3242" />
      <circle cx="68" cy="80" r="2.6" fill="#3c3242" />
      <path d="M57 88 Q60 92 63 88" fill="none" stroke="#3c3242" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="46" cy="88" rx="4" ry="2.6" fill="#f9c2ce" />
      <ellipse cx="74" cy="88" rx="4" ry="2.6" fill="#f9c2ce" />
      {/* flower */}
      <line x1="98" y1="60" x2="82" y2="102" stroke="#7a9e6d" strokeWidth="4" strokeLinecap="round" />
      <path d="M92 80 q-14 -2 -20 6" fill="none" stroke="#7a9e6d" strokeWidth="3" strokeLinecap="round" />
      <g>
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cx="104" cy="52"
            rx="9" ry="14"
            fill="#f4a7bd"
            transform={`rotate(${a} 104 58)`}
          />
        ))}
        <circle cx="104" cy="56" r="7" fill="#fde68a" stroke="#e9b94f" strokeWidth="1.4" />
      </g>
      {/* paw hugging flower stem */}
      <ellipse cx="86" cy="100" rx="8" ry="6" {...sharedShading} />
      {/* blush + tail */}
      <path d="M94 118 Q108 116 110 104" fill="none" stroke="#3c3242" strokeWidth="2.4" strokeLinecap="round" />
      {/* heart in paws */}
      <path d="M12 110 C9 107 4 109 4 113 C4 117 12 122 12 122 C12 122 20 117 20 113 C20 109 15 107 12 110 Z" fill="#f4a7bd" stroke="#e07a95" strokeWidth="1.4" />
    </svg>
  );
}

/** "Thank you" kitten hugging a strawberry — Final page corner sticker */
export function KittenThanks({ size = 110 }) {
  return (
    <svg width={size} height={size * 0.95} viewBox="0 0 110 105" role="img" aria-label="A kitten holding a strawberry under the words Thank you">
      <text x="52" y="16" textAnchor="middle" fontFamily="'Dancing Script', cursive" fontWeight="700" fontSize="19" fill="#e0637f">Thank you</text>
      {/* ears */}
      <path d="M32 34 L26 20 L44 27 Z" {...sharedShading} />
      <path d="M72 34 L78 20 L60 27 Z" {...sharedShading} />
      {/* head */}
      <ellipse cx="52" cy="52" rx="27" ry="23" {...sharedShading} />
      <circle cx="43" cy="50" r="2.6" fill="#3c3242" />
      <circle cx="61" cy="50" r="2.6" fill="#3c3242" />
      <path d="M49 59 Q52 63 55 59" fill="none" stroke="#3c3242" strokeWidth="2.2" strokeLinecap="round" />
      <ellipse cx="38" cy="59" rx="4" ry="2.6" fill="#f9c2ce" />
      <ellipse cx="66" cy="59" rx="4" ry="2.6" fill="#f9c2ce" />
      {/* strawberry */}
      <path d="M46 92 q-10 -2 -9 -12 q1 -9 10 -9 q9 0 10 9 q1 10 -9 12 q-1 1 -2 0 z" fill="#f2536c" stroke="#c22e4a" strokeWidth="1.6" />
      <path d="M42 71 l4 4 l4 -4" fill="#7a9e6d" stroke="#5d8a55" strokeWidth="1.2" />
      <circle cx="43" cy="82" r="0.9" fill="#ffe1e6" />
      <circle cx="49" cy="86" r="0.9" fill="#ffe1e6" />
      <circle cx="46" cy="78" r="0.9" fill="#ffe1e6" />
      {/* paws hugging berry */}
      <ellipse cx="36" cy="88" rx="7" ry="5.5" {...sharedShading} />
      <ellipse cx="66" cy="86" rx="7" ry="5.5" {...sharedShading} />
    </svg>
  );
}

export default { KittenBow, CatFlower, KittenThanks };
