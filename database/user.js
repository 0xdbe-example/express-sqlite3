var sqlite3 = require('sqlite3').verbose();

let db;

createTable = () => {
  db = new sqlite3.Database(':memory:');
  db.run("CREATE TABLE IF NOT EXISTS user(name TEXT PRIMARY KEY, password TEXT)");
}

createUser = (name, password) => {
  db.run("INSERT INTO user(name, password) VALUES(?, ?)", name, password);
}

userExist = (name, callback) => {
  let query = "SELECT name FROM user WHERE name = ?"
  db.get(query, name, (err, rows) => {
    if (err || rows == undefined ){
      callback(false);
    } else {
      callback(true);
    } 
  })
}

userAuth = (name, password, callback) => {
  let query = "SELECT name FROM user WHERE name = ? AND password = ?"
  db.get(query, name, password, (err, rows) => {
    if (err || rows == undefined ){
      callback(false);
    } else {
      callback(true);
    } 
  })
}

module.exports = {
    createTable,
    createUser,
    userExist,
    userAuth
}