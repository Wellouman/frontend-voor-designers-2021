// UIEvent wanneer op filmelement in .topFilmsContainer wordt geklikt
$(document).on('click', '.topFilmsContainer a', function(e) {
	// haal de film-ID van het aangeklikte element
	const movieID = $(this).attr('id');
	// stop het standaardgedrag van <a> element en
	// voorkomen dat de browser de gebruiker naar een andere pagina leidt
	e.preventDefault();

	// als de gebruiker eerder een film heeft geselecteerd, verwijder die film dan uit de localStorage
	if(localStorage.getItem('selected') !== null) {
		localStorage.removeItem('selected');
	}

	// zet de geselecteerde film in localStorage
	localStorage.setItem('selected', movieID);

	// gebruiker naar andere pagina leiden
	window.location.href = 'detailpagina.html';
});