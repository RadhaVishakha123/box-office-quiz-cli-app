import prisma from '../config/prisma.js';
import { GameMode } from '../../generated/prisma/enums.js';
export async function getQuestion(mode: GameMode, level: number) {
  const questions = await prisma.question.findMany({
    where: {
      mode,
      levelNumber: level,
    },
  });
  return questions;
}

export async function getQuestionsCount() {
  const questionsCount = await prisma.question.count();
  console.log('questionsCount:', questionsCount);
  return questionsCount;
}
