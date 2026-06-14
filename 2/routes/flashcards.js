const router = require('express').Router();
const flashcardsController = require('../controllers/flashcards');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).send(`<html><body style="text-align:center"><img src="/urnotloggedin.png" style="max-width:100%"></body></html>`);
};

router.get('/', isAuthenticated, flashcardsController.getAll);
router.get('/:id', isAuthenticated, flashcardsController.getSingle);
router.post('/', isAuthenticated, flashcardsController.createFlashcard);
router.put('/:id', isAuthenticated, flashcardsController.updateFlashcard);
router.delete('/:id', isAuthenticated, flashcardsController.deleteFlashcard);

module.exports = router;
