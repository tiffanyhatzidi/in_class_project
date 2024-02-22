const users = [
  {email: "rvanmech@pratt.edu", name: "Rik", password: "password"},
  {email:"fhatzidi@pratt.edu", name:"Tiffany", password: "Password!"}
];


exports.add = (user) => {
  users.push(user);
}

exports.getByEmail = (email) => {
  return users.find((user) => user.email === email);
}

exports.get = (idx) => {
  return users[idx];
}

exports.login = (login) => {
  let user = exports.getByEmail(login.email);
  if (user && user.password === login.password) {
    return user;
  }
  return null;
}


exports.all = users
  
  
  