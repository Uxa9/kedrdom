const { Router } = require('express');
const Good = require('../models/good');
const router = Router();

router.put('/add', async (req, res) => {
    const { name, category, weight, price, desc, amount } = req.body.params;

    try {
        const good = new Good({
            name,
            category,
            weight,
            price,
            desc,
            amount
        });

        await good.save();

        res.status(201).send('OK');

    } catch (error) {
        console.log(error);
    }

});

router.get('/:id', async (req, res) => {

    const goods = await Good.find({ category : req.params.id });

    res.json(goods);
}); 

router.post('/get', async (req, res) => {

    const goods = await Good.find({});

    res.json(goods);
}); 

router.post('/:id', async (req, res) => {
    await Good.updateOne({ _id : req.params.id }, { 
        name     : req.body.params.name,
        category : req.body.params.category,       
        weight   : req.body.params.weight,   
        price    : req.body.params.price,   
        desc     : req.body.params.desc,   
        amount   : req.body.params.amount,
    });

    res.status(203).send('OK'); 
});

router.delete('/:id', async (req, res) => {
    
    await Good.deleteOne({ _id : req.params.id });

    res.status(201).send('OK');
});

module.exports = router;