const genres = [
    {bookGenre: "Fiction"},
    {bookGenre: "Science Fiction"},
    {bookGenre: "Speculative Fiction"},
    {bookGenre: "Fantasy"},
]

exports.all = genres

exports.add = (genre) => {
    genres.push(genre)
}

exports.get = (idx) => {
    return genres[idx];
  }

  exports.upsert = (genre) => {
    if (genre.id) {
      exports.update(genre);
    } else {
      exports.add(genre);
    }
  }
  
  exports.update = (genre) => {
    genres[genre.id] = genre;
  }