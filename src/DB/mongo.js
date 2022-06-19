const { MongoClient, ServerApiVersion } = require('mongodb')
const uri =
  'mongodb+srv://aniki:do2dnxwvWNieYyiX@cluster0.iazji.mongodb.net/nodejsAPI?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
})
const dataBase = 'nodejsAPI'
const coleccion = 'usuarios'

module.exports = { uri, client, dataBase,  coleccion}
