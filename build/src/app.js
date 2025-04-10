"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const card_1 = __importDefault(require("./routes/card"));
const board_1 = __importDefault(require("./routes/board"));
require("dotenv/config");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/user', user_1.default);
app.use('/api/card', card_1.default);
app.use('/api/board', board_1.default);
app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});
