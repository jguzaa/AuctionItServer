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

app.post('/user_regis/',function (req, reply, next) {

    dbUser.addUser(req).then(data => {
        reply.send({ service: 'userRegisted', data: data })
    });
});

app.post('/login/',function (req, reply, next) {

    dbUser.login(req).then(data => {
        reply.send({ service: 'userLogin', data: data })
    });
});



app.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 3000')
})