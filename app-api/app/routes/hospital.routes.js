module.exports = app => {
  const hospitals = require("../controllers/hospital.controller.js");

  var router = require("express").Router();

  // Retrieve all Hospital
  router.get("/", hospitals.findAll);

  // Retrieve a single Hospital with id
  router.get("/:id", hospitals.findOne);

  app.use('/api/hospitals', router);
};
