// this is the enterance to the website
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const parser = require('body-parser');
const path = require('path');

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

const homeRouter = require('./routes/home/index.js');
app.use('/', homeRouter);

app.listen(port, ()=>
{
    console.log(`Listening on port ${port}`);
});