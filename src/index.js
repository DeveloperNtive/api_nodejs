// Se importa la libreria express
// Asi es como se importa librerias en nodejs
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const app = express()
const port = 3000
// const nodemon = require('nodemon')

app.set('title', 'NodeJS API')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

let respuesta = {
  error: false,
  codigo: 200,
  mensaje: ''
}

// Obtener
app.get('/', (req, res) => {
  respuesta = {
    error: true,
    codigo: 200,
    mensaje: 'Punto de inicio'
  }
  res.send(respuesta)
})

app
  .route('/usuario')
  .get((req, res) => {
    respuesta = {
      error: false,
      codigo: 200,
      mensaje: ''
    }
    if (db.nombre === '' || db.apellido === '') {
      respuesta = {
        error: true,
        codigo: 501,
        mensaje: 'El usuario no ha sido creado'
      }
    } else {
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'respuesta del usuario',
        respuesta: db
      }
    }
    res.send(respuesta)
  })
  .post((req, res) => {
    if (!req.body.nombre || !req.body.apellido) {
      respuesta = {
        error: true,
        codigo: 502,
        mensaje: 'El campo nombre y apellido son requeridos'
      }
    } else {
      if (db.nombre !== '' || db.apellido !== '') {
        respuesta = {
          error: true,
          codigo: 503,
          mensaje: 'El usuario ya fue creado previamente',
          respuesta: db
        }
      } else {
        db = {
          nombre: req.body.nombre,
          apellido: req.body.apellido
        }
        respuesta = {
          error: false,
          codigo: 200,
          mensaje: 'Usuario creado',
          respuesta: db
        }
      }
    }

    res.send(respuesta)
  })
  .put((req, res) => {
    if (!req.body.nombre || !req.body.apellido) {
      respuesta = {
        error: true,
        codigo: 502,
        mensaje: 'El campo nombre y apellido son requeridos'
      }
    } else {
      if (db.nombre === '' || db.apellido === '') {
        respuesta = {
          error: true,
          codigo: 501,
          mensaje: 'El usuario no ha sido creado'
        }
      } else {
        db.usuarios = {
          nombre: req.body.nombre,
          apellido: req.body.apellido
        }
        respuesta = {
          error: false,
          codigo: 200,
          mensaje: 'Usuario actualizado',
          respuesta: db
        }
      }
    }

    res.send(respuesta)
  })
  .delete(() => {
    if (db.nombre === '' || db.apellido === '') {
      respuesta = {
        error: true,
        codigo: 501,
        mensaje: 'El usuario no ha sido creado'
      }
    } else {
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Usuario eliminado'
      }
      db.usuarios = {
        nombre: '',
        apellido: ''
      }
    }
    res.send(respuesta)
  })

// Obtener
// app.get('/usuario', (req, res) => {
//   res.send(respuesta)
// })
// Crear
// app.post('/usuario', (req, res) => {
//   res.send(req.body)
// })
// Actualizar
// app.put('/usuario', (req, res) => {
//   res.send(respuesta)
// })
// Eliminar
// app.delete('/usuario', (req, res) => {
//   res.send(respuesta)
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
