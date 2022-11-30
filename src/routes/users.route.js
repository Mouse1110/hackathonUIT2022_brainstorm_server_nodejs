
const { Router } = require('express');
const express = require('express');
const middlewareController = require('../controllers/middlewareController');
const router = express.Router();

const userController = require('../controllers/UserController')

router.get('/', middlewareController.verifyToken, userController.getAllUsers);
router.get("/:id", userController.findUserById);
router.delete("/:id", middlewareController.verifyTokenAndAdminAuth, userController.deleteUser);
router.post('/sign-up', userController.sign_up);
router.post('/sign-in', userController.sign_in);
router.post('/refresh', userController.requestRefreshToken);
router.post('/logout', middlewareController.verifyToken, userController.userLogout);


module.exports = router;