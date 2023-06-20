const express = require('express');

/* --------------- Controllers ---------------*/
const collectionController = require('../../controllers/collectionController');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

/* --------------- Routes ---------------*/
router.post('/', controllerHandler(collectionController.addCollectionInDb));

/* --------------- export of router ---------------*/
module.exports = router;
