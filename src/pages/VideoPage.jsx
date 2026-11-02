import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useMedia } from '../context/MediaContext.jsx';
import { config } from '../config.js';

/**
 * VideoPage — polaroid-style framed video.
 * Sound on, no autoplay (mobile browsers block it anyway).
 * Registers the video with MediaContext so starting the video
 * pauses any music, and gets paused when navigating away.
 */
const MEDIA_ID = 'video';

export default function VideoPage() {
  const videoRef = useRef(null);
  const { registerMedia } = useMedia();
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  // Register/unregister with the shared media manager
  useEffect(() => {
    registerMedia(MEDIA_ID, videoRef.current);
    return () => registerMedia(MEDIA_ID, null);
  }, [registerMedia]);

  return (
    <div className="page video-page">
      <h2 className="page-title">Press play, Sneha 🎬💗</h2>
      <p className="page-caption">a little something I made for you</p>

      <div className="polaroid">
        {/* Custom play overlay on top of the poster */}
        {!playing && !error && (
          <motion.button
            className="video-play-btn"
            onClick={() => videoRef.current?.play().catch(() => setError(true))}
            aria-label="Play our video"
            whileTap={{ scale: 0.9 }}
          >
            <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
              <circle cx="17" cy="17" r="16" fill="#ef5f83" />
              <path d="M13 10 L25 17 L13 24 Z" fill="#fff" />
            </svg>
          </motion.button>
        )}

        {error ? (
          <div className="video-error" role="alert">
            <p>👼 the video is hiding…</p>
            <p className="video-error-sub">
              It may not have been added yet, or the connection glitched. Try again in a bit 💗
            </p>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="video-el"
            src={config.video.src}
            poster={config.video.poster}
            controls /* native controls for scrubbing/volume */
            playsInline
            preload="metadata"
            onPlay={(e) => {
              setPlaying(true);
              /* pause any music via MediaContext, then keep video going */
              e.currentTarget.volume = 1;
            }}
            onPause={() => setPlaying(false)}
            onError={() => setError(true)}
          >
            Your browser can&apos;t play this video, but the love in it is the same 💗
          </video>
        )}

        {playing && <FloatingHeartSmall />}
      </div>

      <div className="video-actions">
        <button
          className="pill pill-back"
          onClick={() => {
            const v = videoRef.current;
            if (!v) return;
            if (document.fullscreenElement) document.exitFullscreen();
            else v.requestFullscreen?.().catch(() => {/* not supported */});
          }}
          aria-label="Play video in full screen"
        >
          ⛶ fullscreen
        </button>
      </div>

      <p className="page-note">Watch till the end… there&apos;s a surprise 💌</p>
    </div>
  );
}

/* Tiny hearts while the video plays */
function FloatingHeartSmall() {
  return (
    <div className="video-hearts" aria-hidden="true">
      {['💗', '💕', '🩷'].map((h, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.9, y: 0 }}
          animate={{ opacity: 0, y: -60 }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.6, ease: 'easeOut' }}
        >
          {h}
        </motion.span>
      ))}
    </div>
  );
}
