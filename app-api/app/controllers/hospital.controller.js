const db = require("../models");
const Hospital = db.hospitals;
const Op = db.Sequelize.Op;

// Retrieve all Hospitals from the database.
exports.findAll = (req, res) => {
  const state = req.query.state;
  var condition = state ? { "State": { [Op.like]: `%${state}%` } } : null;

  Hospital.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Hospital with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Hospital.findOne({
    where: {
      Facility_ID: id // Searching by Facility_ID column
    }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Hospital with id=" + id
      });
    });
};