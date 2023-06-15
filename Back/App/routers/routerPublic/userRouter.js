const express = require('express');

/* --------------- Controllers ---------------*/
const userController = require('../../controllers/userController');

/* --------------- Validations ---------------*/
const { userBody } = require('../../validations/schemas');
const validate = require('../../validations/validate');

const router = express.Router();

/* --------------- Routes ---------------*/
router.post('/signup', validate(userBody), userController.addUserForm);
router.post('/login', userController.login);

module.exports = router;
