const express = require('express');
const tourController = require('../controllers/tour.controller');
const TourPackage = require('../models/TourPackage');
const router = express.Router();


// trending tour
router
    .route('/trending')
    .get(tourController.getTrendingTourPackages);

router
    .route('/cheapest')
    .get(tourController.getCheapestTourPackages);


/* router
    .route('/delete')
    .delete(async(req, res) => {
        const result = await TourPackage.deleteMany({})
        res.json({
            message: 'deleted',
            result
        })
    }) */

router
    .route('/:id')
    .patch(tourController.updateTourPackage);




module.exports = router;