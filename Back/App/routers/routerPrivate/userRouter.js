const express = require('express');

/* --------------- Controllers ---------------*/
const userControler = require('../../controllers/userController');

const router = express.Router();

/* --------------- Routes ---------------*/
router.get('/', userControler.detailUsers);

module.exports = router;
