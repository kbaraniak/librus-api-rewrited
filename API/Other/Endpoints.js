class EndpointsAPI {
    constructor(session) {
        this.API_URL = 'https://synergia.librus.pl/gateway/api/2.0';
        this.session = session
    }

    async getEndpoints() {
        try {
            const response = await this.session.client.get(`${this.API_URL}/Root`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: Root] School doesn't support this function", error);
            throw error;
        }
    }
    async getMe() {
        try {
            const response = await this.session.client.get(`${this.API_URL}/Me`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: Me] School doesn't support this function", error);
            throw error;
        }
    }
    async getAPI(endpoint) {
        try {
            const response = await this.session.client.get(`${this.API_URL}/${endpoint}`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: getAPI] Invalid Endpoint: " + endpoint, error);
            throw error;
        }
    }
}

module.exports = EndpointsAPI;