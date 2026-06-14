const { getDB } = require('../database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('flashcards').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const db = getDB();
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid flashcard ID' });
    }
    const id = new ObjectId(req.params.id);
    const result = await db.collection('flashcards').findOne({ _id: id });
    if (!result) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFlashcard = async (req, res) => {
  try {
    const { question, answer, category, difficulty, hint, tags, notes } = req.body;
    if (!question || !answer || !category || !difficulty) {
      return res.status(400).json({ message: 'question, answer, category, and difficulty are required' });
    }
    const validDifficulties = ['easy', 'medium', 'hard'];
    if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({ message: 'difficulty must be easy, medium, or hard' });
    }
    const db = getDB();
    const flashcard = {
      question,
      answer,
      category,
      difficulty,
      hint: hint || '',
      tags: Array.isArray(tags) ? tags : [],
      notes: notes || '',
      createdAt: new Date().toISOString(),
    };
    const result = await db.collection('flashcards').insertOne(flashcard);
    if (result.acknowledged) {
      res.status(201).json({ id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Error creating flashcard' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFlashcard = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid flashcard ID' });
    }
    const { question, answer, category, difficulty, hint, tags, notes } = req.body;
    if (!question || !answer || !category || !difficulty) {
      return res.status(400).json({ message: 'question, answer, category, and difficulty are required' });
    }
    const validDifficulties = ['easy', 'medium', 'hard'];
    if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({ message: 'difficulty must be easy, medium, or hard' });
    }
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const flashcard = {
      question,
      answer,
      category,
      difficulty,
      hint: hint || '',
      tags: Array.isArray(tags) ? tags : [],
      notes: notes || '',
      createdAt: new Date().toISOString(),
    };
    const result = await db.collection('flashcards').replaceOne({ _id: id }, flashcard);
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Flashcard not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFlashcard = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid flashcard ID' });
    }
    const db = getDB();
    const id = new ObjectId(req.params.id);
    const result = await db.collection('flashcards').deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Flashcard not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAll, getSingle, createFlashcard, updateFlashcard, deleteFlashcard };
