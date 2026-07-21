import { GameMode } from '../generated/prisma/enums.js';
import prisma from '../src/config/prisma.js';

async function main() {
  console.log('🌱 Starting complete database seeding...');

  // 1. Clean existing records in correct order (child tables first to satisfy foreign keys)
  await prisma.userGameProgress.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('🧹 Cleaned existing database records.');

  // ==========================================
  // --- 2. SEED QUESTIONS ---
  // ==========================================
  const initialQuestions = [
    // BLURRED_POSTER
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 1,
      content: {
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
        imageUrl: 'https://cdn.yourgame.com/posters/blurred_sholay.png',
        options: ['Don', 'Zanjeer', 'Sholay', 'Deewaar'],
        correctAnswer: 'Sholay',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 3,
      content: {
        imageUrl: 'https://cdn.yourgame.com/posters/blurred_3idiots.png',
        options: ['PK', '3 Idiots', 'Dangal', 'Taare Zameen Par'],
        correctAnswer: '3 Idiots',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 4,
      content: {
        imageUrl: 'https://cdn.yourgame.com/posters/blurred_bahubali.png',
        options: ['Baahubali: The Beginning', 'RRR', 'KGF', 'Pushpa'],
        correctAnswer: 'Baahubali: The Beginning',
      },
    },
    {
      mode: GameMode.BLURRED_POSTER,
      levelNumber: 5,
      content: {
        imageUrl: 'https://cdn.yourgame.com/posters/blurred_jawan.png',
        options: ['Pathaan', 'Jawan', 'Dunki', 'Raees'],
        correctAnswer: 'Jawan',
      },
    },

    // EMOJI_RIDDLES
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 1,
      content: {
        emojis: '🦁👑',
        options: ['Singham', 'Sher Khan', 'The Lion King', 'Jungle Book'],
        correctAnswer: 'The Lion King',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 2,
      content: {
        emojis: '🎸🧑‍🎤🥁',
        options: ['Rockstar', 'Rock On!!', 'Aashiqui 2', 'Gully Boy'],
        correctAnswer: 'Rock On!!',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 3,
      content: {
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
        emojis: '🥛🏃‍♂️🏅',
        options: ['Bhaag Milkha Bhaag', 'Dangal', 'Mary Kom', 'Chak De! India'],
        correctAnswer: 'Bhaag Milkha Bhaag',
      },
    },
    {
      mode: GameMode.EMOJI_RIDDLES,
      levelNumber: 5,
      content: {
        emojis: '👻🏰👑',
        options: ['Stree', 'Bhool Bhulaiyaa', 'Roohi', 'Bhootnath'],
        correctAnswer: 'Bhool Bhulaiyaa',
      },
    },

    // LETTER_PUZZLE
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 1,
      content: {
        scrambledLetters: ['S', 'H', 'Y', 'O', 'M', 'E'],
        clue: "Amitabh Bachchan and Dharmendra's legendary cinematic epic.",
        correctAnswer: 'SHOLAY',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 2,
      content: {
        scrambledLetters: ['A', 'G', 'L', 'N', 'A'],
        clue: 'Aamir Khan British-era cricket match masterpiece nominated for an Oscar.',
        correctAnswer: 'LAGAAN',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 3,
      content: {
        scrambledLetters: ['K', 'N', 'A', 'P', 'I'],
        clue: 'Amitabh Bachchan and Taapsee Pannu court-room thriller drama.',
        correctAnswer: 'PINK',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 4,
      content: {
        scrambledLetters: ['A', 'N', 'B', 'R', 'A'],
        clue: 'Ranbir Kapoor and Priyanka Chopra comedy-drama about unique love.',
        correctAnswer: 'BARFI',
      },
    },
    {
      mode: GameMode.LETTER_PUZZLE,
      levelNumber: 5,
      content: {
        scrambledLetters: ['S', 'T', 'R', 'E', 'E'], // Fixed typo from 'DUMBO'
        clue: 'Classic horror-comedy set in Chanderi starring Rajkummar Rao.',
        correctAnswer: 'STREE',
      },
    },

    // DIALOGUE_GURU
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 1,
      content: {
        dialogue: 'Mogambo khush hua!',
        options: ['Sholay', 'Mr. India', 'Shaan', 'Agneepath'],
        correctAnswer: 'Mr. India',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 2,
      content: {
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
        dialogue: 'Don ko pakadna mushkil hi nahi... namumkin hai.',
        options: ['Zanjeer', 'Don', 'Agneepath', 'Deewaar'],
        correctAnswer: 'Don',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 4,
      content: {
        dialogue: 'All is well.',
        options: ['PK', '3 Idiots', 'Taare Zameen Par', 'Munna Bhai M.B.B.S.'],
        correctAnswer: '3 Idiots',
      },
    },
    {
      mode: GameMode.DIALOGUE_GURU,
      levelNumber: 5,
      content: {
        dialogue: 'Ek chutki sindoor ki keemat tum kya jaano Ramesh babu.',
        options: ['Om Shanti Om', 'Devdas', 'Main Hoon Na', 'Chennai Express'],
        correctAnswer: 'Om Shanti Om',
      },
    },

    // SPOT_THE_EXACT
    {
      mode: GameMode.SPOT_THE_EXACT,
      levelNumber: 1,
      content: {
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
        options: [
          'Bajirao Mastani',
          'Bajerao Mastani',
          'Bajirao Maastani',
          'Bajirao Mastany',
        ],
        correctAnswer: 'Bajirao Mastani',
      },
    },

    // MISSING_LETTERS
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 1,
      content: {
        maskedWord: 'D_NG_L',
        clue: "Aamir Khan's record-breaking wrestling biopic.",
        correctAnswer: 'DANGAL',
        scrambledLetters: ['A', 'A', 'N', 'M', 'G', 'L', 'O', 'P'],
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 2,
      content: {
        maskedWord: 'P_TH__N',
        clue: "Shah Rukh Khan's grand espionage action comeback movie.",
        correctAnswer: 'PATHAAN',
        scrambledLetters: ['A', 'A', 'A', 'R', 'H', 'M', 'T', 'S'],
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 3,
      content: {
        maskedWord: 'BR_HM_STR_',
        clue: 'Astraverse fantasy film starring Ranbir Kapoor and Alia Bhatt.',
        correctAnswer: 'BRAHMASTRA',
        scrambledLetters: ['A', 'A', 'A', 'M', 'S', 'H', 'K', 'T', 'V', 'B'],
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 4,
      content: {
        maskedWord: 'QU__N',
        clue: 'Kangana Ranaut solo honeymoon cult classic movie.',
        correctAnswer: 'QUEEN',
        scrambledLetters: ['E', 'E', 'O', 'U', 'I', 'N', 'Z', 'M'],
      },
    },
    {
      mode: GameMode.MISSING_LETTERS,
      levelNumber: 5,
      content: {
        maskedWord: 'CH_K D_! IND__',
        clue: 'Legendary Indian women hockey team sports drama.',
        correctAnswer: 'CHAK DE! INDIA',
        scrambledLetters: ['A', 'E', 'I', 'A', 'K', 'D', 'N', 'H', 'S', 'T'],
      },
    },
  ];

  await prisma.question.createMany({
    data: initialQuestions,
  });
  console.log(`✅ Seeded ${initialQuestions.length} Questions`);

  // ==========================================
  // --- 3. SEED USERS ---
  // ==========================================
  const newUsersData = [
    {
      deviceToken: 'dt_iOS_981a17fa_2026_x01',
      deviceType: 'iOS',
      name: 'Aarav Sharma',
      avatar: '🐻',
    },
    {
      deviceToken: 'dt_Android_442b881c_2026_x02',
      deviceType: 'Android',
      name: 'Ananya Patel',
      avatar: '🧸',
    },
    {
      deviceToken: 'dt_iOS_110c993d_2026_x03',
      deviceType: 'iOS',
      name: 'Rohan Verma',
      avatar: '🐼',
    },
    {
      deviceToken: 'dt_Android_773d224e_2026_x04',
      deviceType: 'Android',
      name: 'Priya Nair',
      avatar: '🐨',
    },
    {
      deviceToken: 'dt_iOS_334e555f_2026_x05',
      deviceType: 'iOS',
      name: 'Kabir Mehta',
      avatar: '🐯',
    },
    {
      deviceToken: 'dt_Android_885f666g_2026_x06',
      deviceType: 'Android',
      name: 'Diya Joshi',
      avatar: '🦁',
    },
    {
      deviceToken: 'dt_iOS_556g777h_2026_x07',
      deviceType: 'iOS',
      name: 'Siddharth Rao',
      avatar: '🦊',
    },
    {
      deviceToken: 'dt_Android_227h888i_2026_x08',
      deviceType: 'Android',
      name: 'Isha Kapoor',
      avatar: '🐱',
    },
    {
      deviceToken: 'dt_iOS_998i000j_2026_x09',
      deviceType: 'iOS',
      name: 'Vikram Singh',
      avatar: '🐶',
    },
    {
      deviceToken: 'dt_Android_119j222k_2026_x10',
      deviceType: 'Android',
      name: 'Sneha Reddy',
      avatar: '🐼',
    },
  ];

  // Insert users individually and collect created records to retain real IDs
  const createdUsers = [];
  for (const user of newUsersData) {
    const createdUser = await prisma.user.create({ data: user });
    createdUsers.push(createdUser);
  }
  console.log(`✅ Seeded ${createdUsers.length} Users`);

  // ==========================================
  // --- 4. SEED USER GAME PROGRESS ---
  // ==========================================
  // Dynamically attach progress using actual database user IDs
  // Add '!' after array index access so TypeScript knows userId is strictly a number
  const gameProgressData = [
    // User 1
    {
      userId: createdUsers[0]!.id,
      mode: GameMode.EMOJI_RIDDLES,
      currentLevel: 15,
      levelsWon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      levelsLost: [3, 8],
    },
    {
      userId: createdUsers[0]!.id,
      mode: GameMode.DIALOGUE_GURU,
      currentLevel: 8,
      levelsWon: [1, 2, 3, 4, 5, 6, 7],
      levelsLost: [2],
    },

    // User 2
    {
      userId: createdUsers[1]!.id,
      mode: GameMode.EMOJI_RIDDLES,
      currentLevel: 22,
      levelsWon: Array.from({ length: 21 }, (_, i) => i + 1),
      levelsLost: [5, 12, 19],
    },
    {
      userId: createdUsers[1]!.id,
      mode: GameMode.MISSING_LETTERS,
      currentLevel: 10,
      levelsWon: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      levelsLost: [4],
    },

    // User 3
    {
      userId: createdUsers[2]!.id,
      mode: GameMode.DIALOGUE_GURU,
      currentLevel: 18,
      levelsWon: Array.from({ length: 17 }, (_, i) => i + 1),
      levelsLost: [6, 11],
    },
    {
      userId: createdUsers[2]!.id,
      mode: GameMode.MISSING_LETTERS,
      currentLevel: 5,
      levelsWon: [1, 2, 3, 4],
      levelsLost: [],
    },

    // User 4
    {
      userId: createdUsers[3]!.id,
      mode: GameMode.EMOJI_RIDDLES,
      currentLevel: 30,
      levelsWon: Array.from({ length: 29 }, (_, i) => i + 1),
      levelsLost: [10, 20],
    },

    // User 5
    {
      userId: createdUsers[4]!.id,
      mode: GameMode.DIALOGUE_GURU,
      currentLevel: 12,
      levelsWon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      levelsLost: [3],
    },

    // User 6
    {
      userId: createdUsers[5]!.id,
      mode: GameMode.MISSING_LETTERS,
      currentLevel: 16,
      levelsWon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      levelsLost: [2, 9, 14],
    },

    // User 7
    {
      userId: createdUsers[6]!.id,
      mode: GameMode.EMOJI_RIDDLES,
      currentLevel: 8,
      levelsWon: [1, 2, 3, 4, 5, 6, 7],
      levelsLost: [4],
    },

    // User 8
    {
      userId: createdUsers[7]!.id,
      mode: GameMode.DIALOGUE_GURU,
      currentLevel: 25,
      levelsWon: Array.from({ length: 24 }, (_, i) => i + 1),
      levelsLost: [7, 15, 21],
    },

    // User 9
    {
      userId: createdUsers[8]!.id,
      mode: GameMode.MISSING_LETTERS,
      currentLevel: 11,
      levelsWon: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      levelsLost: [5],
    },

    // User 10
    {
      userId: createdUsers[9]!.id,
      mode: GameMode.EMOJI_RIDDLES,
      currentLevel: 6,
      levelsWon: [1, 2, 3, 4, 5],
      levelsLost: [2],
    },
  ];

  await prisma.userGameProgress.createMany({
    data: gameProgressData,
  });
  console.log(
    `✅ Seeded ${gameProgressData.length} User Game Progress records`,
  );

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
