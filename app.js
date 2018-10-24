const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const db = require("knex")(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send({message: 'hello, world'})
})

app.listen(port, function() {
  console.log(`now listening on port ${port}...`)
})