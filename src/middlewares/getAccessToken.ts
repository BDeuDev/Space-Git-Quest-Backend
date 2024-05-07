import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import querystring from 'querystring';
import { client_id, client_secret, jwt_secret } from '../config/config';


export const getAccessToken = async(req:Request,res:Response) => {
    const code = req.query.code as string;
    if (!code) {
        return res.status(400).json({ error: 'Value of param is none' });
    }
    const params = {
        client_id:client_id,
        client_secret:client_secret,
        code:code
    };
    try {
        // Obtener el token de acceso desde GitHub
        const response = await axios.post('https://github.com/login/oauth/access_token', null, { params });
        const tokenData = querystring.parse(response.data) as { access_token: string, scope: string, token_type: string };;
        const accessToken = tokenData.access_token;
      
        // Obtener datos del usuario
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const user_data = userResponse.data;

        // Generar el token JWT
        const jwt_token = jwt.sign(
            {
                username: user_data['login'],
                avatar: user_data['avatar_url'],
                exp: Math.floor(Date.now() / 1000) + (30 * 60) // 30 minutos de expiración
            },
            jwt_secret as string
        );

        return res.status(200).json({
            access_token: accessToken,
            user_data,
            jwt_token 
      }); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'OAuth2 token is not found' });
    }
}
