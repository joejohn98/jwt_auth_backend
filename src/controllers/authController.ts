import type { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/userModel";
import { loginSchema, signupSchema } from "../validators/auth.schema";
import { signToken } from "../utils/jwt";

const signup = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  const validate = signupSchema.safeParse({ username, email, password });

  if (!validate.success) {
    res.status(400).json({
      status: "failed",
      message: validate.error?.issues[0]?.message || "Validation failed",
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

    const token = signToken({ id: newUser._id });

    res.status(201).json({
      status: "success",
      message: "user created successfully",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log("error to signup", error);
    res.status(500).json({
      status: "failed",
      message: "failed to signup",
    });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const validate = loginSchema.safeParse({ email, password });

  if (!validate.success) {
    res.status(400).json({
      status: "failed",
      message: validate.error?.issues[0]?.message || "Validation failed",
    });
    return;
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(400).json({
        status: "failed",
        message: "user not found",
      });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({
        status: "failed",
        message: "wrong password",
      });
      return;
    }

    const token = signToken({ id: user._id });

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    console.log("error to login", error);
    res.status(500).json({
      status: "failed",
      message: "failed to login",
    });
  }
};

export { signup, login };
