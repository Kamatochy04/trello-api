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
exports.register = exports.login = void 0;
const userRepository_1 = require("../Repository/userRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email } = req.body;
        const user = yield userRepository_1.UserRepository.getByEmail(email);
        if (!user) {
            res.send({ message: 'User not found' });
            return;
        }
        const isCorrectPassword = bcrypt_1.default.compare(password, user.password);
        if (!isCorrectPassword) {
            res.send({ message: 'Password is not correct' });
            return;
        }
        const sesretKey = process.env.JWT_SECRET_KEY || 'SECRET_KEY';
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, sesretKey, { expiresIn: '2d' });
        res.send({ token });
    }
    catch (err) {
        console.log(err);
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, userName, role } = req.body;
        if (!email) {
            res.status(400).send({ message: 'Email is empty' });
            return;
        }
        if (!password) {
            res.status(400).send({ message: 'Password is empty' });
            return;
        }
        const isUserExist = yield userRepository_1.UserRepository.getByEmail(email);
        if (isUserExist) {
            res.status(400).send({ message: 'A user with the same email already exists' });
            return;
        }
        const id = new Date().getSeconds();
        const sesretKey = process.env.JWT_SECRET_KEY || 'SECRET_KEY';
        const token = jsonwebtoken_1.default.sign({ id, role }, sesretKey, { expiresIn: '2d' });
        yield userRepository_1.UserRepository.savePersonalData(email, password, userName, role, id);
        res.status(200).send({ token });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});
exports.register = register;
