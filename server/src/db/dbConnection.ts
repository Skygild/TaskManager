import mysql, { PoolConnection } from "mysql2";

export class Database {
  private pool;
  private cn: PoolConnection | undefined;
  constructor(config: any) {
    this.pool = mysql.createPool(config);
  }

  async connectToDB() {
    this.pool.getConnection(async (err, connection) => {
      try {
        if (err) {
          console.error("Error getting connection from pool:", err);
        }
        if (connection) {
          console.log("Connected to database");
        }
        // Perform database operations
      } catch (error) {
        console.log(error);
      } finally {
        // Release the connection back to the pool when done
        connection.release();
      }
    });
  }

  async disconnect() {
    this.pool.end((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Disconnected Successfully");
      }
    });
  }

  getPool() {
    return this.pool;
  }

  getConnection() {
    this.pool.getConnection(async (err, connection) => {
      try {
        if (err) {
          console.error("Error getting connection from pool:", err);
        }

        if (connection) {
          this.cn = connection;
        }
        // Perform database operations
      } catch (error) {
        console.log(error);
      } finally {
        // Release the connection back to the pool when done
        connection.release();
      }
    });
    return this.cn;
  }
}
