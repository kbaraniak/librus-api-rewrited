let querystring;
let request;
let var_dump;

try{
  querystring = require("querystring");
  request = require("request");
  var_dump = require("var_dump");
}
catch(err){
  console.error("No found modules");
  console.error("Please install, using below command on terminal")
  console.log("> npm install request querystring var_dump");
  process.exit(1);
  
}

class LibrusCore {
  logged_in = false;
  Token = null;
  host = "https://api.librus.pl/";

  authUsername(login, password) {
    var linkauth = this.host + "OAuth/Token";
    let params = {
      username: login,
      password: password,
      librus_long_term_token: "1",
      grant_type: "password",
    };

    params = querystring.stringify(params); // changing into querystring eg 'A=a&B=b'
    return new Promise(function (resolve, reject) {
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
          //console.log(this.logged_in);
          resolve(this.Token);
        }
      );
    });
  }

  /* Get Data */

  getApiData(url, token) {
    const linkdata = this.host + "2.0/" + url;
    return new Promise(function (resolve, reject) {
      request.get(
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          url: linkdata,
        },
        function (error, response, body) {
          if(error) {
            console.error("[Unexcepted Problem]", error);
          }
          var result = JSON.parse(body);
          resolve(body);
        }
      );
    });
  }

  async parseApi(url, token) {
    let json = await this.getApiData(url, token);
    let jsonParse = JSON.parse(json);
    return jsonParse;
  }
}

module.exports = LibrusCore;
