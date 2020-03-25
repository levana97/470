const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "34.69.26.43",
    user: "remote",
    password: "remote",
    database: "CMPT470",
    multipleStatements: true
});

module.exports = connection;