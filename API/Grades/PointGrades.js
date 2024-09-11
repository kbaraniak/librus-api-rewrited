class PointGradesAPI {
    constructor(session) {
        this.session = session
      }

    async getPointGrades(headers) {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/PointGrades`, { headers });
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: PointGrades] School doesn't support this function");
        }
    }

    async getPointGradesCategories(headers) {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/PointGrades/Categories`, { headers });
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: PointGradesCategories] School doesn't support this function");
        }
    }

    async getPointGradesDictionaries(headers) {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/PointGrades/Dictionaries`, { headers });
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: PointGradesDictionaries] School doesn't support this function");
        }
    }

    async getPointGradesAverages(headers) {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/PointGrades/Averages`, { headers });
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: PointGradesAverages] School doesn't support this function");
        }
    }

    async getPointGradesStudentsAverages(headers) {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/PointGrades/StudentsAverages`, { headers });
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: PointGradesAverages] School doesn't support this function");
        }
    }

    async getPointGradesCategoriesAverages(headers) {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/PointGrades/CategoriesAverages`, { headers });
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: PointGradesAverages] School doesn't support this function");
        }
    }
}

module.exports = PointGradesAPI;