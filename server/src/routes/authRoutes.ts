import { Router } from 'express';
import { registerUser, login ,logout} from '../controllers/authcontroller';

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);
// app.use('/api/auth', authRoutes)

export default router;
