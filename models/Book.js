const db = require('../database');
// const books = [
//     {bookName: "Leviathan Wakes", publishYear: 2011, authorIds: ['0','1'], genreIds: ['1'], commentIds: ['0', '1', '2']},
//     {bookName:"Columbus Day", publishYear: 2017, authorIds: ['1'], genreIds: ['0', '1']}, 
//     {bookName:"Death's End" , publishYear: 2010, authorIds: ['2'], genreIds: ['3']},
//     {bookName:"Ready Player One", publishYear: 2011, authorIds: ['3'], genreIds: ['1', '3']}
//   ]

//TODO: change bookName to title, dumbass
exports.all = async () => {
  const { rows } = await db.getPool().query("select * from books order by id");
  return db.camelize(rows);
}

exports.add = async (book) => {
  const {rows} = await db.getPool()
    .query("INSERT INTO books(title, publishing_year, genre_id) VALUES($1, $2, $3) RETURNING *",
      [book.title, book.publishingYear, book.genreId]);
  let newBook = db.camelize(rows)[0]
  await addAuthorsToBook(newBook, book.authorIds)
  return newBook;
}


exports.get = async (id) => {
  const { rows } = await db.getPool().query("select * from books where id = $1", [id])
  return db.camelize(rows)[0]
}

exports.update = async (book) => {
  const {rows} =  await db.getPool()
    .query("UPDATE books SET title = $1, publishing_year = $2, genre_id = $3 where id = $4 RETURNING *",
      [book.title, book.publishingYear, book.genreId, book.id]);
  let newBook = db.camelize(rows)[0]
  await DeleteAuthorsForBook(newBook)
  await addAuthorsToBook(newBook, book.authorIds)
  return newBook
}

const addAuthorsToBook = async (book, authorIds) => {
  authorIds.forEach(async (authorId) => {
    await db.getPool().query(`
      INSERT INTO authors_books(author_id, book_id) values($1,$2)
      `,[authorId,book.id])
  })
}
const DeleteAuthorsForBook = async (book) => {
  db.getPool().query(`DELETE from authors_books where book_id = $1`, [book.id]);
}


exports.upsert = async (book) => {
  if (book.authorIds && ! Array.isArray(book.authorIds)) {
    book.authorIds = [book.authorIds];
  }
  if (book.id) {
    return exports.update(book);
  } else {
    return exports.add(book);
  }
}

