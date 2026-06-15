import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import User from "./models/user.js";

dotenv.config();

const app = express();

app.use(express.json());

// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   credentials: true
// }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://test-frontend-tau-pearl.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// connect DB BEFORE routes
connectDB();

app.get("/", async (req, res) => {
  try {
    const newUser = await User.create({
      name: "Muneeb " + Date.now()
    });

    res.json({
      message: "User created",
      data: newUser
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/test-db", async (req, res) => {
  res.json({ message: "DB route working" });
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
