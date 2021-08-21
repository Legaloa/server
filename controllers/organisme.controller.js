const db = require("../models");
const Organisme = db.organisme;
const Op = db.Sequelize.Op;

// Create and Save a new Organisme
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a organisme
  const organisme = {
    name: req.body.name
  };

  // Save organisme in the database
  Organisme.create(organisme)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Game."
      });
    });
  };

// Retrieve all Organismes from the database.
exports.findAll = (req, res) => {

  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;


  Organisme.findAll({ where: condition }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Videos."
      });
    });
   
  };

// Find a single Organisme with an id
exports.findOne = (req, res) => {


};

// Update a Organisme by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Organisme with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Organismes from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Organisme
exports.findAllOrganismes = (req, res) => {
  
};