"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const getAccessToken_1 = require("../middlewares/getAccessToken");
const authToken_1 = require("../middlewares/authToken");
const config_1 = require("../config/config");
const router = express_1.default.Router();
router.get(config_1.URLGETTOKEN, getAccessToken_1.getAccessToken);
router.get(config_1.URLTOKEN, authToken_1.authToken);
module.exports = router;
