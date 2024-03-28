const db = require("../models");
const Hospital = db.hospitals;
const Op = db.Sequelize.Op;

/**
 * Retrieve all Hospitals from the database.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.findAll = (req, res) => {
  const {
    state, lat, lon
  } = req.query;

  /**
   * Get the condition for filtering hospitals.
   * @returns {Object|null} The condition object or null if no condition is specified.
   */
  function getCondition () {
    if (state)
      return { "State": { [Op.like]: `%${state}%` } }

    if (lat && lon)
      return {
        lat: {
          [Op.between]: [lat - 5, lat + 5] // Filtering latitude between minLat and maxLat
        },
        lon: {
          [Op.between]: [lon - 5, lon + 5] // Filtering longitude between minLng and maxLng
        }
      }

    return null
  }

  Hospital.findAll({ where: getCondition() })
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

/**
 * Find a single Hospital with an id.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
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