import mysql, { Pool } from "mysql2";
import { Database } from "../db/dbConnection";
import { mysqlConfig } from "../index";

export class Register {
  private db: Database;
  private pool: Pool;

  constructor() {
    this.db = new Database(mysqlConfig);
    this.pool = this.db.getPool();
  }

  async createAccount(email: string, username: string, password: any) {
    this.pool.getConnection(async (err, connection) => {
      try {
        if (err) {
          console.log(err);
          return;
        }
        connection.query("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, password], (err, result) => {
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
