module.exports = app => {
    const type = require("../controllers/type.controller.js");
    var router = require("express").Router();
  
    // Create a new doc type
    router.post("/", type.create);
  
    // Retrieve all doc types
    router.get("/", type.findAll);
  
    app.use('/api/type', router);
  };