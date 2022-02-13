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

    console.log("Busqueda de documento");
    const intituleDoc = req.query.intituleDoc;
    const typeId = req.query.typeId;
    const organismeId = req.query.organismeId;
    const domaineId = req.query.domaineId;
    const dateVigueur = req.query.dateVigueur;

    var strToDate = new Date(dateVigueur);

    strToDate = strToDate.getFullYear();
    if(!strToDate){
      strToDate = "";
    }
 
    var condition = intituleDoc ? Sequelize.literal(`MATCH (intituleDoc) AGAINST('%${intituleDoc}%' IN NATURAL LANGUAGE MODE)`) : null;
    var conditionYear = Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('dateVigueur')), strToDate);
   console.log(condition);

    if (condition == null) {
      console.log("sin titulo");
      var where = {
       [Op.or]: [
         { typeId: typeId}, 
         { organismeId: organismeId },
         { domaineId: domaineId },
         {conditionYear}
         
       ]}
     }else{
      console.log("con titulo");
       var where ={
       [Op.or]: [
         {condition},
         { typeId: typeId},
         { organismeId: organismeId },
         { domaineId: domaineId },
         {conditionYear}
       ]}
     }

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