import express from "express";
import Tenant from "../models/Tenant.js";
import { authMiddleware } from "../middleware/auth.js";
import User from "../models/User.js";
const router = express.Router();

// upgrade endpoint: POST /tenants/:slug/upgrade
router.post("/:slug/upgrade", authMiddleware.required, async (req,res) => {
  const { slug } = req.params;
  // only Admins of that tenant can upgrade
  if (!req.user) return res.status(401).send({error:"Unauthorized"});
  if (req.user.role !== "Admin" || req.user.tenantId !== slug) return res.status(403).send({error:"Forbidden"});
  const tenant = await Tenant.findOne({ slug });
  if (!tenant) return res.status(404).send({error:"Not found"});
  tenant.plan = "pro";
  await tenant.save();
  return res.json({ ok: true, tenant });
});

router.get('/:slug/members',authMiddleware.required, async (req,res) =>{
  const { slug } = req.params;
  // only Admins of that tenant can upgrade
  if (!req.user) return res.status(401).send({error:"Unauthorized"});
  if (req.user.role !== "Admin" || req.user.tenantId !== slug) return res.status(403).send({error:"Forbidden"});
  const members=await User.find({tenantId:slug})
  if(!members)return res.status(404).send({error:"Not Member found"});
  res.status(200).json({members})
})
export default router;
