"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const boardService_1 = require("../services/boardService");
const checkRole_1 = require("../middleware/checkRole");
const router = express_1.default.Router();
router.post('/create', checkRole_1.checkRole, boardService_1.create);
router.delete('/delet', checkRole_1.checkRole, boardService_1.deleted);
router.put('/updata', checkRole_1.checkRole, boardService_1.updata);
router.get('/getAll', checkRole_1.checkRole, boardService_1.getAll);
router.get('/get/:id', checkRole_1.checkRole, boardService_1.getOne);
exports.default = router;
