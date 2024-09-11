class EndpointsAPI {
    constructor(session) {
        this.session = session
    }

    async getEndpoints() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/Root`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: Root] School doesn't support this function", error);
            throw error;
        }
    }
    async getMe() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/Me`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: Me] School doesn't support this function", error);
            throw error;
        }
    }
    async getAPI(endpoint) {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/${endpoint}`);
            return response.data;
        } catch (error) {
            console.error("[LibrusAPI: getAPI] Invalid Endpoint: " + endpoint, error);
            throw error;
        }
    }
}

module.exports = EndpointsAPI;