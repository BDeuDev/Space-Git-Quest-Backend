import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import authRoutes from './routes/auth';
import { BLUEPRINT, PORT } from './config/config';
const app = express();

app.use(cors());
app.use(BLUEPRINT as string,authRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
