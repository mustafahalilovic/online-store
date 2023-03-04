const mongoose = require('mongoose');
require('dotenv').config();

// Pokretanje db servera
// /Users/Administrator/mongodb/mongodb/bin/mongod.exe --dbpath=/Users/Administrator/mongodb-data 

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true
}).catch((error)=>{
    console.log(error);
});