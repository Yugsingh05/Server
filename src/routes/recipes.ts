import { Request, Response, Router } from "express";
import authMiddleware, { AuthRequest } from "../middleware/middleware";
import Recipe from "../models/Recipe";

const router = Router();


router.post("/create-recipe", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      console.log("req.body", req.body);
      const { title, description, difficulty } = req.body;
  
      const newRecipe = await Recipe.create({
        title,
        description,
        difficulty,
        createdBy: req.userId,
      });
  
      await newRecipe.save();
  
       res.status(201).json({
        success: true,
        message: "Recipe created successfully",
        data : newRecipe
      });
  
    } catch (error) {
      console.log(error);
       res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/get-recipes", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const recipes = await Recipe.find({ createdBy: req.userId });
      res.status(200).json({ success: true, data: recipes });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

  export default  router