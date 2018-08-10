import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DocService } from'./doc-service.js';


function patients(bool){
  if (bool == true){
    bool = "Accepting patients";
    } else {
    bool = "Not Accepting Patients";
    }
    return bool;
}

function template(body) {
  for(let i = 0; i < body.data.length; i++) {
    let name = body.data[i].profile.first_name + "" + body.data[i].profile.last_name;
     let bool = patients(body.data[i].practices["0"].accepts_new_patients);
     let number = body.data[i].practices["0"].phones["0"].number;
     let address = body.data[i].practices["0"].visit_address.street;
     let image = body.data[i].profile.image_url;
     let website = body.data[i].practices["0"].website;       
    
      if (website == undefined){
        website = "";
      }

      $('#info').append(
        `<div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${image}" alt="no pic">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${address}<br>${number}<br>${bool}<br>${website}</p>
          </div>
        </div>`);  
    }
}

$(document).ready(function() {
  console.log("hey, you should buy Abe a beer sometime!");
    //clear click
    $('#clear-search').click(function(e) {
      e.preventDefault();
      $('.card').remove();
    });
    //symptom click
    $('#issue-submit').click(function(e) {
      e.preventDefault();
      let issue = $('#issue').val();
      $('#issue').val("");

      let docService = new DocService();
      let promise = docService.getDocInfobyIssue(issue);

      promise.then(function(response){
        let body = JSON.parse(response);

        template(body);
      });
    //name click
    $('#name-submit').click(function(e) {
      e.preventDefault();
      let issue = $('#name').val();
      $('#name').val("");

      let docService = new DocService();
      let promise = docService.getDocInfobyIssue(issue);

      promise.then(function(response){
        let body = JSON.parse(response);

        template(body);

      });
    

        
      }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
    
  });
});