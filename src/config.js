/* ============================================================
   config.js — EDIT EVERYTHING HERE 💗
   Change names, messages, photos, video, and songs without
   touching any component code.
   ============================================================ */

export const config = {
  // Her name and your name
  herName: 'SNEHA',
  yourName: 'Raj',

  // The anniversary / special date you two share (shown on surprises ticket)
  specialDate: '02.11.2026',

  /* ------- VIDEO -------
     Put your video file at:  public/media/our-video.mp4
     and a poster image at:   public/media/poster.jpg
     Paths start with "/" because they live in the public folder. */
  video: {
    src: '/media/our-video.mp4',
    poster: '/media/poster.jpg',
  },

  /* ------- SURPRISE PHOTOS -------
     Drop photos into public/media/photos/ and list their paths here. */
  photos: [
    { src: '/media/photos/sneha-1.jpeg', alt: 'A sweet moment of us' },
  ],

  /* ------- SONGS -------
     Drop mp3 files into public/media/songs/ and list them here.
     Keep each song under ~5 MB so the site loads fast on mobile. */
  songs: [
    { title: 'Our Song 💗', artist: 'For Sneha', src: '/media/songs/song-1.mp3' },
  ],
};
