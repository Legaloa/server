module.exports = app => {
    const organisme = require("../controllers/organisme.controller.js");
    var router = require("express").Router();
  
    // Create a new organisme
    router.post("/", organisme.create);
  
    // Retrieve all organismes
    router.get("/", organisme.findAll);

    // Retrieve a single organisme with id
     router.get("/:id", organisme.findOne);
  
    app.use('/api/organisme', router);
  };