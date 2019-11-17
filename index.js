const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const filenames = fs.readdirSync('./src/routes');

filenames.forEach((filename) => {
    app.use(require(`./src/routes/${filename}`));
});

app.get('/', (req, res) => {
    res.send('Financial System server, running.');
});

app.listen('3000', () => {
    console.log('Running application back-end.');
});