import express from "express";
// import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoute from "./routes/teacherRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";



const app = express();

// app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoute);
app.use("/api/courses", courseRoutes);

export default app;