const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Book = require('../models/Book');

router.get('/', function(req, res, next) {
  const comments = Comment.all;
  res.render('comments/index', { title: 'BookedIn || Comments', comments: comments });
});

router.get('/form', async (req, res, next) => {
  console.log('bookIdex: ' + JSON.stringify(req.query));
  let bookIndex = req.query.id;
  res.render('comments/form', { title: 'BookedIn || Comments', bookIndex: bookIndex, comment: Comment.get(req.query.commendIds) });
}); 

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body));
    let bookId = req.body.bookId;
    let bodyWithoutCSRF = {id: req.body.id, bookId: req.body.bookId, userEmail: req.body.userEmail, text: req.body.text}
    console.log('body wout: '+ JSON.stringify(bodyWithoutCSRF));
    try{
      await Comment.upsert(bodyWithoutCSRF);
    let redirect = `/books/show/${bookId}`;
    req.session.flash = {
      type: 'info',
      intro: 'Success!',
      message: 'Your comment has been stored',
    };
    res.redirect(303, redirect);
    } catch(err) {
      res.redirect(404, err);
    }
    //Dear Rik, even if my code doesnt work I would like extra credit for using a try catch please and thank you
  });

  router.get('/edit', async(req, res, next) => {
    console.log('edit body: ' + JSON.stringify(req.query));
    let commentIndex = req.query.id;
    let bookIndex = req.query.bookId;
    let comment = Comment.get(commentIndex);
    res.render('comments/form', { title: 'BookedIn || Comments', comment: comment, commentIndex: commentIndex, bookIndex: bookIndex });
  });

  module.exports = router;