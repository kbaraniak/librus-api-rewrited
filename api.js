const axios = require('axios');
const cookieSupport = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');
const jar = new CookieJar();
const client = cookieSupport.wrapper(axios.create({ jar }));

const API_URL = 'https://synergia.librus.pl/gateway/api/2.0';
const MSG_URL = 'https://synergia.librus.pl';

const AuthAPI = require("./API/Auth/Auth");
// Grades
const GradesAPI = require("./API/Grades/Grades");
const PointGradesAPI = require("./API/Grades/PointGrades");
const BehaviourGrades = require("./API/Grades/BehaviourGrades")
// Lesson
const LessonAPI = require("./API/Lesson/Lesson")
const CalendarAPI = require("./API/Lesson/Calendar")

class LibrusAPI {
  constructor() {
    this.host = API_URL;
    this.msg_host = MSG_URL;
    this.session = {
      headers: {},
      client: client,
    }
    this.api = {
      authAPI: new AuthAPI(this.session),
      gradesAPI: new GradesAPI(this.session),
      pointGradesAPI: new PointGradesAPI(this.session),
      behaviourGradesAPI: new BehaviourGrades(this.session),
      lessonAPI: new LessonAPI(this.session),
      calendarAPI: new CalendarAPI(this.session),

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
    try {
      const response = await this.session.client.get(`${this.host}/Schools`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: School] School doesn't support this function", error);
      throw error;
    }
  }
  async getClassrooms() {
    try {
      const response = await this.session.client.get(`${this.host}/Classrooms`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: Classrooms] School doesn't support this function", error);
      throw error;
    }
  }
  async getVirtualClasses() {
    try {
      const response = await this.session.client.get(`${this.host}/VirtualClasses`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: VirtualClasses] School doesn't support this function", error);
      throw error;
    }
  }
  async getSchoolNotices() {
    try {
      const response = await this.session.client.get(`${this.host}/SchoolNotices`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: SchoolNotices] School doesn't support this function", error);
      throw error;
    }
  }
  async getRealizationsTypesOfDays() {
    try {
      const response = await this.session.client.get(`${this.host}/Realizations/TypesOfDays`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: RealizationsTypesOfDays] School doesn't support this function", error);
      throw error;
    }
  }
  async getRealizationsTypesOfClasses() {
    try {
      const response = await this.session.client.get(`${this.host}/Realizations/TypesOfClasses`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: RealizationsTypesOfClasses] School doesn't support this function", error);
      throw error;
    }
  }

  async getLuckyNumber() {
    try {
      const response = await this.session.client.get(`${this.host}/LuckyNumbers`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: LuckyNumber] School doesn't support this function", error);
      throw error;
    }
  }

  /* Class API */
  async getClassesFreeDays() {
    try {
      const response = await this.session.client.get(`${this.host}/ClassFreeDays`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: ClassFreeDays] School doesn't support this function", error);
      throw error;
    }
  }
  async getClasses() {
    try {
      const response = await this.session.client.get(`${this.host}/Classes`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: Classes] School doesn't support this function", error);
      throw error;
    }
  }
  async getClassesCrossedOutStudents() {
    try {
      const response = await this.session.client.get(`${this.host}/Classes/CrossedOutStudents`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: ClassesCrossedOutStudents] School doesn't support this function", error);
      throw error;
    }
  }

  /* Other */
  async getHelp() {
    try {
      const response = await this.session.client.get(`${this.host}/Help`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: Help] School doesn't support this function", error);
      throw error;
    }
  }
  async getEndpoints() {
    try {
      const response = await this.session.client.get(`${this.host}/Root`);
      // return response.data;
      console.log(response)
    } catch (error) {
      console.error("[LibrusAPI: Root] School doesn't support this function", error);
      throw error;
    }
  }
  async getWhatsNew() {
    try {
      const response = await this.session.client.get(`${this.host}/WhatsNew`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: WhatsNew] School doesn't support this function", error);
      throw error;
    }
  }
  async getNotificationCenter() {
    try {
      const response = await this.session.client.get(`${this.host}/NotificationCenter`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: NotificationCenter] School doesn't support this function", error);
      throw error;
    }
  }
  async getColors() {
    try {
      const response = await this.session.client.get(`${this.host}/Colors`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: Colors] School doesn't support this function", error);
      throw error;
    }
  }
  async getMe() {
    try {
      const response = await this.session.client.get(`${this.host}/Me`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: Me] School doesn't support this function", error);
      throw error;
    }
  }
  async getUsers(id = "") {
    try {
      const response = await this.session.client.get(`${this.host}/Users/${String(id)}`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: Users] School doesn't support this function", error);
      throw error;
    }
  }
  async getAPI(endpoint) {
    try {
      const response = await this.session.client.get(`${this.host}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: getAPI] Invalid Endpoint: " + endpoint, error);
      throw error;
    }
  }
  returnApiURL() {
    return API_URL;
  }
}

module.exports = { LibrusAPI };
