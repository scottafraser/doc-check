export class DocService {

  
    getDocInfobyIssue(issue) {
      return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();       
        let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${issue}&location=or-portland&user_location=45.5122%2C%20-122.6587&skip=0&limit=10&user_key=${process.env.API_KEY}`;
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

    getDocInfobyName(name) {
        return new Promise(function(resolve, reject) {
          let request = new XMLHttpRequest();       
          let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${name}&location=or-portland&user_location=45.5122%2C%20-122.6587&skip=0&limit=10&user_key=${process.env.API_KEY}`;
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