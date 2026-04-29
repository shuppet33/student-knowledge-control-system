import {Router} from "express";
import {authController} from "../features/auth/auth.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";

export const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.get('/me', authMiddleware, authController.me);