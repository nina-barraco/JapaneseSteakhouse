const express = require('express');
const router = express.Router();
const path = require('path');
const root = path.dirname(require.main.filename);

router.get('/', (req, res)=>
{
    res.sendFile(path.join(root + '/index.html'));
});

router.get('/menu', (req, res)=>
{
    res.sendFile(path.join(root + '/menu.html'));
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(root + '/contact.html'));
})

router.get('/reservation', (req, res)=>
{
    res.sendFile(path.join(root + '/reservation.html'));
});

router.get('/about', (req, res)=>
{
    res.sendFile(path.join(root + '/about.html'));
});

router.post('/reservation', (req, res)=>
{
    // write data to db here
    res.send('<h1>This form has not been set up yet.</h1>');
});

// router.get('/contact', (req, res)=>
// {
//     res.send('<h1>This page has not been implemented yet.</h1>');
// })

module.exports = router;