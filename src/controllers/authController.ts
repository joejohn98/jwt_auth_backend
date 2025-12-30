import type { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/userModel";
import { signupSchema } from "../validators/auth.schema";

const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  const validate = signupSchema.safeParse({ username, email, password });

  if (!validate.success) {
    res.status(400).json({
      status: "failed",
      message: validate.error.message,
    });
    return;
  }

  const findUser = await User.findOne({ email });

  if (findUser) {
    res.status(400).json({
      status: "failed",
      message: "user already exists",
    });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "success",
      message: "user created successfully",
      data: newUser,
    });

  } catch (error) {
    console.log("error to signup", error);
    res.status(500).json({
      status: "failed",
      message: "failed to signup",
    });
  }
};


export { signup };