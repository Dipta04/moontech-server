require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT||5000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uj3knqk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const productCollection = client.db("moontech").collection("product");

        app.get('/products', async(req, res)=>{
            const cursor = productCollection.find({})
            const product = await cursor.toArray();
            res.send({status: true, data: product})
        })

        app.post('/product', async(req, res)=>{
            const product = req.body;
            const result = await productCollection.insertOne(product);
            res.send(result);
        })

        app.delete('/product/:id', async(req, res)=>{
            const id = req.params.id;
            const result = await productCollection.deleteOne({_id: ObjectId(id)});
            res.send(result);
        })
    }
    finally{

    }
}
run().catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('moontech server is running')
})

app.listen(port, () => {
  console.log(`moontech app listening on port ${port}`)
})


