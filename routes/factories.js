const express = require('express');
const router = express.Router();
const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];
const db = require("knex")(configuration);

// ------------------ get all factories ----------------------

router.get('/', (req, res) => {
  // res.send("hello from factory routes")
  db('factories').select()
    .then((factories) => {
      res.json(factories);
    })
    .catch((err) => {
      res.send(err)
    })
})

// ------------------ post a factory ----------------------

router.post("/", (req, res) => {
  const factory = req.body;

  for (let requiredParameter of ["name"]) {
    if (!factory[requiredParameter]) {
      return res
        .status(422)
        .send({
          error: `Expected format: { name: <String> }. You're missing a "${requiredParameter}" property.`
        });
    }
    res.send('posted!')
  }

  db("factories")
    .insert(factory, "id")
    .then(factory => {
      res.status(201).json({ id: factory[0] });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

// ------------------ get one factory ----------------------

router.get('/:id', (req, res) => {
  db('factories').where('id', req.params.id).select()
    .then(factory => {
      if (factory.length) {
        res.status(200).json(factory);
      } else {
        res.status(404).json({
          error: `Could not find factory with id ${req.params.id}`
        });
      }
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

// ----------- update one factory -----------------

router.put('/:id', (req, res) => {
  const factory = req.body;

  db("factories").where( 'id', req.params.id).select()
    .update(factory, "id")
    .then(factory => {
      res.status(201).json({ id: factory[0] });
    })
    .catch(error => {
      res.status(500).json({ error });
    });
})

// =----------------- delete factory -------------

router.delete('/:id', (req, res) => {
  const factory = req.body;

  db("factories").where('id', req.params.id).select()
  .del()
  .then(res.send('deleted!'))
  .catch(error => {
    res.status(500).json({ error });
  })
})

module.exports = router;