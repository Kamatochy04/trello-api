"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminService_1 = require("../services/adminService");
const router = express_1.default.Router();
router.post('/register', adminService_1.register);
router.get('/login', adminService_1.login);
exports.default = router;
