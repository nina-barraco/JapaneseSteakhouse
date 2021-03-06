const express = require('express');
const router = express.Router();

router.all('/', (req, res, next)=>
{
    next();
});

router.get('/', (req, res)=>
{
    res.render('index');
});

router.get('/menu', (req, res)=>
{
    res.render('menu');
});

router.get('/about', (req, res)=>
{
    res.render('about');
});

module.exports = router;