import prisma from '../config/prisma.js';
import { GameMode } from '../../generated/prisma/enums.js';
export async function getLevelsForMode(userId: number, mode: GameMode) {
  const levels = await prisma.userGameProgress.findUnique({
    where: {
      userId_mode: {
        userId,
        mode,
      },
    },

    select: {
      currentLevel: true,
      levelsWon: true,
      levelsLost: true,
    },
  });
  const questionsCount = await prisma.question.count({
    where: {
      mode,
    },
  });
  if (!levels) {
    await prisma.userGameProgress.create({
      data: {
        userId,
        mode,
        currentLevel: 1,
        levelsWon: [],
        levelsLost: [],
      },
    });
    return [];
  }
  return { levels, questionCount: questionsCount };
}
export async function getQuestion(mode: GameMode, level: number) {
  const questions = await prisma.question.findMany({
    where: {
      mode,
      levelNumber: level,
    },
  });
  return questions;
}
export async function updateLevelData(
  userId: number,
  mode: GameMode,
  level: number,
  won: boolean,
) {
  const userGameProgress = await prisma.userGameProgress.findUnique({
    where: {
      userId_mode: {
        userId,
        mode,
      },
    },
  });
  if (!userGameProgress) {
    await prisma.userGameProgress.create({
      data: {
        userId,
        mode,
        currentLevel: level,
        levelsWon: won ? [level] : [],
        levelsLost: !won ? [level] : [],
      },
    });
  } else {
    let levelsWonValues = [...userGameProgress.levelsWon];
    let levelsLostValues = [...userGameProgress.levelsLost];
    let nextlevel;
    if (won) {
      if (!levelsWonValues.includes(level)) {
        levelsWonValues.push(level);
      }
      levelsLostValues = levelsLostValues.filter((l) => l !== level);
    } else {
      if (!levelsLostValues.includes(level)) {
        levelsLostValues.push(level);
      }
      levelsWonValues = levelsWonValues.filter((l) => l !== level);
    }
    if (userGameProgress.currentLevel > level) {
      nextlevel = userGameProgress.currentLevel;
    } else {
      nextlevel = level + 1;
    }

    await prisma.userGameProgress.update({
      where: {
        userId_mode: {
          userId,
          mode,
        },
      },
      data: {
        currentLevel: nextlevel,
        levelsWon: levelsWonValues,
        levelsLost: levelsLostValues,
      },
    });
  }
  return level + 1;
}
