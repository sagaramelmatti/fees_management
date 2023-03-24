const { authJwt } = require("../middleware");
const students = require("../controllers/student.controller.js");

module.exports = app => {
    
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    // Retrieve all Tutorials
    router.get("/", [authJwt.verifyToken], students.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", [authJwt.verifyToken], students.findOne);

    router.post("/", [authJwt.verifyToken, authJwt.isAdmin], students.create);
  
    // Update a Tutorial with id
    router.put("/:id", [authJwt.verifyToken], students.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", [authJwt.verifyToken], students.delete);
  
    // Delete all Tutorials
    router.delete("/", [authJwt.verifyToken], students.deleteAll);
  
    app.use('/api/students', router);
  };