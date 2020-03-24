const express = require("express");
const Router = express.Router();
const db = require("../connection");

Router.get("/",(req,res, next)=>{
    db.query("SELECT * FROM user ORDER BY id desc", function(err, rows){
        if(!err){
            res.render('user',{data:rows});
        }
        else {
            console.log(err);
        }
    });
});

Router.get("/add", function(req, res, next){
    res.render('user/add',{
        name: '',
        email: '',
        age: ''
    });
});

Router.post("/add", function(req, res, next) {
    let name = req.body.name;
    let email = req.body.email;
    let age = req.body.age;
    if(name.length === 0 || email.length === 0 || age.length === 0) {
        //
    }
});


module.exports = Router;