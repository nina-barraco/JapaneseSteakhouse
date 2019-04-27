const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error)
{
    console.log(result.error);
    process.kill(process.pid);
}

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const parser = require('body-parser');
const path = require('path');
const opn = require('opn');
const session = require('express-session');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');
const {sanitizeInput} = require('./Helper/Functions.js');

app.engine('handlebars', exphbs());

app.set('view engine', 'handlebars');

// this needs to be before the routers, otherwise the routers will not
// see post data because they don't see body-parser module (i think)
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.use(session({
    secret: 'Ionlyhaveavagueideaofwhatthisdoes',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

app.use((req, res, next)=>
{
    res.locals.successMessage = req.flash('successMessage');
    res.locals.errorMessage = req.flash('errorMessage');
    if (req.hasOwnProperty('body'))
    {
        sanitizeInput(req.body);
    }
    
    next();
});

const homeRouter = require('./routes/home/index.js');
const contactRouter = require('./routes/contact/contact.js');
const reservationRouter = require('./routes/reservation/reservation.js');

app.use('/', homeRouter);
app.use('/contact', contactRouter);
app.use('/reservation', reservationRouter);
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

            opn(`http://localhost:${port}`);
        }
        else
        {
            console.log('Error connecting to database. Stopping application.');
        }
    });
});
