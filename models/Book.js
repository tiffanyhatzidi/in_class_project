const books = [
    {bookName: "Leviathan Wakes", publishYear: 2011, authorIds: ['0','1'], genreIds: ['1'], commentIds: ['0', '1', '2']},
    {bookName:"Columbus Day", publishYear: 2017, authorIds: ['1'], genreIds: ['0', '1']}, 
    {bookName:"Death's End" , publishYear: 2010, authorIds: ['2'], genreIds: ['3']},
    {bookName:"Ready Player One", publishYear: 2011, authorIds: ['3'], genreIds: ['1', '3']}
  ]
//TODO: change bookName to title, dumbass
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
  if(book.genreIds && ! Array.isArray(book.genreIds)) {
    book.genreIds = [book.genreIds];
  }
  if(book.commentIds && ! Array.isArray(book.commentIds)) {
    book.commentIds = [book.commentIds];
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