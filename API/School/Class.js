class ClassAPI{
    constructor(session) {
        this.session = session
    }

    async getClassesFreeDays() {
        try {
          const response = await this.session.client.get(`${this.session.api.url}/ClassFreeDays`);
          return response.data;
        } catch (error) {
          console.error("[LibrusAPI: ClassFreeDays] School doesn't support this function", error);
          throw error;
        }
      }
      async getClasses() {
        try {
          const response = await this.session.client.get(`${this.session.api.url}/Classes`);
          return response.data;
        } catch (error) {
          console.error("[LibrusAPI: Classes] School doesn't support this function", error);
          throw error;
        }
      }
      async getClassesCrossedOutStudents() {
        try {
          const response = await this.session.client.get(`${this.session.api.url}/Classes/CrossedOutStudents`);
          return response.data;
        } catch (error) {
          console.error("[LibrusAPI: ClassesCrossedOutStudents] School doesn't support this function", error);
          throw error;
        }
      }
    async getVirtualClasses() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/VirtualClasses`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: VirtualClasses] School doesn't support this function", error);
            throw error;
        }
    }
}

module.exports = ClassAPI;