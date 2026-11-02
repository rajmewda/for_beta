import { createContext, useContext, useRef, useCallback, useEffect } from 'react';

/**
 * MediaContext — the ONE place that manages all media on the site.
 *
 * Rule: only one media element may play at a time.
 *  - Starting the video pauses any song.
 *  - Starting a song pauses the video.
 *  - Leaving a page stops that page's media (via `stopMedia`).
 *
 * Pages register their <video> / <audio> elements here with
 * `registerMedia(id, element)` and play through `playOnly(id)`.
 */
const MediaContext = createContext(null);

export function MediaProvider({ children }) {
  // Map of id → media element (video/audio refs)
  const mediaRef = useRef(new Map());

  // Register / unregister an element under a stable id
  const registerMedia = useCallback((id, el) => {
    if (el) mediaRef.current.set(id, el);
    else mediaRef.current.delete(id);
  }, []);

  // Pause every registered element
  const stopMedia = useCallback(() => {
    mediaRef.current.forEach((el) => {
      try {
        el.pause();
      } catch {
        /* ignore — element may already be gone */
      }
    });
  }, []);

  // Pause everything EXCEPT the given id, then play that one from the top
  const playOnly = useCallback((id) => {
    mediaRef.current.forEach((el, key) => {
      if (key !== id) {
        try {
          el.pause();
        } catch {
          /* ignore */
        }
      }
    });
    const target = mediaRef.current.get(id);
    if (target) target.play().catch(() => {/* browser may block until tap */});
  }, []);

  // Safety net: stop all media when the tab closes
  useEffect(() => {
    const onLeave = () => stopMedia();
    window.addEventListener('pagehide', onLeave);
    return () => {
      window.removeEventListener('pagehide', onLeave);
      stopMedia();
    };
  }, [stopMedia]);

  return (
    <MediaContext.Provider value={{ registerMedia, stopMedia, playOnly }}>
      {children}
    </MediaContext.Provider>
  );
}

// Hook pages use to talk to the shared media manager
export function useMedia() {
  return useContext(MediaContext);
}
