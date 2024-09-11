class BehaviourGradesAPI {
    constructor(session) {
        this.session = session
    }

    async getBehaviourGrades() {
        const response_Behaviour = await this.session.client.get(`${this.session.api.url}/BehaviourGrades`)
        return response_Behaviour.data
    }
    async getBehaviourGradesTypes() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/BehaviourGrades/Types`)
            return response.data
        } catch (error) {
            console.log("[LibrusAPI: BehaviourGradesTypes] School doesn't support this function")
        }
    }
    async getBehaviourGradesPoints() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/BehaviourGrades/Points`)
            return response.data
        } catch (error) {
            console.log("[LibrusAPI: BehaviourGradesPoints] School doesn't support this function")
        }
    }
    async getBehaviourGradesPointsCategories() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/BehaviourGrades/Points/Categories`)
            return response.data
        } catch (error) {
            console.log("[LibrusAPI: BehaviourGradesPointsCategories] School doesn't support this function")
        }
    }
    async getBehaviourGradesPointsComments() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/BehaviourGrades/Points/Comments`)
            return response.data
        } catch (error) {
            console.log("[LibrusAPI: BehaviourGradesPointsCategories] School doesn't support this function")
        }
    }
    async getBehaviourGradesSystemProposal() {
        try {
            const response = await this.session.client.get(`${this.session.api.url}/BehaviourGrades/SystemProposal`)
            return response.data
        } catch (error) {
            console.log("[LibrusAPI: BehaviourGradesSystemProposal] School doesn't support this function")
        }
    }
}

module.exports = BehaviourGradesAPI;