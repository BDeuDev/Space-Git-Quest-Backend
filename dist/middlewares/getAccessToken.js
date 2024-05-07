"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
const config_1 = require("../config/config");
const getAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    if (!code) {
        return res.status(400).json({ error: 'Value of param is none' });
    }
    const params = {
        client_id: config_1.client_id,
        client_secret: config_1.client_secret,
        code: code
    };
    try {
        // Obtener el token de acceso desde GitHub
        const response = yield axios_1.default.post('https://github.com/login/oauth/access_token', null, { params });
        const tokenData = querystring_1.default.parse(response.data);
        ;
        const accessToken = tokenData.access_token;
        // Obtener datos del usuario
        const userResponse = yield axios_1.default.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const user_data = userResponse.data;
        // Generar el token JWT
        const jwt_token = jsonwebtoken_1.default.sign({
            username: user_data['login'],
            avatar: user_data['avatar_url'],
            exp: Math.floor(Date.now() / 1000) + (30 * 60) // 30 minutos de expiración
        }, config_1.jwt_secret);
        return res.status(200).json({
            access_token: accessToken,
            user_data,
            jwt_token
        });
    }
    catch (error) {
        return res.status(500).json({ error: 'OAuth2 token is not found' });
    }
});
exports.getAccessToken = getAccessToken;
