const express = require('express');
const router = new express.Router();
const Product = require('../models/product');

router.post('/products', async (req, res) => {
    const product = new Product(req.body);
    
    product.save().then(()=>{
        res.send(product);
    }).catch((err)=>{
        res.status(500).send(err);
    });

});

module.exports = router;