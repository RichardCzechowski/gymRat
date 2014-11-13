$(document).ready(function(){
apiKey= "AIzaSyBoupBlVFMHSqx-IJT2KXSiYHA40T4pNVg";

        var map;
        var infowindow;
        var userLoc = {};

        navigator.geolocation.getCurrentPosition(function(position) {
          userLoc.lat = position.coords.latitude;
          userLoc.lon = position.coords.longitude;
          console.log(userLoc.lat+" "+userLoc.lon)
          initialize();
          });

        function initialize() {
          var userLocation = new google.maps.LatLng(userLoc.lat, userLoc.lon);

          map = new google.maps.Map(document.getElementById('map-canvas'), {
            center: userLocation,
            zoom: 15
            });

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
              console.log(results[0].name)
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
                 })
