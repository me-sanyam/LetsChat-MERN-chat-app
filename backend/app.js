const express = require('express');
const cors = require('cors');
const ConnectDatabase = require('./database.js');
const auth = require('./routes/auth.js');
ConnectDatabase();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', auth);

app.listen(process.env.PORT, () => {
    console.log('Server Running on port:', process.env.PORT);
})



