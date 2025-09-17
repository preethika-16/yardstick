import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Tenant from "../models/Tenant.js";

const router = express.Router();

// login
router.post("/login", async (req,res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({error:"Invalid creds"});
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({error:"Invalid creds"});
  const token = jwt.sign({ sub: user._id.toString(), tenantId: user.tenantId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
  res.json({ token, user: { email: user.email, role: user.role, tenantId: user.tenantId }});
});

export default router;
