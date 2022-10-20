const querystring = require("querystring");
const request = require("request");
const var_dump = require("var_dump");
//const prompt = require('prompt');
const {login, pass} = require('./secret')

class Librus {
  login = login;
  password = pass
  logged_in = false;
  Token = null;
  host = "https://api.librus.pl/";

  authUsername(login, password) {
    var linkauth = this.host + "OAuth/Token";
    let params = {
      username: this.login,
      password: this.password,
      librus_long_term_token: "1",
      grant_type: "password",
    };

    params = querystring.stringify(params); // changing into querystring eg 'A=a&B=b'
    return new Promise(function(resolve, reject) {
    var r = request.post(
      {
        headers: {
          Authorization:
            "Basic Mjg6ODRmZGQzYTg3YjAzZDNlYTZmZmU3NzdiNThiMzMyYjE=",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        url: linkauth,
        body: params,
      },
      function (error, response, body) {
        let bodyParse = JSON.parse(body);
        this.logged_in = true;
        this.Token = "Bearer " + bodyParse["access_token"];
        console.log(this.logged_in);  
        resolve(this.Token)
      }
    );
  });
    
  }

  /* Get Data */

  getApiData(url, token) {

      const linkdata = this.host + "2.0/" + url;

      request.get(
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          url: linkdata,
        },
        function (error, response, body) {
          var result = JSON.parse(body);
          console.log(result);
        }
      );
  }
}

const api = new Librus();


api.authUsername("", "").then(function (token) {
  console.log('=======================')
  console.log(token)
  console.log('=======================')
  //api.getApiData("Root", token)
  console.log('======================')
  api.getApiData("WhatsNew", token)
  //console.log(api)
});
