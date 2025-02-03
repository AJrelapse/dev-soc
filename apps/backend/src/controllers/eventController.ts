import { prisma } from "../../../../db/dbController";
import { Request, Response } from "express";

export const getEvents = async (_req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events" });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const event = await prisma.event.findUnique({ where: { id } });
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ error: "Event not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch event" });
    }
};

export const createEvent = async (req: Request, res: Response) => {
    const { name, description, from, to, maxCapacity, location, type, pocRegno } = req.body;
    try {
        const newEvent = await prisma.event.create({
            data: {
                name,
                description,
                from,
                to,
                maxCapacity,
                location,
                type,
                pocRegno,
            },
        });
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: "Failed to create event" });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, from, to, maxCapacity, location, type, pocRegno } = req.body;
    try {
        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                name,
                description,
                from,
                to,
                maxCapacity,
                location,
                type,
                pocRegno,
            },
        });
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: "Failed to update event" });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.event.delete({ where: { id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete event" });
    }
};