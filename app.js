const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const factoryRoutes = require('./routes/factories')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send({message: 'hello, world'})
})

app.use('/api/factories', factoryRoutes)

app.listen(port, function() {
  console.log(`now listening on port ${port}...`)
})