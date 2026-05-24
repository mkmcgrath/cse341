const router = require('express').Router();
const flashcardsController = require('../controllers/flashcards');

router.get('/', flashcardsController.getAll);
router.get('/:id', flashcardsController.getSingle);
router.post('/', flashcardsController.createFlashcard);
router.put('/:id', flashcardsController.updateFlashcard);
router.delete('/:id', flashcardsController.deleteFlashcard);

module.exports = router;
