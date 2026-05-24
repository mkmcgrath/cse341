const { MongoClient } = require('mongodb');
require('dotenv').config();

const client = new MongoClient(process.env.MONGOSTR);


async function initDB() {
 try {
    await client.connect();
  } catch (e) {
    console.error(e);
  }
}


const getDB = () => {
  return client.db('flashcard');
}



module.exports = { initDB, getDB };
