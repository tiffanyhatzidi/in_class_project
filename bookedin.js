const express = require('express')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');
const genresRouter = require('./routes/genres');

const app = express()
const port = 3000

var handlebars = require('express-handlebars').create();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//user body parser
app.use(bodyParser.urlencoded({ extended: true }))

/* GET home page. */
app.use('/', indexRouter);
/* GET authors page */
app.use('/authors', authorsRouter);
/* GET books page */
app.use('/books', booksRouter); 
/* GET books page */
app.use('/genres', genresRouter); 

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
