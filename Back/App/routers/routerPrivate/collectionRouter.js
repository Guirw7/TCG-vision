const express = require('express');

/* --------------- Controllers ---------------*/
const collectionController = require('../../controllers/collectionController');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

/* --------------- Routes ---------------*/
router.post('/', controllerHandler(collectionController.addCollectionInDb));
router.get('/:id(\\d+)', controllerHandler(collectionController.getOneCollection));

/* --------------- export of router ---------------*/
module.exports = router;
