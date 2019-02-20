// this is the enterance to the website
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const parser = require('body-parser');
const path = require('path');

// setting middleware for application
// this is telling the server to use the body-parser module
// to parse any json data sent to the server
app.use(parser.json());

// this is telling the server to use body-parser to decode
// any url encoded data sent to it
app.use(parser.urlencoded({extended: true}));

// this is telling the server to look in a public directory
// when static content (css and html files) are requested
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost')

// this is telling the server that any requests to the root (/)
// are to be handled by the router included below
const homeRouter = require('./routes/home/index.js');
app.use('/', homeRouter);

app.listen(port, ()=>
{
    console.log(`Listening on port ${port}`);
});