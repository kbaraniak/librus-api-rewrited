const LibrusCore = require("./core");
const LibrusGrades = require("./modules/grades");

let core = new LibrusCore();
let grades = new LibrusGrades();


class Librus {

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
