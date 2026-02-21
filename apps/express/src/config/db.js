import mongoose from "mongoose";

export default async function connectDb(uri) {
  try {
    await mongoose.connect(uri).then(() => console.log("connected to mongodb"));
  } catch (error) {
    console.log(`Failed to connect to mongodb error:${error}`);
  }
}
