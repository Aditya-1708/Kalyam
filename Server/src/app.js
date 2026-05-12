import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import helmet from "helmet";

import medicineRouter from "./routes/medicineRouter.js";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();

/**
 * TRUST PROXY (IMPORTANT FOR NGINX + PM2)
 */
app.set("trust proxy", 1);

/**
 * ALLOWED ORIGINS
 */
const allowedOrigins = [
  "http://localhost:5173",
  "https://kalyampharma.com",
  "https://www.kalyampharma.com",
];
/**
 * RATE LIMITER
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later",
});

/**
 * GLOBAL MIDDLEWARES
 */
app.use(morgan("combined"));

app.use(helmet());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(limiter);

/**
 * ROUTES
 */
app.use("/api/v1/users", userRouter);

app.use("/api/v1/meds", medicineRouter);

/**
 * HEALTH CHECK
 */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/**
 * 404 HANDLER
 */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/**
 * GLOBAL ERROR HANDLER
 */
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

/**
 * SERVER START
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
