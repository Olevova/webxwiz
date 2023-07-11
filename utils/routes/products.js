const express = require('express');
const router = express.Router();
const {allProducts} = require('./productBaseFatche.js')

router
    .route('/')
    .get(allProducts)


module.exports = router