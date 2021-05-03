import express from 'express';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import roomRoutes from './room.route';
import userLeaguesRoutes from './league.route';
import transferRoutes from "./transfer.route";

const router = express.Router();

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount user routes at /users
router.use('/users', userRoutes);

//mount auction activities
router.use('/leagues', roomRoutes);

router.use('/userLeagues', userLeaguesRoutes);

router.use('/transfers', transferRoutes);



export default router;