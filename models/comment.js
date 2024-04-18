const db = require('../database')
// const comments = [
//     {id: "0", bookId: "0", userEmail: "rvanmech@pratt.edu", text: "I would love to read this!!"},
//     {id: "1", bookId: "0", userEmail: "fhatzidi@pratt.edu", text: "OMG is just so good, i hope it stays this way"},
//     {id: "2", bookId: "0", userEmail: "rvanmech@pratt.edu", text: "It's so sad that i finished it, what do you think?"},
//     ];
    function getNextId() {
    return Math.max(...comments.map(c => c.id))+1;
    }
    // exports.add = (comment) => {
    // comment.id = getNextId().toString();
    // comments.push(comment);
    // }
    exports.add = async (comment) => {
        return await db.getPool()
          .query(`INSERT INTO comments(comment, user_id, book_id, created_at)
                  VALUES($1, $2, $3,CURRENT_TIMESTAMP) RETURNING *`,
            [comment.comment, comment.userId, comment.bookId]);
      }
      
    // exports.update = (comment) => {
    // comments[comment.id] = comment;
    // }
    // exports.upsert = (comment) => {
    // if(comment.id) {
    // exports.update(comment);
    // } else {
    // exports.add(comment);
    // }
    // }

    exports.update = async (comment) => {
        return await db.getPool()
          .query("update comments set comment = $1 where id = $2 RETURNING *",
            [comment.comment, comment.id]);
      }
      
      exports.upsert = (comment) => {
        if (comment.id) {
          exports.update(comment);
        } else {
          exports.add(comment);
        }
      }
      
      
exports.get = async (id) => {
    const { rows } = await db.getPool().query("select * from comments where id = $1", [id]);
    return db.camelize(rows)[0];
  }
  
  exports.allForBook = async (book) => {
    const { rows } = await db.getPool().query(`
    select comments.*, users.email as user_email, users.id as user_id
    from comments
    left join users on users.id = comments.user_id
    where book_id = $1;
    `,[book.id]);
    return db.camelize(rows);
  }
  
    // exports.get = (id) => {
    // return comments.find((comment) => {
    // return comment.id == id;
    // });
    // }
    // exports.AllForBook = (bookId) => {
    //     return comments.filter((comment) => {
    //     return comment.bookId == bookId;
    //     });
    // }