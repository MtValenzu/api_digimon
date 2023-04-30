//fetch de la api

fetch('https://digimon-api.vercel.app/api/digimon')
  .then(response => response.json())
  .then(data => {
    const digimonList = document.querySelector('#digimon-list');

// sacar cada digimon con sus datos y hacer el listado 
//Se crea un <div> para el nombre, la imagen y el nivel, y se crea un <li> para contener el <div>.   
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
      
      //se agrega un listener para hacer click en cada elemento de la lista
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
