const User = require('../model/UserModel');
const DB = require("../utilities/connection");

const dispatcher = (req, res, connection) => {
    try {
        const name = req.body.name || undefined;
        const age = parseInt(req.body.age) || undefined;
        const email = req.body.email || undefined;
        const mode = req.body.mode || undefined;
        if (mode === "create") {
            createUser(connection, name, email, age, res);
        } else if (mode === "read") {
            getUser(connection, name, res);
        } else if (mode === "readAll") {
            getAllUser(connection, res);
        } else if (mode === "update") {
            setUser(connection, name, email, age, res);
        } else if (mode === "delete") {
            deleteUser(connection, name, res);
        }
    }
    catch{
        console.log('Internal Error');
    }
};

const createUser = (connection, name, email, age, res) => {
    connection.query(`INSERT INTO user (name,age,email) VALUES ('${name}',${age},'${email}')`, (err, result) => {
        if (err) throw err;
        res.json({
            'type': 'created',
            'user': new User(name, email, age),
        });
    });
};

const getUser = (connection, name, res) => {
    connection.query(`SELECT name,age,email FROM user WHERE name='${name}'`, (err, result) => {
        if (err) throw err;
        console.log(result)
    });
}

const getAllUser = (connection, res) => {
    connection.query(`SELECT * FROM user`, (err, result) => {
        if (err) throw err;
        const users = [];
        result.forEach(user => {
            users.push(new User(user.name, user.email, user.age));
        });
        res.json({
            'type': 'readAll',
            'users': users,
        });
    });
}

const setUser = (connection, name, email, age, res) => {
    console.log(`UPDATE user SET name='${name}',age=${age},email='${email}' WHERE name='${name}'`)
    connection.query(`UPDATE user SET name='${name}',age=${age},email='${email}' WHERE name='${name}'`, (err, result) => {
        if (err) throw err;
        res.json({
            'type':'updated'
        });
    });
}

const deleteUser = (connection, name, res) => {
    connection.query(`DELETE FROM user WHERE name='${name}'`, (err, result) => {
        if (err) throw err;
        res.json({
            'type':'deleted'
        });
    });
}

module.exports = dispatcher;