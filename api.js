const axios = require('axios');
const cookieSupport = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');
const jar = new CookieJar();
const client = cookieSupport.wrapper(axios.create({ jar }));

const AuthAPI = require("./API/Auth/Auth");
// Grades
const GradesAPI = require("./API/Grades/Grades");
const PointGradesAPI = require("./API/Grades/PointGrades");
const BehaviourGradesAPI = require("./API/Grades/BehaviourGrades");
// Lesson
const LessonAPI = require("./API/Lesson/Lesson");
const CalendarAPI = require("./API/Lesson/Calendar");
// School
const SchoolAPI = require("./API/School/School");
const ClassAPI = require("./API/School/Class");
// Other
const EndpointsAPI = require("./API/Other/Endpoints");
const OtherEndpointsAPI = require("./API/Other/OtherEndpoints");

class LibrusAPI {
  constructor() {
    this.session = {
      headers: {},
      client: client,
      api: {
        url: 'https://synergia.librus.pl/gateway/api/2.0',
        message_url: 'https://synergia.librus.pl',
      },
    }
    this.api = {
      authAPI: new AuthAPI(this.session),
      gradesAPI: new GradesAPI(this.session),
      pointGradesAPI: new PointGradesAPI(this.session),
      behaviourGradesAPI: new BehaviourGradesAPI(this.session),
      lessonAPI: new LessonAPI(this.session),
      calendarAPI: new CalendarAPI(this.session),
      schoolAPI: new SchoolAPI(this.session),
      classAPI: new ClassAPI(this.session),
      endpointsAPI: new EndpointsAPI(this.session),
      otherEndpointsAPI: new OtherEndpointsAPI(this.session)
    };
  }

  async activateApiAccess() {
    return this.api.authAPI.activateApiAccess();
  }

  async mkToken(login, pass) {
    return this.api.authAPI.mkToken(login, pass);
  }

  /* Grades API */
  async getGrades() {
    return this.api.gradesAPI.getGrades();
  }

  async getGradesAverages() {
    return this.api.gradesAPI.getGradesAverages();
  }

  async getGradesCategoriesAverages() {
    return this.api.gradesAPI.getGradesCategoriesAverages();
  }

  async getGradesCategories(id) {
    return this.api.gradesAPI.getGradesCategories(id, );
  }
  async getGradesComments(id) {
    return this.api.gradesAPI.getGradesComments(id, );
  }

  async getGradesScales() {
    return this.api.gradesAPI.getGradesScales();
  }

  async getGradesTypes() {
    return this.api.gradesAPI.getGradesTypes();
  }

  async getGradesUnpreparednessPerSemesterAndSubject() {
    return this.api.gradesAPI.getGradesUnpreparednessPerSemesterAndSubject();
  }
  /* To-Do TextGrades */

  /* Point Grades API */
  async getPointGrades() {
    return Pointthis.api.gradesAPI.getPointGrades();
  }

  async getPointGradesCategories() {
    return this.api.pointGradesAPI.getPointGradesCategories();
  }

  async getPointGradesDictionaries() {
    return this.api.pointGradesAPI.getPointGradesDictionaries();
  }

  async getPointGradesAverages() {
    return this.api.pointGradesAPI.getPointGradesAverages();
  }

  async getPointGradesStudentsAverages() {
    return this.api.pointGradesAPI.getPointGradesStudentsAverages();
  }

  async getPointGradesCategoriesAverages() {
    return this.api.pointGradesAPI.getPointGradesCategoriesAverages();
  }

  /* Behaviour Grades API */
  async getBehaviourGrades() {
    return this.api.behaviourGradesAPI.getBehaviourGrades();
  }
  async getBehaviourGradesTypes() {
    return this.api.behaviourGradesAPI.getBehaviourGradesTypes();
  }
  async getBehaviourGradesPoints() {
    return this.api.behaviourGradesAPI.getBehaviourGradesPoints();
  }
  async getBehaviourGradesPointsCategories() {
    return this.api.behaviourGradesAPI.getBehaviourGradesPointsCategories();
  }
  async getBehaviourGradesPointsComments() {
    return this.api.behaviourGradesAPI.getBehaviourGradesPointsComments();
  }
  async getBehaviourGradesSystemProposal() {
    return this.api.behaviourGradesAPI.getBehaviourGradesSystemProposal();
  }

  /* Lessons API */
  async getLessons(id = "") {
    return this.api.lessonAPI.getLessons(id);
  }
  async getAttendances() {
    return this.api.lessonAPI.getAttendances();
  }
  async getAttendancesTypes() {
    return this.api.lessonAPI.getAttendancesTypes();
  }
  async getAttendancesLessonsStatistics(id) {
    return this.api.lessonAPI.getAttendancesLessonsStatistics(id);
  }
  async getAttendancesFilledByTeacher(id = "") {
    return this.api.lessonAPI.getAttendancesFilledByTeacher(id);
  }
  async getSubjects(id = "") {
    return this.api.lessonAPI.getSubjects(id);
  }
  /* Calendar API */
  async getCalendar(id = "") {
    return this.api.calendarAPI.getCalendar(id);
  }
  async getCalendarSubstitutions(id = "") {
    return this.api.calendarAPI.getCalendarSubstitutions(id);
  }
  async getHomeWorks() {
    return this.api.calendarAPI.getHomeWorks();
  }
  async getHomeWorksCategories(id = "") {
    return this.api.calendarAPI.getHomeWorksCategories(id)
  }
  async getTimetables() {
    return this.api.calendarAPI.getTimetables();
  }
  async getTimetablesDate(arg) {
    return this.api.calendarAPI.getTimetablesDate(arg);
  }
  async getTimetablesNext() {
    return this.api.calendarAPI.getTimetablesNext();
  }
  async getTimetablesPrev() {
    return this.api.calendarAPI.getTimetablesPrev();
  }
  async getSubstitutions() {
    return this.api.calendarAPI.getSubstitutions();
  }
  async getTeacherFreeDays() {
    return this.api.calendarAPI.getTeacherFreeDays();
  }

  /* School API */
  async getSchool() {
    return this.api.schoolAPI.getSchool();
  }
  async getClassrooms() {
    return this.api.schoolAPI.getClassrooms();
  }
  async getSchoolNotices() {
    return this.api.schoolAPI.getSchoolNotices();
  }
  async getRealizationsTypesOfDays() {
    return this.api.schoolAPI.getRealizationsTypesOfDays();
  }
  async getRealizationsTypesOfClasses() {
    return this.api.schoolAPI.getRealizationsTypesOfClasses();
  }

  async getLuckyNumber() {
    return this.api.schoolAPI.getLuckyNumber();
  }

  /* Class API */
  async getClassesFreeDays() {
    return this.api.classAPI.getClassesFreeDays();
  }
  async getClasses() {
    return this.api.classAPI.getClasses();
  }
  async getClassesCrossedOutStudents() {
    return this.api.classAPI.getClassesCrossedOutStudents();
  }
  async getVirtualClasses() {
    return this.api.classAPI.getVirtualClasses();
  }

  /* Other */
  async getHelp() {
    return this.api.otherEndpointsAPI.getHelp();
  }
  async getWhatsNew() {
    return this.api.otherEndpointsAPI.getWhatsNew();
  }
  async getNotificationCenter() {
    return this.api.otherEndpointsAPI.getNotificationCenter();
  }
  async getColors() {
    return this.api.otherEndpointsAPI.getColors();
  }
  async getUsers(id = "") {
    return this.api.otherEndpointsAPI.getUsers(id);
  }
  async getEndpoints() {
    return this.api.endpointsAPI.getEndpoints();
  }
  async getMe() {
    return this.api.endpointsAPI.getMe();
  }
  async getAPI(endpoint) {
    return this.api.endpointsAPI.getEndpoints(endpoint);
  }
  returnApiURL() {
    return this.session.api.url;
  }
}

module.exports = { LibrusAPI };
