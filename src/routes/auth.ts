
import express from 'express';
import { getAccessToken } from '../middlewares/getAccessToken';
import { authToken } from '../middlewares/authToken';

const router = express.Router();

router.get('/getAccessToken',getAccessToken);
router.get('/token',authToken)

export = router;