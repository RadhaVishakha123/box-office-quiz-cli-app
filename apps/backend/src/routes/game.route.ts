import { Router } from 'express';
import {
  getQuestionController,
  updateLevelDataController,
  getLevelsForModeController,
} from '../controllers/game.controller.js';

const router = Router();

router.post('/question', getQuestionController);
router.post('/levels-for-mode', getLevelsForModeController);
router.post('/update-level-data', updateLevelDataController);

export default router;
