const db = require("../models");
const Status = db.status;
const Op = db.Sequelize.Op;

// Create and Save a new status
exports.create = (req, res) => {

  // Validate request
  if (!req.body.type) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a status
  const status = {
    status: req.body.status
  };

  // Save type in the database
  Status.create(status)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the status."
      });
    });
    
  };

// Retrieve all status from the database.
exports.findAll = (req, res) => {

  const status = req.query.status;
  var condition = status ? { status: { [Op.like]: `%${status}%` } } : null;


  Status.findAll({ where: condition }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving status."
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