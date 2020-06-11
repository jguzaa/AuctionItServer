var express = require('express');
var cors = require('cors');
const fs = require('fs');

const dbUser = require('./mongoUser.js');
//const dbAuction = require('./mongoAuction');

var app = express();

app.use(cors());
app.use(express.json());

//for check connection
app.get("/", function (req, reply, next) {

    reply.send("Hello");

});

app.post('/user/',function (req, reply, next) {

    let user = req.body.username;
    let pass = req.body.password;

    dbUser.addUser(user, pass).then(data => {
        reply.send({ service: 'userRegisted', data: data })
    });
});





app.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 3000')
})