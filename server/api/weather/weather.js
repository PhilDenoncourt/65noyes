'use strict';

var express = require('express');
var controller = require('./weather.controller');

var router = express.Router();

router.get('/', controller.getLatest);

module.exports = router;
