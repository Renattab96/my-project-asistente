import { Router } from 'express';
import { updateUser , resetUserPassword ,changeUserPassword,listAllUsers , updateUserDeviceToken , registerUser} from '../controllers/userController';
import { deleteUser } from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import { uploadProfilePicture } from '../middleware/uploadMiddleware';
import adminOnly from '../middleware/roleMiddleware';

const router = Router();

router.put('/update', authMiddleware, uploadProfilePicture, updateUser);
router.delete('/delete/:userId', authMiddleware, adminOnly, deleteUser);
router.put('/reset-password/:userId', authMiddleware, adminOnly, resetUserPassword);
router.put('/change-password', authMiddleware, changeUserPassword);
router.get('/all-users', authMiddleware, adminOnly, listAllUsers);
router.put('/update-device-token', authMiddleware, updateUserDeviceToken);
router.post('/register', registerUser);

export default router;
