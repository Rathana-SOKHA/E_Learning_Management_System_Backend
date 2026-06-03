import express from "express";
// import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoute from "./routes/teacherRoute.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoute.js";
import lessonRoutes from "./routes/lessonRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import quizResultRoutes from "./routes/quizResultRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

// app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoute);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/quiz-results", quizResultRoutes);

app.use(errorHandler);

export default app;
