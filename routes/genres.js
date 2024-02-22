const express = require('express');
const router = express.Router();
const Genre = require('../models/Genre');

router.get('/', function(req, res, next) {
    const genres = Genre.all;
    res.render('genres/index', { title: 'BookedIn || Genres', genres: genres });
});

router.get('/form', async (req, res, next) => {
    res.render('genres/form', { title: 'BookedIn || Genres'});
});

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body)) //debug
    Genre.upsert(req.body);
    let createdOrupdated = req.body.id ? 'updated' : 'created';
    req.session.flash = {
      type: 'info',
      intro: 'Success!',
      message: `the book has been ${createdOrupdated}!`,
    };
    res.redirect(303, '/genres')
});

router.get('/edit', async (req, res, next) => {
    let genreIndex = req.query.id; 
    let genre = Genre.get(genreIndex);
    res.render('genres/form', { title: 'BookedIn || Genres', genre: genre, genreIndex: genreIndex });
  });

module.exports = router;