"use strict";
const express = require('express');
require('dotenv').config();
const connection = require('./config/db.Connect');
const expresserrorHandler = require('express-error-handler');
const port = process.env.PORT;
const app = express();
app.get('/', (req, res) => {
    res.json({ message: "Hello, world!" });
});
connection().then(() => {
    app.listen(port, () => { console.log(`app is running on ${port}`); });
}).catch((err) => {
    console.error(`error occured in connecting to server: ${err}`);
    process.exit(1);
});
