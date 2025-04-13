import { Request, Response, Router } from "express";
import authMiddleware, { AuthRequest } from "../middleware/middleware";
import Recipe from "../models/Recipe";
import User from "../models/User";

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
      const recipes = await Recipe.find().sort({ createdAt: -1 });

      res.status(200).json({ success: true, data: recipes });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/delete-recipe/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const recipeId = req.params.id;
      await Recipe.findByIdAndDelete(recipeId);
      res.status(200).json({ success: true, message: "Recipe deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

  router.put("/update-recipe/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const recipeId = req.params.id;
      const { title, description, difficulty } = req.body;
  
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipeId,
        { title, description, difficulty },
        { new: true }
      );
  
      res.status(200).json({ success: true, data: updatedRecipe });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/get-recipe/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
      const recipeId = req.params.id;
      const recipe = await Recipe.findById(recipeId);

      const user = await User.findById(req.userId);

      const data = {
        recipe,
        userName : user?.userName
      }
      res.status(200).json({ success: true, data: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  export default  router