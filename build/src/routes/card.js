"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cardService_1 = require("../services/cardService");
const router = express_1.default.Router();
router.post("/create", cardService_1.create);
router.delete("/delet", cardService_1.deleted);
router.put("/updata", cardService_1.updata);
router.get("/getAll", cardService_1.getAll);
router.get("/get/:id", cardService_1.getOne);
exports.default = router;
