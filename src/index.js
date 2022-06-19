// Se importa la libreria express
const express = require('express')
const app = express()
const port = 3000
// -----------------MongoDB--------------------
const { MongoClient, ObjectId } = require('mongodb')
const { stringify } = require('nodemon/lib/utils')
const { uri, client } = require('./DB/mongo')
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

// Obtener todos los usuarios
app.get('/', (_req, res) => {
  client.connect(async err => {
    if (!err) {
      const collection = client.db('nodejsAPI').collection('usuarios')
      // perform actions on the collection object
      const result = await collection.find({}).toArray()
      client.close()
      res.send(result)
    } else {
      console.log('error: ' + err)
    }
  })
})

// Obtener usuario por id en la url
//---------------------------------
// NOTA: para enviarla por url hay que enviarla por parametro
//---------------------------------
app.get('/usuario/:id', (_req, res) => {
  client.connect(async err => {
    if (!err) {
      const collection = client.db('nodejsAPI').collection('usuarios')
      // perform actions on the collection object
      const result = await collection.find({"_id":ObjectId(_req.params.id)}).toArray()
      client.close()
      res.send(result)
    } else {
      console.log('error: ' + err)
    }
  })
})

// Obtener usuario por id en el body
//----------------------------------
// NOTA: Para enviarla por body debe enviarse asi:
// {
//   "_id": "623170fbdcb27a88b847723a"
// }
//----------------------------------
app.get('/usuario/votar/ById', (_req, res) => {
  client.connect(async err => {
    if (!err) {
      const collection = client.db('nodejsAPI').collection('usuarios')
      // perform actions on the collection object
      const result = await collection.find({"_id":ObjectId(_req.body._id)}).toArray()
      // const result = await collection.find({}).toArray()
      client.close()
      res.send(result)
      console.log(_req.body.item._id)
    } else {
      console.log('error: ' + err)
    }
  })
})

// Operaciones con usuario
app
  .route('/usuario')
  .get((_req, res) => {
    client.connect(async err => {
      if (!err) {
        const collection = client.db('nodejsAPI').collection('usuarios')
        // perform actions on the collection object
        const result = await collection.find({}).toArray()
        client.close()
        res.send(result)
        console.log('response: '+ JSON.stringify(result[0]))
      } else {
        console.log('error: ' + err)
      }
    })
  })
  .get((_req, res) => {
    client.connect(async err => {
      if (!err) {
        const collection = client.db('nodejsAPI').collection('usuarios')
        // perform actions on the collection object
        const result = await collection.find(_req.body.item).toArray()
        client.close()
        res.send(result)
        console.log('response: '+ JSON.stringify(result[0]))
      } else {
        console.log('error: ' + err)
      }
    })
  })
  .post((req, res) => {
    client.connect(async err => {
      if (!err) {
        const collection = client.db('nodejsAPI').collection('usuarios')
        // perform actions on the collection object
        const result = await collection.insertOne(req.body)
        client.close()
        res.send(result)
        console.log("response, post: " + JSON.stringify(result))
      } else { 
        console.log('error: ' + err)
      }
    })
  })
  .put((req, res) => {
    client.connect(async err => {
      if (!err) {
        const collection = client.db('nodejsAPI').collection('usuarios')
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
        const collection = client.db('nodejsAPI').collection('usuarios')
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
