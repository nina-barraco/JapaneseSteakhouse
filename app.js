const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error)
{
    // this will only fire if there is a problem getting
    // an environment variable. in this case that will
    // mean no database so we should not continue starting
    // the application
    console.log(result.error);
    process.kill(process.pid);
}

// this is the enterance to the website
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const parser = require('body-parser');
const path = require('path');
const opn = require('opn');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());

app.set('view engine', 'handlebars');

// splitting off routers
// this is telling the server that any requests to the root (/)
// are to be handled by the router included below
const homeRouter = require('./routes/home/index.js');
const contactRouter = require('./routes/contact/contact.js');
const reservationRouter = require('./routes/reservation/reservation.js');

app.use('/', homeRouter);
app.use('/contact', contactRouter);
app.use('/reservation', reservationRouter);

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

mongoose.connect(process.env.DB_URL,
{
    useNewUrlParser: true,
    useFindAndModify: false
}).then(db=>
{
    app.emit('database', db);
}).catch(err=>
{
    console.log(`Error connecting to database.\nError: ${err}`);
    return;
});

app.on('database', db=>
{
    app.listen(port, ()=>
    {
        if (db.connections[0]._readyState == 1)
        {
            console.log(`Database is running.`);
            console.log(`Listening on port ${port}`);

            // this will open the application in the browser on start
            // if you are using nodemon you will want to comment this
            // line of code out, otherwise it will open a new browser tab
            // each time the server restarts.
            opn(`http://localhost:${port}`);
        }
        else
        {
            console.log('Error connecting to database. Stopping application.');
        }
        
    });
});
