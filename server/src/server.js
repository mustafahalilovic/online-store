const express = require('express');
const cors = require('cors');
const app = express();
const chalk = require('chalk');
require('dotenv').config();
require('./db/dbSetup');

// middleware functions
app.use(cors());
// parsing incoming json to object so we can access it
app.use(express.json());



const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(chalk.yellow(`Server started at port: ${chalk.gray(PORT)}`));
})