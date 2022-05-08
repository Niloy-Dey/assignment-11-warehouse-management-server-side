const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');


//middle ware 
app.use(cors());
app.use(express.json());

// waltonRefregerator
// g61r3D9mThKnItVa



const uri = "mongodb+srv://waltonRefregerator:g61r3D9mThKnItVa@cluster0.clyrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        await client.connect();
    const productCollection = client.db('waltonRefregerator').collection('products');



    // getting data form database
    app.get('/products' , async(req, res) =>{
        const query = {};
        const cursor = productCollection.find(query);
        const products = await cursor.toArray();
        res.send(products)
    })

    }

    finally{

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('walton refrigerator database is running');
})

app.listen(port, () => {
  console.log(`Example app listening on port 5000`);
})