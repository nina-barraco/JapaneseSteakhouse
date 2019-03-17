const express = require('express');
const router = express.Router();
const path = require('path');
const root = path.dirname(require.main.filename);
const moment = require('moment');
const Contact = require('../../Model/Contact');
const Reservation = require('../../Model/Reservtion');

router.get('/', (req, res)=>
{
    res.sendFile(path.join(root + '/index.html'));
});

router.get('/menu', (req, res)=>
{
    res.sendFile(path.join(root + '/menu.html'));
});

router.get('/contact', (req, res) => 
{
    res.sendFile(path.join(root + '/contact.html'));
});

router.post('/contact', (req, res)=>
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

router.get('/reservation', (req, res)=>
{
    res.sendFile(path.join(root + '/reservation.html'));
});

function parseDate(date, time)
{
    if (date == null || time == null)
    {
        return null;
    }

    let formatDate = date.replace(/-/g, ':');
    let newTime = formatDate + ':' + time;
    let reservationDate = moment(newTime, 'YYYY:MM:DD:kk:mm');
    let dateObject = new Date(reservationDate);
    return dateObject;
}

router.post('/reservation', (req, res)=>
{
    let date = parseDate(req.body.date, req.body.time);
    
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
        res.send('<h1>Not Implemented Yet.</h1>');
    });
});

router.get('/about', (req, res)=>
{
    res.sendFile(path.join(root + '/about.html'));
});

module.exports = router;