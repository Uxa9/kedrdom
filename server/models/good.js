const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    category: {
        type: String,
    },
    name: {
        type: String,
    },
    weight: {
        type: Number,
    },
    price: {
        type: Number,
    },
    desc: {
        type: String,
    },
    amount: {
        type: Number
    }
});

module.exports = model('Good', schema);