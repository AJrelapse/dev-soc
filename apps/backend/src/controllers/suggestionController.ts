import { prisma } from "../../../../db/dbController";
import { Request, Response } from "express";

// Get all suggestions
export const getSuggestions = async (_req: Request, res: Response) => {
    try {
        const suggestions = await prisma.suggestions.findMany();
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch suggestions" });
    }
};

// Get a single suggestion by ID
export const getSuggestionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const suggestion = await prisma.suggestions.findUnique({ where: { id } });
        if (suggestion) {
            res.status(200).json(suggestion);
        } else {
            res.status(404).json({ error: "Suggestion not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch suggestion" });
    }
};

// Create a new suggestion
export const createSuggestion = async (req: Request, res: Response) => {
    const { title, description, regno, isApproved } = req.body;
    try {
        const newSuggestion = await prisma.suggestions.create({
            data: { title, description, regno, isApproved },
        });
        res.status(201).json(newSuggestion);
    } catch (error) {
        res.status(500).json({ error: "Failed to create suggestion" });
    }
};

// Update a suggestion by ID
export const updateSuggestion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, regno } = req.body;
    try {
        const updatedSuggestion = await prisma.suggestions.update({
            where: { id },
            data: { title, description, regno },
        });
        res.status(200).json(updatedSuggestion);
    } catch (error) {
        res.status(500).json({ error: "Failed to update suggestion" });
    }
};

// Delete a suggestion by ID
export const deleteSuggestion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.suggestions.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete suggestion" });
    }
};

// Approve a suggestion by ID
export const approveSuggestion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedSuggestion = await prisma.suggestions.update({
            where: { id },
            data: { isApproved: true },
        });
        res.status(200).json(updatedSuggestion);
    } catch (error) {
        res.status(500).json({ error: "Failed to approve suggestion" });
    }
};

// Get all approved suggestions
export const getApprovedSuggestions = async (_req: Request, res: Response) => {
    try {
        const approvedSuggestions = await prisma.suggestions.findMany({
            where: { isApproved: true },
        });
        res.status(200).json(approvedSuggestions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch approved suggestions" });
    }
};

// Get all rejected suggestions
export const getRejectedSuggestions = async (_req: Request, res: Response) => {
    try {
        const rejectedSuggestions = await prisma.suggestions.findMany({
            where: { isApproved: false },
        });
        res.status(200).json(rejectedSuggestions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch rejected suggestions" });
    }
};

// Reject a suggestion by ID
export const rejectSuggestion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedSuggestion = await prisma.suggestions.update({
            where: { id },
            data: { isApproved: false },
        });
        res.status(200).json(updatedSuggestion);
    } catch (error) {
        res.status(500).json({ error: "Failed to reject suggestion" });
    }
};