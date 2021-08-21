const db = require("../models");
const Type = db.type;
const Op = db.Sequelize.Op;

// Create and Save a new Type
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a type
  const type = {
    type: req.body.type,
    description: req.body.description
  };

  // Save type in the database
  Type.create(type)
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

// Retrieve all Types from the database.
exports.findAll = (req, res) => {

  const type = req.query.type;
  var condition = type ? { type: { [Op.like]: `%${type}%` } } : null;


  Type.findAll({ where: condition }) 
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

// Find a single Type with an id
exports.findOne = (req, res) => {
  
};

// Update a Type by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Type with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Types from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Types
exports.findAllTypes = (req, res) => {
  
};