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
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("create");
});
exports.create = create;
const deleted = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("deleted");
});
exports.deleted = deleted;
const updata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("updata");
});
exports.updata = updata;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("getOne");
});
exports.getOne = getOne;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("getAll");
});
exports.getAll = getAll;
