class CalendarAPI{
    constructor(session) {
        this.API_URL = 'https://synergia.librus.pl/gateway/api/2.0';
        this.session = session
    }

    async getCalendar(id = "") {
        try {
            const response = await this.session.client.get(`${this.API_URL}/Calendars/${id}`);
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: Calendar] School doesn't support this function");
            throw error;
        }
    }
    async getCalendarSubstitutions(id = "") {
        try {
            const response = await this.session.client.get(`${this.API_URL}/Calendars/Substitutions/${id}`);
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: CalendarSubstitutions] School doesn't support this function");
            throw error;
        }
    }
    async getHomeWorks() {
        try {
            const response = await this.session.client.get(`${this.API_URL}/HomeWorks`);
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: HomeWorks] School doesn't support this function");
            throw error;
        }
    }
    async getHomeWorksCategories(id = "") {
        try {
            const response = await this.session.client.get(`${this.API_URL}/HomeWorks/Categories/${id}`);
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: HomeWorks] School doesn't support this function");
            throw error;
        }
    }
    async getTimetables() {
        try {
            const response = await this.session.client.get(`${this.API_URL}/Timetables`);
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: Timetables] School doesn't support this function");
            throw error;
        }
    }
    async getTimetablesDate(arg) {
        try {
            const response = await this.session.client.get(`${this.API_URL}/Timetables?${arg}`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: TimetablesDate] School doesn't support this function", error);
            throw error;
        }
    }
    async getTimetablesNext() {
        try {
            const response = await this.session.client.get(`${this.API_URL}/Timetables`);
            const nextWeek = response.data["Pages"]["Next"].split("?")[1];
            return await this.getTimetablesDate(nextWeek);
        } catch (error) {
            console.error("[LibrusAPI: TimetablesNext] School doesn't support this function", error);
            throw error;
        }
    }
    async getTimetablesPrev() {
        try {
            const response = await this.session.client.get(`${this.API_URL}/Timetables`);
            const previousWeek = response.data["Pages"]["Prev"].split("?")[1];
            return await this.getTimetablesDate(previousWeek);
        } catch (error) {
            console.error("[LibrusAPI: TimetablesPrev] School doesn't support this function", error);
            throw error;
        }
    }
    async getTeacherFreeDays() {
        try {
            const response = await this.session.client.get(`${this.API_URL}/TeacherFreeDays`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: TeacherFreeDays] School doesn't support this function", error);
            throw error;
        }
    }
}

module.exports = CalendarAPI;