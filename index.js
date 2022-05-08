const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


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



    // collecting  data form database
    app.get('/products' , async(req, res) =>{
        const query = {};
        const cursor = productCollection.find(query);
        const products = await cursor.toArray();
        res.send(products)
    })


    // add item in database
    app.post('/products', async(req, res) =>{
        const newProduct = req.body;
        const result = await productCollection.insertOne(newProduct);
        res.send(result);
    })

    //  single data finding for showing 
     app.get('/product/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const product = await productCollection.findOne(query);
        res.send(product);
    });



    //Delete data 
    app.delete('/products/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const deleteData = await productCollection.deleteOne(query);
        res.send(deleteData);
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