"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkRole = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'secret_key');
        if (decoded.role === 'ADMIN') {
            next();
        }
        else {
            res.status(403).json({ message: 'Access denied' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.checkRole = checkRole;
