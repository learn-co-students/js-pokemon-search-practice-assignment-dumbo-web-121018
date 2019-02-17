document.addEventListener('DOMContentLoaded', () => {
  // Variables
  const pokemonContainer = document.getElementById("pokemon-container");
  const pokemonSearchBar = document.getElementById("pokemon-search-input");

  // Populate Pokemon Container
  const fetchPokemon = () => {
    fetch("http://localhost:3000/pokemon")
    .then(res => res.json())
    .then(data => populatePokemonContainer(data))
  }

  const populatePokemonContainer = data => {
    pokemonContainer.innerHTML = ""
    data.forEach(formatPokemonToCard)
  }

  const formatPokemonToCard = pokemon => {
    const card = document.createElement("div")
    card.className = "pokemon-card"
    const cardData = `
      <div class="pokemon-frame">
        <h1 class="center-text pokemon-name">${pokemon.name}</h1>
        <div class="pokemon-image">
          <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
        </div>
      </div>`
    card.innerHTML = cardData
    addPokemonCardToContainer(card);
  }

  const addPokemonCardToContainer = card => {
    pokemonContainer.append(card);
  }

  // Sprite Toggle
  const addEventToPokemonContainer = () => {
    pokemonContainer.addEventListener("click", flipPokemonSpriteEvent)
  }

  const flipPokemonSpriteEvent = async event => {
    if (event.target.classList.contains("toggle-sprite")) {
      const pokemonSprite = event.target
      const pokemonId = pokemonSprite.dataset.id
      const pokemon = await fetchSinglePokemon(pokemonId)
      if (pokemonSprite.src === pokemon.sprites.front) {
        pokemonSprite.src = pokemon.sprites.back
      } else {
        pokemonSprite.src = pokemon.sprites.front
      }
    }
  }

  const fetchSinglePokemon = async pokemonId => {
    const res = await fetch(`http://localhost:3000/pokemon/${pokemonId}`)
    const pokemon = await res.json();
    return pokemon
  }

  // Search Bar
  const addEventToSearchBar = () => {
    pokemonSearchBar.addEventListener("input", searchBarFilterEvent)
  }

  const searchBarFilterEvent = event => {
    const allPokemonCards = pokemonContainer.childNodes
    allPokemonCards.forEach(togglePokemonCard)
  }

  const togglePokemonCard = card => {
    const pokemonName = card.querySelector(".pokemon-name").innerText
    if (pokemonName.includes(pokemonSearchBar.value)) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  }

  // Function Calls
  fetchPokemon();
  addEventToPokemonContainer();
  addEventToSearchBar();
  // End of DOMContentLoaded
})
