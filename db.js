import mysql from "mysql2/promise";



export async function query({ query, values = [] }) {

    const dbConnection = await mysql.createConnection(
        // {
        // host: process.env.DB_HOST,
        // port: process.env.DB_PORT,
        // user: process.env.DB_USER,
        // password: process.env.DB_PASS,
        // database: process.env.DB_NAME
        // }
       process.env.DATABASE_URL
    );
    
    try 
    {
        const [results] = await dbConnection.execute(query, values);
        dbConnection.end();
        return results;
    } catch (error) {
        throw Error(error.message); 
        return {error};
    }

}

export const dbCC = await mysql.createConnection(
    // {
    //     host: process.env.DB_HOST,
    //     port: process.env.DB_PORT,
    //     user: process.env.DB_USER,
    //     password: process.env.DB_PASS,
    //     database: process.env.DB_NAME,
    //                                     /* do not put password or any sensitive info here, done only for demo */
    //                                     // waitForConnections: true,
    //                                     //connectionLimit: env.DB_CONN_LIMIT || 2,
    //                                     // connectionLimit: 2,
    //                                     // queueLimit: 0,
    //                                     //debug: env.DB_DEBUG || false
    //                                     // debug: false
    // }
    process.env.DATABASE_URL
  );