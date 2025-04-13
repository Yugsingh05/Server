import mongoose , {Document} from "mongoose";

interface User extends Document {
    userName : string,
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema<User>({
    userName : {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default mongoose.model<User>("User", UserSchema);
        