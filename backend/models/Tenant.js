import mongoose from "mongoose";
const tenantSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: String,
  plan: { type: String, enum: ["free","pro"], default: "free" }
});
export default mongoose.model("Tenant", tenantSchema);
