class GradesAPI {
  constructor(session) {
    this.session = session
  }

  async getGrades() {
    const headers = this.session.headers
    try {
      const response = await this.session.client.get(`${this.session.api.url}/Grades`, { headers });
      return response.data;
    } catch (error) {
      console.log("[LibrusAPI: Grades] School doesn't support this function");
      throw error;
    }
  }

  async getGradesAverages() {
    const response = await this.session.client.get(`${this.session.api.url}/Grades/Averages`, { headers });
    return response.data;
  }

  async getGradesCategoriesAverages() {
    const response = await this.session.client.get(`${this.session.api.url}/Grades/CategoriesAverages`, { headers });
    return response.data;
  }

  async getGradesCategories(id) {
    const response = await this.session.client.get(`${this.session.api.url}/Grades/Categories/${String(id)}`, { headers });
    return response.data;
  }

  async getGradesComments(id) {
    const response = await this.session.client.get(`${this.session.api.url}/Grades/Comments/${String(id)}`, { headers });
    return response.data;
  }

  async getGradesScales() {
    const response = await this.session.client.get(`${this.session.api.url}/Grades/Scales`, { headers });
    return response.data;
  }

  async getGradesTypes() {
    const response = await this.session.client.get(`${this.session.api.url}/Grades/Types`, { headers });
    return response.data;
  }

  async getGradesUnpreparednessPerSemesterAndSubject() {
    const response = await this.session.client.get(`${this.session.api.url}/Grades/UnpreparednessPerSemesterAndSubject`, { headers });
    return response.data;
  }
}

module.exports = GradesAPI;
