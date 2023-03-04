const express = require('express');
const cors = require('cors');
const app = express();
const chalk = require('chalk');
require('dotenv').config();
require('./db/dbSetup');
const User = require('./models/user');
const { findByIdAndUpdate } = require('./models/user');

// middleware functions
app.use(cors());
// parsing incoming json to object so we can access it
app.use(express.json());

// Operations for user
// add user
app.post('/users', async (req, res) => {
    const user = new User(req.body);

    user.save().then(()=>{
        res.send(user);
    }).catch((err)=>{
        res.status(400).send(err);
    })

});

// remove user
app.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        
        const deleted = await User.findByIdAndDelete(_id);

        if(!deleted){
            return res.status(400).send();
        }

        res.send(deleted);

    } catch (error) {
        res.status(500).send(error);
    }
});

// update user
app.patch('/users/:id', async (req, res) => {
    const _id = req.params.id;

    const options = ['name', 'username', 'password', 'address', 'email'];
    const userOptions = Object.keys(req.body);

    // for every iteration thru loop option is
    const validOptions = userOptions.every((option) => {
        return options.includes(option);
    });

    if(!validOptions){
        return res.status(404).send({error: 'Option not available.'});
    }

    try {

        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });

        if(!user){
            return res.status(400).send();
        }

        res.send(user);
        
    } catch (error) {
        res.status(500).send(error.message);
    }

});

// get user
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        
        const user = await User.findById(_id);

        if(!user){
            return res.status(400).send();
        }

        res.send(user);

    } catch (error) {
        res.status(500).send(error.message);
    }
});

//get all users
app.get('/users', async (req, res) => {
    try {
        
        const users = await User.find();

        if(!users){
            return res.status(400).send();
        }

        res.send(users);

    } catch (error) {
        res.status(500).send(error.message);
    }
});


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(chalk.yellow(`Server started at port: ${chalk.gray(PORT)}`));
})