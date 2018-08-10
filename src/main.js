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

function formatPhoneNumber(s) {
  var s2 = (""+s).replace(/\D/g, '');
  var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}

function latLong(body) {
  let lat = body.results["0"].locations["0"].displayLatLng.lat;
  let lng = body.results["0"].locations["0"].displayLatLng.lng;
  let location = (lat + "," + lng + "," + 5) ;
  return location;
}

function template(body) {
  if (body.meta.total == 0){
    $('#info').append(
      `<div class="card"">
        <div class="card-body">
          <h5 class="card-title">No one matches your search</h5>
          <p class="card-text">Please try again</p>
        </div>
      </div>`); 
  } else {
    for(let i = 0; i < body.data.length; i++) {
      let name = body.data[i].profile.first_name + " " + body.data[i].profile.last_name;
      let bool = patients(body.data[i].practices["0"].accepts_new_patients);
      let number = formatPhoneNumber(body.data[i].practices["0"].phones["0"].number);
      let address = body.data[i].practices["0"].visit_address.street;
      let image = body.data[i].profile.image_url;
      let website = body.data[i].practices["0"].website;       
      
        if (website == undefined){
          website = "";
        }

        $('#info').append(
          `<div class="card" style="width: 14rem;">
            <img class="card-img-top" src="${image}" alt="no pic">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
              <p class="card-text">${address}<br>${number}<br>${bool}<br>${website}</p>
            </div>
          </div>`);  
      }
    }
}

$(document).ready(function() {
  console.log("hey, you should buy Abe a beer sometime!");
    //clear click
    $('#clear-search').click(function(e) {
      e.preventDefault();
      $('.card').remove();
    });

    $('.home').click(function(e) {
      e.preventDefault();
      $('#home-screen').show();
      $('#name-search').hide();
      $('#issue-search').hide();
      $('#clear-search').hide();
    });

    $('.searchSymptom').click(function(e) {
      e.preventDefault();
      $('#home-screen').hide();
      $('#name-search').hide();
      $('#issue-search').show();
      $('#clear-search').show()
    });

    $('.searchName').click(function(e) {
      e.preventDefault();
      $('#home-screen').hide();
      $('#name-search').show();
      $('#issue-search').hide();
      $('#clear-search').show()
    });

    //symptom click
    $('#issue-submit').click(function(e) {
      e.preventDefault();
      let issue = $('#issue').val();
      let city = $('#issue-location').val();
      $('#issue').val("");
      $('#issue-location').val("");

      let docService = new DocService();
      let promise = docService.getLatLong(city);

      promise.then(function(response){
        let body = JSON.parse(response);
        let location = latLong(body);
        
        let docService = new DocService();
        let promise = docService.getDocInfobyIssue(issue, location);

        promise.then(function(response){
          let body = JSON.parse(response);

          template(body);
        });
      });
    });

    $('#name-submit').click(function(e) {
      e.preventDefault();
      let name = $('#name').val();
      let city= $('#name-location').val();
      $('#name').val("");
      $('#name-location').val("");

      let docService = new DocService();
      let promise = docService.getLatLong(city);

      promise.then(function(response){
        let body = JSON.parse(response);

        let location = latLong(body);
        let docService = new DocService();
        let promise = docService.getDocInfobyName(name, location);
        console.log(name);

        promise.then(function(response){
          let body = JSON.parse(response);
          console.log(body);
          template(body);

        });
      });
    });
        
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
  });
