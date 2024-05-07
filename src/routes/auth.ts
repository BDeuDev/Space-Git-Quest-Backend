
import express from 'express';
import { getAccessToken } from '../middlewares/getAccessToken';
import { authToken } from '../middlewares/authToken';
import { URLGETTOKEN, URLTOKEN } from '../config/config';

const router = express.Router();

router.get(URLGETTOKEN as string,getAccessToken);
router.get(URLTOKEN as string,authToken)

export = router;