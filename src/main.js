import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { DocService } from'./doc-service.js';

$(document).ready(function() {
  console.log("hey, you should buy Abe a beer sometime!");

    $('#issue-submit').click(function(e) {
      e.preventDefault();
      let issue = $('#issue').val();
      $('#issue').val("");

      let docService = new DocService();
      let promise = docService.getDocInfobyIssue(issue);

      promise.then(function(response){
        let body = JSON.parse(response);
        $('.showDoc').text(`${body.data["0"].profile.first_name} ${body.data["0"].profile.last_name} who can help with ${issue}`);
        for(let i = 0; i < body.data.length; i++) {
        let name = body.data[i].profile.first_name + "" + body.data[i].profile.last_name
         let bool = body.data[i].practices["0"].accepts_new_patients
         let number = body.data[i].practices["0"].phones["0"].number;
         let address = body.data[i].practices["0"].visit_address.street
         let image = body.data[i].profile.image_url
         let website = body.data[i].practices["0"].website
         
         if (bool == true){
          bool = "Accepting patients";
          } else {
          bool = "Not Accepting Patients";
          }

          if (website == undefined){
            website = "";
          }

          $('#info').append(
            `<div class="info">
              ${name}<br>
              <img src='${image}'> <br>
              ${number} <br> ${address} <br>
              ${bool} <br> ${website} `);

            

        }

        console.log(body);
      }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
    
  });
});