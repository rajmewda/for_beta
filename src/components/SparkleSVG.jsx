/**
 * SparkleSVG — tiny four-point ✦ sparkle used for the progress dots
 * and decorative sprinkles. Inline SVG so no image files are needed.
 */
export default function SparkleSVG({ size = 12, color = '#e0637f', dim = false, filled = true }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      style={{ display: 'inline-block', opacity: dim ? 0.25 : 1 }}
    >
      <path
        d="M12 1 C13 7 17 11 23 12 C17 13 13 17 12 23 C11 17 7 13 1 12 C7 11 11 7 12 1 Z"
        fill={filled ? color : '#fff'}
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}
