const express = require('express');
const router = express.Router();
const Contact = require('../../Model/Contact');
const {hasRequiredFields, createBadUser} = require('../../Helper/form-validation');

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
    let requiredFields = {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone Number',
        body: 'Comments or Suggestions'
    };

    let errors = hasRequiredFields(requiredFields, req.body);

    if (errors === null)
    {
        errors = [];
        console.log('Validation failed.');
    }

    if (req.body.hasOwnProperty('email'))
    {
        let pattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
        let tester = new RegExp(pattern);
        let pass = tester.test(req.body.email);

        if (pass === false)
        {
            errors.push({message: 'Email address failed verification.'});
        }
    }

    if (req.body.hasOwnProperty('phone'))
    {
        let phoneNumber = req.body.phone
        .replace(/\D+/g, '')
        .replace(/\s+/g, '');
        if (phoneNumber.length < 10)
        {
            // If we get here the phone number does not have
            // enough digits to be valid.
            errors.push({message: 'Telephone is not valid.'});
            req.body.phone = '';
        }
    }

    if (errors.length > 0)
    {
        for (let i = 0; i < errors.length; i++)
        {
            req.flash('errorMessage', errors[i].message);
        }

        let badUserArray = [
            'firstName',
            'lastName',
            'phone',
            'email',
            'body'
        ];

        let badUser = createBadUser(req.body, badUserArray);
        res.render('contact', {badUser: badUser, errorMessage: req.flash('errorMessage')});
    }
    else
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
            let msg = `Thank you for reaching out to us, ${newContact.firstName}. We will get back to you as soon as possible!`;
            req.flash('successMessage', msg);
            res.redirect('/');
        });
    }
});

module.exports = router;