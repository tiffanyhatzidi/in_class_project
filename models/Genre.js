const db = require('../database');

exports.all = async () => {
  const { rows } = await db.getPool().query("SELECT * FROM genres ORDER BY id");
  return db.camelize(rows);
}

exports.get = async (id) => {
  const { rows } = await db.getPool().query("SELECT * FROM genres WHERE id = $1", [id])
  console.log(rows)
  return db.camelize(rows)[0]
}

exports.create = async (name) => {
  return db.getPool().query("INSERT INTO genres(name) VALUES ($1) RETURNING *", [name]);
}

exports.update = async (name, id) => {
  return db.getPool().query("UPDATE genres SET name = $1 where id = $2 RETURNING *", [name, id]);
 }

exports.upsert= async (genre) => {
  if(genre.id) {
    return exports.update(genre.name, genre.id)
  }
  return exports.create(genre.name)
}

/*
const genres = [
    {bookGenre: "Fiction"},
    {bookGenre: "Science Fiction"},
    {bookGenre: "Speculative Fiction"},
    {bookGenre: "Fantasy"},
]

exports.all = genres
*/

/*
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
  */