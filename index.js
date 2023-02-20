const MongoClient = require('mongodb').MongoClient;

// Connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'Order';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // Define the pipeline

  const pipeline = [
    {$match:{price:{$lt: 200}}},
    {$limit:3},
    // {$group:{_id:1, total:{$sum:1}}},kjasdfiieiuhasdifukjiuadshf8wnu
    {$project:{name:1, price:1, _id:0}}
]

  // Execute the aggregation pipeline
  db.collection('products').aggregate(pipeline).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    client.close();
  });
});
