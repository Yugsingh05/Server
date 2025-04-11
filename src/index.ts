import dotenv from 'dotenv';
import express,{Express} from 'express';
import ConnectToDb from './db/db';
import cors from 'cors';
import authRoute from './routes/auth';

dotenv.config();

ConnectToDb();
const app : Express= express();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 5000;


app.use('/api/auth', authRoute);



app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });





