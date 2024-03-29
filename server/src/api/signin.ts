import mysql, { Pool, RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";
import { mysqlConfig } from "../index";
import { Database } from "../db/dbConnection";
import { Strategy as LocalStrategy } from "passport-local";
import { PassportStatic } from "passport";

export class SignIn {
  private db: Database;
  private pool: Pool;
  constructor() {
    this.db = new Database(mysqlConfig);
    this.pool = this.db.getPool();
    this.signIn = this.signIn.bind(this);
  }

  async passportConfig(passport: PassportStatic) {
    try {
      passport.use(new LocalStrategy({ usernameField: "email", passwordField: "password" }, this.signIn));
      passport.serializeUser((user: any, done) => {
        try {
          return done(null, user.id);
        } catch (error) {
          return done(error, false);
        }
      });
      passport.deserializeUser(async (id: any, done) => {
        try {
          this.pool.getConnection(async (err, connection) => {
            try {
              if (err) {
                console.log(`Sign in Connection: ${err}`);
                return done(err, false);
              }

              if (connection) {
                connection.query(`SELECT * FROM users WHERE id= ?`, [id], async (err, result: RowDataPacket[]) => {
                  if (err) {
                    return done(err, false);
                  }
                  return done(null, result[0]);
                });
              }
            } catch (error) {
              return done(error, false);
            }
          });
          return done(null, id);
        } catch (error) {
          return done(error, false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async signIn(email: any, password: any, done: any) {
    try {
      this.pool.getConnection(async (err, connection) => {
        try {
          if (err) {
            console.log(`Sign in Connection: ${err}`);
            return done(null, false, { message: `Sign in Connection: ${err}` });
          }

          if (connection) {
            connection.query(`SELECT * FROM users WHERE email= ?`, [email], async (err, result: RowDataPacket[]) => {
              try {
                if (err) {
                  console.log(`Sign in error: ${err}`);
                  return done(null, false, { message: `Sign in error: ${err}` });
                }
                if (result.length > 0) {
                  const user = result[0];

                  const matched = await bcrypt.compare(password, user.password);
                  if (!matched) {
                    return done(null, false, { message: "Password did not match" });
                  }
                  return done(null, user);
                }
              } catch (error) {
                return done(null, false, { message: error });
              }
            });
          }
        } catch (error) {
          return done(null, false, { message: error });
        }
      });
    } catch (error) {
      return done(null, false, { message: error });
    }
  }
}
