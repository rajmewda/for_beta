import { motion } from 'framer-motion';
import { config } from '../config.js';

/**
 * OurStory — WhatsApp-style chat replay of our month-versaries.
 * "me" = Raj (pink bubble, right) · "mine" = Sneha (white bubble, left)
 */

const STORY = [
  {
    month: '1 month',
    msgs: [
      { who: 'me', text: 'happy 1 month baby🥺🫂' },
      { who: 'mine', text: 'Happieeee one month betaa❤️🫂' },
    ],
  },
  {
    month: '2 months',
    msgs: [
      { who: 'me', text: '2 mahine ho gaye aur abhi tak mujhe bardasht kar rahi ho... wow, you deserve an award 🏆! Happy 2 Months, cutiee!! 🥰❤️' },
      { who: 'mine', text: 'Aayyy hauuu😂😚 Happiiee two months babyyy😚🫂💕' },
    ],
  },
  {
    month: '3 months',
    msgs: [
      { who: 'me', text: 'happyy 3 months bachaaa😘😘🫂' },
      { who: 'mine', text: 'happiest three months betaaaa🥺🫂' },
    ],
  },
  {
    month: '4 months',
    msgs: [
      { who: 'me', text: '4 mahine, par lagta hai kal hi mila tha tujhe 💫 Tere bina sab adhoora sa lagta hai… I love you more every day ❤️' },
      { who: 'mine', text: '🥺🥺Happiiee 4 month babyy🥹❤️' },
    ],
  },
  {
    month: '5 months',
    msgs: [
      { who: 'me', text: '3 saal tak sirf one side pyaar karta tha, aur ab tum meri ho ❤️ Aaj 5 mahine ka safar poora hua, par yeh kahani zindagi bhar chalegi 💕 Happy 5 months, baby! 🥰😭🫂🫂🫂' },
      { who: 'mine', text: 'Happiiestt 5 months babyyyy🥺💗🫶❤️😘' },
    ],
  },
  {
    month: '10 months',
    msgs: [
      { who: 'me', text: 'happiest 10 moth baby 😘😘😘😘😘😘😘😘 💋💋💋💋💋💋💋💋💋💋 🫂🫂🫂🫂🫂🫂🫂🫂 😘😘😘' },
      { who: 'mine', text: 'Happiiieeee happpiieee 10 month betaaaa💋❤️❤️❤️❤️❤️❤️💕💕💕💕💕💕💋💋' },
    ],
  },
  {
    month: '1 year',
    msgs: [
      { who: 'me', text: 'Happy 1 year, baby i love you more than words can sayyy love u betaaaaaa💋💋💋💋🫂🫂🫂🫂' },
      { who: 'mine', text: 'Happiiee 1 year babyyyy❤️❤️❤️🥺🥺' },
      { who: 'me', text: 'Means a loottttttt to me🥹🤌' },
    ],
  },
  {
    month: '13 months',
    msgs: [
      { who: 'me', text: 'Happy 13 months, baby i love you more than words can sayyy love u betaaaaaa💋💋💋💋🫂🫂🫂🫂…' },
    ],
  },
];

export default function OurStory() {
  return (
    <div className="page our-story">
      <h2 className="page-title">Our little story 💕</h2>
      <p className="page-caption">every month with you, replayed 🎞️</p>

      <div className="chat" role="feed" aria-label="Our month-versary chat history">
        {STORY.map((group, gi) => (
          <section key={group.month} className="chat-group" aria-label={`${group.month} messages`}>
            <span className="chat-date">{group.month}</span>
            {group.msgs.map((m, mi) => (
              <motion.div
                key={mi}
                className={`bubble ${m.who === 'me' ? 'right' : 'left'}`}
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.3, delay: mi * 0.08 }}
              >
                <span>{m.text}</span>
              </motion.div>
            ))}
            {gi < STORY.length - 1 && (
              <span className="chat-continues" aria-hidden="true">· · ·</span>
            )}
          </section>
        ))}
        <motion.p
          className="chat-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          and many more months to go, {config.yourName.toLowerCase()} loves you 💗
        </motion.p>
      </div>
    </div>
  );
}
