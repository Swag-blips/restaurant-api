import mongoose from "mongoose";

const connectMongoDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string);

    console.log("connected to  mongodb server");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectMongoDb;
