const express = require('express');

/* --------------- Controllers ---------------*/
const userController = require('../../controllers/userController');

const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

/* --------------- Routes ---------------*/
router.post('/', controllerHandler(userController.sendPasswordResetEmail));
router.put('/:token', controllerHandler(userController.resetPassword));
