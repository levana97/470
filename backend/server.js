const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dispatcher = require('./controller/usr_controller');
const connection = require("./utilities/connection");
const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post("/api/user", (req, res) => {
    dispatcher(req, res,connection);
});

app.listen(3000, () => {
    console.log('listenning on port 3000.');
    connection.connect();
    console.log('DB connected');
});