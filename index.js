const MongoClient = require('mongodb').MongoClient;

// Connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'Order';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  // Define the pipeline

  const pipeline =[
    {
      $match: {
        name: { $regex: /chicken/, $options: 'i' }
      }
    },
    {
      $project: {
        nameSubstring: {
          $substr: ['$name', 0, 7] // extract the first 7 characters of the name field
        },
        price: 1
      }
    },
    {
      $group: {
        _id: '$nameSubstring',
        totalPrice: { $sum: '$price' }
      }
    }
  ]

  // Execute the aggregation pipeline
  db.collection('products').aggregate(pipeline).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    client.close();
  });
});
