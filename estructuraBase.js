const express = require('express')
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Obtener
app.get('/usuario', (_req, res) => {
 res.send("Usuarios, Method: get")
})
// Crear
app.post('/usuario', (req, res) => {
 console.log("Usuarios, Method: post")
 res.send(req.body)
})
// Actualizar
app.put('/usuario', (_req, res) => {
 console.log("Usuarios, Method: put")
  res.send(respuesta)
})
// Eliminar
app.delete('/usuario', (_req, res) => {
 console.log("Usuarios, Method: delete")
  res.send(respuesta)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
