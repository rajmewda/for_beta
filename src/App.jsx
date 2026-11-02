import { useRef } from 'react';
import MediaProviderWithChip from './context/MediaProviderWithChip.jsx';
import PageShell from './components/PageShell.jsx';
import ProgressDots from './components/ProgressDots.jsx';
import NavButtons from './components/NavButtons.jsx';
import Intro from './pages/Intro.jsx';
import HeartGame from './pages/HeartGame.jsx';
import LoveNote from './pages/LoveNote.jsx';
import Surprises from './pages/Surprises.jsx';
import OurStory from './pages/OurStory.jsx';
import VideoPage from './pages/VideoPage.jsx';
import Songs from './pages/Songs.jsx';
import Final from './pages/Final.jsx';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// All pages in order — the little journey she'll swipe through 💗
const PAGES = [Intro, HeartGame, LoveNote, Surprises, OurStory, VideoPage, Songs, Final];

// Slide direction → which way the page animates
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0, scale: 0.98 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, scale: 0.98 }),
};

export default function App() {
  // Current page index; useRef for swipe tracking (no re-render needed)
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const swipe = useRef({ x: 0, y: 0 });

  // Go to a page, remembering the direction for the slide animation
  const goTo = React.useCallback(
    (next) => {
      setDirection(next > index ? 1 : -1);
      setIndex(Math.min(PAGES.length - 1, Math.max(0, next)));
    },
    [index]
  );

  // ← → arrow keys navigate between pages
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goTo(index + 1);
      if (e.key === 'ArrowLeft') goTo(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, goTo]);

  // Touch handlers for swipe navigation
  const onTouchStart = (e) => {
    swipe.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - swipe.current.x;
    const dy = e.changedTouches[0].clientY - swipe.current.y;
    // Only treat mostly-horizontal, longer-than-50px swipes as navigation
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      goTo(dx < 0 ? index + 1 : index - 1);
    }
  };

  const Page = PAGES[index];

  return (
    <MediaProviderWithChip>
      {/* Phone-width container, centered on desktop */}
      <div className="phone-frame" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <PageShell>
          {/* Progress dots at the top */}
          <ProgressDots count={PAGES.length} active={index} onSelect={goTo} />

          {/* Animated page area */}
          <div className="page-stage">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.section
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="page-content"
              >
                <Page goTo={goTo} />
              </motion.section>
            </AnimatePresence>
          </div>

          {/* Back / Next pills */}
          <NavButtons
            onBack={() => goTo(index - 1)}
            onNext={() => goTo(index + 1)}
            canBack={index > 0}
            canNext={index < PAGES.length - 1}
          />
        </PageShell>
      </div>
    </MediaProviderWithChip>
  );
}
