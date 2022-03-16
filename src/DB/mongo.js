const { MongoClient, ServerApiVersion } = require('mongodb')
const uri =
  'mongodb+srv://aniki:do2dnxwvWNieYyiX@cluster0.iazji.mongodb.net/nodejsAPI?retryWrites=true&w=majority'
  const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
})

module.exports={uri, client}
