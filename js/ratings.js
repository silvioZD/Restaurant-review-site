var ratings = {
	
	init: function(){
		var starSelectRow = $('<div/>').addClass('row').appendTo($('#starSelection')); 
		$('<div/>').addClass('col s12 center-align').text('Filter the list of the restaurants').appendTo(starSelectRow);
		
		$('<div/>').addClass('col s6 center-align').attr('id', 'starMin').starRating({
			initialRating: 0,
			starSize: 20, 
			disableAfterRate: false,
			callback: function(currentRating, $el){
				if(currentRating > Number($('#starMax').starRating('getRating'))){
					$('#starMax').starRating('setRating', currentRating);
				}
			}
		}).appendTo(starSelectRow);
		
		$('<div/>').addClass('col s6 center-align').attr('id', 'starMax').starRating({
			initialRating: 5,
			starSize: 20,
			disableAfterRate: false,
			callback: function(currentRating, $el){
				if(currentRating < Number($('#starMin').starRating('getRating'))){
					$('#starMin').starRating('setRating', currentRating);
				}
			}
		}).appendTo(starSelectRow);
		
		var divBtnStarSelect = $('<div/>').addClass('col s12 center-align divBtnStarSelect').appendTo(starSelectRow);
		$('<a/>').addClass('waves-effect waves-light btn').attr('id', "btnStarSelect").text('Find').appendTo(divBtnStarSelect);
		$('#btnStarSelect').on('click', function(){
			var minStar = Number($('#starMin').starRating('getRating')); 
			var maxStar = Number($('#starMax').starRating('getRating')); 
			$('li').each(function(index){ 
				var thatStartRating =Number($(this).find('.restaurantAvgRating').starRating('getRating'));
				if ((thatStartRating<minStar || thatStartRating>maxStar)){ 
					$(this).addClass('hide'); 
					markers[index].setVisible(false); 
				} else{	
					if($(this).hasClass('hide') && map.getBounds().contains(markers[index].getPosition())){
						$(this).removeClass('hide');
						markers[index].setVisible(true);
					}else if($(this).hasClass('hide')){
						markers[index].setVisible(true);
					};
				}
			});
		});
	}
}