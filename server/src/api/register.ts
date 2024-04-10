import mysql, { Pool } from "mysql2";
import { Database } from "../db/dbConnection";
import { mysqlConfig } from "../index";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

export class Register {
  private db: Database;
  private connection;
  constructor() {
    this.db = new Database(mysqlConfig);
    this.connection = this.db.getConnection();
  }

  async createAccount(req: Request, res: Response) {
    try {
      const { email, username, password }: any = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      (await this.connection).query("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, hashedPassword], (err, result) => {
        if (err) {
          res.send(err);
        }

        res.send(result);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
