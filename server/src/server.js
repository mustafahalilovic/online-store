const express = require('express');
const cors = require('cors');
const app = express();
const chalk = require('chalk');
require('dotenv').config();
require('./db/dbSetup');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');

// middleware functions
app.use(cors());
// parsing incoming json to object so we can access it
app.use(express.json());

//routes
app.use(userRoute);
app.use(productRoute);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(chalk.yellow(`Server started at port: ${chalk.gray(PORT)}`));
})