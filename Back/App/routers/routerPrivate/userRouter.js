const express = require('express');

const controllerHandler = require('../../helpers/controllerHandler');
const requireAuth = require('../../middlewares/auth');

/* --------------- Controllers ---------------*/
const userController = require('../../controllers/userController');

/* --------------- Validations ---------------*/
const { userBody } = require('../../validations/schemas');
const validate = require('../../validations/validate');

const router = express.Router();

/* --------------- Routes ---------------*/
router.get('/', requireAuth, controllerHandler(userController.detailUsers));
// (\\d+) expression régulière qui definit une contrainte sur l'id.
router.get('/:id(\\d+)', controllerHandler(userController.getOneUser));

router.put('/:id(\\d+)', validate(userBody), controllerHandler(userController.modifyUser));
router.delete('/:id(\\d+)', controllerHandler(userController.deleteUser));

module.exports = router;
