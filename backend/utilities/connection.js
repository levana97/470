const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "34.66.173.18",
    user: "remote",
    password: "remote",
    database: "CMPT470",
    multipleStatements: true
});

module.exports = connection;