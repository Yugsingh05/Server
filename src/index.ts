import dotenv from 'dotenv';
import express,{Express} from 'express';
import ConnectToDb from './db/db';
import cors from 'cors';
import authRoute from './routes/auth';
import recipeRoute from './routes/recipes'

dotenv.config();

ConnectToDb();
const app : Express= express();
app.use(express.json());
app.use(cors({
    origin: '*', // or ["http://localhost:3000", "http://10.0.2.2:8081"]
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

const PORT = process.env.PORT || 5000;


app.use('/api/auth', authRoute);
app.use('/api/recipes', recipeRoute);


app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });





