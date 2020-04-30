const express = require('express')
var router = express.Router()

// const virus = require('../models/virusVices')

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  cards.shuffleAll(function(data) {
    var hbsObject = {
      cards: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/cards", function(req, res) {
  cards.insertOne([
    "black_card", "Question?"
  ], [
    req.body.name, req.body.sleepy
  ], function(result) {
    res.json({ id: result.insertId });
  });
});

router.post("/api/cards", function(req, res) {
    cards.insertOne([
      "white_card", "Answer!"
    ], [
      req.body.name, req.body.sleepy
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });
  

module.exports = router;
