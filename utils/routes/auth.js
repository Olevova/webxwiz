const express = require('express');
const { userRegistretion , userLogin, userLogout } = require('../routes/authFetch');

const router = express.Router();

router.post('/register', userRegistretion);
router.post('/login', userLogin);
router.post('/logout', userLogout);
module.exports = router;