module.exports = app => {
    const domaine = require("../controllers/domaine.controller.js");
    var router = require("express").Router();
  
    // Create a new domaine
    router.post("/", domaine.create);
  
    // Retrieve all domaines
    router.get("/", domaine.findAll);
  
    app.use('/api/domaine', router);
  };