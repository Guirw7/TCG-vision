const express = require('express');

const router = express.Router();
// profil and user:
router.get('/profil', userController);// a modifier les controllers
router.get('/profil/:id', userConroller);
router.put('/user/:id', userController);
router.delete('/user/:id', userController);
router.get('/logout', userController);

// collection routers:

router.get('/collection', collectionController);// a modifier les controllers
router.get('/collection/:id', collectionController);
router.post('/collection', collectionController);
router.delete('/collection/:id', collectionController);
router.put('/collection/:id', collectionController);
router.get('/collection/:id/card/:cardId', collectionController);
router.delete('/collection/:id/card/:cardId', collectionController);

// deck controller:

router.post('/deck', deckController);
router.put('/deck/:id', deckController);

module.exports = router;
