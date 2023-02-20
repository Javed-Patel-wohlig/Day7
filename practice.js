const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'Order';

MongoClient.connect(url, (err, client)=>{
    console.log('Connected to MongoDB');

    
    const db = client.db(dbName);
    
    const pipeline  = [
        {$match: {name: {$regex: /chicken/, $options: 'i'}}},
        {$project: {_id: 0, name: 1, price: 1, description:1}},
        {$limit: 5}
    ]

    db.collection('products').aggregate(pipeline).toArray((err, result)=>{
        if (err) throw err;
        console.log(result)
        client.close();
    })
})