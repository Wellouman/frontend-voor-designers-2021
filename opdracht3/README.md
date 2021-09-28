# Filmsite
Een filmsite waarbij een gebruiker films kan zoeken. Deze films kunnen vervolgens aan de kijklijst worden toegevoegd en verwijderd. Zo kan een gebruiker films aangeven die hij/zij graag wilt zien in de toekomst.
Link: [link]
<br>
<br>

## Interface

Een aantal states van de UI stack worden opgevangen en zijn vormgegeven.
<br>
De volgende States van de UI stack worden opgevangen:

- Ideal state - In de Ideal state worden een aantal films laten zien die de website te bieden heeft zodat de gebruiker weet waar hij zich bevind.

- Empty state - In de empty state wordt de gebruiker erop gewezen dat hij/zij kan zoeken door middel van een tekstje onder de zoekbalk.

- Partial state - wanneer een gebruiker een zoekwoord heeft ingetypt worden de desbetreffende resultaten laten zien.

- Error state - Wanneer een gebruiker niet gericht genoeg zoekt komt er een error state waarin wordt verteld wat de gebruiker verkeerd doet.
<br>
<br>

In de demo maak je gebruik van meerdere UI events zodat gebruikers je ontwerp op verschillende manieren kunnen bedienen.

- UI event 1 - search bar<br>
De search bar zit linksboven in het scherm op de homepagina. Wanneer een gebruiker hierop klikt moet hij/zij meer dan 1 character invullen om resultaten te laten zien. Wanneer er teveel resultaten zijn om te laden wordt er een error message gegeven. De gebruiker zal gerichter moeten zoeken.

- UI event 2 - Toevoegen aan kijklijst<br>
Wanneer een gebruiker naar de detailpagina van een film/serie gaat heeft hij/zij de mogelijkheid om deze toe te voegen aan de kijklijst met een button. De gebruiker krijgt feedback dat de film is toegevoegd. De film is bij deze toegevoegd aan de kijklijst pagina. De button veranderd ook naar een vinkje.

- UI event 3 - Verwijderen van kijklijst<br>
Binnen de kijklijst staan al de toegevoegde films/series. Deze kunnen ook weer verwijderd worden door naar de detailpagina te gaan en opnieuw op de knop te klikken met het vinkje waardoor de film wordt verwijderd van de kijklijst.

In de demo dien je rekening te houden met de interface design principles 04, 08, 09 & 11 van Principles of User Interface Design.

- 04 Keep users in control<br>
De gebruiker heeft de mogelijkheid om zelf opzoek te gaan naar verschillende films die hij zij wilt bekijken. Een gebruiker heeft daarbij de optie om deze film aan zijn eigen filmlijst toe te voegen of te verwijderen, met duidelijke feedback dat deze handeling is uitgevoerd.

- 08 Provide a natural next step<br>
Na de zoekfunctie gebruikt te hebben worden de resultaten getoond. Op het moment dat een gebruiker klikt op een film/serie komt de volgende stap; de detailpagina met informatie en optie om toe te voegen aan je kijklijst.

- 09 Appearance follows behavior<br>
Uiteraard heb ik ervoor gezorgd dat de user interface eruit ziet zoals bekend bij gebruikers. Een zoekbalk lijkt op een zoekbalk en de button om toe te voegen aan je kijklijst is empowered met een icon zodat het meteen duidelijk is wat een gebruiker doet met deze knop.

- 11 Strong visual hierarchies work best<br>
De visuele hiërarchie die ik bijna voor alle projecten gebruik is Left to right. Op dezelfde manier als dat je een boek leest horen gebruikers ook mijn website te bekijken en te lezen. Alle elementen beginnen links ( Navigatie, films, tekstuele elementen), en er wordt gebruik onderscheid gemaakt van betiteling, ondertitels en alinea’s door middel van font grootte en gewicht.
<br>
<br>

## Code


De uitwerking van mijn ontwerp wordt gedaan in een browser op desktop.
De data wordt van een externe bron ingeladen met Javascript.
Dit ga ik doen door middel van Ajax request. Zie volgende bron: https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started
Verder gebruik ik de JavaScrtipt library, jQuery (bron: https://jquery.com/), die het process van Ajax request en html manipulatie (toevoegen, css animatie, animatie, etc) gemakkelijker maakt.

Bij ideal state worden aantal films/series opgehaald uit de externe bron door middel van ajax request. De API stuurt voor elke request 10 films terug. De teruggekregen data voeg ik toe in de main container met de jQuery functie `$('.topFilmsContainer').append()`. De functie voeg stukje text of html elementen toe in het einde van geselecteerde html element op de pagina.

De gebruikers kunnen naar films of series zoeken door middel van de zoekbalk bovenaan op de pagina. Wanneer de zoekknop wordt gedrukt dan wordt er nieuwe data's opgehaald op basis van de trefwoord die zij hebben ingevuld. De oude films haal ik weg en die vervangen met de nieuwe films.

Op detail pagina worden de gegevens van weer uit hetzelfde bron gehaald met speciefiek ID zodat de API de juiste data van een film kan terugsturen. Op de pagina staat ook een + knop om film/series toe te voegen in een lijst. De ID van de film worden opgeslagen in een lijst die in de `localStorage` staat. Deze films/series zijn weer terug te zien op de pagina 'Mijn lijst'. Op die pagina worden de IDs van de films/series gelezen en de data van de films/series worden opgehaald uit de externe bron op basis van de IDs. 

Wanneer een film al in een list staat, dan zie je een vinkje in plaats van een + op de detail pagina. Wanneer dit is gedrukt, de code kijkt of de film ID in het lijst al staat. Zo nee, wordt de ID toegevoegd in de lijst. Zo ja, de ID wordt verwijderd uit de lijst. De icon en de melding op de detail pagina verandert ook wanneer je een film toevoegt of verwijdert.
