// script hieronder uitgevoerd wanneer document volledig is geladen
$(document).ready(function() {

	// controleer of het geselecteerde element in localStorage volledig is geladen
	if(localStorage.getItem('selected') === null) {
		// zo niet, waarschuw de gebruiker dat deze leeg is en stuur hem door naar de startpagina
		alert('Selecteer een film of serie!');
		window.location.href = '/';
	}

	// haal de geselecteerde film-ID op van localStorage
	const selectedMovie = localStorage.getItem('selected');

	// voeg geselecteerde film-ID en api-sleutel toe aan api-url die json retourneert
	// gebruikte api: http://www.omdbapi.com/
	const apiKey = 'eb1d36ff';
	const apiURL = `http://www.omdbapi.com/?apikey=${apiKey}&plot=full&i=${selectedMovie}`;

	// controleer of de geselecteerde film in localStorage in mijn lijst staat (opgeslagen als opgeslagen films in localStorage)
	if (localStorage.getItem('savedMovies') !== null) {
		// zo ja, verander icoon in #toevoegen knop en voeg de class '.remove' toe
		if (JSON.parse(localStorage.getItem('savedMovies')).includes(selectedMovie)) {
			$("#toevoegen").html('<i class="fas fa-check"></i>').addClass('remove');
		}
	}

	// pak json
	$.ajax({
		method: 'GET',
		url: apiURL,
		dataType: 'json',
		// terugroepen wanneer api-oproep is gelukt
		success: function (res) {
			// toon de geretourneerde json in de console
			console.log(res);

			// controleer of api-reactie waar is
			if (res.Response === 'True') {
				// inhoud invoegen in hoofdelement
				$('main')
					// titel invoegen
					.append(`<h1>${res.Title}</h1>`)
					// Schrijver invoegen
					.append(`<h2>Schrijver: ${res.Writer}</h2>`)
					// Acteur invoegen
					.append(`<h2>Acteurs: ${res.Actors}</h2>`)
					// Details invoegen
					.append(`<h3>${res.Runtime} | ${res.Year} | ${res.Genre} | IMDB Rating: ${res.imdbRating}</h3>`)
					// Ruimte invoegen
					.append('<br><br>')
					// Omschrijving film invoegen
					.append(`<p>${res.Plot}</p>`);

					// filmtitel invoegen in titel van html
					document.title = `${res.Title} | Filmsite (2020)`;
			} else {
				// indien geretourneerd zegt json 'False' toon foutmelding in console
				console.log('Error');
				console.log(`Message : ${res.Error}`);
			}
		},
		// terugroepen wanneer API-oproep is mislukt
		error: function (err) {
			// toon statuscode in console
			console.log(`Error code: ${err.status}`);
			// toon statusfout in console
			console.log(`Error message: ${JSON.parse(err.responseText).Error}`);
		}
	});
});

// UIEvent wanneer #toevoegen klikte
$(document).on('click', '#toevoegen', function() {
	// maak een lege variabele voor alle films in mijn lijst
	let savedMovies = [];

	// huidige filmtitel ophalen
	const movieTitle = $('h1').html();

	// huidige film-ID ophalen
	const selectedMovie = localStorage.getItem('selected');

	// controleer of mijn lijst bestaat in localStorage
	if (localStorage.getItem('savedMovies') !== null) {
		// zo ja, overschrijf de variabele savedMovies met die in localStorage
		savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
	}

	// controleer of #toevoegen de klasse 'remove' heeft
	if($(this).hasClass('remove')) {
		//als #toevoegen klasse 'verwijderen' heeft, verwijder dan huidige film uit mijn lijst

		// krijg de positie van de huidige film in mijn lijst
		const movieIndex = savedMovies.indexOf(selectedMovie);

		// verwijder huidige film uit mijn lijst
		savedMovies.splice(movieIndex, 1);

		// verander de inhoud van #toevoegen en verwijder de klasse 'remove'
		$("#toevoegen").html('<i class="fas fa-plus"></i>').removeClass('remove');
		// show pop up
		$("#pop-up").show();
		// voeg een tekstbericht toe in de pop-up dat de film uit de lijst is verwijderd
		$("#pop-up").text(`${movieTitle} is verwijderd uit je afspeellijst!`);
	} else {
		// als #toevoegen de klasse 'verwijderen' niet heeft, voeg dan huidige film toe aan mijn lijst
		savedMovies.push(selectedMovie);

		// verander de inhoud van #toevoegen en voeg de class 'remove' toe
		$("#toevoegen").html('<i class="fas fa-check"></i>').addClass('remove');		
		// show pop up
		$("#pop-up").show();
		// voeg een sms-bericht toe in de pop-up dat de film aan de lijst is toegevoegd
		$("#pop-up").text(`${movieTitle} is toegevoegd aan je afspeellijst!`);
	}

	// sla de nieuwe lijst op in localStorage als een string
	localStorage.setItem('savedMovies', JSON.stringify(savedMovies));

	// pop-upelement animeren
	$("#pop-up").css({ 'animation': 'slide 1s forwards' });

	// verwijder het pop-up element na 2500ms
	setTimeout(function () {
		$("#pop-up").hide();
	}, 2500)
});

