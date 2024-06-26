import { mysqlConfig } from "..";
import { Database } from "../db/dbConnection";
import { Request, Response } from "express";

export class Task {
  private connection;
  private db;

  constructor() {
    this.db = new Database(mysqlConfig);
    this.connection = this.db.getConnection();
  }

  async createTask(req: Request, res: Response) {
    try {
      const { taskTitle, taskDesc, createdAt, deadline, createdBy, completed }: any = req.body;
      (await this.connection).query("INSERT INTO task (taskTitle, taskDesc, createdAt, deadline, createdBy, completed) VALUES (?, ?, ?, ?, ?, ?)", [taskTitle, taskDesc, createdAt, deadline, createdBy, completed], (err, result) => {
        if (err) {
          console.log(`Query Error: ${err}`);
          res.send(err);
        }
        if (result) {
          console.log(result);
          res.send(result);
        }
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}
