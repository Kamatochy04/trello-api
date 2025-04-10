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
const adminData_1 = require("../saveData/adminData");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Hello world');
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, userName } = req.body;
        if (!email) {
            res.status(400).send({ message: 'Email is empty' });
            return;
        }
        if (!password) {
            res.status(400).send({ message: 'Password is empty' });
            return;
        }
        const isUserExist = yield adminData_1.AdminData.getByEmail(email);
        if (isUserExist) {
            res.status(400).send({ message: 'A user with the same email already exists' });
            return;
        }
        const id = new Date().getSeconds();
        const token = jsonwebtoken_1.default.sign({ id }, 'secret_key', { expiresIn: '2d' });
        yield adminData_1.AdminData.savePersonalData(email, password, userName, id);
        res.status(200).send({ token });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
});
exports.register = register;
