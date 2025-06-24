const express = require("express");

const getPath = require("../utils/pathHelper");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.sendFile(getPath("Understanding_express","views","add-product.html"));
});

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;