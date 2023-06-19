const express = require('express');

/* --------------- Controllers ---------------*/
const collectionController = require('../../controllers/collectionController');

/* --------------- Validations ---------------*/
const { userBody } = require('../../validations/schemas');
const validate = require('../../validations/validate');

const router = express.Router();

// *--------------- Routes --------------- */
router.post('/signup', validate(userBody), collectionController.addUserForm);
router.post('/login', collectionController.login);

module.exports = router;