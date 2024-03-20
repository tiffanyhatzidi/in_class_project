const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// router.get('/', function(req, res, next) {
//   const comments = Comment.all;
//   res.render('comments/index', { title: 'BookedIn || Comments', comments: comments });
// });

// router.get('/form', async (req, res, next) => {
//   res.render('comments/form', { title: 'BookedIn || Comments' });
// }); 

router.post('/upsert', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body))
    let bookId = req.body.bookId;
    let redirect = `/books/show/${bookId}`;
    Comment.upsert(req.body);
    req.session.flash = {
      type: 'info',
      intro: 'Success!',
      message: 'Your comment has been stored',
    };
    res.redirect(303, redirect)
  });

  // router.get('/edit', async(req, res, next) => {
  //   let commentIndex = req.query.id;
  //   let comment = Comment.get(commentIndex);
  //   res.render('comments/form', { title: 'BookedIn || Comments', comment: comment, commentIndex: commentIndex });
  // });

  module.exports = router;