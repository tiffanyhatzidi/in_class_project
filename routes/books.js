const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');
const Genre = require('../models/Genre');
const BookUser = require ('../models/book_user');
const Comments = require('../models/comment');

router.get('/', function(req, res, next) {
  const books = Book.all;
  res.render('books/index', { title: 'BookedIn || Books', books: books });
});

router.get('/form', async (req, res, next) => {
  let bookIndex = req.query.id;
  let curCom = comments.filter(comment => {
    return comment.userEmail === currentUser.email && comment.bookId === bookIndex;
  });
  res.render('books/form', { title: 'BookedIn || Books', authors: Author.all, genres: Genre.all, comments: Comments.AllForBook(bookIndex)});
});


router.post('/upsert', async (req, res, next) => {
  console.log('body: ' + JSON.stringify(req.body)) //debug
  Book.upsert(req.body);
  let createdOrupdated = req.body.id ? 'updated' : 'created';
  req.session.flash = {
    type: 'info',
    intro: 'Success!',
    message: `the book has been ${createdOrupdated}!`,
  };
  res.redirect(303, '/books')
});

router.get('/edit', async (req, res, next) => {
  let bookIndex = req.query.id;
  let book = Book.get(bookIndex);
  console.log("comments: " + JSON.stringify(Comments.AllForBook(0)))
  console.log("BookIndex: " + bookIndex)
  res.render('books/form', { title: 'BookedIn || Books', book: book, bookIndex: bookIndex, authors: Author.all, genres: Genre.all, comments: Comments.AllForBook(bookIndex)});
});

router.get('/show/:id', async (req, res, next) => {
  let templateVars = {
    title: 'BookedIn || Books',
    book: Book.get(req.params.id),
    bookId: req.params.id,
    statuses: BookUser.statuses
  }
  if(templateVars.book) {
    templateVars['comments'] = Comments.AllForBook(templateVars.bookId);
  }
  if (templateVars.book.authorIds) {
    templateVars['authors'] = templateVars.book.authorIds.map((authorId) => Author.get(authorId))
    console.log(templateVars);
  }
  if(templateVars.book.genreIds) {
    templateVars['genres'] = templateVars.book.genreIds.map((genreId) => Genre.get(genreId))
  }
  if(templateVars.book.commentIds) {
    templateVars['comments'] = templateVars.book.commentIds.map((commentIds) => Comments.get(commentIds))
  }
  if (req.session.currentUser) {
    templateVars['bookUser'] = BookUser.get(req.params.id, req.session.currentUser.email);
  }
  res.render('books/show', templateVars);
});


module.exports = router;
