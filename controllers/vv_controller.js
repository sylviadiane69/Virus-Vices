const express = require('express')
var router = express.Router()

// const virus = require('../models/virusVices')

router.get('/', (req, res) => {
  res.render('home')
})

router.get('/api/gameroom', (req, res) => {
  res.render('index')
})
module.exports = router
