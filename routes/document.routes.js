module.exports = app => {
    const document = require("../controllers/document.controller.js");
    var router = require("express").Router();
  
    // Create a new document
    router.post("/", document.create);
  
    // Retrieve all documents
    router.get("/", document.findAll);

    // Retrieve all documents
    router.get("/allDocs/", document.findAllDocs);

    // Retrieve a single document with id
    router.get("/:id", document.findOne);

    // Delete a document with id
    router.delete("/:id", document.delete);
  
    app.use('/api/document', router);
  };