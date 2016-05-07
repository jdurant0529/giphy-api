$( document ).ready(function() {
// Initial array of movies
	var emotion = ['happy', 'sad', 'excited', 'laughing'];

	// ========================================================

	// Generic function for capturing the movie name from the data-attribute
	function alertEmotion(){
		$('#gifs').empty();


				
		var newEmotion = $(this).data('name');

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + newEmotion + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({url: queryURL, method: 'GET'}).done(function(response){
			//$("#apiText").text(JSON.stringify(response));
			var results = response.data;
			console.log(results)
                for (var i = 0; i < results.length; i++) {


                	var emotionDiv = $('<div class="emotion">')
                	var p = $('<p>').text("Rating: " + results[i].rating)
                	var emotionImage = $('<img>');
                	emotionImage.attr('src', results[i].images.fixed_height.url);
                	emotionDiv.append(p)
                    emotionDiv.append(emotionImage)
                     $('#gifs').prepend(emotionDiv);


					// var imageUrl = response.data.image_original_url;
					// var emotionImage = $("<img>");
					// emotionImage.attr('src', imageUrl);
					// emotionImage.attr('alt', 'emotion image');
					// $('#gifs').prepend(emotionImage);
				}
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
	$(document).on('click', '.emotion', alertEmotion);
		

	// ========================================================
	// This calls the renderButtons() function
	renderButtons();



})