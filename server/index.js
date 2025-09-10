// 1️⃣ Must be FIRST
import 'dotenv/config';   // automatically loads .env

import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import { router as userRoutes } from './routes/userRoutes.js';
import { router as adminRoutes } from './routes/adminRoutes.js';
import cookieParser from "cookie-parser";

const app = express();

// ✅ 1. Enable CORS BEFORE routes
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
    credentials: true,   // allow cookies & headers
  })
);

// ✅ 2. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ 3. Mount routers (AFTER middleware)
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGODB_URI;

mongoose.connect(URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
