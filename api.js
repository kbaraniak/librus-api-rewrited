const LibrusCore = require("./core");
const LibrusGrades = require("./modules/grades");

let core = new LibrusCore();
let grades = new LibrusGrades();


class Librus {
<<<<<<< HEAD
=======
  login = login;
  password = pass;
  logged_in = false;
  Token = null;
  host = "https://api.librus.pl/";
>>>>>>> 56ecfe33800a1af5869dc5edeced2eff3e779d9b

  authUsername(login, pass){
    return core.authUsername(login, pass);
  }

  getGrades(token){
    return grades.getGrades(token);
  }
}

const api = new Librus();

api.authUsername("", "").then(function (token) {
  console.log("======================");
  api.getGrades(token);
});
