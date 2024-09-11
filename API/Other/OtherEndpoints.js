class OtherEndpointsAPI{
    constructor(session) {
        this.session = session
    }

    async getHelp() {
        try {
          const response = await this.session.client.get(`${this.session.api.url}/Help`);
          return response.data;
        } catch (error) {
          console.error("[LibrusAPI: Help] School doesn't support this function", error);
          throw error;
        }
      }
      async getWhatsNew() {
        try {
          const response = await this.session.client.get(`${this.session.api.url}/WhatsNew`);
          return response.data;
        } catch (error) {
          console.error("[LibrusAPI: WhatsNew] School doesn't support this function", error);
          throw error;
        }
      }
      async getNotificationCenter() {
        try {
          const response = await this.session.client.get(`${this.session.api.url}/NotificationCenter`);
          return response.data;
        } catch (error) {
          console.error("[LibrusAPI: NotificationCenter] School doesn't support this function", error);
          throw error;
        }
      }
      async getColors() {
        try {
          const response = await this.session.client.get(`${this.session.api.url}/Colors`);
          return response.data;
        } catch (error) {
          console.error("[LibrusAPI: Colors] School doesn't support this function", error);
          throw error;
        }
      }
      async getUsers(id = "") {
        try {
          const response = await this.session.client.get(`${this.session.api.url}/Users/${String(id)}`);
          return response.data;
        } catch (error) {
          console.error("[LibrusAPI: Users] School doesn't support this function", error);
          throw error;
        }
      }
}

module.exports = OtherEndpointsAPI;