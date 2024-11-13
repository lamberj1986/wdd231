document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

    const cards = document.querySelector('#cards');

    async function getProphetData() { // add in params?
        const response = await fetch(url);
        const data = await response.json();
        // console.table(data.prophets);
        displayProphets(data.prophets);
      }
      
      getProphetData();

      const displayProphets = (prophets) => {
        prophets.forEach(prophet => {
          const card = document.createElement('section');
          const fullName = document.createElement('h2');
          const birthDate = document.createElement('p');
          const birthPlace = document.createElement('p');
          const prophetImage = document.createElement('img');

          fullName.textContent = `${prophet.name} ${prophet.lastname}`;
          birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
          birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
          prophetImage.setAttribute('src', prophet.imageurl);
          prophetImage.setAttribute('alt', `Portriat of ${prophet.name} ${prophet.lastname}`);
          prophetImage.setAttribute('loading', 'lazy');
          prophetImage.setAttribute('width', '200');
          prophetImage.setAttribute('height', '200');

          card.appendChild(fullName);
          card.appendChild(birthDate);
          card.appendChild(birthPlace);
          card.appendChild(prophetImage);

          cards.appendChild(card);
        });
      }
});