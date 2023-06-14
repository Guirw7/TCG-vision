const express = require('express');

/* --------------- Controllers ---------------*/
const userController = require('../../controllers/userController');

/* --------------- Validations ---------------*/
const { userBody } = require('../../validations/schemas');
const validate = require('../../validations/validate');

const router = express.Router();

/* --------------- Routes ---------------*/
router.get('/', userController.detailUsers);
// (\\d+) expression régulière qui definit une contrainte sur l'id.
router.get('/:id(\\d+)', userController.getOneUser);

router.put('/:id(\\d+)', validate(userBody), userController.modifyUser);
router.delete('/:id(\\d+)', userController.deleteUser);

module.exports = router;
