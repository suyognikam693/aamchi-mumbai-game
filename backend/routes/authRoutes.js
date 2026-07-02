import { Router } from 'express';
import { register,login,me,googleLogin } from '../controllers/authController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.post('/register',register);
router.post('/login',login);
router.get('/me',requireAuth,me);
router.post("/google",googleLogin);

export default router;