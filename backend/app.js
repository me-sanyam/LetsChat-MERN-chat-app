const express = require('express');
const ConnectDatabase = require('./database.js');

const app = express();

app.get('/', (req, res) => {
    res.send('Server Running....');
});

ConnectDatabase();

app.listen(process.env.PORT, () => {
    console.log('Server Running on port:',process.env.PORT);
})

