const express = require("express");
const getPath = require("../utils/pathHelper");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(getPath("Understanding_express","views","shop.html"));
});

module.exports = router;