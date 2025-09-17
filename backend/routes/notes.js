import express from "express";
import Note from "../models/Note.js";
import Tenant from "../models/Tenant.js";
const router = express.Router();

// Helper: check tenant-plan limits
const checkNoteLimit = async (tenantId) => {
  const t = await Tenant.findOne({ slug: tenantId });
  if (!t) throw new Error("Tenant missing");
  if (t.plan === "pro") return true;
  const count = await Note.countDocuments({ tenantId });
  return count < 3;
};

// POST /notes
router.post("/", async (req,res) => {
  const { title, body } = req.body;
  const tenantId = req.user.tenantId;
  if (req.user.role !== "Admin" && req.user.role !== "Member") {
    return res.status(403).json({error:"Forbidden"});
  }
  const ok = await checkNoteLimit(tenantId);
  if (!ok) return res.status(403).json({ error: "Note limit reached. Upgrade tenant."});
  const note = await Note.create({ title, body, tenantId, ownerId: req.user._id });
  res.status(201).json(note);
});

// GET /notes
router.get("/", async (req,res) => {
  const tenantId = req.user.tenantId;
  const notes = await Note.find({ tenantId }).sort({ createdAt: -1 });
  res.json(notes);
});

// GET /notes/:id
router.get("/:id", async (req,res) => {
  const note = await Note.findOne({ _id: req.params.id, tenantId: req.user.tenantId });
  if (!note) return res.status(404).json({error:"Not found"});
  res.json(note);
});

// PUT /notes/:id
router.put("/:id", async (req,res) => {
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, tenantId: req.user.tenantId },
    { $set: { title: req.body.title, body: req.body.body }},
    { new: true }
  );
  if (!note) return res.status(404).json({error:"Not found"});
  res.json(note);
});

// DELETE /notes/:id
router.delete("/:id", async (req,res) => {
  const note = await Note.findOneAndDelete({ _id: req.params.id, tenantId: req.user.tenantId });
  if (!note) return res.status(404).json({error:"Not found"});
  res.json({ ok: true });
});

export default router;
