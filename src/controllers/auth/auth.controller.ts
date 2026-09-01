import { findAccountS, registerS } from "@/services/auth/auth.service";
import { compareHashed, hashValue } from "@/utils/bcrypt/bcrypt.util";
import { AppError } from "@/utils/error/app-error.util";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { pushSessionS } from "@/services/auth/auth.service";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "@/utils/jwt/jwt.util";
import {
  setRefreshCookie,
  clearRefreshCookie,
  REFRESH_COOKIE_NAME,
  REFRESH_COOKIE_PATH,
} from "@/utils/cookie/cookie.util";
import Account from "@/models/auth/account.model";
import { buildSession } from "@/utils/session/session.util";
import { createOtpS, verifyOtpS } from "@/services/otp/otp.service";
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "@/utils/mail/mail.template";

export const register = async (req: Request, res: Response) => {
  //Get data
  const {
    _id,
    firstName,
    lastName,
    username,
    email,
    password,
    agree,
    sessions,
  } = req.body;

  // Check if all fields have data
  if (!firstName || !lastName || !username || !email || !password)
    throw new AppError("All fields are required.", 400);

  if (!agree) {
    throw new AppError("You must agree to the Terms and Conditions.", 400);
  }

  // Find if email exists
  if (await findAccountS({ email })) {
    throw new AppError("Email already exists.", 400);
  }

  // Check if username is already used
  if (await findAccountS({ username })) {
    throw new AppError("Username already used.", 400);
  }

  //Hashed pass
  const hashedPassword = await hashValue(password);

  // Create acc
  const account = await registerS({
    _id,
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
    agree,
    sessions,
  });
  if (!account) throw new AppError("Failed to create account.", 500);

  const sid = uuid();
  const sub = String(account._id);

  const accessToken = signAccessToken(sub);
  const refreshToken = signRefreshToken(sub, sid);

  // Build session and save it in database
  const session = await buildSession(refreshToken, sid);

  // Push the session to database
  const updated = await pushSessionS(String(account._id), sessions);
  if (!updated) throw new AppError("Account not found.", 404);

  // Set the refresh token in cookie
  setRefreshCookie(res, refreshToken);

  // Return response
  return res.status(200).json({
    message: "Account registered successfully.",
    accessToken,
  });
};

export const login = async (req: Request, res: Response) => {
  //Get data
  const { username, email, password } = req.body;

  // Check if required fields have data
  if (!email && !username)
    throw new AppError("Email or username is required.", 400);
  if (!password) throw new AppError("Password is required.", 400);

  // Check if account exists
  let account;
  if (username) account = await findAccountS({ username });
  if (!username && email) account = await findAccountS({ email });

  if (!account) {
    throw new AppError("Invalid credentials.", 400);
  }

  // Check if pass is correct
  let passwordCorrect = await compareHashed(password, account.password);
  if (!passwordCorrect) {
    throw new AppError("Incorrect password.", 400);
  }
  // Get uuid
  const sid = uuid();

  // Generate tokens
  const sub = String(account._id);
  const accessToken = signAccessToken(sub);
  const refreshToken = signRefreshToken(sub, sid);

  // Build session and save it in database
  const session = await buildSession(refreshToken, sid);

  // Push the session to database
  const updated = await pushSessionS(String(account._id), session);
  if (!updated) throw new AppError("Account not found.", 404);

  // Set the refresh token in cookie
  setRefreshCookie(res, refreshToken);

  // Return response
  return res.status(200).json({
    message: "Login successfully.",
    accessToken,
  });
};

export const logout = async (req: Request, res: Response) => {
  //Get refresh token from cookie
  const token = req.cookies?.[REFRESH_COOKIE_NAME];

  if (token) {
    try {
      const payload = verifyRefreshToken(token) as {
        sub: string;
        sid: string;
      };
      await Account.updateOne(
        { _id: payload.sub },
        { $pull: { sessions: { sid: payload.sid } } },
      );
    } catch (err) {
      if (process.env.NODE_ENV !== "production")
        console.error("Logout verify failed:", err);
    }
  }

  clearRefreshCookie(res);

  //Return response
  res.status(200).json({ message: "Logged out successfully." });
};

export const sendCode = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) throw new AppError("Email is required.", 400);

  const account = await findAccountS({ email });
  if (!account) throw new AppError("Email not found.", 404);

  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
  await createOtpS(email, code);
  await sendVerificationEmail({
    email,
    firstName: account.firstName,
    lastName: account.lastName,
    code,
  });

  return res
    .status(200)
    .json({ message: "Verification code sent to your email." });
};

export const verifyCode = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  if (!email || !code) throw new AppError("Email and code are required.", 400);

  const valid = await verifyOtpS(email, code);
  if (!valid) throw new AppError("Invalid or expired code.", 400);

  return res.status(200).json({ message: "Email verified successfully." });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) throw new AppError("Email is required.", 400);

  const account = await findAccountS({ email });
  if (!account) throw new AppError("Email not found.", 404);

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  await createOtpS(email, code);
  await sendResetPasswordEmail({
    email,
    firstName: account.firstName,
    lastName: account.lastName,
    code,
  });

  return res.status(200).json({ message: "Reset code sent to your email." });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body; // remove code from here
  if (!email || !newPassword)
    throw new AppError("Email and new password are required.", 400);

  const hashed = await hashValue(newPassword);
  const updated = await Account.findOneAndUpdate(
    { email },
    { password: hashed },
    { new: true },
  );
  if (!updated) throw new AppError("Account not found.", 404);

  return res.status(200).json({ message: "Password reset successfully." });
};
