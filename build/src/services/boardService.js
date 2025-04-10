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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.getOne = exports.updata = exports.deleted = exports.create = void 0;
const boardRepository_1 = require("../Repository/boardRepository");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, color, description } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            res.send({ message: 'Not found user id' });
            return;
        }
        const today = new Date();
        const createdAt = [
            String(today.getMonth() + 1).padStart(2, '0'), // Месяцы 0-11
            String(today.getDate()).padStart(2, '0'),
            String(today.getFullYear()).slice(-2), // Последние 2 цифры года
        ].join('.');
        boardRepository_1.BoardRepository.addBoard(userId, name, color, description, createdAt);
    }
    catch (err) {
        console.log(err);
    }
    res.send('create');
});
exports.create = create;
const deleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('deleted');
});
exports.deleted = deleted;
const updata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('updata');
});
exports.updata = updata;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('getOne');
});
exports.getOne = getOne;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('getAll');
});
exports.getAll = getAll;
