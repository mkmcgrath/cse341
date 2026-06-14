const { getDB } = require('../database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('decks').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid deck ID' });
    }
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('decks').findOne({ _id: id });
    if (!result) {
      return res.status(404).json({ message: 'Deck not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDeck = async (req, res) => {
  try {
    const { name, description, category, isPublic, tags, difficulty, notes } = req.body;
    if (!name || !description || !category || isPublic === undefined || !difficulty) {
      return res.status(400).json({ message: 'name, description, category, isPublic, and difficulty are required' });
    }
    const validDifficulties = ['easy', 'medium', 'hard', 'mixed'];
    if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({ message: 'difficulty must be easy, medium, hard, or mixed' });
    }
    const db = getDB();
    const deck = {
      name,
      description,
      category,
      isPublic: Boolean(isPublic),
      tags: Array.isArray(tags) ? tags : [],
      difficulty,
      notes: notes || '',
      createdAt: new Date().toISOString(),
    };
    const result = await db.collection('decks').insertOne(deck);
    if (result.acknowledged) {
      res.status(201).json({ id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Error creating deck' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDeck = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid deck ID' });
    }
    const { name, description, category, isPublic, tags, difficulty, notes } = req.body;
    if (!name || !description || !category || isPublic === undefined || !difficulty) {
      return res.status(400).json({ message: 'name, description, category, isPublic, and difficulty are required' });
    }
    const validDifficulties = ['easy', 'medium', 'hard', 'mixed'];
    if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({ message: 'difficulty must be easy, medium, hard, or mixed' });
    }
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const deck = {
      name,
      description,
      category,
      isPublic: Boolean(isPublic),
      tags: Array.isArray(tags) ? tags : [],
      difficulty,
      notes: notes || '',
      createdAt: new Date().toISOString(),
    };
    const result = await db.collection('decks').replaceOne({ _id: id }, deck);
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Deck not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDeck = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid deck ID' });
    }
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('decks').deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Deck not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAll, getSingle, createDeck, updateDeck, deleteDeck };
