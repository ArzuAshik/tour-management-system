const toursControllers = require("../../controllers/tours.controller");
const express = require("express");
const router = express.Router();

router
    .route("/trending").get(toursControllers.getTrending);
router
    .route("/cheapest").get(toursControllers.getCheapest);

router
    .route("/")
    .get(toursControllers.getAllTours)
    .post(toursControllers.addTour);

router.route("/:id")
    .get(toursControllers.getTourDetails)
    .patch(toursControllers.updateTour)
module.exports = router;