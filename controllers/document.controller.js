const db = require("../models");
const Document = db.document;
const Article = db.article;
const Type = db.type;
const Domaine = db.domaine;
const Organisme = db.organisme;
const Op = db.Sequelize.Op;
var Sequelize = require('sequelize');

//SELECT * FROM `docs` WHERE typeId = 1 OR organismeId = 1 OR domaineId = 9 OR dateVigueur = "2021-07-12"



// Create and Save a new Document
exports.create = (req, res) => {
  // Validate request
  if (!req.body.numero) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a document
  const document = {
    numero: req.body.numero,
    dateAdoption: req.body.dateAdoption,
    dateVigueur: req.body.dateVigueur,
    dateEnregistrement: req.body.dateEnregistrement,
    intituleDoc: req.body.intituleDoc,
    route: req.body.route,
    description: req.body.description,
    typeId: req.body.typeId,
    organismeId: req.body.organismeId,
    domaineId: req.body.domaineId
  };

  // Save document in the database
  Document.create(document)
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

  exports.findAll = (req, res) => {

    console.log("entra al find all doc");

    const intituleArticle = req.query.intituleArticle;
    const typeId = req.query.typeId;
    const organismeId = req.query.organismeId;
    const domaineId = req.query.domaineId;
    const dateVigueur = req.query.dateVigueur;
    
    console.log(intituleArticle);
    console.log(dateVigueur);

    var condition = intituleArticle ? Sequelize.literal(`MATCH (intituleArticle) AGAINST('%${intituleArticle}%' IN NATURAL LANGUAGE MODE)`) : null;

      
      if (condition == null) {
       var where = {
        [Op.or]: [
          { typeId: typeId},
          { organismeId: organismeId },
          { domaineId: domaineId },
          { dateVigueur: dateVigueur }
        ]}
      }else{
        console.log("no está vacio");
        var where ={
        [Op.or]: [
          {condition},
          { typeId: typeId},
          { organismeId: organismeId },
          { domaineId: domaineId },
          { dateVigueur: dateVigueur }
        ]}
      }

    //SELECT d.intituleDoc, d.dateAdoption, t.type, o.name, do.domaine, a.intituleArticle FROM `docs` AS d JOIN `types` as t ON t.id = d.typeId JOIN `organismes` AS o ON d.organismeId = o.id JOIN `domaines` AS do ON d.domaineId = do.id JOIN `articles` AS a ON a.docId = d.id WHERE MATCH(a.intituleArticle) AGAINST ("1") OR d.typeId = 1 OR d.organismeId = 1 OR d.domaineId = 9 OR d.dateVigueur = "2021-07-12"
  
    Document.findAll(
      
      {   
      include: [
        {
        model: Type,
        as: 'type',
        },
        {
          model: Organisme,
          as: 'organisme',
        },
        {
          model: Domaine,
          as: 'domaine',
        },
        {
          model: Article,
          as: 'article',
        }
      ],
      where
     }) 
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

    exports.findAllDocs = (req, res) => {

      const intituleDoc = req.query.intituleDoc;
      var condition = intituleDoc ? { intituleDoc: { [Op.like]: `%${intituleDoc}%` } } : null;
    
    
      Document.findAll({include: [
        {
        model: Type,
        as: 'type',
        },
        {
          model: Organisme,
          as: 'organisme',
        },
        {
          model: Domaine,
          as: 'domaine',
        },
        {
          model: Article,
          as: 'article',
        }
      ], where: condition }) 
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


// Find a single Document with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Document.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Video with id=" + id
      });
    });

  
};

// Update a Document by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Document with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Document.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Document was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Document with id=${id}. Maybe Game was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Document with id=" + id
      });
    });
};

// Delete all Documents from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Document
exports.findAllDocuments = (req, res) => {
  
};