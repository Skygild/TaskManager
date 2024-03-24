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
exports.Register = void 0;
const dbConnection_1 = require("../db/dbConnection");
const index_1 = require("../index");
const bcrypt_1 = __importDefault(require("bcrypt"));
class Register {
    constructor() {
        this.db = new dbConnection_1.Database(index_1.mysqlConfig);
        this.pool = this.db.getPool();
    }
    createAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    const { email, username, password } = req.body;
                    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                    connection.query("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, hashedPassword], (err, result) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log(result);
                        return result;
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
}
exports.Register = Register;
