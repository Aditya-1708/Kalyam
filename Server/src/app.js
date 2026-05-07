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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: "Too many requests, please try again later",
});

/**
 * MIDDLEWARES
 */
app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
// CORS (adjust origin in production)
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  }),
);

/**
 * ROUTES
 */
app.use("/api/v1/users", userRouter, limiter);
app.use("/api/v1/meds", medicineRouter, limiter);

/**
 * HEALTH CHECK (optional but useful)
 */
app.get("/", (req, res) => {
  res.send("API is running...");
});

/**
 * 404 HANDLER
 */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
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
