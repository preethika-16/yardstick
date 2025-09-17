// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import notesRoutes from "./routes/notes.js";
import tenantRoutes from "./routes/tenants.js";
import { authMiddleware } from "./middleware/auth.js";
import dotenv from "dotenv"
dotenv.config()

const app = express();
app.use(helmet());
app.use(morgan("tiny"));
const allowedOrigins = [
  "http://localhost:5173",            // local frontend
  "https://saas-notes-three.vercel.app" // vercel frontend
];

app.use(cors({
 origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));
app.use(express.json());

app.get("/health", (req,res) => res.json({ status: "ok" }));

app.use("/auth", authRoutes);
app.use("/tenants", authMiddleware.optional, tenantRoutes); // upgrade endpoint protected inside
app.use("/notes", authMiddleware.required, notesRoutes);

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(process.env.PORT || 3000, ()=>console.log(`Listening ${process.env.PORT}`));
};
start();
export default app; // for tests
