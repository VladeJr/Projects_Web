function changePageTitle(title) {
  document.title = title
}

function generateInfoSection(src, pokemonName) {
  const h2 = document.createElement('h2')
  h2.id = "info-pokemon-label"
  h2.textContent = `Informações sobre ${pokemonName}`

  const img = document.querySelector('img')
  img.src = src
  img.alt = `Imagem do pokemon ${pokemonName}`

  const section = document.querySelector('#info-pokemon')

  section.appendChild(h2)
  section.appendChild(img)
}

async function getPokemonData(name) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    const sprites = data.sprites;
    setupPokemonImages(sprites);
  } catch (error) {
    console.error('Erro ao buscar dados do Pokémon:', error);
  }
}


function getSearchParams() {

  if (!location.search) {
    return
  }

  const urlSearchParams = new URLSearchParams(location.search)

  const pokemonName = urlSearchParams.get('name')

  changePageTitle(`Pagina do ${pokemonName}`)
  getPokemonData(pokemonName)
}

function setupPokemonImages(sprites) {
  const spriteImages = Object.values(sprites)
    .flat()  
    .filter(url => typeof url === 'string'); 

  
  const img = document.querySelector('img');
  let currentImageIndex = 0;
  img.src = spriteImages[currentImageIndex];
  img.alt = `C:\Users\Vlad.Jr\Downloads\Mew.png ${currentImageIndex + 1}`;


  img.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % spriteImages.length;  
    img.src = spriteImages[currentImageIndex];
    img.alt = `C:\Users\Vlad.Jr\Downloads\mt.png ${currentImageIndex + 1}`;
  });
}


document.addEventListener('DOMContentLoaded', function () {
  console.log("DOM completamente carregado");

  
  let visitData = localStorage.getItem('visitData');
  console.log("Dados recuperados do localStorage:", visitData);

  if (visitData) {
    visitData = JSON.parse(visitData);
  } else {
    visitData = { count: 0, lastVisit: "Nunca" };
  }

  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(currentDate);

  visitData.lastVisit = formattedDate;
  visitData.count++;

  localStorage.setItem('visitData', JSON.stringify(visitData));
  console.log("Dados salvos no localStorage:", visitData);


  const footer = document.querySelector('footer');
  const visitInfo = document.createElement('p');
  visitInfo.textContent = `Esta página foi visitada ${visitData.count} vezes. A última visita foi: ${visitData.lastVisit}`;
  footer.appendChild(visitInfo);

  getSearchParams();
});
