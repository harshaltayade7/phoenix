const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var path = require('path');

const createUser = require('./controller/userController').createUser;
const showUsers = require('./controller/userController').showUsers;
const loginUser = require('./controller/userController').loginUser;

const app = express()
const apiPort = 4000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/createUser', createUser);
app.get('/showUsers', showUsers);
app.get('/loginUser', loginUser);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))