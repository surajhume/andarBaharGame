const express = require("express");
const router = express.Router();
const {login } = require("../controller/loginController");
// Define your routes and link them to controller functions
router.get("/user",login);


module.exports = router;
