import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`database connected to ${connect.connection.host}`);
    } catch(error) {
        console.log("database connection failed", error)
        process.exit(1);
    }
}

export default connectDB;