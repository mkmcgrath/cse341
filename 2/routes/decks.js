const router = require('express').Router();
const decksController = require('../controllers/decks');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).send(`<html><body style="text-align:center"><img src="/urnotloggedin.png" style="max-width:100%"></body></html>`);
};

router.get('/', isAuthenticated, decksController.getAll);
router.get('/:id', isAuthenticated, decksController.getSingle);
router.post('/', isAuthenticated, decksController.createDeck);
router.put('/:id', isAuthenticated, decksController.updateDeck);
router.delete('/:id', isAuthenticated, decksController.deleteDeck);

module.exports = router;
