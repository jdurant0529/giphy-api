$( document ).ready(function() {
// Initial array of movies
	var emotion = ['happy', 'sad', 'excited', 'laughing'];

	// ========================================================

	// Generic function for capturing the movie name from the data-attribute
	function alertMovieName(){
		var newEmotion = $(this).data('name');

		alert (newEmotion);
	
		//var movie = $('#movie-input').val();

		var queryURL = "http://www.omdbapi.com/?t=" + newEmotion + "&y=&plot=short&r=json";

		$.ajax({url: queryURL, method: 'GET'}).done(function(response){
			$("#apiText").text(JSON.stringify(response));

		//renderButtons();
    });
		return false;
	}

	// ========================================================
// ========================================================

	// Generic function for displaying movie data 
	function renderButtons(){ 
		for (var i = 0; i < emotion.length; i++) {    // start for loop to create anwer option buttons
			    var b = $('<button>');
			    b.addClass('emotion');
			    b.addClass('btn btn-info');
			    b.text(emotion[i]);
			    b.attr('data-name', emotion[i]);
			    b.attr('id',i);
			    $("#gifButtons").append(b); 
			}          
		// YOUR CODE GOES HERE


	}

	// ========================================================

	// This function handles events where one button is clicked
	$('#addEmotion').on('click', function(event){
		event.preventDefault();
		$('#gifButtons').empty();
		var val = $('.form-control').val();

		emotion.push(val);

		renderButtons();

	})



	// ========================================================
	// ========================================================

	// Generic function for displaying the movieInfo

	// BAD CODE = won't work for ne wbuttons (can't capture elements generated dynamically) 
	// $('.movie').on('click', alertMovieName); 

	// GOOD CODE = will work for both the original buttons and all of the new buttons
	$(document).on('click', '.movie', alertMovieName);
		

	// ========================================================
	// This calls the renderButtons() function
	renderButtons();



})