import { useMedia } from '../context/MediaContext.jsx';
import { config } from '../config.js';

/**
 * NowPlayingChip — the little floating "▶ song title" pill pinned to the
 * top corner of the screen while any music is playing.
 */
export default function NowPlayingChip() {
  const now = useMediaNow();
  if (!now) return null;
  const { title } = now;
  return (
    <div className="np-chip" role="status" aria-label={`Now playing ${title}`}>
      <span className="np-bar" aria-hidden="true">
        <i /><i /><i />
      </span>
      {title}
    </div>
  );
}

/**
 * Subscribes to playing state via a tiny custom event bridge:
 * Songs.js already manages playback; here we read which song is playing.
 * (Keeps MediaContext lean — the player notifies us directly.)
 */
import { useEffect, useState } from 'react';

export function announceNowPlaying(song) {
  window.dispatchEvent(new CustomEvent('nowplaying', { detail: song }));
}

function useMediaNow() {
  const [now, setNow] = useState(null);
  useEffect(() => {
    const on = (e) => setNow(e.detail);
    window.addEventListener('nowplaying', on);
    return () => window.removeEventListener('nowplaying', on);
  }, []);
  // null (paused / never started) hides the chip
  return now;
}
