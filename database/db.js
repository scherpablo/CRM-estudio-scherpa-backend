import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const db = await mongoose.connect(`${mongoUri}`, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const url = `${db.connection.host} : ${db.connection.port}`;
        console.log(`Mongo DB connected in: ${url}`)
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;