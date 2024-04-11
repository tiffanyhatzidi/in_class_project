const express = require('express');
const router = express.Router();
const User = require('../models/User');
const helpers = require('./helpers')
const Book = require('../models/Book');
const BookUser = require('../models/book_user');


router.get('/register', async (req, res, next) => {
  if (helpers.isLoggedIn(req, res)) {return}
  res.render('users/register', { title: 'BookedIn || Registration' });
});

router.post('/register', async (req, res, next) => {
    console.log('body: ' + JSON.stringify(req.body));
    if (helpers.isLoggedIn(req, res)) {return}
    const user = await User.getByEmail(req.body.email)
    if (user) {
      res.render('users/register', {
        title: 'BookedIn || Login',
        flash: {
          type: 'danger',
          intro: 'Error!',
          message: `A user with this email already exists`}
      });
    } else {
      await User.add(req.body);
      req.session.currentUser = await User.login(req.body); //should there be an await here?
      req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: `the user has been created!`,
      };
      res.redirect(303, '/');
    }
  });
  

router.get('/login', async (req, res, next) => {
    res.render('users/login', { title: 'BookedIn || Login' });
  });
  router.post('/login', async (req, res, next) => {
    if (helpers.isLoggedIn(req, res)) {return}
    console.log('body: ' + JSON.stringify(req.body));
    const user = await User.login(req.body)
    if (user) {
      req.session.currentUser = user
      req.session.flash = {
        type: 'info',
        intro: 'Success!',
        message: 'You are now logged in',
      };
      res.redirect(303, '/');
    } else {
      res.render('users/login', {
        title: 'BookedIn || Login',
        flash: {
          type: 'danger',
          intro: 'Error!',
          message: `Wrong email and password combination or the user could not be found`}
      });
    }
  });

  router.post('/logout', async (req, res, next) => {
    delete req.session.currentUser
    req.session.flash = {
      type: 'info',
      intro: 'Success!',
      message: 'You are now logged out',
    };
    res.redirect(303, '/');
  });

  router.get('/profile', async (req, res, next) => {
    if (helpers.isNotLoggedIn(req, res)) {
      return
    }
    const booksUser = await BookUser.AllForUser(req.session.currentUser);
    booksUser.forEach((bookUser) => {
      bookUser.book = Book.get(bookUser.bookId)
    })
    res.render('users/profile',
      { title: 'BookedIn || Profile',
        user: req.session.currentUser,
        booksUser: booksUser });
  });
  
    

module.exports = router;
