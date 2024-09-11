class SchoolAPI {
    constructor(session) {
        this.session = session
    }

    async getSchool() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/Schools`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: School] School doesn't support this function", error);
            throw error;
        }
    }
    async getClassrooms() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/Classrooms`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: Classrooms] School doesn't support this function", error);
            throw error;
        }
    }
    async getSchoolNotices() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/SchoolNotices`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: SchoolNotices] School doesn't support this function", error);
            throw error;
        }
    }
    async getRealizationsTypesOfDays() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/Realizations/TypesOfDays`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: RealizationsTypesOfDays] School doesn't support this function", error);
            throw error;
        }
    }
    async getRealizationsTypesOfClasses() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/Realizations/TypesOfClasses`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: RealizationsTypesOfClasses] School doesn't support this function", error);
            throw error;
        }
    }
    async getLuckyNumber() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/LuckyNumbers`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: LuckyNumber] School doesn't support this function", error);
            throw error;
        }
    }
}

module.exports = SchoolAPI;