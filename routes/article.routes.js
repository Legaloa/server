module.exports = app => {
    const article = require("../controllers/article.controller.js");
    var router = require("express").Router();
  
    // Create a new article
    router.post("/", article.create);
  
    // get all articles
    router.get("/", article.findAll);

    // get all articles by idDoc
    router.get("/", article.findAllById);
    
    // Delete a article with id
    router.delete("/:id", article.delete);
  
    app.use('/api/article', router);
  };