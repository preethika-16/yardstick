import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  tenantId: { type: String, required: true, index: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
export default mongoose.model("Note", noteSchema);
