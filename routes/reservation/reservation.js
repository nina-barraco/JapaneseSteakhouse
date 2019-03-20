const express = require('express');
const router = express.Router();
const Reservation = require('../../Model/Reservtion');
const moment = require('moment');

router.all('/*', (req, res, next)=>
{
    next();
});

router.get('/', (req, res)=>
{
    res.render('reservation');
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

router.post('/', (req, res)=>
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

module.exports = router;