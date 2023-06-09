const express = require('express');

/* --------------- Controllers ---------------*/
const userControler = require('../../controllers/userController');

/* --------------- Validations ---------------*/
const { userBody } = require('../../validations/schemas');
const validate = require('../../validations/validate');

const router = express.Router();

/* --------------- Routes ---------------*/
router.post('/', validate(userBody), userControler.addUserForm);

module.exports = router;
