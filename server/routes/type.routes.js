const { Router } = require('express');
const GoodsType = require('../models/goodsType');
const router = Router();

router.put('/add', async (req, res) => {
    const { name } = req.body.params;

    const type = new GoodsType({
        name
    })

    await type.save();

    res.status(201).send('OK');
});

router.get('/get', async (req, res) => {
    const types = await GoodsType.find({});
    res.json(types);
}); 

router.get('/:id', async (req, res) => {
    const type = await GoodsType.findOne({ _id : req.params.id });
    res.json(type);
});

router.post('/:id', async (req, res) => {
    await GoodsType.updateOne({ _id : req.params.id }, { name : req.body.params.name });

    res.status(203).send('OK'); 
});

router.delete('/:id', async (req, res) => {

    await GoodsType.deleteOne({ _id : req.params.id });

    res.status(200).send('OK');
});

module.exports = router;