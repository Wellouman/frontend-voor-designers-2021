// script hieronder uitgevoerd wanneer document volledig is geladen

$(document).ready(function () {
	// controleer of mijn lijst bestaat in localStorage of dat deze niet leeg is
	if(localStorage.getItem('savedMovies') === null || localStorage.getItem('savedMovies').length < 0) {
		// indien leeg, bericht invoegen in .topFilmsContainer
		$('.topFilmsContainer').html('Empty.');
	} else {
		// haal mijn lijst op van localStorage
		const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));

		// bouw de api-url met lege film id
		// film-ID wordt later ingevoegd
		const apiKey = 'eb1d36ff';
		const apiURL = `http://www.omdbapi.com/?apikey=${apiKey}&plot=full&i=`;

		// toon mijn lijst in console
		console.log(savedMovies);

		// voer een functie uit met elke film-ID in mijn lijst
		savedMovies.forEach(id => {
			// haal de json van elke film in mijn lijst
			$.ajax({
				method: 'GET',
				// film-ID invoegen in de api-url
				url: apiURL + id,
				dataType: 'json',
				// callback when api call is succeed
				success: function (res) {
					// terugbellen wanneer api-oproep is gelukt
					console.log(res);

					// controleer of api-reactie waar is
					if (res.Response === 'True') {
				// voeg de film toe in .topFilmsContainer
				//
				// de film bevat een id die in volgorde wordt gebruikt
				// om het detail te tonen op detailpagina.html
						$('.topFilmsContainer').append(`<a href="detailpagina.html" id="${res.imdbID}"><img src="${res.Poster}" alt="${res.Title}" class="topfilms">`);
					} else {
					// indien geretourneerd zegt json 'False' toon foutmelding in console
						console.log('Error');
						console.log(`Message : ${res.Error}`);
					}
				},
				// terugroepen wanneer API-oproep is mislukt
				error: function (err) {
					// terugbellen wanneer api-oproep is toon statuscode in console
					console.log(`Error code: ${err.status}`);

					// toon statusfout in console
					console.log(`Error message: ${JSON.parse(err.responseText).Error}`);
				}
			});
		});
	}
});


