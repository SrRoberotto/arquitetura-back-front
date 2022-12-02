const db = require("../models/db.model");
const tblDisciplina = db.tblDisciplinas;
const Op = db.Sequelize.Op;

// Create and Save a new Disciplina
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Disciplina
  const objDisciplina = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Disciplina in the database
  tblDisciplina.create(objDisciplina)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Disciplina."
      });
    });
};

// Retrieve all Disciplinas from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  tblDisciplina.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Disciplinas."
      });
    });
};

// Find a single Disciplina with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  tblDisciplina.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Disciplina with id=" + id
      });
    });
};

// Update a Disciplina by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  tblDisciplina.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Disciplina was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Disciplina with id=${id}. Maybe Disciplina was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Disciplina with id=" + id
      });
    });
};

// Delete a Disciplina with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  tblDisciplina.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Disciplina was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Disciplina with id=${id}. Maybe Disciplina was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Disciplina with id=" + id
      });
    });
};

// Delete all Disciplinas from the database.
exports.deleteAll = (req, res) => {
  tblDisciplina.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Disciplinas were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Disciplinas."
      });
    });
};

// find all published Disciplina
exports.findAllPublished = (req, res) => {
  tblDisciplina.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Disciplinas."
      });
    });
};
