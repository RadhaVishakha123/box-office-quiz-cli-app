import {
  getLevelsForMode,
  getQuestion,
  updateLevelData,
} from '../services/game.service.js';
import type { Request, Response } from 'express';
import { GameMode } from '../../generated/prisma/enums.js';

export async function getLevelsForModeController(req: Request, res: Response) {
  const { userId, mode } = req.body;
  if (!userId || !mode) {
    return res.status(400).json({
      success: false,
      message: 'Missing userId or mode',
    });
  }
  try {
    const levels = await getLevelsForMode(
      parseInt(userId as string),
      mode as GameMode,
    );
    return res.status(200).json({
      success: true,
      message: 'Levels for mode fetched successfully',
      levels,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

export async function getQuestionController(req: Request, res: Response) {
  const { mode, level } = req.body;
  if (!mode || !level) {
    return res.status(400).json({
      success: false,
      message: 'Missing mode or level',
    });
  }
  try {
    const question = await getQuestion(
      mode as GameMode,
      parseInt(level as string),
    );
    return res.status(200).json({
      success: true,
      message: 'Question fetched successfully',
      question,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
export async function updateLevelDataController(req: Request, res: Response) {
  const { userId, mode, level, won } = req.body;
  if (!userId || !mode || !level) {
    return res.status(400).json({
      success: false,
      message: 'Missing userId, mode, level or won',
    });
  }
  try {
    const updatedLevelData = await updateLevelData(
      parseInt(userId as string),
      mode as GameMode,
      parseInt(level as string),
      won as boolean,
    );
    return res.status(200).json({
      success: true,
      message: 'Level data updated successfully',
      updatedLevelData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
