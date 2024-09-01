import express from 'express';
import * as ia from '../controllers/ia.controller.js';
import { scrapeData } from '../ia/chatBot.js';

const router = express.Router();

router.post('/chat', ia.chatIa);
router.post('/', ia.addDataIa);
router.get('/scrapeData', scrapeData);

const iaRouter = router;

export { iaRouter };
