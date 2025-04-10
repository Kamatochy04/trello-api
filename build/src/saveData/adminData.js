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
exports.AdminData = void 0;
const promises_1 = __importDefault(require("fs/promises"));
class AdminData {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield promises_1.default.readFile('output.json', 'utf-8');
                const jsonData = JSON.parse(data);
                return jsonData;
            }
            catch (error) {
                console.error('Error reading file:', error);
                return [];
            }
        });
    }
    static savePersonalData(email, password, userName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const allData = yield this.getAll();
            const adminObject = {
                id,
                email,
                password,
                userName,
            };
            allData.push(adminObject);
            const jsonData = JSON.stringify(allData, null, 2);
            promises_1.default.writeFile('output.json', jsonData);
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const allAdmins = yield AdminData.getAll();
            return allAdmins.filter((item) => item.id === id)[0];
        });
    }
    static getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const allAdmins = yield AdminData.getAll();
            return allAdmins.filter((item) => item.email === email)[0];
        });
    }
}
exports.AdminData = AdminData;
