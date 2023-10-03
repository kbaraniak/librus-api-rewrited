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
      this.headers = jar.getCookiesSync(`${this.host}/Auth/UserInfo/${identifier}`).join('; ');
      return userInfoResponse.status === 200;
    } catch (error) {
      console.error(error);
      return { code: 0, text: null };
    }
  }

  async mkToken(login, pass) {
    try {
      const authUrl = 'https://api.librus.pl/OAuth/Authorization?client_id=46&response_type=code&scope=mydata';
      const final_authUrl = 'https://api.librus.pl/OAuth/Authorization/Grant?client_id=46';
      const authResponse = await this.session.get(authUrl); //Use the client instance
      const formData = new URLSearchParams();
      formData.append('action', 'login');
      formData.append('login', login);
      formData.append('pass', pass);
      await this.session.post('https://api.librus.pl/OAuth/Authorization?client_id=46', formData); //Use the client instance
      const grantResponse = await this.session.get('https://api.librus.pl/OAuth/Authorization/Grant?client_id=46'); //Use the client instance
      this.headers = jar.getCookiesSync(final_authUrl).join('; '); //Use jar directly
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
    await this.session.get(`${this.host}/Grades`)
      .then((r) => {
        return r.data
      })
  }
  async getGradesAverages() {
    await this.session.get(`${this.host}/Grades/Averages`)
      .then((r) => {
        return r.data
      })
  }
  async getGradesCategoriesAverages() {
    await this.session.get(`${this.host}/Grades/CategoriesAverages`)
      .then((r) => {
        return r.data
      })
  }
  async getGradesCategories() {
    await this.session.get(`${this.host}/Grades/Categories`)
      .then((r) => {
        return r.data
      })
  }
  async getGradesComments() {
    await this.session.get(`${this.host}/Grades/Comments`)
      .then((r) => {
        return r.data
      })
  }
  async getGradesScales() {
    await this.session.get(`${this.host}/Grades/Scales`)
      .then((r) => {
        return r.data
      })
  }
  async getGradesTypes() {
    await this.session.get(`${this.host}/Grades/Types`)
      .then((r) => {
        return r.data
      })
  }
  async getGradesUnpreparednessPerSemesterAndSubject() {
    await this.session.get(`${this.host}/Grades/UnpreparednessPerSemesterAndSubject`)
      .then((r) => {
        return r.data
      })
  }
  /* To-Do TextGrades */

  /* Point Grades API */
  async getPointGrades() {
    await this.session.get(`${this.host}/PointGrades`)
      .then((r) => {
        return r.data
      }).catch(() => {
        console.log("[LibrusAPI: PointGrades] School doesn't support this function")
      })
  }
  async getPointGradesCategories() {
    await this.session.get(`${this.host}/PointGrades/Categories`)
      .then((r) => {
        return r.data
      }).catch(() => {
        console.log("[LibrusAPI: PointGradesCategories] School doesn't support this function")
      })
  }
  async getPointGradesDictionaries() {
    await this.session.get(`${this.host}/PointGrades/Dictionaries`)
      .then((r) => {
        return r.data
      }).catch(() => {
        console.log("[LibrusAPI: PointGradesDictionaries] School doesn't support this function")
      })
  }
  async getPointGradesAverages() {
    await this.session.get(`${this.host}/PointGrades/Averages`)
      .then((r) => {
        return r.data
      }).catch(() => {
        console.log("[LibrusAPI: PointGradesAverages] School doesn't support this function")
      })
  }
  async getPointGradesStudentsAverages() {
    await this.session.get(`${this.host}/PointGrades/StudentsAverages`)
      .then((r) => {
        return r.data
      }).catch(() => {
        console.log("[LibrusAPI: PointGradesAverages] School doesn't support this function")
      })
  }
  async getPointGradesCategoriesAverages() {
    await this.session.get(`${this.host}/PointGrades/CategoriesAverages`)
      .then((r) => {
        return r.data
      }).catch(() => {
        console.log("[LibrusAPI: PointGradesAverages] School doesn't support this function")
      })
  }

  /* Behaviour Grades API */
  async getBehaviourGrades() {
    const response_Behaviour = await this.session.get(`${this.host}/BehaviourGrades`)
    console.log(response_Behaviour.data)
  }
  async getBehaviourGradesTypes() {
    await this.session.get(`${this.host}/BehaviourGrades/Types`)
      .then((r) => {
        return r.data
      }).catch((e) => {
        console.log("[LibrusAPI: BehaviourGradesTypes] School doesn't support this function")
      })
  }
  async getBehaviourGradesPoints() {
    await this.session.get(`${this.host}/BehaviourGrades/Points`)
      .then((r) => {
        return r.data
      }).catch(() => {
        console.log("[LibrusAPI: BehaviourGradesPoints] School doesn't support this function")
      })
  }
  async getBehaviourGradesPointsCategories() {
    await this.session.get(`${this.host}/BehaviourGrades/Points/Categories`)
      .then((r) => {
        return r.data
      }).catch(() => {
        console.log("[LibrusAPI: BehaviourGradesPointsCategories] School doesn't support this function")
      })
  }
  async getBehaviourGradesPointsComments() {
    await this.session.get(`${this.host}/BehaviourGrades/Points/Comments`)
      .then((r) => {
        return r.data
      }).catch(() => {
        console.log("[LibrusAPI: BehaviourGradesPointsCategories] School doesn't support this function")
      })
  }
  async getBehaviourGradesSystemProposal() {
    await this.session.get(`${this.host}/BehaviourGrades/SystemProposal`)
      .then((r) => {
        return r.data
      }).catch(() => {
        console.log("[LibrusAPI: BehaviourGradesSystemProposal] School doesn't support this function")
      })
  }

  /* Lessons API */
  async getLessons() {
    await this.session.get(`${this.host}/Lessons`)
      .then((r) => {
        return r.data
      })
  }
  async getAttendances() {
    await this.session.get(`${this.host}/Attendances`)
      .then((r) => {
        return r.data
      })
  }
  async getAttendancesTypes() {
    await this.session.get(`${this.host}/Attendances/Types`)
      .then((r) => {
        return r.data
      })
  }
  async getAttendancesLessonsStatistics(id) {
    await this.session.get(`${this.host}/Attendances/LessonsStatistics/${id}`)
      .then((r) => {
        return r.data
      })
  }
  async getAttendancesFilledByTeacher(id = "") {
    await this.session.get(`${this.host}/Attendances/FilledByTeacher/${id}`)
      .then((r) => {
        return r.data
      }).catch(() => {
        console.log("[LibrusAPI: AttendancesFilledByTeacher] School doesn't support this function")
      })
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
  async getSubjects() {
    try {
      const response = await this.session.get(`${this.host}/Subjects`);
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
      const response = await this.session.get(`${this.host}/Classes /CrossedOutStudents`);
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
      return response.data;
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
  async getUsers() {
    try {
      const response = await this.session.get(`${this.host}/Users`);
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
}

module.exports = { LibrusAPI };
