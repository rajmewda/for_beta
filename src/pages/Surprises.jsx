import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CatFlower } from '../components/Stickers.jsx';
import { config } from '../config.js';

/**
 * Surprises — postcard / ticket card with FROM / TO header,
 * an image carousel with script captions, and a "valid forever" footer.
 * When no photos are added yet, the "FOR YOU" flower-cat drawing is shown.
 */
export default function Surprises() {
  const photos = config.photos;
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((idx - 1 + photos.length) % photos.length);
  const next = () => setIdx((idx + 1) % photos.length);

  return (
    <div className="page surprises">
      <h2 className="page-title">Little Surprises for you</h2>

      <div className="ticket">
        {/* perforated ticket edge */}
        <div className="ticket-top" aria-hidden="true" />

        <div className="ticket-header">
          <p>
            <span className="ticket-label">FROM:</span>
            <span className="ticket-small">{config.yourName.toLowerCase()}</span>
          </p>
          <p className="ticket-to">
            <span className="ticket-label">TO:</span>
            <span className="ticket-small">My {config.herName.toLowerCase()}</span>
          </p>
        </div>

        <div className="ticket-body">
          {photos.length === 0 ? (
            <div
              className="photo-art"
              role="img"
              aria-label="A drawing of a white cat holding a flower with FOR YOU written above it"
            >
              <CatFlower size={168} />
              <p className="photo-caption">flowers, because you deserve them 🌷💗</p>
            </div>
          ) : (
            <div
              className="carousel"
              tabIndex={0}
              role="region"
              aria-label="Photo carousel"
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') prev();
                if (e.key === 'ArrowRight') next();
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={idx}
                  className="carousel-img"
                  src={photos[idx].src}
                  alt={photos[idx].alt || `Our memory ${idx + 1}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35 }}
                />
              </AnimatePresence>
              <button className="carousel-arrow left" onClick={prev} aria-label="Previous photo">‹</button>
              <button className="carousel-arrow right" onClick={next} aria-label="Next photo">›</button>
            </div>
          )}
        </div>

        <div className="ticket-footer">
          <p className="ticket-line">
            <span className="ticket-label">DATE:</span>
            <span className="ticket-small">Now</span>
          </p>
          <p className="ticket-line right">
            <span className="ticket-script">sealed with love, {config.yourName.toLowerCase()} 💌</span>
          </p>
          <p className="ticket-line">
            <span className="ticket-label">VALID FOR:</span>
            <span className="ticket-small">Forever</span>
          </p>
        </div>
      </div>
    </div>
  );
}
