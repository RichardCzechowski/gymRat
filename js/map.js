$(document).ready(function(){
  apiKey= "AIzaSyBoupBlVFMHSqx-IJT2KXSiYHA40T4pNVg";

  var map;
  var infowindow;
  var userLoc = {};

  var    main_color = '#2d313f',
  saturation_value= -20,
  brightness_value= 5;

  var styles= [{"featureType":"road","stylers":[{"hue":"#5e00ff"},{"saturation":-79}]},{"featureType":"poi","stylers":[{"saturation":-78},{"hue":"#6600ff"},{"lightness":-47},{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"lightness":22}]},{"featureType":"landscape","stylers":[{"hue":"#6600ff"},{"saturation":-11}]},{},{},{"featureType":"water","stylers":[{"saturation":-65},{"hue":"#1900ff"},{"lightness":8}]},{"featureType":"road.local","stylers":[{"weight":1.3},{"lightness":30}]},{"featureType":"transit","stylers":[{"visibility":"simplified"},{"hue":"#5e00ff"},{"saturation":-16}]},{"featureType":"transit.line","stylers":[{"saturation":-72}]},{}] 

  navigator.geolocation.getCurrentPosition(function(position) {
    userLoc.lat = position.coords.latitude;
    userLoc.lon = position.coords.longitude;
    console.log(userLoc.lat+" "+userLoc.lon)
    initialize();
  });

  function initialize() {
    var styledMap = new google.maps.StyledMapType(styles, {name: "Gym-Map"});

    var userLocation = new google.maps.LatLng(userLoc.lat, userLoc.lon);

    map = new google.maps.Map(document.getElementById('map-canvas'), {
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      },
      center: userLocation,
      zoom: 15
    });

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    var request = {
      location: userLocation,
      radius: 5000,
      types: ['gym']
    };
    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }

  function callback(results, status) {
      initHandlebars(results);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

  function createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }

  google.maps.event.addDomListener(window, 'load');

  
  //END GOOGLE MAPS //////

function  initHandlebars(gymResults){
  console.log(gymResults.slice(0,5 ));
var locations = {location : gymResults.slice(0,5)};
console.log(locations.location[1].name)
 var source   = $("#entry-template").html();
 var template = Handlebars.compile(source);
 $('#handlebars').append(template(locations));
  }

})
