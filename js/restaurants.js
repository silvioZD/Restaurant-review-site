
//function for adding restaurant on the list
function addRestaurant(thatRestaurant, nbMarker){
    var li = $('<li/>').addClass('row').attr('tabindex', -1).appendTo($("ul"));//add list to ul 
    var liHeader = $('<div/>').addClass('collapsible-header').appendTo(li);//add header(title) to list
    var leftCol = $('<div/>').addClass('col s8').appendTo(liHeader);
    var leftRow = $('<div/>').addClass('row').appendTo(leftCol);
    $('<div/>').addClass('col s10').text(thatRestaurant.restaurantName).appendTo(leftRow);//adding restaurant name
    $('<div/>').addClass('col s12').text(thatRestaurant.address).appendTo(leftRow);//adding restaurant address
    $('<div/>').addClass('col s12 restaurantAvgRating').appendTo(leftRow);
    var newRating = $('<div/>').addClass('col s12 newRating').appendTo(leftRow);
    var btnNewRating = $('<a/>').addClass('waves-effect waves-light btn btnNewRating modal-trigger').attr('href', '#form1').appendTo(newRating);
    $('<i/>').text('add').appendTo(btnNewRating);
    var restaurantLocation = "location="+thatRestaurant.lat+","+thatRestaurant.long;
    var rightCol = $('<div/>').addClass('col s4 valign-wrapper').appendTo(liHeader);
    $('<img>').addClass('streetview').attr('src', 'https://maps.googleapis.com/maps/api/streetview?size=400x400&key=AIzaSyB5rO7Fil0M1CxYDNVHC0_HTLtub4IuFbw&'+restaurantLocation).appendTo(rightCol);
    var liBody = $('<div/>').addClass('col s12').addClass('collapsible-body').appendTo(li);
    $('<div/>').addClass('row restaurantRatings').appendTo(liBody);
}

function addRestaurantRatings(ratings, nthChildLi){
    var rowRestaurantRatings = $('li:nth-child('+nthChildLi+')').find('.restaurantRatings');
    var colRestaurantRatings = $('<div>').addClass('col s12 colRestaurantRatings').appendTo(rowRestaurantRatings);
    $('<div/>').addClass('ratingsRestaurant').starRating({initialRating: ratings.stars, readOnly: true, starSize: 12}).appendTo(colRestaurantRatings);
    $('<span/>').addClass('commentsRestaurant').text(ratings.comment).appendTo(colRestaurantRatings);
}
function createNewRestaurant(restaurantName, address, lat, long) {
   this.restaurantName = restaurantName;
   this.address = address;
   this.lat = lat;
   this.long = long;
}
function createNewRating(stars, comment){
    this.stars = stars;
    this.comment = comment;
}
function addnewRestaurantRatings(liIndex){
    var stars = Number($('#starsForm').starRating('getRating')); 
    var comment = $('#newRatingForm').val(); 
    var rating = new createNewRating(stars, comment); 
    addRestaurantRatings(rating, (liIndex+1)); 
    $('#starsForm').starRating('setRating', 3); 
    $('#newRatingForm').val(''); 
    var sumRatings = 0; 
    $('li:nth-child('+(liIndex+1)+')').find('.ratingsRestaurant').each(function(){
        sumRatings = sumRatings + Number($(this).starRating('getRating'));
    }) 
    var avgRatings = Math.round(2*(sumRatings / $('li:nth-child('+(liIndex+1)+')').find('.ratingsRestaurant').length))/2;
    $('li:nth-child('+(liIndex+1)+')').find('.restaurantAvgRating').starRating('setRating', avgRatings);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

