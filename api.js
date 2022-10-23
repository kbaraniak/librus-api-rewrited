const LibrusCore = require("./core");
const LibrusGrades = require("./modules/grades");
const LibrusTimetable = require("./modules/timetable");
const var_dump = require('var_dump')

const { login, pass } = require("./config");

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

  async getTimetable(token){
    return timetables.getTimetable(token);
  }

  dumpTimetable(token){
    return timetables.dumpTimetable(token);
  }
}

const api = new Librus();

/* Authentication User */

api.authUsername(login, pass).then(async function (token) {
  /* Print Grades on Dictionary List */
  const usrGrades = await api.getGrades(token).then(data => { return data });
  console.info(usrGrades)

  /* Display First Timetable Position */
  const Timetable = await api.getTimetable(token).then(data => { return data });
  const TimetableDay = Timetable[0]['1'] // 0 - Array List, 1 - Timetable School Day
  const TimetableLesson = TimetableDay[0] // 0 - Get first lesson of Day
  console.log(TimetableLesson["Day"], TimetableLesson["Name"])
});

