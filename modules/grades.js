const LibrusCore = require("../core");

let core = new LibrusCore();

class LibrusGrades {

  async getGrades(token) {
    let gradesApi = await core.parseApi("Grades", token);
    var grades = gradesApi["Grades"];

    var gradesTable = [];
    var allgradesTable = [];

    for (const grade1 in grades) {
      const g = grades[grade1];
      let grade = g["Grade"];
      let gradeId = g["Lesson"]["Id"];
      await this.gradesDetails(gradeId, grade, token);
    }
  }

  async gradesDetails(gradeid, grade, token){
    let lessonGrade = await core.parseApi("Lessons/" + gradeid, token)

    var idTeacher = lessonGrade["Lesson"]["Teacher"]["Id"]
    var idSubject = lessonGrade["Lesson"]["Subject"]["Id"]
    var idClass = lessonGrade["Lesson"]["Class"]["Id"]

    let gradeTeacher = await core.parseApi("Users/" + idTeacher, token)
    let gradeTeacherName = gradeTeacher["User"]["FirstName"] + " " + gradeTeacher["User"]["LastName"]

    let gradeSubject = await core.parseApi("Subjects/" + idSubject, token)
    let gradeSubjectName = gradeSubject["Subject"]["Name"]

    let gradeClass = await core.parseApi("Classes/" + idClass, token)
    let gradeClassName = gradeClass["Class"]["Number"] + " " + gradeClass["Class"]["Symbol"]

    console.log("Grade:" + grade)
    console.log(gradeTeacherName)
    console.log(gradeSubjectName)
    console.log(gradeClassName)
  }

}


module.exports = LibrusGrades