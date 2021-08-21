const db = require("../models");
const Domaine = db.domaine;
const Op = db.Sequelize.Op;

// Create and Save a new Domaine
exports.create = (req, res) => {
  // Validate request
  if (!req.body.domaine) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a domaine
  const domaine = {
    domaine: req.body.domaine
  };

  // Save domaine in the database
  Domaine.create(domaine)
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

// Retrieve all Domaine from the database.
exports.findAll = (req, res) => {

  const domaine = req.query.domaine;
  var condition = domaine ? { domaine: { [Op.like]: `%${domaine}%` } } : null;


  Domaine.findAll({ where: condition }) 
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

// Find a single Domaine with an id
exports.findOne = (req, res) => {
  
};

// Update a Domaine by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Domaine with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Domaines from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Domaine
exports.findAllDomaines = (req, res) => {
  
};