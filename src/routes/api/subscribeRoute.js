import express from 'express';
import { newsLetterEmail, deleteNewsById, getAllSubscribers } from '../controllers/subscriberController';
import { auth as verify } from "./verifyToken";
const router = express.Router();
router.post('/', newsLetterEmail);
router.delete('/:id', verify, deleteNewsById);
router.get('/', verify, getAllSubscribers);
export default router;