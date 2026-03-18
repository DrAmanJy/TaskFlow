import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDb from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import userRouter from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import AppError from "./utils/AppError.js";
import taskRouter from "./routes/taskRoutes.js";
import chatRouter from "./routes/chatRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Middleware Setup
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173", process.env.WEB_URI],
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
  }),
);
app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ extended: true, limit: "3mb" }));
app.use(cookieParser());

// 2. Routes

app.use(
  "/api/auth",
  (req, res, next) => {
    console.log(req.path);
    next();
  },
  authRouter,
);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

// 3. 404 & Error Handler
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);

(async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      "Critical: Server failed to start due to DB connection error.",
    );
    process.exit(1);
  }
})();
