// 1️⃣ Must be FIRST
import 'dotenv/config';   // automatically loads .env

import express from 'express';
import mongoose from 'mongoose';

import { router as userRoutes } from './routes/userRoutes.js';
import { router as adminRoutes } from './routes/adminRoutes.js';
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Mount routers
app.use('/api/users', userRoutes);   // ✅ This is key
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGODB_URI;

mongoose.connect(URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});