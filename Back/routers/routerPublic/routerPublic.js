const express = require('express');

const routerPublic = express.Router();

//Public Router:
router.post('/signin', userController );// a modifier les controllers
router.get('/deck/:id', deckController );
router.get('/api/card', cardController);
router.post('/login', userControler);

module.export = RouterPublic