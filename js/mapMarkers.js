
var map;
var geocoder;
var service;

//function for creating new google map
function initMap(){
	var Position = {lat: 51.898291, lng: -8.473279};
	map = new google.maps.Map(document.getElementById('map'), {
	zoom: 16,
	center: Position
	});
	geocoder = new google.maps.Geocoder();
    service = new google.maps.places.PlacesService(map);
    infowindow = new google.maps.InfoWindow();

    // Using html geolocation to find current position
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
            addRestaurantNearby(pos);
            var markerX = new google.maps.Marker({//marker for user position
                position: pos,
                map:map,
                icon:'smiley.png',
                animation: google.maps.Animation.BOUNCE
            });
        },
        function() {
        handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        addRestaurantNearby();
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        var infoWindow = new google.maps.InfoWindow({map: map});
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }
}
//markers of the restaurants
var markers = new Array();
function addMarker(markerPosition, label, title, indexLi){
    var marker = new google.maps.Marker({
        position: markerPosition,
        title: title,
        map: map,
        animation: google.maps.Animation.DROP
    });
    
    markers.push(marker); 
    google.maps.event.addListener(marker, 'click', function(event){//action on clicking the marker
    var latitude = event.latLng.lat();//getting position of the clicked marker
    var longitude = event.latLng.lng();
    var locationX = "location="+latitude+","+longitude+'""'+'>';
    var image ='<img src="https://maps.googleapis.com/maps/api/streetview?size=150x150&key=AIzaSyD-er0sQjPv9N-thGg5fNl_zKF_KAZwtXI&';
    var picture = image.concat(locationX);
    $('.collapsible').collapsible('open', indexLi);
    infowindow.setContent(title+'<br> '+picture),//setting up content for info window
    infowindow.open(map, marker); 
    
});
 
}


            

                



      
    


        
