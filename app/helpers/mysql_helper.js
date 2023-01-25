const mysql = require('mysql2');

// Create the connection pool
const pool = mysql
    .createPool({
        host: process.env.DB_HOST,
        user: 'backend',
        password: '12345',
        database: process.env.DB_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    })
    .promise();

exports.getConnection = async () => pool;

exports.getQueryResult = async (query) => {
    try {
        const connection = await this.getConnection();
        const [rows] = await connection.query(query);
        return rows;
    } catch (err) {
        console.log(err);
        return null;
    }
};

exports.executeMultiQuery = async (queryList) => {
    const connection = await this.getConnection();
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < queryList.length; ++i) {
        // eslint-disable-next-line no-await-in-loop
        await connection.query(queryList[i]);
    }
};
