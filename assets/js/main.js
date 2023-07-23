//Estava dando conflito e erro por eu sempre declarar esses já que o ID nao existia no Details, entao colocando o DOM corretamente ele fez o erro desaparecer
document.addEventListener("DOMContentLoaded", () => {
    const pokemonList = document.getElementById('pokemonList');
    const loadMoreButton = document.getElementById('loadMoreButton');
    const pokemonDetails = document.getElementById('pokemonDetails');
    const backButton = document.getElementById('backButton');
});

const maxRecords = 151;
let limit = 10;
let offset = 0;
let qtdRecordWithNextPage = offset + limit;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) =>
            `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                            
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type => `<li class="type ${type}">${type}</li>`)).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                            
                <button class="detailsButton more_details more_details_${pokemon.type}" data-number="${pokemon.number}" type="button">
                    More details
                </button>
            </li>`).join('');
    });
}

// Função para carregar os detalhes do pokemon e exibir na div pokemonDetails
function loadPokemonDetails(number) {
    pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${number}/` })
        .then((pokemon) => {
            pokemonDetails.innerHTML = `
            <div class="conteiner_img ${pokemon.type}">
              <img src="${pokemon.photo}" alt="${pokemon.name}">
              <span class="number">#${pokemon.number}</span>
            </div>
      
            <div class="detail">
              <span class="name">${pokemon.name}</span>
              <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
              </ol>
      
              <div class="pokemon_status">
                <div class="conteiner">
                <h2 class="title">Base stats</h2>
                  ${pokemon.statsNames.map((statName, index) => `
                    <div class="stat">
                      <div class="stat_detail">
                        <span>${statName}</span>
                        <span>${pokemon.statsNumbers[index]}</span>
                      </div>
                      <div class="stat_bar_${statName}" style="width: ${pokemon.statsNumbers[index]}px"></div>
                    </div>
                  `).join("")}
                </div>
                <div class="navegation">
                    <button onclick="backIndex()">Back</button>
                </div>
              </div>
            </div>`;
        });
}

// Event listener para abrir a página de detalhes do pokemon quando o botão "More details" for clicado

function redirectToDetailsPage(number) {
    const url = `./details.html?number=${number}`;
    window.open(url, '_blank');
}

pokemonList.addEventListener('click', (event) => {
    if (event.target.classList.contains('detailsButton')) {
        const button = event.target;
        const pokemonNumber = button.dataset.number;
        redirectToDetailsPage(pokemonNumber);
    }
});


////Função para mostrar os 10 primeiros pokemons assim que entra na pokedex
loadPokemonItens(offset, limit)


//Função para mostrar os pokemons de 10 em 10
loadMoreButton.addEventListener('click', () => {
    offset += limit;

    qtdRecordWithNextPage = offset + limit

    if (qtdRecordWithNextPage >= maxRecords) {
        newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
        loadAllButton.parentElement.removeChild(loadAllButton);
    } else {
        loadPokemonItens(offset, limit);

    }
});

//Função para mostrar todos os pokemons que ainda faltam mostrar
loadAllButton.addEventListener('click', () => {
    offset += limit;
    limit = maxRecords - offset;

    loadPokemonItens(offset, limit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
    loadAllButton.parentElement.removeChild(loadAllButton);
});

function backIndex() {
    window.location.href = "./index.html";
}
