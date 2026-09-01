import expressMongoSanitize from "@exortek/express-mongo-sanitize";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { authRouter } from "./routes/auth/auth.routes.js";
import { taskRouter } from "./routes/tasks/task.route.js";
import { tokenRouter } from "./routes/token/token.route.js";
import { accountRouter } from "./routes/account/account.route.js";
import { globalRateLimiter } from "./middlewares/limiter.middleware.js";
import { globalErrorHandler } from "./middlewares/global-error-handler.middleware.js";

export const createApp = () => {
  const app = express();
  app.set("trust proxy", 1);

  const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",")
    : [];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        callback(new Error("CORS not allowed"), false);
      },
      credentials: true,
    }),
  );
  app.use(helmet());
  app.use(globalRateLimiter);
  app.use(express.json());
  app.use(expressMongoSanitize());
  app.use(cookieParser());

  app.get("/api/test", (req, res) => res.status(200).send("Api is running"));
  app.use("/api/auth", authRouter);
  app.use("/api/task", taskRouter);
  app.use("/api/token", tokenRouter);
  app.use("/api/account", accountRouter);

  app.use(globalErrorHandler);
  return app;
};