const express  = require('express');
const config   = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
});

app.use('/api/goods', require('./routes/goods.routes'));
app.use('/api/goodTypes', require('./routes/type.routes'));

const PORT = config.get('port') || 5000;

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoURL'));
        app.listen(PORT, () => console.log('launched...'));
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

start();
