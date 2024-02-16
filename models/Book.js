const books = [
    {bookName: "Leviathan Wakes", publishYear: 2011, authorIds: ['0','1']},
    {bookName:"Columbus Day", publishYear: 2017, authorIds: ['1']}, 
    {bookName:"Death's End" , publishYear: 2010, authorIds: ['2']},
    {bookName:"Ready Player One", publishYear: 2011, authorIds: ['3']}
  ]

  exports.all = books

  exports.add = (book) => {
    books.push(book);
  }

 exports.get = (idx) => {
  return books[idx];
 } 

 exports.upsert = (book) => {
  if (book.authorIds && ! Array.isArray(book.authorIds)) {
    book.authorIds = [book.authorIds];
  }
  if (book.id) {
    exports.update(book);
  } else {
    exports.add(book);
  }
}


 exports.update = (book) => {
  books[book.id] = book;
 }