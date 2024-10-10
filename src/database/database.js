const mysql = require("mysql2/promise");
const config = require("./../config");

const createConnection = () => {
  return mysql.createConnection({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password,
    charset: 'utf8mb4',  // Evitar el error de cesu8
  });
};

//* Generate the connection
let connection = createConnection();

const getConnection = () => {
  if (!connection) connection = createConnection();
  console.log("Connect to the database");
  return connection;
};

const closeConnection = async () => {
  (await connection).end();
  console.log("Connection closed");
  connection = null;
};

//* Obtain the connection and returns
module.exports = { getConnection, closeConnection };
