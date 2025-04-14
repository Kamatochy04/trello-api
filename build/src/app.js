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
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const card_1 = __importDefault(require("./routes/card"));
const board_1 = __importDefault(require("./routes/board"));
require("dotenv/config");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/user', user_1.default);
app.use('/api/card', card_1.default);
app.use('/api/board', board_1.default);
function readFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const dirPath = 'db';
        const filePath = path_1.default.join(dirPath, 'board.json');
        const fileData = 'Hello';
        try {
            // Создаем директорию, если её нет (recursive: true создаст все недостающие папки)
            yield fs_1.promises.mkdir(dirPath, { recursive: true });
            // Записываем данные в файл (файл будет создан, если не существует)
            yield fs_1.promises.writeFile(filePath, fileData, 'utf-8');
            // Читаем данные из файла
            const data = yield fs_1.promises.readFile(filePath, 'utf-8');
            console.log(data); // Выведет: Hello
            return data;
        }
        catch (err) {
            console.error('Error:', err);
            throw err; // Пробрасываем ошибку выше, если нужно обработать её в вызывающем коде
        }
    });
}
readFile();
app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});
