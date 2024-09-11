class SchoolAPI {
    constructor(session) {
        this.API_URL = 'https://synergia.librus.pl/gateway/api/2.0';
        this.session = session
    }

    async getSchool() {
        try {
            const response = await this.session.client.get(`${this.API_URL}/Schools`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: School] School doesn't support this function", error);
            throw error;
        }
    }
    async getClassrooms() {
        try {
            const response = await this.session.client.get(`${this.API_URL}/Classrooms`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: Classrooms] School doesn't support this function", error);
            throw error;
        }
    }
    async getSchoolNotices() {
        try {
            const response = await this.session.client.get(`${this.API_URL}/SchoolNotices`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: SchoolNotices] School doesn't support this function", error);
            throw error;
        }
    }
    async getRealizationsTypesOfDays() {
        try {
            const response = await this.session.client.get(`${this.API_URL}/Realizations/TypesOfDays`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: RealizationsTypesOfDays] School doesn't support this function", error);
            throw error;
        }
    }
    async getRealizationsTypesOfClasses() {
        try {
            const response = await this.session.client.get(`${this.API_URL}/Realizations/TypesOfClasses`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: RealizationsTypesOfClasses] School doesn't support this function", error);
            throw error;
        }
    }
    async getLuckyNumber() {
        try {
            const response = await this.session.client.get(`${this.API_URL}/LuckyNumbers`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: LuckyNumber] School doesn't support this function", error);
            throw error;
        }
    }
}

module.exports = SchoolAPI;