const LibrusCore = require("./core");
const LibrusGrades = require("./modules/grades");
const LibrusTimetable = require("./modules/timetable");
const var_dump = require('var_dump')

let core = new LibrusCore();
let grades = new LibrusGrades();
let timetables = new LibrusTimetable();

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

  async getTimetable(token, nextWeek){
    return timetables.getTimetable(token, nextWeek);
  }

  dumpTimetable(token){
    return timetables.dumpTimetable(token);
  }
}

module.exports = Librus;
