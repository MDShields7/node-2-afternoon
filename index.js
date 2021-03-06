const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
require('dotenv').config();
const products_controller = require('./products_controller');

const app = express();
app.use( bodyParser.json());

console.log('my connection string', process.env.CONNECTION_STRING);
massive( process.env.CONNECTION_STRING ).then( dbInstance => {
    app.set('db', dbInstance)
  }).catch( err => console.log(err) );

app.post( '/api/products', products_controller.create );
app.get( '/api/products', products_controller.getAll );
app.get( '/api/products/:id', products_controller.getOne );
app.put( '/api/products/:id', products_controller.update );
app.delete( '/api/products/:id', products_controller.delete );

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Walls. They\'re in the walls! ${port}`);
})

