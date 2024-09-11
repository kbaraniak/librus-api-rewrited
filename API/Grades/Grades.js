class GradesAPI {
  constructor(session) {
    this.API_URL = 'https://synergia.librus.pl/gateway/api/2.0';
    this.session = session
  }

  async getGrades() {
    const headers = this.session.headers
    try {
      const response = await this.session.client.get(`${this.API_URL}/Grades`, { headers });
      return response.data;
    } catch (error) {
      console.log("[LibrusAPI: Grades] School doesn't support this function");
      throw error;
    }
  }

  async getGradesAverages() {
    const response = await this.session.client.get(`${this.API_URL}/Grades/Averages`, { headers });
    return response.data;
  }

  async getGradesCategoriesAverages() {
    const response = await this.session.client.get(`${this.API_URL}/Grades/CategoriesAverages`, { headers });
    return response.data;
  }

  async getGradesCategories(id) {
    const response = await this.session.client.get(`${this.API_URL}/Grades/Categories/${String(id)}`, { headers });
    return response.data;
  }

  async getGradesComments(id) {
    const response = await this.session.client.get(`${this.API_URL}/Grades/Comments/${String(id)}`, { headers });
    return response.data;
  }

  async getGradesScales() {
    const response = await this.session.client.get(`${this.API_URL}/Grades/Scales`, { headers });
    return response.data;
  }

  async getGradesTypes() {
    const response = await this.session.client.get(`${this.API_URL}/Grades/Types`, { headers });
    return response.data;
  }

  async getGradesUnpreparednessPerSemesterAndSubject() {
    const response = await this.session.client.get(`${this.API_URL}/Grades/UnpreparednessPerSemesterAndSubject`, { headers });
    return response.data;
  }
}

module.exports = GradesAPI;
