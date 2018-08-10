export class DocService {

    getLatLong(city) {
        return new Promise(function(resolve, reject) {
          let request = new XMLHttpRequest();       
          let url = `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAP_KEY}&location=${city}`;
          //i couldn't get this key to work without hard coding it, despite using the env file fo the other API
          request.onload = function() {
            if (this.status === 200) {
              resolve(request.response);
            } else {
              reject(Error(request.statusText));
            }
          };
          request.open("GET", url, true);
          request.send();
        });
      }
  
    getDocInfobyIssue(issue, city) {
      return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();       
        let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${issue}&location=${city}&skip=0&limit=10&user_key=${exports.apiKey}`;
        request.onload = function() {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        };
        request.open("GET", url, true);
        request.send();
      });
    }

    getDocInfobyName(name, city) {
        return new Promise(function(resolve, reject) {
          let request = new XMLHttpRequest();       
          let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${name}&location=${city}&skip=0&limit=10&user_key=${exports.apiKey}`;
          request.onload = function() {
            if (this.status === 200) {
              resolve(request.response);
            } else {
              reject(Error(request.statusText));
            }
          };
          request.open("GET", url, true);
          request.send();
        });
      }

      
  }