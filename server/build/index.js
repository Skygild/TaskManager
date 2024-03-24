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
exports.mysqlConfig = void 0;
// src/index.ts
const express_1 = __importDefault(require("express"));
const dbConnection_1 = require("./db/dbConnection");
const register_1 = require("./api/register");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Server {
    constructor(port, config) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.register = new register_1.Register();
        this.db = new dbConnection_1.Database(config);
        this.appMiddleWares();
        this.routeAPI();
    }
    start() {
        this.app.listen(this.port, () => {
            console.log(`Server is listening to port - ${this.port}`);
        });
        this.db.connectToDB();
    }
    routeAPI() {
        this.app.post("/register", (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.register.createAccount(req, res);
        }));
    }
    appMiddleWares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    end() {
        this.db.disconnect();
    }
}
exports.mysqlConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
    connectionLimit: process.env.CONNECTION_LIMIT,
};
const server = new Server(3001, exports.mysqlConfig);
server.start();
// server.end();
