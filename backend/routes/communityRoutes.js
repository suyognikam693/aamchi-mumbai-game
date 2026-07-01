import express from 'express';
import { upload } from '../services/storage.js';
import { createPost,getPost } from '../controllers/communityController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/post',requireAuth,upload.single('image'),createPost);
router.get('/post/:index',getPost);

export default router;