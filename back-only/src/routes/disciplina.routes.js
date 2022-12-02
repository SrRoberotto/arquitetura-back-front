module.exports = app => {
  const disciplinas = require("../controllers/disciplina.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", disciplinas.create);

  // Retrieve all disciplinas
  router.get("/", disciplinas.findAll);

  // Retrieve all published disciplinas
  router.get("/published", disciplinas.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", disciplinas.findOne);

  // Update a Tutorial with id
  router.put("/:id", disciplinas.update);

  // Delete a Tutorial with id
  router.delete("/:id", disciplinas.delete);

  // Delete all disciplinas
  router.delete("/", disciplinas.deleteAll);

  app.use('/api/disciplinas', router);
};
