const routes = require('express').Router();

const baseController = require('../controllers/contacts.js');

routes.get('/', baseController.getContacts);
routes.get('/:id', baseController.getContactsById);
routes.post('/', baseController.createContact);
routes.put('/:id', baseController.updateContact);
routes.delete('/:id', baseController.deleteContact);

module.exports = routes;
