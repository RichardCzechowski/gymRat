$(document).ready(function(){
  apiKey= "AIzaSyBoupBlVFMHSqx-IJT2KXSiYHA40T4pNVg";
  //
  //init necessary variables
  var map;
  var infowindow;
  var userLoc = {};

  var main_color = '#2d313f',
  saturation_value= -20,
  brightness_value= 5;

  var styles= [ 
    {
    //don't show highways lables on the map
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [
      {visibility: "off"}
    ]
  }, 
  {
    //set highway colors/brightness/saturation
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      { hue: main_color },
      { visibility: "on" }, 
      { lightness: brightness_value }, 
      { saturation: saturation_value }
    ]
  }, 

  // other elements style here
  ];


  navigator.geolocation.getCurrentPosition(function(position) {
    userLoc.lat = position.coords.latitude;
    userLoc.lon = position.coords.longitude;
    console.log(userLoc.lat+" "+userLoc.lon)
    initialize();
  });

  function initialize() {
    // Create an array of styles.
    var styles = [
      {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -20 }
      ]
    },{
      featureType: "road",
      elementType: "geometry",
      stylers: [
        { lightness: 100 },
        { visibility: "simplified" }
      ]
    },{
      featureType: "road",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
    }
    ];

    var userLocation = new google.maps.LatLng(userLoc.lat, userLoc.lon);
    var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});

    map = new google.maps.Map(document.getElementById('map-canvas'), {
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
      }
      center: userLocation,
      zoom: 15
    });
    var request = {
      location: userLocation,
      radius: 5000,
      types: ['gym']
    };

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

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
