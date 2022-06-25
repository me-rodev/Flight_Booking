const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.homePage)
router.post('/bookflight', controller.bookFlight)
router.get('/getAllFlights', controller.getAllFlights)
router.get('/getSingleFlight/:id', controller.getSingleFlight)
router.delete('/deleteFlight/:id', controller.deleteFlight)
router.patch('/updateFlight/:id', controller.updateFlight)
//Write each routes here and call all CRUD functions from flightcontroller.js

module.exports = router;

