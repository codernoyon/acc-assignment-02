const express = require('express');
const tourController = require('../controllers/tour.controller');
const router = express.Router();

router
    .route('/')
    .get(tourController.getTourPackages)
    .post(tourController.createTourPackage);


// single tour get
router
    .route('/:id')
    .get(tourController.getTourPackage);


module.exports = router;