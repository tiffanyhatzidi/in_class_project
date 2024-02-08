const books = [
    {bookName:"Leviathan Wakes", publishYear: 2011},
    {bookName:"Columbus Day", publishYear: 2017}, 
    {bookName:"Death's End" , publishYear: 2010},
    {bookName:"Ready Player One", publishYear: 2011},
  ]

  exports.all = books

  exports.add = (book) => {
    books.push(book);
  }