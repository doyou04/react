const express = require('express');
const path = require('path');
const router = express.Router();
const User = require('./user.js');
router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, 'html', 'main.html'));
    res.render('main');
});
router.get('/about',(req, res) => {
    // res.sendFile(path.join(__dirname, 'html', 'about.html'));
    res.render('about');
});

router.get('/:name',(req, res) => {
    User.find({name: req.params.name}, (err, user) => {
        res.render('main', {user:user});
    });
});
module.export = router;