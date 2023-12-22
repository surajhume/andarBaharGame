const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController");
// Define your routes and link them to controller functions
router.get("/user",loginController.login);


module.exports = router;
