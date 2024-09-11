class CalendarAPI{
    constructor(session) {
        this.session = session
    }

    async getCalendar(id = "") {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/Calendars/${id}`);
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: Calendar] School doesn't support this function");
            throw error;
        }
    }
    async getCalendarSubstitutions(id = "") {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/Calendars/Substitutions/${id}`);
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: CalendarSubstitutions] School doesn't support this function");
            throw error;
        }
    }
    async getHomeWorks() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/HomeWorks`);
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: HomeWorks] School doesn't support this function");
            throw error;
        }
    }
    async getHomeWorksCategories(id = "") {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/HomeWorks/Categories/${id}`);
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: HomeWorks] School doesn't support this function");
            throw error;
        }
    }
    async getTimetables() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/Timetables`);
            return response.data;
        } catch (error) {
            console.log("[LibrusAPI: Timetables] School doesn't support this function");
            throw error;
        }
    }
    async getTimetablesDate(arg) {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/Timetables?${arg}`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: TimetablesDate] School doesn't support this function", error);
            throw error;
        }
    }
    async getTimetablesNext() {
        console.log(this.session.api.url)
        try {
            const response = await this.session.client.get(`${this.session.api.url}/Timetables`);
            const nextWeek = response.data["Pages"]["Next"].split("?")[1];
            return await this.getTimetablesDate(nextWeek);
        } catch (error) {
            console.error("[LibrusAPI: TimetablesNext] School doesn't support this function", error);
            throw error;
        }
    }
    async getTimetablesPrev() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/Timetables`);
            const previousWeek = response.data["Pages"]["Prev"].split("?")[1];
            return await this.getTimetablesDate(previousWeek);
        } catch (error) {
            console.error("[LibrusAPI: TimetablesPrev] School doesn't support this function", error);
            throw error;
        }
    }
    async getTeacherFreeDays() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/TeacherFreeDays`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: TeacherFreeDays] School doesn't support this function", error);
            throw error;
        }
    }
}

module.exports = CalendarAPI;