const LibrusCore = require("./core");
const LibrusGrades = require("./modules/grades");
const var_dump = require('var_dump')

const { login, pass } = require("./secret");

let core = new LibrusCore();
let grades = new LibrusGrades();


class Librus {

  authUsername(login, pass){
    return core.authUsername(login, pass);
  }

  async getGrades(token){
    return await grades.getGrades(token);
  }

  dumpGrades(token){
    return grades.dumpGrades(token);
  }
}

const api = new Librus();

/* Print Grades on Dictionary List */

api.authUsername(login, pass).then(async function (token) {
  const usrGrades = await api.getGrades(token).then(data => { return data });
  console.info(usrGrades)
});

