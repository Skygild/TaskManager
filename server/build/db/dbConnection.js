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
exports.Database = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
class Database {
    constructor(config) {
        this.pool = mysql2_1.default.createPool(config);
    }
    connectToDB() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pool.getConnection((err, connection) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (err) {
                        console.error("Error getting connection from pool:", err);
                        return;
                    }
                    if (connection) {
                        console.log("Connected to database");
                    }
                    // Perform database operations
                }
                catch (error) {
                    console.log(error);
                }
                finally {
                    // Release the connection back to the pool when done
                    connection.release();
                }
            }));
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pool.end((err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Disconnected Successfully");
                }
            });
        });
    }
    getPool() {
        return this.pool;
    }
}
exports.Database = Database;
