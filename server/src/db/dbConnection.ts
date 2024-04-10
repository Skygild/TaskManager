import mysql, { PoolConnection } from "mysql2";

export class Database {
  private pool;
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

  async getConnection(): Promise<mysql.PoolConnection> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection(async (err, connection) => {
        try {
          if (err) {
            console.error("Error getting connection from pool:", err);
            reject(err); // Reject the promise if there's an error
            return; // Exit early
          }

          if (connection) {
            resolve(connection); // Resolve the promise with the connection
          } else {
            reject(new Error("Failed to get connection")); // Reject if no connection
          }
        } catch (error) {
          console.error("Error in getConnection:", error);
          reject(error); // Reject if there's an error during processing
        }
      });
    });
  }
}
