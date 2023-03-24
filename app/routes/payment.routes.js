const { authJwt } = require("../middleware");
const payments = require("../controllers/payment.controller.js");

module.exports = app => {
    
    var router = require("express").Router();

    // Retrieve all Tutorials
    router.get("/", [authJwt.verifyToken],  payments.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", [authJwt.verifyToken],  payments.findOne);
  
    // Create a new Tutorial
    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], payments.create);
  
    // Update a Tutorial with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], payments.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], payments.delete);
  
    // Delete all Tutorials
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], payments.deleteAll);
  
    app.use('/api/payments', router);
  };