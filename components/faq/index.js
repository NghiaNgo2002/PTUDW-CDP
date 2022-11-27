const express = require("express");
const router = express.Router();

const faqController = require("./faqController");

router.get("/", faqController.faq);

module.exports = router;
