import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwt_secret } from '../config/config';

export const authToken = async(req:Request,res:Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(404).json({ message: 'Token not found' });
    }
    try {
        const data = jwt.verify(token, jwt_secret as string) as { [key: string]: any };
        return res.status(200).json({
            message: 'Token decoded successfully',
            data
        });
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ message: 'Token expired' });
        } else {
            return res.status(403).json({ message: 'Token not valid' });
        }
    }
}