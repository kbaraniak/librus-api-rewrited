class ClassAPI{
    constructor(session) {
        this.API_URL = 'https://synergia.librus.pl/gateway/api/2.0';
        this.session = session
    }

    async getClassesFreeDays() {
        try {
          const response = await this.session.client.get(`${this.host}/ClassFreeDays`);
          return response.data;
        } catch (error) {
          console.error("[LibrusAPI: ClassFreeDays] School doesn't support this function", error);
          throw error;
        }
      }
      async getClasses() {
        try {
          const response = await this.session.client.get(`${this.host}/Classes`);
          return response.data;
        } catch (error) {
          console.error("[LibrusAPI: Classes] School doesn't support this function", error);
          throw error;
        }
      }
      async getClassesCrossedOutStudents() {
        try {
          const response = await this.session.client.get(`${this.host}/Classes/CrossedOutStudents`);
          return response.data;
        } catch (error) {
          console.error("[LibrusAPI: ClassesCrossedOutStudents] School doesn't support this function", error);
          throw error;
        }
      }
    async getVirtualClasses() {
        try {
            const response = await this.session.client.get(`${this.API_URL}/VirtualClasses`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: VirtualClasses] School doesn't support this function", error);
            throw error;
        }
    }
}

module.exports = ClassAPI;