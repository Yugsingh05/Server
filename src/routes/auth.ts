import { Router , Request, Response} from "express";
import User from "../models/User";
import bcrypt from "bcrypt"

const router = Router();

router.post("/register", async (req: Request, res: Response): Promise<void> => {
    
  
    try {
        console.log("req.bofy", req.body);
        const { email, password } = req.body;
  
    console.log("email", password);

      const isUserExist = await User.findOne({ email });
  
      if (isUserExist) {
        res.status(400).json({ message: "User already exists" });
      } else {
        const NewPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
          email,
          password : NewPassword
        });
  
        await newUser.save();
  
        res.status(201).json({ success: true, message: "User created successfully" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

export default router