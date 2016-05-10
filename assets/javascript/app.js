$( document ).ready(function() {
// Initial array of movies
	var emotion = ['happy', 'sad', 'excited', 'bored','hungry','angry'];

	// ========================================================

	// Generic function for capturing the movie name from the data-attribute
	function alertEmotion(){
		$('#gifs').empty();


				
		var newEmotion = $(this).data('name');

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + newEmotion + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({url: queryURL, method: 'GET'}).done(function(response){
			// $("#apiText").text(JSON.stringify(response));
			var results = response.data;
			console.log(results)
                for (var i = 0; i < results.length; i++) {


                	var emotionDiv = $('<div class="emotionSet">')
                	var p = $('<p>').text("Rating: " + results[i].rating)
                	var emotionImage = $('<img>');
                	emotionImage.attr('src', results[i].images.fixed_height_still.url);
                	emotionImage.attr('data-still', results[i].images.fixed_height_still.url);
                	emotionImage.attr('data-animate', results[i].images.fixed_height.url);
                	emotionImage.attr('data-state',"still");
                	emotionImage.attr('id','gif-' + i);
                	emotionImage.addClass('emotionGif');
                	emotionDiv.append(p)
                    emotionDiv.append(emotionImage)
                     $('#gifs').append(emotionDiv);

                    // var state = $(this).attr('data-state'); 
                    // console.log(state);

              //       if (state == 'still'){
		            //     $(this).attr('src', $(this).data('animate'));
		            //     $(this).attr('data-state', 'animate');
		            // }else{
		            //     $(this).attr('src', $(this).data('still'));
		            //     $(this).attr('data-state', 'still');
		            // }

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

	}
	function startStop() {
		  var state = $(this).attr('data-state'); 
          console.log("here state" + state);
		  if (state == 'still'){
		                $(this).attr('src', $(this).data('animate'));
		                $(this).attr('data-state', 'animate');
		            }else{
		                $(this).attr('src', $(this).data('still'));
		                $(this).attr('data-state', 'still');
		            }
	// 	

	}
	// ========================================================

	// This function handles events where one button is clicked
	$('#addEmotion').on('click', function(event){
		event.preventDefault();
		$('#gifButtons').empty();
		var val = $('.form-control').val();
		emotion.push(val);
		$('.form-control').val('');
		renderButtons();

	});


	//$('.emotionGif').on('click', function(){
		//  console.log("I am clicking");
	// 	
		 

	// ========================================================
	// ========================================================

	// Generic function for displaying the movieInfo

	// BAD CODE = won't work for ne wbuttons (can't capture elements generated dynamically) 
	// $('.movie').on('click', alertMovieName); 

	// GOOD CODE = will work for both the original buttons and all of the new buttons
	$(document).on('click', '.emotion', alertEmotion);
		
	$(document).on('click', '.emotionGif', startStop);
	// ========================================================
	// This calls the renderButtons() function
	renderButtons();



})