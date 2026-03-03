import mongoose from "mongoose";

export default async function connectDb() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.DB_NAME}`,
    );
    console.log(
      `MongoDB connected DB HOST: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log(`Failed to connect to mongodb error:${error.message}`);
  }
}
