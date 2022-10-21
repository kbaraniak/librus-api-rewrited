const var_dump = require("var_dump");
const LibrusCore = require("../core");

let core = new LibrusCore();

class LibrusGrades {
  async dumpGrades(token) {
    let gradesApi = await core.parseApi("Grades", token);
    var grades = gradesApi["Grades"];
    return grades;
  }

  async getGrades(token) {
    var allGrades = [];
    let stepAddAllGrade = 0;
    let gradesApi = await core.parseApi("Grades", token);
    var grades = gradesApi["Grades"];
    var glength = parseInt(grades.length);
    console.log("Please wait, getting grades")
    for (const grade1 in grades) {
      const g = grades[grade1];
      let grade = g["Grade"];
      let gradeId = g["Lesson"]["Id"];
      let gradeAddDate = g["AddDate"];

      var result1 = await this.gradesRun(gradeId, grade, gradeAddDate, token)
      .then(function (categoriesArray) {
        stepAddAllGrade++;
        allGrades.push(categoriesArray);
        if (stepAddAllGrade >= glength) {
          return allGrades;
        }
      });
      if (stepAddAllGrade >= glength) {
        return allGrades;
      }
    }
  }

  async gradesDetails(gradeid, grade, gradeAddDate, token) {
    let lessonGrade;
    try {
      lessonGrade = await core.parseApi("Lessons/" + gradeid, token);
    } catch (err) {
      console.log(err);
    }
    var idTeacher = lessonGrade["Lesson"]["Teacher"]["Id"];
    var idSubject = lessonGrade["Lesson"]["Subject"]["Id"];
    var idClass = lessonGrade["Lesson"]["Class"]["Id"];

    let gradeTeacher = await core.parseApi("Users/" + idTeacher, token);
    let gradeTeacherName =
      gradeTeacher["User"]["FirstName"] +
      " " +
      gradeTeacher["User"]["LastName"];

    let gradeSubject = await core.parseApi("Subjects/" + idSubject, token);
    let gradeSubjectName = gradeSubject["Subject"]["Name"];

    let gradeClass = await core.parseApi("Classes/" + idClass, token);
    let gradeClassName =
      gradeClass["Class"]["Number"] + " " + gradeClass["Class"]["Symbol"];

    var x = {
      Grade: grade,
      Teacher: gradeTeacherName,
      Subject: gradeSubjectName,
      Class: gradeClassName,
      Date: gradeAddDate,
    };

    return x;
  }

  async gradesRun(gradeid, grade, gradeAddDate, token) {
    const gradesData = await this.gradesDetails(
      gradeid,
      grade,
      gradeAddDate,
      token
    );
    return gradesData;
  }

}



module.exports = LibrusGrades;
