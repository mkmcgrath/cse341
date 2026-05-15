const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
const { initDB } = require('./database.js');

app.use(cors());
app.use(express.json());
app.use('/', require('./routes'))

async function main() {
  try {
    await initDB();


    app.listen(port, () => {
        console.log(`Running on port ${port}`)
    })

  } catch (e) {
    console.error(e);
  }

}


main().catch(console.error);


