const db = require("../models");
const Article = db.article;
const Op = db.Sequelize.Op;
var Sequelize = require('sequelize');

// Create and Save a new Article
exports.create = (req, res) => {

   // Validate request
   if (!req.body.numero) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an article
  const article = {
    numero: req.body.numero,
    intituleArticle: req.body.intituleArticle,
    docId: req.body.docId
  };

  // Save Article in the database
  Article.create(article)
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

// Retrieve all articles from the database.
exports.findAll = (req, res) => {

    const intituleArticle = req.query.intituleArticle;
    if(intituleArticle == undefined){
      var condition = intituleArticle ? { intituleArticle: { [Op.like]: `%${intituleArticle}%` } } : null;
    } else{
      var condition = Sequelize.literal(`MATCH (intituleArticle) AGAINST('%${intituleArticle}%' IN NATURAL LANGUAGE MODE)`);
    }
  
   
    Article.findAll({ where: condition }) 
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
  
// Retrieve all articles from the database.
exports.findAllById = (req, res) => {

  const docId = req.query.docId;
  var condition = docId ? { docId: { [Op.like]: `%${docId}%` } } : null;


  Article.findAllById({ where: condition }) 
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving articles."
      });
    });
  
};

// Find a single Article with an id
exports.findOne = (req, res) => {
  
};

// Update a Article by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Article with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Article.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Article was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Article with id=${id}. Maybe Game was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Article with id=" + id
      });
    });
};

// Delete all Article from the database.
exports.deleteAll = (req, res) => {
  
};
