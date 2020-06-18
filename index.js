var express = require('express');
var cors = require('cors');
const fs = require('fs');

const dbUser = require('./mongoUser.js');
const dbAuction = require('./mongoAuction.js');

var app = express();

app.use(cors());
app.use(express.json());

//for connection checking
app.get("/", function (req, reply, next) {

    reply.send("Hello");

});

//for register function
app.post('/user_regis/',function (req, reply, next) {

    dbUser.addUser(req).then(data => {
        reply.send({ service: 'userRegisted', data: data })
    });
});


//for login function
app.post('/login/',function (req, reply, next) {

    dbUser.login(req).then(data => {
        reply.send({ service: 'userLogin', data: data })
    });
});


//for getting seller detail from userid
app.post('/seller/',function (req, reply, next) {

    dbUser.seller(req).then(data => {
        reply.send({ service: 'sellerDetail', data: data })
    });
});


//for creating auction
app.post('/create_auction/',function (req, reply, next) {

    dbAuction.addAuction(req).then(data => {
        reply.send({ service: 'addAuction', data: data })
    });
});

//for getting auction list
app.get("/auction/", function (req, reply, next) {

    dbAuction.auctionList(req).then(data => {
        reply.send({ service: 'auctionList', data: data })
    });

});

//for get the auction detail from auction id
app.post("/auction_select/", function (req, reply, next) {

    dbAuction.auctionSelect(req).then(data => {
        reply.send({ service: 'auctionSelected', data: data })
    });

});

//for price offering function
app.post("/doauction/", function (req, reply, next) {

    dbAuction.doAuction(req).then(data => {
        reply.send({ service: 'doAuction', data: data })
    });

});

app.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 3000')
})