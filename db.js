import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {

    const dbConnection = await mysql.createConnection({
        host: process.env.DB_HOST,
        // port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });
    try {
        const [results] = await dbConnection.execute(query, values);
        dbConnection.end();
        return results;
    } catch (error) {
        throw Error(error.message);
        return {error};
    }
}