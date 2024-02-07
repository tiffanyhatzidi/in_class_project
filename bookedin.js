const express = require('express')

const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');

const app = express()
const port = 3000

var handlebars = require('express-handlebars').create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


/* GET home page. */
app.use('/', indexRouter);
/* GET authors page */
app.use('/authors', authorsRouter);
/* GET books page */
app.use('/books', booksRouter);  

// custom 404 page
app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404 - Not Found')
})

// custom 500 page
app.use((err, req, res, next) => {
  console.error(err.message)
  res.type('text/plain')
  res.status(500)
  res.send('500 - Server Error')
})

app.listen(port, () => console.log(
`Express started on http://localhost:${port}; ` +
`press Ctrl-C to terminate.`))
