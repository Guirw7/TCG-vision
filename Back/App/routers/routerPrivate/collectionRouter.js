const express = require('express');

/* --------------- Controllers ---------------*/
const collectionController = require('../../controllers/collectionController');
const controllerHandler = require('../../helpers/controllerHandler');
const authenticateToken = require('../../middlewares/auth');

const router = express.Router();

/* --------------- Routes ---------------*/
router.post('/', authenticateToken, controllerHandler(collectionController.addCollectionInDb));
router.get('/:id(\\d+)', authenticateToken, controllerHandler(collectionController.getOneCollection));
router.delete('/:collectionId(\\d+)', authenticateToken, controllerHandler(collectionController.deleteCollection));

/* --------------- export of router ---------------*/
module.exports = router;
