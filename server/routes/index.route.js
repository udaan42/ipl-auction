import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import testRoutes from './test.route';
import roomRoutes from './room.route';

const router = express.Router();

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/users', userRoutes);

// mount java service route at /test
router.use('/test', testRoutes);

//mount auction activities
router.use('/room', roomRoutes);

export default router;