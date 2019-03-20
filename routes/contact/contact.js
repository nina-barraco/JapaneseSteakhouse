const express = require('express');
const router = express.Router();
const Contact = require('../../Model/Contact');

router.all('/*', (req, res, next)=>
{
    // using this method we can modify any requests that
    // go through this router here.
    next();
});

router.get('/', (req, res) => 
{
    res.render('contact');
});

router.post('/', (req, res)=>
{
    let contact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        body: req.body.body
    });

    contact.save().then(newContact=>
    {
        res.send('<h1>Not Implemented Yet.</h1>');
    })
});

module.exports = router;