const express = require('express');
const router = express.Router();
const Genre = require('../models/genre');

router.get('/', function(req, res, next) {
    const genres = Genre.all;
    res.render('genres/index', { title: 'BookedIn || Genres', genres: genres });
});

router.get('/form', async (req, res, next) => {
    res.render('genres/form', { title: 'BookedIn || Genres'});
});

router.post('/create', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body)) //debug
    Genre.add(req.body);
    res.redirect(303, '/genres')
});

module.exports = router;