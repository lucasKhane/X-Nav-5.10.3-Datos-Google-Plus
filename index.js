
// mi api key
var apiKey = 'AIzaSyAgWBFqAZiLQ4fK9YqQE0wzTYg5KkddSUs';

function handleClientLoad() {
  console.log("3.-Cargamos la clave de google");
  gapi.client.setApiKey(apiKey);
  makeApiCall();
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  console.log("4.-Cargamos la aplicacion y la llamamos");
  gapi.client.load('plus', 'v1', function() {
    var request1 = gapi.client.plus.people.get({
      'userId': '108086881826934773478'
      // o 103846222472267112072
    });
    request1.execute(function(resp) {
      console.log("5.-Tratamos de ejecutar la peticion people.get");
      var heading = document.createElement('h4');
      var image = document.createElement('img');
      image.src = resp.image.url;
      heading.appendChild(image);
      heading.appendChild(document.createTextNode(resp.displayName));

      document.getElementById('content').appendChild(heading);
    });
    var request2 = gapi.client.plus.activities.list({
       'userId' : '108086881826934773478', 'collection' : 'public'
    });
    request2.execute(function(resp) {
      console.log("6.-Tratamos de ejecutar la peticion activities.list");
      var numItems = resp.items.length;
      for (var i = 0; i < numItems; i++) {
        //Sacamos la info (content, image, and latitude...si lo hubiera)
        console.log('ID: ' + resp.items[i].id);
        var imagen = "";
        var lat = "";
        var long = "";
        if (typeof(resp.items[i].object.attachments) != "undefined") {
            if (typeof(resp.items[i].object.attachments[0].image) != "undefined") {
              imagen = "<img src="+resp.items[i].object.attachments[0].image.url+">";
            }
        }
        if (typeof(resp.items[i].location) != "undefined"){
          lat = resp.items[i].location.position.latitude;
          long = resp.items[i].location.position.longitude;
        }
        var activity = "<p><b>GEOLOCALIZACION: ("+lat+" , "+long+")</b></p><p>"+resp.items[i].object.content+"</p><p>"+imagen+"</p>";

        //console.log("Content:" +activity);
        //Lo metemos en el dom
        var heading = document.createElement("a"+i);
        heading.innerHTML = activity;
        document.getElementById('content').appendChild(heading);
      }
            //activity.getObject().getContent());

    });
  });
};

$(document).ready(function() {
  console.log("1.-DOM cargado");
  $("#get").click(function() {
    console.log("2.-Boton clickeado");
    handleClientLoad();
  });
});
