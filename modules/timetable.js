const var_dump = require("var_dump");
const LibrusCore = require("../core");

let core = new LibrusCore();

class LibrusTimetable {
  async dumpTimetable(token) {
    let timetablesApi = await core.parseApi("Timetables", token);
    var timetables = timetablesApi["Timetable"];
    return timetables
  }

  async getTimetable(token) {
    let timetablesApi = await core.parseApi("Timetables", token);
    var timetables = timetablesApi["Timetable"];
    let lessonItem, schoolDay, schoolWeek = [];
    let iDay = 1;
    for (const day in timetables) {
      let lessonNumber = 0;
      var lessonDay = [];
      let lessonsSubjects = [];
      const lessons = timetables[day];
      for (const lesson in lessons) {
        let lessonName, lessonTime, lessonTeacher;
        var lessonSubject;
        try {
          lessonName = lessons[lesson][0]["Subject"]["Name"];
          lessonTime = lessons[lesson][0]["HourFrom"] + " - " + lessons[lesson][0]["HourTo"];
          lessonTeacher = lessons[lesson][0]["Teacher"]["FirstName"] + " " + lessons[lesson][0]["Teacher"]["LastName"];
          lessonSubject = {
            Number: lessonNumber,
            Time: lessonTime,
            Name: lessonName,
            Teacher: lessonTeacher,
          };
          lessonsSubjects.push(lessonSubject);
        } catch (e) {}
        lessonNumber++;
      }
      for (const lessonSubject of lessonsSubjects) {
        var lsn = lessonSubject["Number"];
        var lst = lessonSubject["Time"];
        var lsnn = lessonSubject["Name"];
        var lsnt = lessonSubject["Teacher"];
        lessonItem = {
          Day: day,
          Number: lsn,
          Time: lst,
          Name: lsnn,
          Teacher: lsnt,
        };
        lessonDay.push(lessonItem);
      }

      schoolDay = {
        [iDay]: lessonDay
      }
      schoolWeek.push(schoolDay);
      lessonDay = [];
      iDay++;
    }
    return schoolWeek
  }
}

module.exports = LibrusTimetable;
