const express = require('express');

const controllerHandler = require('../../helpers/controllerHandler');
const { authenticateToken } = require('../../middlewares/auth');

/* --------------- Controllers ---------------*/
const userController = require('../../controllers/userController');

/* --------------- Validations ---------------*/
const { userBody } = require('../../validations/schemas');
const validate = require('../../validations/validate');

const router = express.Router();

/* --------------- Routes ---------------*/
router.get('/', authenticateToken, controllerHandler(userController.detailUsers));
// (\\d+) expression régulière qui definit une contrainte sur l'id.
router.get('/:id(\\d+)', authenticateToken, controllerHandler(userController.getOneUser));

router.put('/:id(\\d+)', authenticateToken, validate(userBody), controllerHandler(userController.modifyUser));
router.delete('/:id(\\d+)', authenticateToken, controllerHandler(userController.deleteUser));
router.post('/logout', authenticateToken, userController.logout);

module.exports = router;
