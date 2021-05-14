/*
Co budeme dělat:

1) Do prvku s id="recepty" vygenerujeme z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.

2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
by se měl seznam receptů vyfiltrovat podle hledaného slova.

3) Doplň filtrovanání receptů podle kategorie.

4) Doplň řazení receptů podle hodnocení.

5) DOMÁCÍ ÚKOL:
Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
recept-hodnoceni, recept-nazev, recept-popis.
*/

/*
<div class="recept">
	<div class="recept-obrazek">
		<img src="https://ms2.ostium.cz/instance/web-recepty/j1cFHt79/h389w574t.jpg" alt="Obrazek">
	</div>

	<div class="recept-info">
		<h3>Halloumi z grilu na salátu</h3>
	</div>
</div>
*/


let nalezeneRecepty = recepty;


// po spusteni stranky zobrazime seznam receptu
zobrazSeznamReceptu();




function vytvorRecept(recept, index) {

	let receptElement = document.createElement('div');
	receptElement.classList.add('recept');

	let obrazekElement = document.createElement('div');
	obrazekElement.classList.add('recept-obrazek');
	receptElement.appendChild(obrazekElement);

	let imgElement = document.createElement('img');
	obrazekElement.appendChild(imgElement);

	let infoElement = document.createElement('div');
	infoElement.classList.add('recept-info');
	receptElement.appendChild(infoElement);

	let nazevElement = document.createElement('h3');
	infoElement.appendChild(nazevElement);

	imgElement.src = recept.img;
	imgElement.alt = 'foto receptu ' + recept.nadpis;
	nazevElement.textContent = recept.nadpis;

	receptElement.addEventListener('click', () => {
		detailReceptu(index);
	});

	return receptElement;
}
/*
<div id="recept-detail" class="recept-detail">
                <div class="recept-detail-obrazek">
                        <img id="recept-foto" src="sem-doplnit-adresu-obrazku.jpg" alt="">
                </div>

                <div class="recept-detail-info">
                    <header>
                        <div class="recept-kategorie">
                            <span class="fas fa-tag"></span> Kategorie:
                            <span class="hodnota" id="recept-kategorie"><!-- sem se bude doplňovat --></span>
                        </div>
                        <div class="recept-hodnoceni">
                            <span class="far fa-star"></span>
                            <span class="hodnota" id="recept-hodnoceni"><!-- sem se bude doplňovat --></span>
                        </div>
                    </header>

                    <h1 id="recept-nazev"><!-- sem se bude doplňovat --></h1>

                    <p id="recept-popis"><!-- sem se bude doplňovat --></p>

                    <!-- <button class="tlacitko tlacitko-odebrat">Smazat recept</button> -->
                </div>
            </div>
*/
function detailReceptu(indexReceptu) {
	let detailWrapper = document.querySelector('#recept-detail');
	detailWrapper.innerHTML = null;

	let obrazekWrapper = document.createElement('div');
	obrazekWrapper.classList.add('recept-detail-obrazek');

	let obrazekElement = document.createElement('img');
	obrazekElement.src = nalezeneRecepty[indexReceptu].img;
	obrazekElement.setAttribute('alt', nalezeneRecepty[indexReceptu].nadpis);

	obrazekWrapper.appendChild(obrazekElement);

	let infoWrapper = document.createElement('div');
	infoWrapper.classList.add('recept-detail-info');
	
	let headerInfo = 
	`<header>
		<div class="recept-kategorie">
			<span class="fas fa-tag"></span> Kategorie:
			<span class="hodnota" id="recept-kategorie">${nalezeneRecepty[indexReceptu].kategorie}</span>
		</div>
		<div class="recept-hodnoceni">
			<span class="far fa-star"></span>
			<span class="hodnota" id="recept-hodnoceni">${nalezeneRecepty[indexReceptu].hodnoceni}</span>
		</div>
	</header>`;

	let nazevReceptu = document.createElement('h1');
	nazevReceptu.innerHTML = nalezeneRecepty[indexReceptu].nadpis;

	let popisReceptu = document.createElement('p');
	popisReceptu.innerHTML = nalezeneRecepty[indexReceptu].popis;

	infoWrapper.innerHTML = headerInfo;
	infoWrapper.appendChild(nazevReceptu);
	infoWrapper.appendChild(popisReceptu);
	
	detailWrapper.appendChild(obrazekWrapper);
	detailWrapper.appendChild(infoWrapper);
}


function zobrazSeznamReceptu() {
	let seznam = document.querySelector('#recepty');

	seznam.textContent = '';

	if (nalezeneRecepty.length > 0) {

		for (let i = 0; i < nalezeneRecepty.length; i++) {
			seznam.appendChild(vytvorRecept(nalezeneRecepty[i], i));
		}

	} else {

		seznam.textContent = 'Nic jsme nenašli';

	}
}


function hledat() {

	let hledaniNazev = document.querySelector('#hledat').value.toLowerCase();
	let hledaniKategorie = document.querySelector('#kategorie').value;
	let razeni = document.querySelector('#razeni').value;

	// hledame nazev receptu
	nalezeneRecepty = recepty.filter(recept => recept.nadpis.toLowerCase().includes(hledaniNazev));

	// hledame kategorii
	if (hledaniKategorie !== '') {
		nalezeneRecepty = nalezeneRecepty.filter(recept => recept.kategorie === hledaniKategorie);
	}

	// razeni
	if (razeni === 'nejlepsi') {
		nalezeneRecepty = nalezeneRecepty.sort((recept1, recept2) => {
			if (recept1.hodnoceni < recept2.hodnoceni) {
				return 1;
			} else {
				return -1;
			}
		});
	} else if (razeni === 'nejhorsi') {
		nalezeneRecepty = nalezeneRecepty.sort((recept1, recept2) => {
			if (recept1.hodnoceni > recept2.hodnoceni) {
				return 1;
			} else {
				return -1;
			}
		});
	}

	zobrazSeznamReceptu();
}