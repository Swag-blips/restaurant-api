import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string);

    console.log("connected to  mongodb server");
  } catch (error) {}
};

export default connectMongoDb;
