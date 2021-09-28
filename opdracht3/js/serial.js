// Ideal State
$(document).ready(function() {
	const searchKeyword = 'mother';
	const apiKey = 'eb1d36ff';

	// voeg invoer en api-sleutel toe aan api-url die json retourneert
	// gebruikte api: http://www.omdbapi.com/
	const apiURL = `http://www.omdbapi.com/?apikey=${apiKey}&type=series&s=${searchKeyword}&page=1`;

	// pak json
	$.ajax({
		method: 'GET',
		url: apiURL,
		dataType: 'json',
		// terugroepen wanneer api-oproep is gelukt
		success: function(res) {
			// controleer of api-reactie waar is
			if(res.Response === 'True') {
				// teruggestuurde films invoegen in een variabele (array)
				const searchResults = res.Search;

				// lege .topFilmsContainer
				$('.topFilmsContainer').html('');
				
				searchResults.forEach((result, index) => {
					// voeg elke film toe in .topFilmsContainer
					//
					// elke film bevat een id die op volgorde wordt gebruikt
					// om de juiste film te tonen op detailpagina.html
					$('.topFilmsContainer').append(`
						<a href="detailpagina.html" id="${result.imdbID}">
							<img src="${result.Poster}" alt="${result.Title}" class="topfilms">
						</a>
					`);
				});
			} else {
				// indien geretourneerd zegt json 'False', voeg een foutmelding in .topFilmsContainer in
				$('.topFilmsContainer').html(`
					<h1>
						Error
						<br>
						Error message: ${res.Error}
					</h1>
				`);
			}
		},
		// terugbellen wanneer api-oproep is gelukt
		error: function(err) {
			// toon statuscode in console
			console.log(`Error code: ${err.status}`);
			// toon statusfout in console
			console.log(`Error message: ${JSON.parse(err.responseText).Error}`);
		}
	});

});

// UIevent wanneer op .searchButton werd geklikt
$(document).on('click', '.searchButton', function (e) {
	// waarde ophalen uit invoervak
	const searchKeyword = $('.searchKeyword').val();
	const apiKey = 'eb1d36ff';

	// voeg invoer en api-sleutel toe aan api-url die json retourneert
	// gebruikte api: http://www.omdbapi.com/
	const apiURL = `http://www.omdbapi.com/?apikey=${apiKey}&type=series&s=${searchKeyword}`;

	// ingevoerde tekst moet minimaal 1 teken bevatten
	if (searchKeyword.length > 1) {

		// pak json
		$.ajax({
			method: 'GET',
			url: apiURL,
			dataType: 'json',
			// callback when api call is succeed
			success: function (res) {
				// check if api response is true
				if (res.Response === 'True') {
					// insert returned series in a variable (array)
					const searchResults = res.Search;

					// empty .topFilmsContainer
					$('.topFilmsContainer').html('');

					searchResults.forEach((result, index) => {
						// voeg elke serie toe in .topFilmsContainer
						//
						// elke serie bevat een id die in volgorde wordt gebruikt
						// om de juiste serie te tonen op detailpagina.html
						$('.topFilmsContainer').append(`
							<a href="detailpagina.html" id="${result.imdbID}">
								<img src="${result.Poster}" alt="${result.Title}" class="topfilms">
							</a>
						`);
					});
				} else {
					// indien geretourneerd zegt json 'False', voeg een foutmelding in .topFilmsContainer in
					$('.topFilmsContainer').html(`
						<h1>
							Error
							<br>
							Error message: ${res.Error}
						</h1>
					`);
				}
			},
			// terugbellen wanneer api-oproep is gelukt
			error: function (err) {
				// toon statuscode in console
				console.log(`Error code: ${err.status}`);
				// toon statusfout in console
				console.log(`Error message: ${JSON.parse(err.responseText).Error}`);
			}
		});
	} else {
		// waarschuw gebruiker dat zoekwoord te kort is
		alert('Keyword is too short');
	}
});