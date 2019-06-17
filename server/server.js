var express = require('express');
var bodyParser = require('body-parser');
// var mysql = require('mysql');
//var assert = require('assert');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Demoproj');
var users = mongoose.model('contactus', {
    name: { type: String },
    phone: { type: Number },
    email: { type: String },
    comments: { type: String}

}); //Model declaration

app.use(bodyParser.json());
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.post('/submit', function (req, res) {
    var datavalue = new users(req.body);
    console.log("Data---",datavalue);
    //console.log(typeof datavalue, "datavalue")
    datavalue.save(function (err, data) { //Query To insert details to mongodb
        //console.log(data, "after saved");
        if (err) {
            res.send({code:1})            
        }

        else {
            console.log(data);
            res.send({code:0})
        }
    });
});
app.listen(8005);