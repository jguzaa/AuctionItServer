const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://jongjet:jongjet25@myapp.mljmt.mongodb.net/auctionit?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const MongoObjId = require('mongodb').ObjectId;

exports.addUser = function (req) {

    return new Promise((resolve, reject) => {
        client.connect(err => {
            const collection = client.db("auctionit").collection("user");
            console.log("connected");

            //set json file for db submitting
            let json = { "user": req.body.username, "pass": req.body.password, "pNo": req.body.phoneNo };

            collection.insertOne(json, function (err, result) {

                //client.close();

                console.log(result.insertedId);

                resolve(result.insertedId);

            });


        });
    });

}

exports.login = function (req) {

    return new Promise((resolve, reject) => {
        client.connect(err => {
            const collection = client.db("auctionit").collection("user");
            console.log("connected");

            //find username and password
            collection.find({ user: req.body.username, pass: req.body.password }).toArray(function (err, result) {

                //client.close();

                //if result > 0 mean account found
                if (result.length > 0) {
                    console.log(result[0]._id);
                    resolve(result[0]._id);
                } else {
                    console.log(result);
                    resolve("notFound");
                    reject(err);
                }

            });

        });
    });

}

exports.seller = function (req) {

    return new Promise((resolve, reject) => {
        client.connect(err => {
            const collection = client.db("auctionit").collection("user");
            console.log("connected");

            //fetch seller detail from userid
            collection.find(MongoObjId(req.body.user_id)).toArray(function (err, result) {

                //client.close();

                if (result.length > 0) {
                    console.log(result[0]);
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





