import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useMedia } from '../context/MediaContext.jsx';
import { announceNowPlaying } from '../components/NowPlayingChip.jsx';
import { config } from '../config.js';

/**
 * Songs — custom music player styled like the reference:
 * square album art, status label (LOADING…/PAUSED/NOW PLAYING),
 * progress bar with thumb, chip transport + big rose play button,
 * numbered playlist, and a floating now-playing chip pinned on top.
 */
const MEDIA_ID = 'songs';
const songs = config.songs;

function pretty(sec) {
  if (!isFinite(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function Songs() {
  const audioRef = useRef(null);
  const { registerMedia } = useMedia();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const song = songs[index] || { title: 'Playlist is empty', artist: 'add songs in config.js', src: null };

  useEffect(() => {
    registerMedia(MEDIA_ID, audioRef.current);
    return () => registerMedia(MEDIA_ID, null);
  }, [registerMedia]);

  // time / metadata listeners
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setTime(a.currentTime);
    const onMeta = () => { setDuration(a.duration || 0); setLoading(false); };
    const onWait = () => setLoading(true);
    const onPlay = () => setLoading(false);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('waiting', onWait);
    a.addEventListener('playing', onPlay);
    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('waiting', onWait);
      a.removeEventListener('playing', onPlay);
    };
  }, []);

  // switch track: load + autoplay, announce to the floating chip
  useEffect(() => {
    const a = audioRef.current;
    if (!a || !song.src) return;
    a.src = song.src;
    a.load();
    setTime(0);
    setDuration(0);
    setLoading(true);
    a.play()
      .then(() => {
        setPlaying(true);
        announceNowPlaying(song);
      })
      .catch(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a || !song.src) return;
    if (playing) {
      a.pause();
      announceNowPlaying(null);
    } else {
      setLoading(true);
      a.play()
        .then(() => announceNowPlaying(song))
        .catch(() => setLoading(false));
    }
  };

  const skip = useCallback(
    (delta) => {
      if (!songs.length) return;
      setIndex((index + delta + songs.length) % songs.length);
    },
    [index]
  );

  const seek = (e) => {
    const a = audioRef.current;
    if (a && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      a.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
    }
  };

  const status = loading ? 'LOADING…' : playing ? 'NOW PLAYING' : 'PAUSED';

  return (
    <div className="page songs">
      <h2 className="page-title">Songs That Feel Like Us 💗</h2>

      <div className="player">
        {/* square album art (hand-drawn kitten cover) */}
        <div
          className={`album-art ${playing ? 'playing' : ''}`}
          role="img"
          aria-label="Album art: a white kitten with a red bow holding a heart"
        >
          <AlbumCatPlaying animated={playing} />
        </div>

        <p className={`player-status ${loading ? 'blinking' : ''}`} role="status">
          {status}
        </p>
        <p className="song-title">{song.title}</p>

        {/* progress bar with thumb */}
        <div
          className="progress"
          onClick={seek}
          role="slider"
          aria-label="Seek through the song"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={duration ? Math.round((time / duration) * 100) : 0}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') { const a = audioRef.current; if (a) a.currentTime = Math.max(0, a.currentTime - 5); }
            if (e.key === 'ArrowRight') { const a = audioRef.current; if (a) a.currentTime = Math.min(duration, a.currentTime + 5); }
          }}
        >
          <div
            className="progress-fill"
            style={{ width: duration ? `${(time / duration) * 100}%` : '0%' }}
          />
          <div
            className="progress-thumb"
            style={{ left: duration ? `${(time / duration) * 100}%` : '0%' }}
          />
        </div>
        <div className="progress-times">
          <span>{pretty(time)}</span>
          <span>{pretty(duration)}</span>
        </div>

        {/* transport: two round chips + big rose play */}
        <div className="transport">
          <button className="chip-btn" onClick={() => skip(-1)} disabled={!songs.length} aria-label="Previous song">
            <TransportIcon type="prev" />
          </button>
          <motion.button
            className="play-btn"
            onClick={togglePlay}
            disabled={!songs.length}
            whileTap={{ scale: 0.88 }}
            aria-label={playing ? 'Pause song' : 'Play song'}
          >
            {loading && !playing ? <span className="play-spinner" aria-hidden="true" /> : (
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                {playing
                  ? <path d="M6 4 h4 v14 h-4 z M12 4 h4 v14 h-4 z" fill="#fff" />
                  : <path d="M7 4 L18 11 L7 18 Z" fill="#fff" />}
              </svg>
            )}
          </motion.button>
          <button className="chip-btn" onClick={() => skip(1)} disabled={!songs.length} aria-label="Next song">
            <TransportIcon type="next" />
          </button>
        </div>
      </div>

      {/* playlist */}
      {songs.length > 0 && (
        <ul className="playlist" aria-label="Playlist">
          {songs.map((s, i) => (
            <motion.button
              key={s.src}
              className={`playlist-item ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              whileTap={{ scale: 0.98 }}
              aria-label={`Play ${s.title}`}
            >
              <span className="pi-art" aria-hidden="true">♫</span>
              <span className="pi-title">{s.title}</span>
              <span className="pi-num">{i + 1}</span>
            </motion.button>
          ))}
        </ul>
      )}

      {songs.length === 0 && (
        <p className="page-note">
          Drop mp3s into <b>public/media/songs/</b> and list them in config.js 💗
        </p>
      )}

      {/* single shared audio element for all tracks */}
      <audio
        ref={audioRef}
        preload="metadata"
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        onEnded={() => skip(1)}
      />
    </div>
  );
}

function TransportIcon({ type }) {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
      {type === 'prev' ? (
        <>
          <path d="M9 2 L17 7 L9 12 Z" fill="#fff" />
          <rect x="2" y="2" width="2.4" height="10" rx="1" fill="#fff" />
        </>
      ) : (
        <>
          <rect x="13.6" y="2" width="2.4" height="10" rx="1" fill="#fff" />
          <path d="M9 2 L1 7 L9 12 Z" fill="#fff" />
        </>
      )}
    </svg>
  );
}

/* Album art: a kitten with a red bow; its heart beats while playing */
function AlbumCatPlaying({ animated }) {
  const S = { fill: '#fff', stroke: '#3c3242', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  return (
    <svg viewBox="0 0 100 100" width="100%" height="100%">
      {/* beating heart */}
      <motion.path
        d="M22 26 C19 23 14 25 14 29 C14 33 22 39 22 39 C22 39 30 33 30 29 C30 25 25 23 22 26 Z"
        fill="#e8455f"
        animate={animated ? { scale: [1, 1.25, 1] } : { scale: 1 }}
        transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
        style={{ originX: '22px', originY: '29px' }}
      />
      {/* ears */}
      <path d="M40 34 L34 20 L50 28 Z" {...S} />
      <path d="M74 34 L80 20 L64 28 Z" {...S} />
      {/* head + bow */}
      <ellipse cx="57" cy="52" rx="25" ry="22" {...S} />
      <path d="M50 30 L40 24 L42 34 Z" fill="#e8455f" stroke="#b3253f" strokeWidth="1.4" />
      <path d="M50 30 L60 24 L58 34 Z" fill="#e8455f" stroke="#b3253f" strokeWidth="1.4" />
      <circle cx="50" cy="29" r="3.4" fill="#c22e4a" />
      <circle cx="48" cy="52" r="2.4" fill="#3c3242" />
      <circle cx="66" cy="52" r="2.4" fill="#3c3242" />
      <path d="M54 60 Q57 63 60 60" fill="none" stroke="#3c3242" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="44" cy="58" rx="3.4" ry="2.3" fill="#f9c2ce" />
      <ellipse cx="70" cy="58" rx="3.4" ry="2.3" fill="#f9c2ce" />
      {/* overalls */}
      <path d="M40 78 L74 78 L76 92 L38 92 Z" fill="#3e5fa8" stroke="#2f4a85" strokeWidth="1.6" />
      <circle cx="50" cy="82" r="1.4" fill="#ffd89e" />
      <circle cx="64" cy="82" r="1.4" fill="#ffd89e" />
      {/* paws */}
      <ellipse cx="38" cy="80" rx="7" ry="5.5" {...S} />
      <ellipse cx="76" cy="80" rx="7" ry="5.5" {...S} />
    </svg>
  );
}
