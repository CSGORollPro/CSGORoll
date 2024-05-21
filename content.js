// Funkcija za preuzimanje dozvoljenih slika sa API-ja
async function fetchAllowedImages() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/dzejlanbezs/Images/main/allowedImages.json');
        const data = await response.json();
        return data.allowedImages;
    } catch (error) {
        console.error('Greška prilikom preuzimanja dozvoljenih slika:', error);
        return [];
    }
}

// Funkcija za pronalaženje slike u HTML-u
async function findImageInHTML() {
    const allowedImages = await fetchAllowedImages();

    const imageUrls = document.querySelectorAll('.img-avatar.small'); // Pronađi sve slike

    for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i].style.backgroundImage; // Uzmi URL slike
        for (let j = 0; j < allowedImages.length; j++) {
            if (imageUrl.includes(allowedImages[j])) {
                console.log('Pronađena dozvoljena slika:', imageUrl);
                return true; // Ako je slika pronađena u dozvoljenim slikama, vrati true
            }
        }
    }

    return false; // Ako slika nije pronađena u dozvoljenim slikama, vrati false
}

// Sačekaj 5 sekundi pre pokretanja pretrage slike
setTimeout(async () => {
    // Proveri da li je slika prisutna
    if (await findImageInHTML()) {
        // Pronađi sve postojeće item kartice
        const itemCards = document.querySelectorAll('cw-csgo-market-item-card');

        // Mapa za wear vrednosti
        const wearMap = {
            'FN': 'factory-new',
            'MW': 'minimal-wear',
            'FT': 'field-tested',
            'WW': 'well-worn',
            'BS': 'battle-scarred'
        };

        // Funkcija za formatiranje imena noža, skina ili stikera
        function formatName(name) {
            return name.toLowerCase()
                       .replace('★ ', '')
                       .replace(/ /g, '-')
                       .replace(/™/g, '')
                       .replace(/\|/g, '')
                       .replace(/%7C/g, '-');
        }

        // Funkcija za dodavanje dugmeta na item karticu
        function addButtonToItemCard(itemCard) {
            // Pronađi potrebne elemente unutar te kartice
    const wearElement = itemCard.querySelector('.wear');
    const knifeElement = itemCard.querySelector('.d-flex.gap-05.align-items-center .ellipsis'); // Pronađi element sa imenom noža ili stikera
    const skinNameElement = itemCard.querySelector('.name-mh');

    // Ako neki od potrebnih elemenata nedostaje, preskoči ovu karticu
    if (!wearElement || !knifeElement || !skinNameElement) {
        return;
    }

    // Izvuci tekstualni sadržaj i formatiraj ga
    let wear = wearElement.textContent.trim();
    wear = wearMap[wear] || wear.toLowerCase().replace(' ', '-');
    const knife = formatName(knifeElement.textContent.trim());
    const skinName = formatName(skinNameElement.textContent.trim());

    // Kreiraj URL
    const skinUrl = `https://pricempire.com/item/cs2/skin/${knife}/${skinName}/${wear}`;

    // Kreiraj dugme
    const button = document.createElement('button');
    button.textContent = 'Check Price';
    button.style.backgroundColor = '#00c74d';
    button.style.borderRadius = '7px';
    button.style.padding = '5px';
    button.style.boxShadow = '0 10px 27px #00ff0c1a, 0 -3px #00913c inset, 0 2px #35d87b inset';
    button.style.textTransform = 'uppercase';
    button.style.fontFamily = 'Poppins, sans-serif';
    button.style.cursor = 'pointer';
    button.style.border = '0px solid #ccc';
    button.style.color = 'white';
    button.style.marginTop = '30px';
    button.style.width = '100%'; // Širina dugmeta da pokrije ceo prostor
    button.style.pointerEvents = 'auto'; // Omogućava klik na dugme

    // Dodaj event listener za klik i zaustavljanje propagacije
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        window.open(skinUrl, '_blank');
    });

    // Kreiraj wrapper za dugme kako bi osigurali da klik na dugme ne propagira
    const buttonWrapper = document.createElement('div');
    buttonWrapper.style.width = '100%';
    buttonWrapper.style.display = 'flex';
    buttonWrapper.style.justifyContent = 'center';
    buttonWrapper.style.pointerEvents = 'auto'; // Omogućava klik na dugme

    buttonWrapper.appendChild(button);

    // Dodaj wrapper unutar sekcije
    const content = itemCard.querySelector('.content');
    content.style.pointerEvents = 'none'; // Sprečava klikove na karticu
    content.appendChild(buttonWrapper);
}

        // Dodaj dugme na sve postojeće item kartice
        itemCards.forEach(addButtonToItemCard);

        // Kreiraj MutationObserver za praćenje dodavanja novih item kartica
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.matches('cw-csgo-market-item-card')) {
                        addButtonToItemCard(node);
                    }
                });
            });
        });

        // Počni posmatranje promena u DOM-u
        observer.observe(document.body, { childList: true, subtree: true });
    } else {
        console.log('Slika nije pronađena u HTML-u, kod se neće izvršiti.');
    }
}, 5000); // 5000 milisekundi = 5 sekundi
