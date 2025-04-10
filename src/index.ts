import dotenv from 'dotenv';
import express,{Express} from 'express';
import ConnectToDb from './db/db';
import cors from 'cors';

dotenv.config();
const app : Express= express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });



ConnectToDb();


