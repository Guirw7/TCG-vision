const express = require('express');

/* --------------- Controllers ---------------*/
const userControler = require('../../controllers/userController');

const router = express.Router();

/* --------------- Routes ---------------*/
router.get('/', userControler.detailUsers);
// (\\d+) expression régulière qui definit une contrainte sur l'id.
router.get('/:id(\\d+)', userControler.getOneUser);

module.exports = router;
