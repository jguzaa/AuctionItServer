var express = require('express');
var cors = require('cors');
const fs = require('fs');

const dbUser = require('./mongoUser.js');
const dbAuction = require('./mongoAuction.js');

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

app.post('/seller/',function (req, reply, next) {

    dbUser.seller(req).then(data => {
        reply.send({ service: 'sellerDetail', data: data })
    });
});

app.post('/create_auction/',function (req, reply, next) {

    dbAuction.addAuction(req).then(data => {
        reply.send({ service: 'addAuction', data: data })
    });
});

app.get("/auction/", function (req, reply, next) {

    dbAuction.auctionList(req).then(data => {
        reply.send({ service: 'auctionList', data: data })
    });

});

app.post("/auction_select/", function (req, reply, next) {

    dbAuction.auctionSelect(req).then(data => {
        reply.send({ service: 'auctionSelected', data: data })
    });

});

app.post("/doauction/", function (req, reply, next) {

    dbAuction.doAuction(req).then(data => {
        reply.send({ service: 'doAuction', data: data })
    });

});

app.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 3000')
})