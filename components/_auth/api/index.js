const express = require('express');
const router = express.Router();

const apiController = require("./apiController");

router.get("/verifyPhonenumber/:phonenumber", apiController.verifyPhonenumber);
router.get("/verifyEmail/:email", apiController.verifyEmail);

module.exports = router;