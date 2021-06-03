const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 3000;

// middlewares
app.use(morgan('dev'));

// Rutas
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

// Starting the server
app.listen(port, () => {
    console.log('Server on port ${3000}');
})