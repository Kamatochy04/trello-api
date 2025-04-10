"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkRole = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const secretKey = process.env.JWT_SECRET_KEY || 'SECRET_KEY';
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        req.user = {
            id: decoded.id,
        };
        if (decoded.role === 'ADMIN') {
            next();
        }
        else {
            res.status(403).json({ message: 'Access denied' });
        }
    }
    catch (err) {
        console.error('Authentication error:', err);
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.checkRole = checkRole;
