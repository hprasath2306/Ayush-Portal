import express from "express";
import { createProposal, approveProposal, getAllProposals, getEveryProposals } from "../controllers/proposalController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/", authMiddleware(["PUBLIC_USER"]), getAllProposals);
router.get("/getAll", authMiddleware(["GOVERNMENT_AGENCY", "INVESTOR"]), getEveryProposals);
router.post("/", authMiddleware(["PUBLIC_USER"]), createProposal);
router.put("/:proposalId/approve", authMiddleware(["GOVERNMENT_AGENCY"]), approveProposal);
export default router;
