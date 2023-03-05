const express = require('express');
const router = new express.Router();
const User = require('../models/user');

// add user
router.post('/users', async (req, res) => {
    const user = new User(req.body);

    user.save().then(()=>{
        res.send(user);
    }).catch((err)=>{
        res.status(400).send(err);
    })

});

// remove user
router.delete('/users/:id', async (req, res) => {
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
router.patch('/users/:id', async (req, res) => {
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
router.get('/users/:id', async (req, res) => {
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
router.get('/users', async (req, res) => {
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

module.exports = router;

