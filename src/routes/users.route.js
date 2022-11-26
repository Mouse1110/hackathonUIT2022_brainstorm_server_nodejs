
const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController')

router.get('/show', userController.show);
router.post('/sign-up', userController.sign_up);
router.post('/sign-in', userController.sign_in);


module.exports = router;