import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * HeartGame — tic-tac-toe grid where she wins by completing
 * a line of 3 hearts. Some ❤️ and ✕ are pre-placed so a win
 * is only one good tap away 😌
 */

// Pre-placed board: hearts can win with cell 8 (bottom-right)
const INITIAL = ['❤', '✕', null, null, '❤', '✕', null, null, null];

// Every winning line of 3
const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export default function HeartGame() {
  const [cells, setCells] = useState(INITIAL);
  const [won, setWon] = useState(false);

  // Check if a board has a line of exactly 3 player hearts (💗 placements)
  const hasPinkLine = (board) =>
    LINES.some((line) => line.every((i) => board[i] === '💗'));

  const tapCell = (i) => {
    if (cells[i] || won) return;
    const next = [...cells];
    next[i] = '💗';
    setCells(next);
    // Win check happens after the pre-placed ❤️ line is completed
    if (hasPinkLine(next)) setWon(true);
  };

  return (
    <div className="page heart-game">
      <h2 className="page-title">One heart is missing, place it 💘</h2>

      <div className="grid" role="grid" aria-label="Heart grid game">
        {cells.map((cell, i) => (
          <motion.button
            key={i}
            className="grid-cell"
            role="gridcell"
            aria-label={cell ? `Cell ${i + 1}: ${cell}` : `Empty cell ${i + 1}`}
            onClick={() => tapCell(i)}
            whileTap={{ scale: 0.92 }}
          >
            {cell === '💗' && (
              <motion.span
                className="pop-in"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12 }}
              >
                💗
              </motion.span>
            )}
            {cell === '❤' && <span aria-hidden="true">❤️</span>}
            {cell === '✕' && <span aria-hidden="true" className="grid-x">✕</span>}
          </motion.button>
        ))}
      </div>

      {/* Win overlay */}
      <AnimatePresence>
        {won && (
          <motion.div
            className="win-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            role="alert"
          >
            <motion.div
              className="win-card"
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 14 }}
            >
              {/* little confetti burst around the win */}
              {['💖', '💗', '💕', '✨', '💖', '💗'].map((h, i) => (
                <motion.span
                  key={i}
                  className="heart-burst"
                  initial={{ opacity: 1, x: 0, y: 0, scale: 0 }}
                  animate={{
                    opacity: [1, 0],
                    x: Math.cos((i / 6) * Math.PI * 2) * 70,
                    y: Math.sin((i / 6) * Math.PI * 2) * 70,
                    scale: 1.4,
                  }}
                  transition={{ duration: 1.2, delay: 0.1 }}
                >
                  {h}
                </motion.span>
              ))}
              <p className="win-emoji">💘</p>
              <h3 className="win-title">You won my heart</h3>
              <p className="win-sub">…but honestly, you had it all along 💗</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
