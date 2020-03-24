const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "35.239.128.81",
    user: "remote",
    password: "remote",
    database: "CMPT470",
    multipleStatements: true
});

module.exports = connection;