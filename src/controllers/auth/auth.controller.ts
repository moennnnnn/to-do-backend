import { findAccountS, registerS } from "@/services/auth/auth.service";
import { compareHashed, hashValue } from "@/utils/bcrypt/bcrypt";
import { AppError } from "@/utils/error/app-error.util";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  //Get data
  const { firstName, lastName, username, email, password, agree } = req.body;

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
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
    agree,
  });

  //Return response
  res.status(200).json({ message: "Account registered successfully." });
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

  //Return response
  res.status(200).json({ message: "Login successfully." });
};

export const logout = async (req: Request, res: Response) => {
  //Get data
  const { username, email } = req.body;

  //Check if existing account

  let account;
  if (email) {
    account = await findAccountS({ email });
  } else if (username) {
    account = await findAccountS({ username });
  } else {
    account = false;
  }

  const accountEmail = await findAccountS({ email });
  const accountUsername = await findAccountS({ username });

  if (!(accountEmail || accountUsername)) {
    throw new AppError("User not found.", 400);
  }

  //Return response
  res.status(200).json({ message: "Logged out successfully.", account });
};
