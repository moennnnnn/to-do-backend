import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  sendCode,
  verifyCode,
} from "@/controllers/auth/auth.controller";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

//mailer
authRouter.post("/send-code", sendCode);
authRouter.post("/verify-code", verifyCode);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
