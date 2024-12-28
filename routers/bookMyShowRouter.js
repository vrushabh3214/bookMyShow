const express = require('express');
const bookMyShow = require('../modales/bookMyShow');
const bookMyShowCtl = require("../controllers/bookMyShowCtl");
const router = express.Router();

console.log("router run");

router.get('/', bookMyShowCtl.viewsShow);
router.get('/addMovie', bookMyShowCtl.home);
router.post('/sendData', bookMyShow.uploadedAvatar, bookMyShowCtl.sendData);
router.post('/reviewsCommit', bookMyShowCtl.reviewsCommit);
router.get('/bookings', bookMyShowCtl.bookings);





module.exports = router;