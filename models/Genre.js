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