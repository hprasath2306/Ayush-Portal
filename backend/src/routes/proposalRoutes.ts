import express from "express";
import { createProposal, approveProposal } from "../controllers/proposalController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware(["PUBLIC_USER"]), createProposal);
router.put("/:proposalId/approve", authMiddleware(["GOVERNMENT_AGENCY"]), approveProposal);

export default router;
