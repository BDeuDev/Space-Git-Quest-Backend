import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const jwt_secret = 'tu_secreto_para_jwt';

export const authToken = async(req:Request,res:Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(404).json({ message: 'Token not found' });
    }
    try {
        const data = jwt.verify(token, jwt_secret) as { [key: string]: any };
        console.log(data);
        return res.status(200).json({
            message: 'Token decodificado exitosamente',
            data
        });
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ message: 'Token ha expirado' });
        } else {
            return res.status(403).json({ message: 'Token es inválido' });
        }
    }
}