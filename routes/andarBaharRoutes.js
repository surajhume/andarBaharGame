const express = require("express");
const router = express.Router();
const {matchStatus,placeBet,playerBalance} = require("../controller/andarBaharController");

// Define your routes and link them to controller functions
// router.get('/startOnce', createNewMatch);

router.get('/matchStatus',matchStatus);

router.get('/getPlayerBalance',playerBalance);

// Import necessary models or utilities

// POST route to place a bet
router.post('/placeBet', placeBet);
  


module.exports = router;
