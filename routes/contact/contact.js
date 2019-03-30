const express = require('express');
const router = express.Router();
const Contact = require('../../Model/Contact');

router.all('/*', (req, res, next)=>
{
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
        let msg = `Thank you for your message, we will get back to you as quickly 
        as we can!`;
        req.flash('successMessage', msg);
        res.redirect('/');
    });
});

module.exports = router;