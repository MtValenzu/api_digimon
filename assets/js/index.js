const digimonList = document.querySelector('#digimon-list');
const links = document.querySelectorAll('a');

function getDigimonList(level) {
  fetch(`https://digimon-api.vercel.app/api/digimon/level/${level}`)
    .then(response => response.json())
    .then(data => {
      digimonList.innerHTML = ''; // Borra los Digimon previos
      data.forEach(digimon => {
        const digimonBox = document.createElement('div');
        digimonBox.classList.add('digimon-box');

        const digimonName = document.createElement('h2');
        digimonName.textContent = digimon.name;

        const digimonImg = document.createElement('img');
        digimonImg.classList.add('digimon-img');
        digimonImg.src = digimon.img;

        const digimonLevel = document.createElement('p');
        digimonLevel.textContent = `Level: ${digimon.level}`;

        digimonBox.appendChild(digimonName);
        digimonBox.appendChild(digimonImg);
        digimonBox.appendChild(digimonLevel);

        const digimonItem = document.createElement('li');
        digimonItem.appendChild(digimonBox);

        digimonItem.addEventListener('click', () => {
          const currentSelected = document.querySelector('.selected');
          if (currentSelected) {
            currentSelected.classList.remove('selected');
          }
          digimonItem.classList.add('selected');
          const selectedImg = document.querySelector('.selected .digimon-img');
          const enlargedImg = document.querySelector('#enlarged-digimon-img');
          enlargedImg.src = selectedImg.src;
        });

        digimonList.appendChild(digimonItem);
      });
    })
    .catch(error => console.error(error));
}

// Agrega un eventListener a cada enlace
links.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault(); // Evita que se recargue la página
    const level = event.target.id.replace('-', ' '); // Obtiene el nivel desde el id del enlace
    getDigimonList(level); // Obtiene la lista de Digimon para el nivel seleccionado
  });
});

// Obtiene la lista de Digimon para el nivel "Rookie" por defecto
getDigimonList('Rookie');
