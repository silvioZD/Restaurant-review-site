// Adding listeners to map - changing the visible area
map.addListener('bounds_changed', function(){ 
    $.each(markers, function (index, marker){ 
        if(map.getBounds().contains(marker.getPosition()) && marker.getVisible()){ // when markers are visible
            marker.getVisible(true);
            $('li:nth-child('+(index+1)+')').removeClass('hide');//when markers are visible on the map, show that restaurants in the list
        } else { // when markers are not visible
            marker.getVisible(false);
            $('li:nth-child('+(index+1)+')').addClass('hide');//when markers are not on the map visible area, remove them from the list
        }
    });  
});
//when we drag the map execute function for searching restaurants in new visible area
map.addListener('dragend', function(event) {
              addRestaurantNearby()
            });

//Adding listeners to map - double click
map.addListener('dblclick', function(event){
    $('#formRestaurant').unbind('submit').submit();//double click on the map opens the form for adding new restaurant
    $('#newRestaurantName').val(''); //input field
    $('#newRestaurantAddress').val('');//input field
    var clickPosition = event.latLng; //get coordinates of clicked position
    $('#form2').modal('open'); 
    // Finding address based on clicked position coordinates using geocoder
    geocoder.geocode({'location': clickPosition}, function(results, status) {
        if (status === 'OK') {
            if (results[0]) {               
                $('#newRestaurantAddress').val(results[0].formatted_address);
        } else {
            window.alert('No results found');
        }
    } else {
        window.alert('Geocoder failed due to: ' + status);
        }
    });



    // Submiting the form
    $('#formRestaurant').submit(function(){
        $('#form2').modal('close'); // closing of form
        var restaurantName = $('#newRestaurantName').val(); 
        var address = $('#newRestaurantAddress').val(); 
        var lat = clickPosition.lat(); 
        var long = clickPosition.lng(); 
        var newRestaurant = new createNewRestaurant(restaurantName, address, lat, long);
        //console.log(newRestaurant);
        var liLength = $('li').length; 
        addRestaurant(newRestaurant, (liLength+1));
        addMarker(clickPosition, (liLength+1).toString(), restaurantName, liLength); 
        $('li').last().find('.restaurantAvgRating').starRating({ 
            initialRating: 3,
            readOnly: true,
            starSize: 20
        });

    });
});
//adding restaurants that are in visible area of the map and in 1km distance from center of the map by request to google places
function addRestaurantNearby(position){
    var request = {
        location: position,
        radius:1000,
        type: ['restaurant'],
        bounds: map.getBounds(),
        //rankBy: google.maps.places.RankBy.RADIUS

    };
    //receiving data from request
    function callback(results, status){
        if(status == google.maps.places.PlacesServiceStatus.OK){
            $.each(results,function(){
                var placeID = {placeId: this.place_id};
                service.getDetails(placeID, function(results, status){
                    if (status == google.maps.places.PlacesServiceStatus.OK){
                    var script = document.createElement('script');
                    script.src = 'data/data.js';
                    document.getElementsByTagName('head')[0].appendChild(script);
                    window.restaurants_callback = function (results) {
                    results = results.results;
                    myRestaurants = [];
                    for (var i = 0; i < results.length; i++) {
                    myRestaurants.push(results[i]);
                    }
                }
                        var ratings = [];
                        var restaurantName = results.name;
                        var address = (results.formatted_address);
                        var lat = results.geometry.location.lat();
                        var lon = results.geometry.location.lng();
                        var location = results.geometry.location;
                        var liIndex = $('li').length;
                        var nbMarker = (liIndex+1).toString();
                        var restaurant = new createNewRestaurant(restaurantName, address, lat, lon);
                        var photos = [];
                        addMarker(location, nbMarker, restaurantName, liIndex);
                        addRestaurant(restaurant, nbMarker);
                        var sumRatings = 0;
                        $.each(results.reviews, function(){
                            var stars = this.rating;
                            var comment = this.text;
                            sumRatings = sumRatings + stars ;
                            var rating = new createNewRating(stars, comment);
                            addRestaurantRatings(rating, nbMarker);
                            ratings.push(rating);
                        });
                        var avgRatings = Math.round(2*sumRatings/ratings.length)/2;
                        $('li').last().find('.restaurantAvgRating').starRating({ 
                            initialRating: avgRatings,
                            readOnly: true,
                            starSize: 20
                        });
                    }
                });
            });
        }
    }
    service.nearbySearch(request, callback);
}

var myRestaurants = [];