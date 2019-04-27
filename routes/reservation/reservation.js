const express = require('express');
const router = express.Router();
const Reservation = require('../../Model/Reservtion');
const {hasRequiredFields, createBadUser} = require('../../Helper/form-validation');
const {parseDate} = require('../../Helper/Functions.js');

router.all('/*', (req, res, next)=>
{
    next();
});

router.get('/', (req, res)=>
{
    res.render('reservation');
});

router.post('/', (req, res)=>
{
    let requiredFields = {
        firstName: "First Name",
        lastName: "Last Name",
        phone: "Telephone",
        email: "Email Address",
        date: "Reservation Date",
        time: "Reservation Time",
        size: "Party Number"
    };

    // Will return an array or null
    let errors = hasRequiredFields(requiredFields, req.body);

    if (errors === null)
    {
        // TODO: create logging method, user does not need to know that our 
        // validation method sucks
        errors = [];
        console.log('Validation has failed. One of the arguments was unexpectedly undefined.');
    }

    if (req.body.hasOwnProperty('email'))
    {
        // TODO: extract to helper function
        // \b sets boundaries, [A-Z0-9] matches any of the characters in the range
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
        // Regex pattern that matches any non digits, or
        // whitespace characters (any number) globally
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

    if (req.body.size < 1)
    {
        errors.push({message: 'Invalid party size.'});
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
            'size'
        ];

        let badUser = createBadUser(req.body, badUserArray);

        res.render('reservation', {badUser: badUser, errorMessage: req.flash('errorMessage')});
    }
    else
    {
        var date;
        try
        {
            date = parseDate(req.body.date, req.body.time);
        }
        catch(err)
        {
            console.log(err.message);
            req.flash('errorMessage', 'Failed to create reservation.');
            res.redirect('/');
            return;
        }

        let currentDate = new Date();
        if (currentDate >= date || 
            currentDate.getFullYear() + 1 < date.getFullYear())
        {
            // If we get here the date is in the past
            let badUserArray = [
                'firstName',
                'lastName',
                'phone',
                'email',
                'size'
            ];
    
            let badUser = createBadUser(req.body, badUserArray);
            let errors = ['Invalid date.'];

            res.render('reservation', {badUser: badUser, errorMessage: errors});
            return;
        }

        let reservation = new Reservation({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            phone:req.body.phone,
            email:req.body.email,
            date:date,
            size:req.body.size
        });

        reservation.save().then(savedRes=>
        {
            req.flash('successMessage', 'Thank you for your reservation.');
            res.redirect('/');
        });
    }
});

module.exports = router;