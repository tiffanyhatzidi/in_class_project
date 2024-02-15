const books = [
    {bookName:"Leviathan Wakes", publishYear: 2011, authorId: "0"},
    {bookName:"Columbus Day", publishYear: 2017, authorId: "1"}, 
    {bookName:"Death's End" , publishYear: 2010, authorId: "2"},
    {bookName:"Ready Player One", publishYear: 2011, authorId: "3"},
  ]

  exports.all = books

  exports.add = (book) => {
    books.push(book);
  }

 exports.get = (idx) => {
  return books[idx];
 } 

 exports.upsert = (book) => {
  if(book.id) {
    exports.update(book);
  } else {
    exports.add(book);
  }
 }

 exports.update = (book) => {
  books[book.id] = book;
 }