const { getDB } = require('../database.js');
const { ObjectId } = require('mongodb');

const getContacts = async (req,res) => {
  const result = await getDB().collection('contacts').find().toArray();
  res.send(result);
}

const getContactsById = async (req,res) => {
  const id = req.params.id;
  const result = await getDB().collection('contacts').findOne({_id: new ObjectId(id)});
  res.send(result);
}

module.exports = { getContacts, getContactsById };



