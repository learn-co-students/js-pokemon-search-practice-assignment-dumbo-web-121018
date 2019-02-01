document.addEventListener('DOMContentLoaded', () => {
  console.log(POKEMON)
  populatePokedex();
  // const header = document.querySelectorAll("h1");
  addListenerToPokemonContainer();
  addListenerToSearchBar();
})

const populatePokedex = pokemon => {
  POKEMON.forEach( addPokemon )
}

const addPokemon = pokemon => {
  // accept pokemon hash
  const container = document.querySelector("#pokemon-container");

  const div1 = document.createElement("div");
  div1.className = "pokemon-card";
  container.append(div1);

  const div2 = document.createElement("div");
  div2.className = "pokemon-frame";
  div1.append(div2);

  const h1 = document.createElement("h1");
  h1.innerText = pokemon.name;
  h1.className = "center-text";
  div2.append(h1);

  const div3 = document.createElement("div");
  div3.className = "pokemon-image";
  div2.append(div3);

  div3.innerHTML = `<img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">`
}

const addListenerToPokemonContainer = () => {
  document.getElementById("pokemon-container").addEventListener("click", flipPokemon)
}

const flipPokemon = (event) => {
  const clicked = event.target;
  if (clicked.className === "toggle-sprite") {
    const image = clicked.querySelector(".toggle-sprite");
    const caught = POKEMON.filter(pokemon => clicked.dataset.id == pokemon.id)

    clicked.src === caught[0].sprites.back ? clicked.src = caught[0].sprites.front : clicked.src = caught[0].sprites.back

    console.log(caught);
  }
}

const addListenerToSearchBar = () => {
  const searching = document.querySelector("#pokemon-search-input");
  searching.addEventListener("input", (event) => {
    const cardsOfAllPokemon = document.querySelectorAll(".pokemon-card");
    cardsOfAllPokemon.forEach((card) => {
      const pokemonName = card.querySelector("h1").innerText
      pokemonName.includes(searching.value) ? card.style.display = "block" : card.style.display = "none";
    })
  })
}
