import { Request, Response } from "express";
import prisma from "../prisma/prisma";

//getAllPropsals
export const getAllProposals = async (req: Request, res: Response) => {
  try {
    const proposals = await prisma.proposal.findMany({
      where: {
        userId: req.user.id,
      },
    });
    res.json(proposals);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error fetching proposals" });
  }
};

//getEveryProposals without any id everything in the db
export const getEveryProposals = async (req: Request, res: Response) => {
  try {
    const proposals = await prisma.proposal.findMany();
    res.json(proposals);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error fetching proposals" });
  }
}

export const createProposal = async (req: Request, res: Response) => {
  try {
    const { fullName, email, problemDescription, ideaDescription, investmentAmount, pitchVideoUrl, additionalInfo } =
      req.body;

    const proposal = await prisma.proposal.create({
      data: {
        userId: req?.user.id,
        fullName,
        email,
        problemDescription,
        ideaDescription,
        investmentAmount: parseFloat(investmentAmount),
        pitchVideoUrl,
        additionalInfo,
      },
    });

    res.json(proposal);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error creating proposal" });
  }
};

export const approveProposal = async (req: Request, res: Response) => {
  try {
    if (!req.user){
       res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const { proposalId } = req.params;
    const { status } = req.body; // Accept "APPROVED" or "REJECTED"

    if (!["APPROVED", "REJECTED"].includes(status)) {
      res.status(400).json({ message: "Invalid status" });
      return;
    }

    const updatedProposal = await prisma.proposal.update({
      where: { id: proposalId },
      data: {
        status,
        governmentAgencyId: req.user.id,
        approvedAt: status === "APPROVED" ? new Date() : null,
      },
    });

    res.json(updatedProposal);
  } catch (error) {
    res.status(500).json({ message: "Error updating proposal status" });
  }
};
