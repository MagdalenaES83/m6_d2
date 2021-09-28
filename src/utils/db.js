// // import pg from "pg";
// // const { DATABASE_URL, DATABASE_URL_DEV, NODE_ENV } = process.env;
// // const isProduction = NODE_ENV === "production";
// // const connectionString = isProduction ? DATABASE_URL : DATABASE_URL_DEV;
// // const sslConfig = isProduction
// //   ? {
// //       ssl: {
// //         rejectUnauthorized: false,
// //       },
// //     }
// //   : {};

// // const pool = new pg.Pool({
// //   connectionString,
// //   ...sslConfig,
// // });
// // export default pool;

import pg from "pg"
import dotenv from "dotenv"
dotenv.config()


const { DATABASE_URL:connectionString} = process.env
const pool= new pg.Pool({connectionString})

export  default pool