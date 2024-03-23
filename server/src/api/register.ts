import mysql, { Pool } from "mysql2";
import { Database } from "../db/dbConnection";
import { mysqlConfig } from "../index";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

export class Register {
  private db: Database;
  private pool: Pool;
  constructor() {
    this.db = new Database(mysqlConfig);
    this.pool = this.db.getPool();
  }

  async createAccount(req: Request, res: Response) {
    this.pool.getConnection(async (err, connection) => {
      try {
        if (err) {
          console.log(err);
          return;
        }
        const { email, username, password }: any = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        connection.query("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, hashedPassword], (err, result) => {
          if (err) {
            console.log(err);
            return;
          }

          console.log(result);
          return result;
        });
      } catch (error) {
        console.log(error);
      }
    });
  }
}
