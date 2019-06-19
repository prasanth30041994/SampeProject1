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

app.get('/contatus', function (req, res) {
    users.find({}).exec(function (err, demo1) {
        if (err) {

        } else {
            res.send({ status: "1", data: demo1 });
        }
    });
});


app.put('/update', function (req, res) {
    var update = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        comments: req.body.comments,
    }
    var datavalue = new users(req.body);
    users.findOneAndUpdate({ '_id': req.body.id }, update).exec(function (err, demo1) {
        if (err) {

        } else {

            res.send({ status: "1" });
        }
    });
});

app.delete('/deldata/:id', function (req, res) {
    console.log(req.params.id, "delete data")
    users.findOne({ '_id': req.params.id }).exec(function (err, demo1) {
        if (err) {

        } else {
            demo1.remove();
            res.send({ status: "1" });
        }
    });
});

app.listen(8010);