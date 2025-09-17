import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Tenant from "../models/Tenant.js";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Tenant.deleteMany({});
  await User.deleteMany({});
  const tenants = [
    { slug: "acme", name: "Acme", plan: "free" },
    { slug: "globex", name: "Globex", plan: "free" }
  ];
  await Tenant.insertMany(tenants);
  const pw = await bcrypt.hash("password", 10);
  const users = [
    { email: "admin@acme.test", passwordHash: pw, role: "Admin", tenantId: "acme" },
    { email: "user@acme.test", passwordHash: pw, role: "Member", tenantId: "acme" },
    { email: "admin@globex.test", passwordHash: pw, role: "Admin", tenantId: "globex" },
    { email: "user@globex.test", passwordHash: pw, role: "Member", tenantId: "globex" }
  ];
  await User.insertMany(users);
  console.log("seeded");
  process.exit(0);
};
run().catch(e => { console.error(e); process.exit(1); });