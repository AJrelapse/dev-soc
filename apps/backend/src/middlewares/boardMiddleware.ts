import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const boardMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.headers['authorization'] as string; // Assuming userId is passed in the authorization header
        const user = await prisma.user.findUnique({
            where: { authId: userId },
        });

        if (user && user.role === 'Board') {
            next();
        } else {
            res.status(403).json({ message: 'Access denied. User is not a board member.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export default boardMiddleware;