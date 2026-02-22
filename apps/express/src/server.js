import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
configDotenv();

const app = express();
const PORT = process.env.PORT;
const mongoUri = process.env.mongoUri;
connectDb(mongoUri);

app.use(cors({ credentials: true }));
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`),
);
