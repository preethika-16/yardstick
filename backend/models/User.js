import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["Admin","Member"], default: "Member" },
  tenantId: { type: String, required: true }
}, { timestamps: true });
export default mongoose.model("User", userSchema);
