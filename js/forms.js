ratings.init();

// Defining index variable
var liIndex = '';
$(document).ready(function(){
	$('#starsForm').starRating({initialRating: 3, starSize: 25, disableAfterRate: false});
	
    $('#form1').modal({
    	ready: function(modal, trigger) { 
        liIndex = $(trigger).closest('li').index();
      	}
	});
	$('#form2').modal();
});


$('#formRating').submit(function(){
	$('#form1').modal('close'); //closing the form
	addnewRestaurantRatings(liIndex); 
});
