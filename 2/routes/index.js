const router = require('express').Router();
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/api-docs', session: true }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/', (req, res) => {
  if (req.user) {
    res.send(`<html><body style="text-align:center;font-family:sans-serif"><img src="/loggedin.png" style="max-width:100%"><p>Logged in as ${req.user.displayName}</p></body></html>`);
  } else {
    res.send(`<html><body style="text-align:center"><img src="/loggedout.png" style="max-width:100%"></body></html>`);
  }
});

router.use('/flashcards', require('./flashcards'));
router.use('/decks', require('./decks'));

module.exports = router;
