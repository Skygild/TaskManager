// src/index.ts
import express from "express";
import { Database } from "./db/dbConnection";
import { Register } from "./api/register";

class Server {
  private app;
  private port;
  private db;
  private register;
  constructor(port: any, config: any) {
    this.app = express();
    this.port = port;
    this.appMiddleWares();
    this.routeAPI();
    this.db = new Database(config);
    this.register = new Register();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is listening to port - ${this.port}`);
    });
    this.db.connectToDB();
  }

  routeAPI() {
    this.app.post("/register", (req, res) => {
      try {
        const { email, username, password } = req.body;
        const check = this.register.createAccount(email, username, password);
        res.send(check);
      } catch (error) {
        console.log(error);
      }
    });
  }

  appMiddleWares() {
    this.app.use(express.json());
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
