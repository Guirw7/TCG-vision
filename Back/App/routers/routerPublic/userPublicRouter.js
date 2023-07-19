const express = require('express');

/* --------------- Controllers ---------------*/
const userController = require('../../controllers/userController');

const controllerHandler = require('../../helpers/controllerHandler');

/* --------------- Validations ---------------*/
const { userBody } = require('../../validations/schemas');
const validate = require('../../validations/validate');

const router = express.Router();

/* --------------- Routes ---------------*/
router.post('/signup', validate(userBody), controllerHandler(userController.addUserForm));
router.post('/login', controllerHandler(userController.login));
router.post('/:email', controllerHandler(userController.sendPasswordResetEmail));
router.put('/:token', controllerHandler(userController.resetPassword));

module.exports = router;
