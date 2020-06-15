const MongoClient = require('mongodb').MongoClient;
const MongoObjId = require('mongodb').ObjectId;
const uri = "mongodb+srv://jongjet:jongjet25@myapp.mljmt.mongodb.net/auctionit?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


exports.addAuction = function (req) {

    return new Promise((resolve, reject) => {

        //console.log(req)

        client.connect(err => {
            const collection = client.db("auctionit").collection("auction");
            console.log("connected");

            let json = { "name": req.body.pname, "description": req.body.pdes, "price": req.body.pprice, "date": req.body.pdate, "photouri": req.body.pphotouri, "uid": req.body.puid, "status": true, "buyerid": '' };

            collection.insertOne(json, function (err, result) {

                //client.close();

                console.log(result.insertedId);

                resolve(result.insertedId);

            });


        });
    });

}

exports.auctionList = function (req) {

    return new Promise((resolve, reject) => {
        client.connect(err => {
            const collection = client.db("auctionit").collection("auction");
            console.log("connected");

            collection.find({}).toArray(function (err, result) {

                //client.close();

                if (result.length > 0) {
                    console.log(result);
                    resolve(result);
                } else {
                    console.log(result);
                    resolve("notFound");
                    reject(err);
                }

            });

        });
    });

}

exports.auctionSelect = function (req) {

    return new Promise((resolve, reject) => {
        client.connect(err => {
            const collection = client.db("auctionit").collection("auction");
            console.log("connected");

            collection.find(MongoObjId(req.body.item_id)).toArray(function (err, result) {

                //client.close();

                if (result.length > 0) {
                    console.log(result);
                    resolve(result[0]);
                } else {
                    console.log(result);
                    resolve("notFound");
                    reject(err);
                }

            });

        });
    });

}

exports.doAuction = function (req) {

    return new Promise((resolve, reject) => {
        client.connect(err => {
            const collection = client.db("auctionit").collection("auction");
            console.log("connected");

            let myquery = { _id: MongoObjId(req.body.item_id) };
            let newvalues = { $set: { price: req.body.price, buyerid: req.body.buyer_id} };
            collection.updateOne(myquery, newvalues, function (err, result) {

                //client.close();

                if (result.length > 0) {
                    console.log(result);
                    resolve(result[0]);
                } else {
                    console.log(result);
                    resolve("incomplete");
                    reject(err);
                }

            });

        });
    });

}




