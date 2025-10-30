import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: "mysql-qa-testing-master-ncus.mysql.database.azure.com",
    user: "qaadmin",
    database: "aztenantadmin",
    password: "1wR?cHeQe_",
    port: 3306,
    connectionLimit: 10,  // Adjust according to your requirements
    waitForConnections: true
});

async function executeQuery(query) {
    let connection:any;
    try {
        connection = await pool.getConnection();
        const [rows, fields] = await connection.execute(query);
        console.log(rows); // Process rows as needed
    } catch (error) {
        console.error("Error executing query:", error);
    } finally {
        if (connection) connection.release(); // Release connection back to the pool
    }
}


executeQuery("SELECT * FROM your_table");
