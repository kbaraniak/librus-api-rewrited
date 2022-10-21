const LibrusCore = require("./core");
const LibrusGrades = require("./modules/grades");
const var_dump = require('var_dump')

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

module.exports = Librus;
