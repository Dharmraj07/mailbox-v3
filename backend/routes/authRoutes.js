const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');


// Routes
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/reset-password', authController.resetPassword);


module.exports = router;