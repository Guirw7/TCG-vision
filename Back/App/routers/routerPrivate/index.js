const express = require('express');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/profil', userRouter);

module.exports = router;
