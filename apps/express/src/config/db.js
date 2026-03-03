import mongoose from "mongoose";

export default async function connectDb() {
  const { MONGO_URI, DB_NAME } = process.env;
  if (!MONGO_URI || !DB_NAME) {
    throw new Error("Missing required env vars: MONGO_URI and DB_NAME");
  }
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGO_URI}/${DB_NAME}`,
    );
    console.log(
      `MongoDB connected DB HOST: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error(`Failed to connect to mongodb error: ${error.message}`);
    throw error;
  }
}
