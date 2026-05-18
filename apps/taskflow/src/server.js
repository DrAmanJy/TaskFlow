import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { swaggerSpec } from "./config/swagger.js";
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
const isProduction = process.env.NODE_ENV === "production";

function getAllowedOrigins() {
  const origins = [];
  if (process.env.WEB_URI) origins.push(process.env.WEB_URI);
  if (!isProduction) {
    origins.push("http://localhost:5173", "http://localhost:4173");
  }
  if (isProduction && origins.length === 0) {
    throw new Error("WEB_URI must be set when NODE_ENV=production");
  }
  return origins;
}

app.set("trust proxy", 1);

app.use(helmet());
app.use(
  cors({
    origin: getAllowedOrigins(),
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
  }),
);
app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ extended: true, limit: "3mb" }));
app.use(cookieParser());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isProduction ? 200 : 1000,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.path === "/health",
  }),
);

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "taskflow-api",
    environment: process.env.NODE_ENV || "development",
  });
});

const enableApiDocs =
  process.env.ENABLE_API_DOCS === "true" ||
  (!isProduction && process.env.ENABLE_API_DOCS !== "false");

if (enableApiDocs) {
  app.get("/api-docs", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

app.use("/api/auth", authRouter);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

app.use((req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(errorHandler);

(async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(
        `TaskFlow API listening on port ${PORT} (${isProduction ? "production" : "development"})`,
      );
    });
  } catch {
    console.error(
      "Critical: Server failed to start due to DB connection error.",
    );
    process.exit(1);
  }
})();
