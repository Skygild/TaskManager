// src/index.ts
import express from "express";
import { Database } from "./db/dbConnection";
import { Register } from "./api/register";
import bcrypt from "bcrypt";
import cors from "cors";

class Server {
  private app;
  private port;
  private db;
  private register;
  constructor(port: any, config: any) {
    this.app = express();
    this.port = port;
    this.register = new Register();
    this.db = new Database(config);
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
    this.app.post("/register", async (req, res) => {
      this.register.createAccount(req, res);
    });
  }

  appMiddleWares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  end() {
    this.db.disconnect();
  }
}
export const mysqlConfig = {
  host: "localhost",
  user: "root",
  password: "Aintgonnahappen31@",
  database: "task_manager",
  port: 3306,
  connectionLimit: 10,
};
const server = new Server(3001, mysqlConfig);
server.start();
// server.end();
