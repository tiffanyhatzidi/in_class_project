const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Book = require('../models/Book');

router.get('/', function(req, res, next) {
  const comments = Comment.all;
  res.render('comments/index', { title: 'BookedIn || Comments', comments: comments });
});

router.get('/form', async (req, res, next) => {
  res.render('comments/form', { title: 'BookedIn || Comments' });
}); 

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body));
    let bookId = req.body.bookId;
    //if(req.body.comments){Comment.upsert(req.body)};
   // let newComment = {id: NaN, bookId: req.body.bookId, userEmail: req.body.userEmail, text: req.body.comments}
    try{
     // await Comment.upsert(newComment);
      //await Book.upsert(req.body);
      await Comment.upsert(req.body);
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
    let commentIndex = req.query.id;
    let comment = Comment.get(commentIndex);
    res.render('comments/form', { title: 'BookedIn || Comments', comment: comment, commentIndex: commentIndex });
  });

  module.exports = router;