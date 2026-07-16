import { GameMode } from '../generated/prisma/enums.js';
import prisma from '../src/config/prisma.js';

async function main() {
  console.log('🌱 Starting database question seeding...');

  // 1. Clean out existing questions to prevent unique constraint crashes during dev testing
  await prisma.question.deleteMany({});

  // 2. Compile our structural dataset array mapping to the single Question table
  const initialQuestions = [
    // ==========================================
    // --- MODE 1: BLURRED_POSTER ---
    // ==========================================
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 1,
      content: {
        points: 100,
        imageUrl: 'https://cdn.yourgame.com/posters/blurred_ddlj.png',
        options: [
          'Dilwale Dulhania Le Jayenge',
          'Kuch Kuch Hota Hai',
          'Kabhi Khushi Kabhie Gham',
          'Mohabbatein',
        ],
        correctAnswer: 'Dilwale Dulhania Le Jayenge',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 2,
      content: {
        points: 100,
        imageUrl: 'https://cdn.yourgame.com/posters/blurred_sholay.png',
        options: ['Don', 'Zanjeer', 'Sholay', 'Deewaar'],
        correctAnswer: 'Sholay',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 3,
      content: {
        points: 100,
        imageUrl: 'https://cdn.yourgame.com/posters/blurred_3idiots.png',
        options: ['PK', '3 Idiots', 'Dangal', 'Taare Zameen Par'],
        correctAnswer: '3 Idiots',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 4,
      content: {
        points: 100,
        imageUrl: 'https://cdn.yourgame.com/posters/blurred_bahubali.png',
        options: ['Baahubali: The Beginning', 'RRR', 'KGF', 'Pushpa'],
        correctAnswer: 'Baahubali: The Beginning',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 5,
      content: {
        points: 100,
        imageUrl: 'https://cdn.yourgame.com/posters/blurred_jawan.png',
        options: ['Pathaan', 'Jawan', 'Dunki', 'Raees'],
        correctAnswer: 'Jawan',
      },
    },

    // ==========================================
    // --- MODE 2: EMOJI_RIDDLES ---
    // ==========================================
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 1,
      content: {
        points: 100,
        emojis: '🦁👑',
        options: ['Singham', 'Sher Khan', 'The Lion King', 'Jungle Book'],
        correctAnswer: 'The Lion King',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 2,
      content: {
        points: 100,
        emojis: '🎸🧑‍🎤🥁',
        options: ['Rockstar', 'Rock On!!', 'Aashiqui 2', 'Gully Boy'],
        correctAnswer: 'Rock On!!',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 3,
      content: {
        points: 100,
        emojis: '👓🎒✈️',
        options: [
          'Zindagi Na Milegi Dobara',
          'Yeh Jawaani Hai Deewani',
          'Tamasha',
          'Dil Dhadakne Do',
        ],
        correctAnswer: 'Yeh Jawaani Hai Deewani',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 4,
      content: {
        points: 100,
        emojis: '🥛🏃‍♂️🏅',
        options: ['Bhaag Milkha Bhaag', 'Dangal', 'Mary Kom', 'Chak De! India'],
        correctAnswer: 'Bhaag Milkha Bhaag',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 5,
      content: {
        points: 100,
        emojis: '👻🏰👑',
        options: ['Stree', 'Bhool Bhulaiyaa', 'Roohi', 'Bhootnath'],
        correctAnswer: 'Bhool Bhulaiyaa',
      },
    },

    // ==========================================
    // --- MODE 3: LETTER_PUZZLE ---
    // ==========================================
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 1,
      content: {
        points: 100,
        scrambledLetters: ['S', 'H', 'Y', 'O', 'M', 'E'],
        clue: "Amitabh Bachchan and Dharmendra's legendary cinematic epic.",
        correctAnswer: 'SHOLAY',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 2,
      content: {
        points: 100,
        scrambledLetters: ['A', 'G', 'L', 'N', 'A'],
        clue: 'Aamir Khan British-era cricket match masterpiece nominated for an Oscar.',
        correctAnswer: 'LAGAAN',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 3,
      content: {
        points: 100,
        scrambledLetters: ['K', 'N', 'A', 'P', 'I'],
        clue: 'Amitabh Bachchan and Taapsee Pannu court-room thriller drama.',
        correctAnswer: 'PINK',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 4,
      content: {
        points: 100,
        scrambledLetters: ['A', 'N', 'B', 'R', 'A'],
        clue: 'Ranbir Kapoor and Priyanka Chopra comedy-drama about unique love.',
        correctAnswer: 'BARFI',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 5,
      content: {
        points: 100,
        scrambledLetters: ['U', 'D', 'M', 'B', 'O'],
        clue: 'Classic horror-comedy set in Chanderi starring Rajkummar Rao.',
        correctAnswer: 'STREE',
      },
    },

    // ==========================================
    // --- MODE 4: DIALOGUE_GURU ---
    // ==========================================
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 1,
      content: {
        points: 100,
        dialogue: 'Mogambo khush hua!',
        options: ['Sholay', 'Mr. India', 'Shaan', 'Agneepath'],
        correctAnswer: 'Mr. India',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 2,
      content: {
        points: 100,
        dialogue:
          'Bade bade deshon mein aisi chhoti chhoti baatein hoti rehti hain, Senorita.',
        options: [
          'Kuch Kuch Hota Hai',
          'Dilwale Dulhania Le Jayenge',
          'Dil To Pagal Hai',
          'Mohabbatein',
        ],
        correctAnswer: 'Dilwale Dulhania Le Jayenge',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 3,
      content: {
        points: 100,
        dialogue: 'Don ko pakadna mushkil hi nahi... namumkin hai.',
        options: ['Zanjeer', 'Don', 'Agneepath', 'Deewaar'],
        correctAnswer: 'Don',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 4,
      content: {
        points: 100,
        dialogue: 'All is well.',
        options: ['PK', '3 Idiots', 'Taare Zameen Par', 'Munna Bhai M.B.B.S.'],
        correctAnswer: '3 Idiots',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 5,
      content: {
        points: 100,
        dialogue: 'Ek chutki sindoor ki keemat tum kya jaano Ramesh babu.',
        options: ['Om Shanti Om', 'Devdas', 'Main Hoon Na', 'Chennai Express'],
        correctAnswer: 'Om Shanti Om',
      },
    },

    // ==========================================
    // --- MODE 5: SPOT_THE_EXACT ---
    // ==========================================
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 1,
      content: {
        points: 100,
        options: [
          'Kabhi Khushi Kabhi Gham',
          'Kabhi Khushi Kabhie Gham',
          'Kabhie Khushi Kabhie Gham',
          'Kabhi Khushi Kabhi Gam',
        ],
        correctAnswer: 'Kabhi Khushi Kabhie Gham',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 2,
      content: {
        points: 100,
        options: [
          'Zindagi Na Milegi Dobara',
          'Zindagi Na Milegi Dobarah',
          'Jeendagi Na Milegi Dobara',
          'Zindagi Naa Milegi Dobara',
        ],
        correctAnswer: 'Zindagi Na Milegi Dobara',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 3,
      content: {
        points: 100,
        options: [
          'Dilwale Dulhaniya Le Jayenge',
          'Dilwale Dulhania Le Jayenge',
          'Dilwale Dulhania Ley Jayenge',
          'Deelwale Dulhania Le Jayenge',
        ],
        correctAnswer: 'Dilwale Dulhania Le Jayenge',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 4,
      content: {
        points: 100,
        options: [
          'Gangs of Wasseypur',
          'Gangs of Waaseypur',
          'Gangs off Wasseypur',
          'Gangs of Wasipur',
        ],
        correctAnswer: 'Gangs of Wasseypur',
      },
    },
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 5,
      content: {
        points: 100,
        options: [
          'Bajirao Mastani',
          'Bajerao Mastani',
          'Bajirao Maastani',
          'Bajirao Mastany',
        ],
        correctAnswer: 'Bajirao Mastani',
      },
    },

    // ==========================================
    // --- MODE 6: MISSING_LETTERS ---
    // ==========================================
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 1,
      content: {
        points: 100,
        maskedWord: 'D_NG_L',
        clue: "Aamir Khan's record-breaking wrestling biopic.",
        correctAnswer: 'DANGAL',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 2,
      content: {
        points: 100,
        maskedWord: 'P_TH__N',
        clue: "Shah Rukh Khan's grand espionage action comeback movie.",
        correctAnswer: 'PATHAAN',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 3,
      content: {
        points: 100,
        maskedWord: 'BR_HM_STR_',
        clue: 'Astraverse fantasy film starring Ranbir Kapoor and Alia Bhatt.',
        correctAnswer: 'BRAHMASTRA',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 4,
      content: {
        points: 100,
        maskedWord: 'QU__N',
        clue: 'Kangana Ranaut solo honeymoon cult classic movie.',
        correctAnswer: 'QUEEN',
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 5,
      content: {
        points: 100,
        maskedWord: 'CH_K D_! IND__',
        clue: 'Legendary Indian women hockey team sports drama.',
        correctAnswer: 'CHAK DE! INDIA',
      },
    },
  ];

  // 3. Loop through individual items to commit them cleanly into Postgres rows
  for (const item of initialQuestions) {
    await prisma.question.create({
      data: {
        mode: item.mode,
        levelNumber: item.levelNumber,
        content: item.content, // Prisma cleanly converts this object into a native JSON column string
      },
    });
  }

  console.log(
    `✅ Successfully seeded ${initialQuestions.length} sample levels!`,
  );
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
