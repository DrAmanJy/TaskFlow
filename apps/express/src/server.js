import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDb from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import projectRouter from "./routes/projectRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

// Connect to Database
connectDb(mongoUri);

// Middleware
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api", projectRouter);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`),
);
