import mongoose, { Date, Document } from "mongoose";

export interface IRecipe extends Document{
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
}

const RecipeSchema = new mongoose.Schema<IRecipe>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

export default mongoose.model<IRecipe>('Recipe', RecipeSchema);
