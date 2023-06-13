const express = require('express');

/* --------------- Controllers ---------------*/
const userControler = require('../../controllers/userController');

/* --------------- Validations ---------------*/
const { userBody } = require('../../validations/schemas');
const validate = require('../../validations/validate');

const router = express.Router();

/* --------------- Routes ---------------*/
router.get('/', userControler.detailUsers);
// (\\d+) expression régulière qui definit une contrainte sur l'id.
router.get('/:id(\\d+)', userControler.getOneUser);

router.put('/:id(\\d+)', validate(userBody), userControler.modifyUser);

module.exports = router;
