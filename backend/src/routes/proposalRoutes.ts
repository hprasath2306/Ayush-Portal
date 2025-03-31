import express from "express";
import { createProposal, approveProposal, getAllProposals } from "../controllers/proposalController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware(["PUBLIC_USER"]), getAllProposals); // Assuming you have a function to get all proposals
router.post("/", authMiddleware(["PUBLIC_USER"]), createProposal);
router.put("/:proposalId/approve", authMiddleware(["GOVERNMENT_AGENCY"]), approveProposal);

export default router;
