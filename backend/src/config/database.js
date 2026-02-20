import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!uri) {
            console.error("MONGODB_URI or MONGO_URI is not set in environment variables.");
            process.exit(1);
        }

        // Ensure connection string starts with a valid scheme
        const normalizedUri = (uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://'))
            ? uri
            : `mongodb://${uri}`;

        const connectionInstance = await mongoose.connect(normalizedUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`\n yessssss connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("oops connection failed", error);
        process.exit(1);
    }
};

export default connectDB;

