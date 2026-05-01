const routes = require('express').Router();

const baseController = require('../controllers/contacts.js');

routes.get('/', baseController.getContacts);
routes.get('/:id', baseController.getContactsById);

module.exports = routes;
