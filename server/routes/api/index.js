const express = require("express");
const router = express.Router();
const authentication = require("./authentication.js");
const pet = require("./pet.js");
const user = require("./user.js");

router.use("/authentication", authentication);
router.use("/pet", pet);
router.use("/user", user);

module.exports = router;

