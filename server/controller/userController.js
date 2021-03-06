const MongoClient = require('mongodb').MongoClient
const arr = [];

createUser = (req, res) => {
    console.log(req.body,'sangharsh');
    
    MongoClient.connect('mongodb://admin:admin123@ds018538.mlab.com:18538/project', {useUnifiedTopology: true, native_parser:true},function(err, client) {
        if (err) return console.log(err)
        const db = client.db('project');

        console.log("req.a-------->",req.body);
        
        db.collection('user-data').find({name: req.body.name, email: req.body.email}).toArray(function(err, results){
            if(err){ 
                console.log(err);
                res.send(err);
            } else if(req.body.name && results[0] && results[0].name == req.body.name) {
                console.log("user found");
                res.send("user found")
            } else {
                if(!req.body.name) {
                    res.send("use the proper name")
                } else {
                db.collection('user-data').insertOne(req.body, (err, result) => {
                    if (err) return console.log(err)
                });
                console.log("user created");
                res.send("user created");
              }
            }
        });
    })
}

showUsers = (req, res) => {
    MongoClient.connect('mongodb://admin:admin123@ds018538.mlab.com:18538/project', {useUnifiedTopology: true, native_parser:true},function(err, client) {
        if (err) return console.log(err)
        const db = client.db('project');
        var cursor = db.collection('user-data').find();
        cursor.each(function(err, doc) {
            if(doc && doc.name){
            arr.push(doc.name);
            }
        });
    })
    console.log("users--->",arr);
    res.send(arr)
}

loginUser = (req, res) => {
    console.log("login----.....>>>>", req.body)
    MongoClient.connect('mongodb://admin:admin123@ds018538.mlab.com:18538/project', {useUnifiedTopology: true, native_parser:true},function(err, client) {
        if (err) return console.log(err)
        const db = client.db('project');


        console.log("user name", req.body.name)
        
        db.collection('user-data').find({name: req.body.name, password: req.body.password}).toArray(function(err, results){
            console.log("result---->",results)
            if(err){
                console.log(err);
             return  res.send(err);
            } else if(results[0] && results[0].name == req.body.name) {
                console.log("user found, proceed on new page");
              return  res.send("success");
            } else {
                console.log("wrong credentials OR create your account");
                return res.send("wrong credentials")    
            }
        });
    })
}


module.exports = { createUser, showUsers, loginUser };