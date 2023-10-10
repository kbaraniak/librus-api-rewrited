const axios = require('axios');
const cookieSupport = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');
const jar = new CookieJar();
const client = cookieSupport.wrapper(axios.create({ jar }));

const API_URL = 'https://synergia.librus.pl/gateway/api/2.0';
const MSG_URL = 'https://synergia.librus.pl';

class LibrusAPI {
  constructor() {
    this.host = API_URL;
    this.msg_host = MSG_URL;
    this.headers = {};
    this.session = client;
  }

  async activateApiAccess() {
    try {
      const tokenInfoResponse = await this.session.get(`${this.host}/Auth/TokenInfo`, { timeout: 5000, headers: this.headers });
      const identifier = tokenInfoResponse.data.UserIdentifier;
      const userInfoResponse = await this.session.get(`${this.host}/Auth/UserInfo/${identifier}`, { timeout: 5000 });
      // this.headers = jar.getCookiesSync(`${this.host}/Auth/UserInfo/${identifier}`).join('; ');
      return userInfoResponse.status === 200;
    } catch (error) {
      console.error(error);
      return { code: 0, text: null };
    }
  }

  async mkToken(login, pass) {
    try {
      const authUrl = 'https://api.librus.pl/OAuth/Authorization?client_id=46&response_type=code&scope=mydata';
      const final_authUrl = 'https://api.librus.pl/OAuth/Authorization?client_id=46';
      const grandUrl = 'https://api.librus.pl/OAuth/Authorization/Grant?client_id=46';
      await this.session.get(authUrl); //Use the client instance
      const formData = new URLSearchParams();
      formData.append('action', 'login');
      formData.append('login', login);
      formData.append('pass', pass);
      await this.session.post(final_authUrl, formData); //Use the client instance
      const grantResponse = await this.session.get(grandUrl); //Use the client instance
      // this.headers = jar.getCookiesSync(final_authUrl).join('; '); //Use jar directly
      const ok = grantResponse.status === 200;
      let res = false;
      if (ok) {
        res = await this.activateApiAccess();
      }
      return res;
    } catch (error) {
      return error.response.data;
    }
  }

  /* Grades API */
  async getGrades() {
    try {
      const response = await this.session.get(`${this.host}/Grades`)
      return response.data;
    } catch (error) {
      console.log("[LibrusAPI: Grades] School doesn't support this function");
      throw error;
    }
  }
  async getGradesAverages() {
    const response = await this.session.get(`${this.host}/Grades/Averages`)
    return response.data;
  }
  async getGradesCategoriesAverages() {
    const response = await this.session.get(`${this.host}/Grades/CategoriesAverages`)
      return response.data;
  }
  async getGradesCategories(id) {
    const response = await this.session.get(`${this.host}/Grades/Categories/${String(id)}`)
    return response.data;
  }
  async getGradesComments(id) {
    const response =  await this.session.get(`${this.host}/Grades/Comments${String(id)}`)
    return response.data;
  }
  async getGradesScales() {
    const response = await this.session.get(`${this.host}/Grades/Scales`)
    return response.data;
  }
  async getGradesTypes() {
    const response = await this.session.get(`${this.host}/Grades/Types`)
    return response.data;
  }
  async getGradesUnpreparednessPerSemesterAndSubject() {
    const response = await this.session.get(`${this.host}/Grades/UnpreparednessPerSemesterAndSubject`)
    return response.data;
  }
  /* To-Do TextGrades */

  /* Point Grades API */
  async getPointGrades() {
    try {
      const response = await this.session.get(`${this.host}/PointGrades`)
      return response.data
    } catch (error) {
      console.log("[LibrusAPI: PointGrades] School doesn't support this function")
    }
  }
  async getPointGradesCategories() {
    try {
      const response = await this.session.get(`${this.host}/PointGrades/Categories`)
      return response.data
    } catch (error) {
      console.log("[LibrusAPI: PointGradesCategories] School doesn't support this function")
    }
  }
  async getPointGradesDictionaries() {
    try {
      const response = await this.session.get(`${this.host}/PointGrades/Dictionaries`)
      return response.data
    } catch (error) {
      console.log("[LibrusAPI: PointGradesDictionaries] School doesn't support this function")
    }
  }
  async getPointGradesAverages() {
    try {
      const response = await this.session.get(`${this.host}/PointGrades/Averages`)
      return response.data
    } catch (error) {
        console.log("[LibrusAPI: PointGradesAverages] School doesn't support this function")
    }
  }
  async getPointGradesStudentsAverages() {
    try {
      const response = await this.session.get(`${this.host}/PointGrades/StudentsAverages`)
      return response.data
    } catch (error) {
        console.log("[LibrusAPI: PointGradesAverages] School doesn't support this function")
    }
  }
  async getPointGradesCategoriesAverages() {
    try {
      const response = await this.session.get(`${this.host}/PointGrades/CategoriesAverages`)
      return response.data
    } catch (error) {
        console.log("[LibrusAPI: PointGradesAverages] School doesn't support this function")
    }
  }

  /* Behaviour Grades API */
  async getBehaviourGrades() {
    const response_Behaviour = await this.session.get(`${this.host}/BehaviourGrades`)
    return response_Behaviour.data
  }
  async getBehaviourGradesTypes() {
    try {
      const response = await this.session.get(`${this.host}/BehaviourGrades/Types`)
      return response.data
    } catch (error) {
        console.log("[LibrusAPI: BehaviourGradesTypes] School doesn't support this function")
    }
  }
  async getBehaviourGradesPoints() {
    try {
      const response = await this.session.get(`${this.host}/BehaviourGrades/Points`)
      return response.data
    } catch (error) {
        console.log("[LibrusAPI: BehaviourGradesPoints] School doesn't support this function")
    }
  }
  async getBehaviourGradesPointsCategories() {
    try {
      const response = await this.session.get(`${this.host}/BehaviourGrades/Points/Categories`)
      return response.data
    } catch (error) {
        console.log("[LibrusAPI: BehaviourGradesPointsCategories] School doesn't support this function")
    }
  }
  async getBehaviourGradesPointsComments() {
    try {
      const response = await this.session.get(`${this.host}/BehaviourGrades/Points/Comments`)
      return response.data
    } catch (error) {
        console.log("[LibrusAPI: BehaviourGradesPointsCategories] School doesn't support this function")
    }
  }
  async getBehaviourGradesSystemProposal() {
    try {
      const response = await this.session.get(`${this.host}/BehaviourGrades/SystemProposal`)
      return response.data
    } catch (error) {
        console.log("[LibrusAPI: BehaviourGradesSystemProposal] School doesn't support this function")
    }
  }

  /* Lessons API */
  async getLessons(id="") {
    const response = await this.session.get(`${this.host}/Lessons/${String(id)}`)
    return response.data;
  }
  async getAttendances() {
    const response = await this.session.get(`${this.host}/Attendances`)
    return response.data;
  }
  async getAttendancesTypes() {
    const response = await this.session.get(`${this.host}/Attendances/Types`)
    return response.data;
  }
  async getAttendancesLessonsStatistics(id) {
    const response = await this.session.get(`${this.host}/Attendances/LessonsStatistics/${id}`)
    return response.data;
  }
  async getAttendancesFilledByTeacher(id = "") {
    try {
      const response = await this.session.get(`${this.host}/Attendances/FilledByTeacher/${id}`)
      return response.data
    } catch (error) {
      console.log("[LibrusAPI: AttendancesFilledByTeacher] School doesn't support this function")
    }
  }
  async getCalendar(id="") {
    try {
      const response = await this.session.get(`${this.host}/Calendars/${id}`);
      return response.data;
    } catch (error) {
      console.log("[LibrusAPI: Calendar] School doesn't support this function");
      throw error;
    }
  }
  async getCalendarSubstitutions(id="") {
    try {
      const response = await this.session.get(`${this.host}/Calendars/Substitutions/${id}`);
      return response.data;
    } catch (error) {
      console.log("[LibrusAPI: CalendarSubstitutions] School doesn't support this function");
      throw error;
    }
  }
  async getHomeWorks(){
    try {
      const response = await this.session.get(`${this.host}/HomeWorks`);
      return response.data;
    } catch (error) {
      console.log("[LibrusAPI: HomeWorks] School doesn't support this function");
      throw error;
    }
  }
  async getHomeWorksCategories(id=""){
    try {
      const response = await this.session.get(`${this.host}/HomeWorks/Categories/${id}`);
      return response.data;
    } catch (error) {
      console.log("[LibrusAPI: HomeWorks] School doesn't support this function");
      throw error;
    }
  }
  async getTimetables() {
    try {
      const response = await this.session.get(`${this.host}/Timetables`);
      return response.data;
    } catch (error) {
      console.log("[LibrusAPI: Timetables] School doesn't support this function");
      throw error;
    }
  }
  async getTimetablesDate(arg) {
    try {
      const response = await this.session.get(`${this.host}/Timetables?${arg}`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: TimetablesDate] School doesn't support this function", error);
      throw error;
    }
  }
  async getTimetablesNext() {
    try {
      const response = await this.session.get(`${this.host}/Timetables`);
      const nextWeek = response.data["Pages"]["Next"].split("?")[1];
      return await this.getTimetablesDate(nextWeek);
    } catch (error) {
      console.error("[LibrusAPI: TimetablesNext] School doesn't support this function", error);
      throw error;
    }
  }
  async getTimetablesPrev() {
    try {
      const response = await this.session.get(`${this.host}/Timetables`);
      const previousWeek = response.data["Pages"]["Prev"].split("?")[1];
      return await this.getTimetablesDate(previousWeek);
    } catch (error) {
      console.error("[LibrusAPI: TimetablesPrev] School doesn't support this function", error);
      throw error;
    }
  }
  async getSubstitutions() {
    try {
      const response = await this.session.get(`${this.host}/Substitutions`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: Substitutions] School doesn't support this function", error);
      throw error;
    }
  }
  async getSubjects(id="") {
    try {
      const response = await this.session.get(`${this.host}/Subjects/${String(id)}`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: Subjects] School doesn't support this function", error);
      throw error;
    }
  }
  async getTeacherFreeDays() {
    try {
      const response = await this.session.get(`${this.host}/TeacherFreeDays`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: TeacherFreeDays] School doesn't support this function", error);
      throw error;
    }
  }
  async getLuckyNumber() {
    try {
      const response = await this.session.get(`${this.host}/LuckyNumbers`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: LuckyNumber] School doesn't support this function", error);
      throw error;
    }
  }

  /* School API */
  async getSchool() {
    try {
      const response = await this.session.get(`${this.host}/Schools`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: School] School doesn't support this function", error);
      throw error;
    }
  }
  async getClassrooms() {
    try {
      const response = await this.session.get(`${this.host}/Classrooms`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: Classrooms] School doesn't support this function", error);
      throw error;
    }
  }
  async getVirtualClasses() {
    try {
      const response = await this.session.get(`${this.host}/VirtualClasses`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: VirtualClasses] School doesn't support this function", error);
      throw error;
    }
  }
  async getSchoolNotices() {
    try {
      const response = await this.session.get(`${this.host}/SchoolNotices`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: SchoolNotices] School doesn't support this function", error);
      throw error;
    }
  }
  async getRealizationsTypesOfDays() {
    try {
      const response = await this.session.get(`${this.host}/Realizations/TypesOfDays`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: RealizationsTypesOfDays] School doesn't support this function", error);
      throw error;
    }
  }
  async getRealizationsTypesOfClasses() {
    try {
      const response = await this.session.get(`${this.host}/Realizations/TypesOfClasses`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: RealizationsTypesOfClasses] School doesn't support this function", error);
      throw error;
    }
  }

  /* Class API */
  async getClassesFreeDays() {
    try {
      const response = await this.session.get(`${this.host}/ClassFreeDays`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: ClassFreeDays] School doesn't support this function", error);
      throw error;
    }
  }
  async getClasses() {
    try {
      const response = await this.session.get(`${this.host}/Classes`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: Classes] School doesn't support this function", error);
      throw error;
    }
  }
  async getClassesCrossedOutStudents() {
    try {
      const response = await this.session.get(`${this.host}/Classes/CrossedOutStudents`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: ClassesCrossedOutStudents] School doesn't support this function", error);
      throw error;
    }
  }
  async getHelp() {
    try {
      const response = await this.session.get(`${this.host}/Help`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: Help] School doesn't support this function", error);
      throw error;
    }
  }
  async getEndpoints() {
    try {
      const response = await this.session.get(`${this.host}/Root`);
      // return response.data;
      console.log(response)
    } catch (error) {
      console.error("[LibrusAPI: Root] School doesn't support this function", error);
      throw error;
    }
  }
  async getWhatsNew() {
    try {
      const response = await this.session.get(`${this.host}/WhatsNew`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: WhatsNew] School doesn't support this function", error);
      throw error;
    }
  }
  async getNotificationCenter() {
    try {
      const response = await this.session.get(`${this.host}/NotificationCenter`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: NotificationCenter] School doesn't support this function", error);
      throw error;
    }
  }
  async getMe() {
    try {
      const response = await this.session.get(`${this.host}/Me`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: Me] School doesn't support this function", error);
      throw error;
    }
  }
  async getColors() {
    try {
      const response = await this.session.get(`${this.host}/Colors`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: Colors] School doesn't support this function", error);
      throw error;
    }
  }
  async getUsers(id="") {
    try {
      const response = await this.session.get(`${this.host}/Users/${String(id)}`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: Users] School doesn't support this function", error);
      throw error;
    }
  }
  async getAPI(endpoint) {
    try {
      const response = await this.session.get(`${this.host}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error("[LibrusAPI: getAPI] Invalid Endpoint: " + endpoint, error);
      throw error;
    }
  }
  returnApiURL(){
    return API_URL;
  }
}

module.exports = { LibrusAPI };
