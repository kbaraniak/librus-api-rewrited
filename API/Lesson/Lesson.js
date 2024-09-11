class LessonAPI {
    constructor(session) {
        this.session = session
    }

    async getLessons(id = "") {
        const response = await this.session.client.get(`${this.session.api.url}/Lessons/${String(id)}`)
        return response.data;
    }
    async getAttendances() {
        const response = await this.session.client.get(`${this.session.api.url}/Attendances`)
        return response.data;
    }
    async getAttendancesTypes() {
        const response = await this.session.client.get(`${this.session.api.url}/Attendances/Types`)
        return response.data;
    }
    async getAttendancesLessonsStatistics(id) {
        const response = await this.session.client.get(`${this.session.api.url}/Attendances/LessonsStatistics/${id}`)
        return response.data;
    }
    async getAttendancesFilledByTeacher(id = "") {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/Attendances/FilledByTeacher/${id}`)
            return response.data
        } catch (error) {
            console.log("[LibrusAPI: AttendancesFilledByTeacher] School doesn't support this function")
        }
    }
    async getSubstitutions() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/Substitutions`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: Substitutions] School doesn't support this function", error);
            throw error;
        }
    }
    async getSubjects(id = "") {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/Subjects/${String(id)}`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: Subjects] School doesn't support this function", error);
            throw error;
        }
    }
}

module.exports = LessonAPI;