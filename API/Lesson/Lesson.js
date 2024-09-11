class LessonAPI {
    constructor(session) {
        this.API_URL = 'https://synergia.librus.pl/gateway/api/2.0';
        this.session = session
    }

    async getLessons(id = "") {
        const response = await this.session.client.get(`${this.API_URL}/Lessons/${String(id)}`)
        return response.data;
    }
    async getAttendances() {
        const response = await this.session.client.get(`${this.API_URL}/Attendances`)
        return response.data;
    }
    async getAttendancesTypes() {
        const response = await this.session.client.get(`${this.API_URL}/Attendances/Types`)
        return response.data;
    }
    async getAttendancesLessonsStatistics(id) {
        const response = await this.session.client.get(`${this.API_URL}/Attendances/LessonsStatistics/${id}`)
        return response.data;
    }
    async getAttendancesFilledByTeacher(id = "") {
        try {
            const response = await this.session.client.get(`${this.API_URL}/Attendances/FilledByTeacher/${id}`)
            return response.data
        } catch (error) {
            console.log("[LibrusAPI: AttendancesFilledByTeacher] School doesn't support this function")
        }
    }
    async getSubstitutions() {
        try {
            const response = await this.session.client.get(`${this.API_URL}/Substitutions`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: Substitutions] School doesn't support this function", error);
            throw error;
        }
    }
    async getSubjects(id = "") {
        try {
            const response = await this.session.client.get(`${this.API_URL}/Subjects/${String(id)}`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: Subjects] School doesn't support this function", error);
            throw error;
        }
    }
}

module.exports = LessonAPI;