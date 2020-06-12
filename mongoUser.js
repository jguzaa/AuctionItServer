const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jongjet:jongjet25@myapp.mljmt.mongodb.net/auctionit?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


exports.addUser = function (req) {

    let THIS = this;
    return new Promise((resolve, reject) =>{
        client.connect(err => {
            const collection = client.db("auctionit").collection("user");
            console.log("connected");
    
            let json = {"user": req.body.username, "pass": req.body.password, "pNo": req.body.phoneNo};
    
            collection.insertOne(json, function (err, result) {
                
                console.log(result.insertedId);

                resolve(result.insertedId);
                
                client.close();
                
            });
    
    
        });
    });

}

exports.login = function (req) {

    let THIS = this;
    return new Promise((resolve, reject) =>{
        client.connect(err => {
            const collection = client.db("auctionit").collection("user");
            console.log("connected");

            collection.find({user: req.body.username, pass: req.body.password}).toArray(function(err, result){
                
                console.log(result[0]._id);

                resolve(result[0]._id);
                
                client.close();
            });
    
        });
    });
  
}






