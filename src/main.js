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
        $('.showDoc').text(`Doctors who can help with ${issue} is ${body.main.humidity}%`);
        // for(let i = 0; i < body.length; i++) {

        // }

        console.log(body);
      }, function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
    
  });
});