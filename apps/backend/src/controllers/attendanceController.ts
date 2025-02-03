import { Request, Response } from 'express';
import { prisma } from '../../../../db/dbController';

export const getAttendanceByEvent = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const attendance = await prisma.attendance.findMany({
            where: { eventId: id },
        });
        if (attendance) {
            res.status(200).json(attendance);
        } else {
            res.status(404).json({ error: 'Attendance not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch attendance' });
    }
};

export const createAttendance = async (req: Request, res: Response) => {
    const { regno, scannedBy, attended, eventId } = req.body;
    try {
        const newAttendance = await prisma.attendance.create({
            data: {
                regno,
                scannedBy, //need to set up verification
                attended,
                eventId,
            },
        });
        res.status(201).json(newAttendance);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create attendance' });
    }
};
