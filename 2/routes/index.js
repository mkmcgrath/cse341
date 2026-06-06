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
  res.send(req.user !== undefined ? `Logged in as ${req.user.displayName}` : 'Logged Out');
});

router.use('/flashcards', require('./flashcards'));

module.exports = router;
