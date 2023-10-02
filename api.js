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
      const authResponse = await this.session.get(authUrl); // Use the client instance
      const formData = new URLSearchParams();
      formData.append('action', 'login');
      formData.append('login', login);
      formData.append('pass', pass);
      await this.session.post('https://api.librus.pl/OAuth/Authorization?client_id=46', formData); // Use the client instance
      const grantResponse = await this.session.get('https://api.librus.pl/OAuth/Authorization/Grant?client_id=46'); // Use the client instance
      this.headers = jar.getCookiesSync(final_authUrl).join('; '); // Use jar directly
      const ok = grantResponse.status === 200;
      let res = false;
      if (ok) {
        res = await this.activateApiAccess();
      }
      return res;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /* Grades API */
  async getGrades(){
    await this.session.get(`${this.host}/Grades`)
    .then((r) => {
      console.log(r.data)
    })
  }
  async getGradesAverages(){
    await this.session.get(`${this.host}/Grades/Averages`)
    .then((r) => {
      console.log(r.data)
    })
  }
  async getGradesCategoriesAverages(){
    await this.session.get(`${this.host}/Grades/CategoriesAverages`)
    .then((r) => {
      console.log(r.data)
    })
  }
  async getGradesCategories(){
    await this.session.get(`${this.host}/Grades/Categories`)
    .then((r) => {
      console.log(r.data)
    })
  }
  async getGradesComments(){
    await this.session.get(`${this.host}/Grades/Comments`)
    .then((r) => {
      console.log(r.data)
    })
  }
  async getGradesScales(){
    await this.session.get(`${this.host}/Grades/Scales`)
    .then((r) => {
      console.log(r.data)
    })
  }
  async getGradesTypes(){
    await this.session.get(`${this.host}/Grades/Types`)
    .then((r) => {
      console.log(r.data)
    })
  }
  async getGradesUnpreparednessPerSemesterAndSubject(){
    await this.session.get(`${this.host}/Grades/UnpreparednessPerSemesterAndSubject`)
    .then((r) => {
      console.log(r.data)
    })
  }
  /* To-Do TextGrades */

  /* Point Grades API */
  async getPointGrades(){
    await this.session.get(`${this.host}/PointGrades`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: PointGrades] School doesn't support this function")
    })
  }
  async getPointGradesCategories(){
    await this.session.get(`${this.host}/PointGrades/Categories`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: PointGradesCategories] School doesn't support this function")
    })
  }
  async getPointGradesDictionaries(){
    await this.session.get(`${this.host}/PointGrades/Dictionaries`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: PointGradesDictionaries] School doesn't support this function")
    })
  }
  async getPointGradesAverages(){
    await this.session.get(`${this.host}/PointGrades/Averages`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: PointGradesAverages] School doesn't support this function")
    })
  }
  async getPointGradesStudentsAverages(){
    await this.session.get(`${this.host}/PointGrades/StudentsAverages`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: PointGradesAverages] School doesn't support this function")
    })
  }
  async getPointGradesCategoriesAverages(){
    await this.session.get(`${this.host}/PointGrades/CategoriesAverages`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: PointGradesAverages] School doesn't support this function")
    })
  }

  /* Behaviour Grades API */
  async getBehaviourGrades(){
    const response_Behaviour = await this.session.get(`${this.host}/BehaviourGrades`)
    console.log(response_Behaviour.data)
  }
  async getBehaviourGradesTypes(){
    await this.session.get(`${this.host}/BehaviourGrades/Types`)
    .then((r) => {
      console.log(r.data)
    }).catch((e) => {
      console.log("[LibrusAPI: BehaviourGradesTypes] School doesn't support this function")
    })
  }
  async getBehaviourGradesPoints(){
    await this.session.get(`${this.host}/BehaviourGrades/Points`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: BehaviourGradesPoints] School doesn't support this function")
    })
  }
  async getBehaviourGradesPointsCategories(){
    await this.session.get(`${this.host}/BehaviourGrades/Points/Categories`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: BehaviourGradesPointsCategories] School doesn't support this function")
    })
  }
  async getBehaviourGradesPointsComments(){
    await this.session.get(`${this.host}/BehaviourGrades/Points/Comments`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: BehaviourGradesPointsCategories] School doesn't support this function")
    })
  }
  async getBehaviourGradesSystemProposal(){
    await this.session.get(`${this.host}/BehaviourGrades/SystemProposal`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: BehaviourGradesSystemProposal] School doesn't support this function")
    })
  }

  /* Lessons API */
  async getLessons(){
    await this.session.get(`${this.host}/Lessons`)
    .then((r) => {
      console.log(r.data)
    })
  }
  async getAttendances(){
    await this.session.get(`${this.host}/Attendances`)
    .then((r) => {
      console.log(r.data)
    })
  }
  async getAttendancesTypes(){
    await this.session.get(`${this.host}/Attendances/Types`)
    .then((r) => {
      console.log(r.data)
    })
  }
  async getAttendancesLessonsStatistics(id){
    await this.session.get(`${this.host}/Attendances/LessonsStatistics/${id}`)
    .then((r) => {
      console.log(r.data)
    })
  }
  async getAttendancesFilledByTeacher(id=""){
    await this.session.get(`${this.host}/Attendances/FilledByTeacher/${id}`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: AttendancesFilledByTeacher] School doesn't support this function")
    })
  }
  async getTimetables(){
    await this.session.get(`${this.host}/Timetables`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: Timetables] School doesn't support this function")
    })
  }
  async getTimetablesDate(arg){
    await this.session.get(`${this.host}/Timetables?${arg}`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: TimetablesDate] School doesn't support this function")
    })
  }
  async getTimetablesNext(){
    await this.session.get(`${this.host}/Timetables`)
    .then(async (r) => {
      const nextWeek = r.data["Pages"]["Next"].split("?")[1]
      await this.getTimetablesDate(nextWeek)
    }).catch(() => {
      console.log("[LibrusAPI: TimetablesNext] School doesn't support this function")
    })
  }
  async getTimetablesPrev(){
    await this.session.get(`${this.host}/Timetables`)
    .then(async (r) => {
      const previousWeek = r.data["Pages"]["Prev"].split("?")[1]
      await this.getTimetablesDate(previousWeek)
    }).catch(() => {
      console.log("[LibrusAPI: TimetablesPrev] School doesn't support this function")
    })
  }
  async getSubstitutions(){
    await this.session.get(`${this.host}/Substitutions`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: Substitutions] School doesn't support this function")
    })
  }
  async getSubjects(){
    await this.session.get(`${this.host}/Subjects`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: Subjects] School doesn't support this function")
    })
  }
  async getTeacherFreeDays(){
    await this.session.get(`${this.host}/TeacherFreeDays`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: TeacherFreeDays] School doesn't support this function")
    })
  }
  async getLuckyNumber(){
    await this.session.get(`${this.host}/LuckyNumbers`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: LuckyNumber] School doesn't support this function")
    })
  }


  /* School API */
  async getSchool(){
    await this.session.get(`${this.host}/Schools`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: School] School doesn't support this function")
    })
  }
  async getClassrooms(){
    await this.session.get(`${this.host}/Classrooms`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: Classrooms] School doesn't support this function")
    })
  }
  async getVirtualClasses(){
    await this.session.get(`${this.host}/VirtualClasses`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: VirtualClasses] School doesn't support this function")
    })
  }
  async getSchoolNotices(){
    await this.session.get(`${this.host}/SchoolNotices`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: SchoolNotices] School doesn't support this function")
    })
  }
  async getRealizationsTypesOfDays(){
    await this.session.get(`${this.host}/Realizations/TypesOfDays`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: RealizationsTypesOfDays] School doesn't support this function")
    })
  }
  async getRealizationsTypesOfClasses(){
    await this.session.get(`${this.host}/Realizations/TypesOfClasses`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: RealizationsTypesOfClasses] School doesn't support this function")
    })
  }
  
  /* Class */
  async getClassFreeDays(){
    await this.session.get(`${this.host}/ClassFreeDays`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: ClassFreeDays] School doesn't support this function")
    })
  }
  async getClasses(){
    await this.session.get(`${this.host}/Classes`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: Classes] School doesn't support this function")
    })
  }
  async getClassesCrossedOutStudents(){
    await this.session.get(`${this.host}/Classes/CrossedOutStudents`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: ClassesCrossedOutStudents] School doesn't support this function")
    })
  }

  /* Other API */
  async getHelp(){
    await this.session.get(`${this.host}/Help`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: Help] School doesn't support this function")
    })
  }
  async getEndpoints(){
    await this.session.get(`${this.host}/Root`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: Root] School doesn't support this function")
    })
  }
  async getWhatsNew(){
    await this.session.get(`${this.host}/WhatsNew`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: WhatsNew] School doesn't support this function")
    })
  }
  async getNotificationCenter(){
    await this.session.get(`${this.host}/NotificationCenter`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: NotificationCenter] School doesn't support this function")
    })
  }
  async getMe(){
    await this.session.get(`${this.host}/Me`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: Me] School doesn't support this function")
    })
  }
  async getColors(){
    await this.session.get(`${this.host}/Colors`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: Colors] School doesn't support this function")
    })
  }
  async getUsers(){
    await this.session.get(`${this.host}/Users`)
    .then((r) => {
      console.log(r.data)
    }).catch(() => {
      console.log("[LibrusAPI: Users] School doesn't support this function")
    })
  }
  async getAPI(endpoint){
    await this.session.get(`${this.host}/${endpoint}`)
    .then((r) => {
      console.log(r.data)
    }).catch((e) => {
      console.log("[LibrusAPI: getAPI] Invalid Endpoint: " + endpoint)
    })
  }
}

module.exports = { LibrusAPI };
