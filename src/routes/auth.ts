import { Router, Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("req.bofy", req.body);
    const { email, password,userName } = req.body;

    console.log("email", password);

    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const NewPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        userName,
        email,
        password: NewPassword,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, "secret", { expiresIn: "1h" });
      res
        .status(201)
        .json({ success: true, message: "User created successfully",token, userId: newUser._id });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    console.log("email", email);

    const user = await User.findOne({ email });

    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });

      res.status(200).json({ success: true, token, userId: user._id });
      
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
