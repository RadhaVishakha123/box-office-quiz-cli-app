import express from "express";
import cors from "cors";

//import userRoutes from "./routes/user.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running 🚀",
  });
});

// Routes
// app.use("/api/users", userRoutes);

export default app;