import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"
import studentRoutes from "./routes/studentRoutes.js"
import teacherRoute from "./routes/teacherRoutes.js"



const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: "*", // Allow all origins
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoute);

export default app;