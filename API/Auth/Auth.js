class AuthAPI {
  constructor(session) {
    this.session = session
  }

  async activateApiAccess() {
    const headers = this.session.headers
    try {
      const tokenInfoResponse = await this.session.client.get(`${this.session.api.url}/Auth/TokenInfo`, { timeout: 5000, headers });
      const identifier = tokenInfoResponse.data.UserIdentifier;
      const userInfoResponse = await this.session.client.get(`${this.session.api.url}/Auth/UserInfo/${identifier}`, { timeout: 5000 });
      return userInfoResponse.status === 200;
    } catch (error) {
      console.error(error);
      return { code: 0, text: null };
    }
  }

  async mkToken(login, pass) {
    try {
      const authUrl = 'https://api.librus.pl/OAuth/Authorization?client_id=46&response_type=code&scope=mydata';
      const final_authUrl = 'https://api.librus.pl/OAuth/Authorization?client_id=46';
      const grandUrl = 'https://api.librus.pl/OAuth/Authorization/Grant?client_id=46';
      await this.session.client.get(authUrl);
      const formData = new URLSearchParams();
      formData.append('action', 'login');
      formData.append('login', login);
      formData.append('pass', pass);
      const getAuthorization = await this.session.client.post(final_authUrl, formData);
      if (getAuthorization.status == 200) {
        const grantResponse = await this.session.client.get(grandUrl);
        let res = false;
        if (grantResponse.status === 200) {
          res = await this.activateApiAccess();
        }
        return res;
      } else {
        return false;
      }

    } catch (error) {
      return error.response
    }
  }
}



module.exports = AuthAPI;