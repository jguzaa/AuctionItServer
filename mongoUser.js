const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jongjet:jongjet25@myapp.mljmt.mongodb.net/auctionit?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


exports.addUser = function (user, pass) {

    let THIS = this;
    return new Promise((resolve, reject) =>{
        client.connect(err => {
            const collection = client.db("auctionit").collection("user");
            console.log("connected");
    
            let json = {"user": user, "pass": pass};
    
            collection.insertOne(json, function (err, result) {
                
                console.log(result.insertedId);

                resolve(result.insertedId);
                
                client.close();
                
            });
    
    
        });
    });


    
}






