class PointGradesAPI {
    constructor(session) {
        this.API_URL = 'https://synergia.librus.pl/gateway/api/2.0';
        this.session = session
      }

    async getPointGrades(headers) {
        try {
            const response = await this.session.client.get(`${this.API_URL}/PointGrades`, { headers });
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: PointGrades] School doesn't support this function");
        }
    }

    async getPointGradesCategories(headers) {
        try {
            const response = await this.session.client.get(`${this.API_URL}/PointGrades/Categories`, { headers });
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: PointGradesCategories] School doesn't support this function");
        }
    }

    async getPointGradesDictionaries(headers) {
        try {
            const response = await this.session.client.get(`${this.API_URL}/PointGrades/Dictionaries`, { headers });
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: PointGradesDictionaries] School doesn't support this function");
        }
    }

    async getPointGradesAverages(headers) {
        try {
            const response = await this.session.client.get(`${this.API_URL}/PointGrades/Averages`, { headers });
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: PointGradesAverages] School doesn't support this function");
        }
    }

    async getPointGradesStudentsAverages(headers) {
        try {
            const response = await this.session.client.get(`${this.API_URL}/PointGrades/StudentsAverages`, { headers });
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: PointGradesAverages] School doesn't support this function");
        }
    }

    async getPointGradesCategoriesAverages(headers) {
        try {
            const response = await this.session.client.get(`${this.API_URL}/PointGrades/CategoriesAverages`, { headers });
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: PointGradesAverages] School doesn't support this function");
        }
    }
}

module.exports = PointGradesAPI;