const express = require('express');
const router = express.Router();
const {createCustomer, addCard, createPay, catchDate} = require('./paymentFetch')

router.post('/create-Customer', createCustomer);
router.post('/add-Card', addCard);
router.post('/payment', createPay);
router.get('/purchase/:sessionId',catchDate )
// router.post('/charge', createCharge);

module.exports = router

