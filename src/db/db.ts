import mongoose from 'mongoose';

const ConnectToDb = async () : Promise<void> => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL as string);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default ConnectToDb