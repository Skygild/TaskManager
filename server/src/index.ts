// src/index.ts
import express from "express";
import { Database } from "./db/dbConnection";
import { Register } from "./api/register";
import { SignIn } from "./api/signin";
import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import { v4 as uuid4 } from "uuid";
import passport from "passport";
dotenv.config();

class Server {
  private app;
  private port;
  private db;
  private register;
  private signin;
  private passport;
  constructor(port: any, config: any) {
    this.app = express();
    this.port = port;
    this.passport = passport;
    this.register = new Register();
    this.signin = new SignIn();
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
      await this.register.createAccount(req, res);
    });

    this.app.post("/signin", (req, res, next) => {
      passport.authenticate("local", (err: any, user: any) => {
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        }
        if (!user) {
          return res.status(401).json({ message: "Authentication failed" });
        }
        req.logIn(user, (err) => {
          if (err) {
            return res.status(500).json({ message: "Internal server error" });
          }
          return res.status(200).json({ message: "Authentication successful" });
        });
      })(req, res, next);
    });
  }

  appMiddleWares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(session({ secret: uuid4(), resave: false, saveUninitialized: false }));
    this.app.use(this.passport.initialize());
    this.signin.passportConfig(this.passport);
    this.app.use(this.passport.session());
  }

  end() {
    this.db.disconnect();
  }
}
export const mysqlConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT,
  connectionLimit: process.env.CONNECTION_LIMIT,
};
const server = new Server(3001, mysqlConfig);
server.start();
// server.end();
