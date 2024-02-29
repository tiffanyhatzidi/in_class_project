var crypto = require('crypto');

const users = [
  {email:"fhatzidi@pratt.edu",name:"Tiffany",salt:"46ebd4fdde9319d3c966ce15010f425c", encryptedPassword:"98a45fea842143bd0255cd846fcbf4d492eb3cb793b0c8c78352f1c3e489ae37"}
];


const createSalt = () => {
  return crypto.randomBytes(16).toString('hex');
}

const encryptPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256').toString('hex')
}

exports.add = (user) => {
  let salt = createSalt();
  let new_user = {
    email: user.email,
    name: user.name,
    salt: salt,
    encryptedPassword: encryptPassword(user.password, salt)
  }
  //console.log('body: ' + JSON.stringify(new_user));
  users.push(new_user);
}

exports.getByEmail = (email) => {
  return users.find((user) => user.email === email);
}

exports.get = (idx) => {
  return users[idx];
}

exports.login = (login) => {
  let user = exports.getByEmail(login.email);
  if (!user) {
    return null;
  }
  let encryptedPassword = encryptPassword(login.password, user.salt);
  if (user.encryptedPassword === encryptedPassword) {
    return user;
  }
  return null;
}


exports.all = users
  
  
  