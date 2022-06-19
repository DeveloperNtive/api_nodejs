// Se importa la libreria express
const express = require('express')
const app = express()
const port = 3000
// -----------------MongoDB--------------------
const { MongoClient, ObjectId } = require('mongodb')
const { uri, client, dataBase,  coleccion} = require('./DB/mongo')
// -----------------MongoDB--------------------

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

MongoClient.connect(uri, function (err, db) {
  if (!err) {
    console.log('Database conected!')
    db.close()
  } else {
    console.log('error: ' + err)
  }
})

// Obtener
app.get('/', (req, res) => {
  client.connect(async err => {
    if (!err) {
      const collection = client.db(dataBase).collection(coleccion)
      // perform actions on the collection object
      const result = await collection.find({}).toArray()
      client.close()
      res.send(JSON.stringify(result))
    } else {
      console.log('error: ' + err)
    }
  })
})

app
  .route('/api/usuario')
  .get((req, res) => {
    client.connect(async err => {
      if (!err) {
        const collection = client.db(dataBase).collection(coleccion)
        // perform actions on the collection object
        const result = await collection.find({}).toArray()
        client.close()
        res.send(result)
      } else {
        console.log('error: ' + err)
      }
    })
  })
  .post((req, res) => {
    client.connect(async err => {
      if (!err) {
        const collection = client.db(dataBase).collection(coleccion)
        // perform actions on the collection object
        const result = await collection.insertOne(req.body)
        client.close()
        res.send(result)
      } else {
        console.log('error: ' + err)
      }
    })
  })
  .put((req, res) => {
    client.connect(async err => {
      if (!err) {
        const collection = client.db(dataBase).collection(coleccion)
        // perform actions on the collection object
        const result = await collection.updateOne(req.body.item, {
          $set: req.body.newValues
        })
        client.close()
        res.send(result)
      } else {
        console.log('error: ' + err)
      }
    })
  })
  .delete((req, res) => {
    client.connect(async err => {
      if (!err) {
        if (req.body.item._id) {
          console.log('Res: ' + req.body.item._id)
        }else{
          console.log('Res: ' + req.body.item.nombre)
        }
        const collection = client.db(dataBase).collection(coleccion)
        // perform actions on the collection object
        const result = await collection.deleteOne(req.body.item)
        client.close()
        res.send(result)
      } else {
        console.log('error: ' + err)
      }
    })
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
