const mysql = require("mysql2/promise");
const config = require("./../config");

//* Generate the connection
const connection = mysql.createConnection({
  host: config.host,
  port: config.port,
  database: config.database,
  user: config.user,
  password: config.password,
});

const getConnection = () => {
  console.log("Connect to the database");
  return connection;
};

//* Obtain the connection and returns
module.exports = { getConnection };