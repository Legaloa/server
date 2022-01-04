module.exports = app => {
    const status = require("../controllers/status.controller.js");
    var router = require("express").Router();
  
    // Create a new  status
    router.post("/", status.create);
  
    // Retrieve all status
    router.get("/", status.findAll);
  
    app.use('/api/status', router); 
  };