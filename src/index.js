document.addEventListener('DOMContentLoaded', () => {
  // console.log(POKEMON)
  //YOUR CODE HERE
  fetch('http://localhost:3000/pokemon')
  .then(res => res.json())
  .then(data => {displayPokemon(data); flipPokemon(data)});
  document.getElementById("pokemon-search-input").addEventListener("input", () => searchPokemon())
})

function displayPokemon(pokemon) {
  pokemon.forEach(poke => createPokeFrame(poke))
  document.querySelector("center").style.display = "none";
  console.log(document.querySelector("center").display)
}

function createPokeFrame(poke) {
  const pokeDiv = document.createElement("div");
  const pokeFrame = document.createElement("div");
  pokeDiv.className = "pokemon-card";
  pokeFrame.className = "pokemon-frame";
  pokeFrame.innerHTML = `<h1 class="center-text">${poke.name}</h1>
    <br>
    <div class="pokemon-image">
    <img data-id="${poke.id}" data-action="flip" class="toggle-sprite" src=${poke.sprites.front}>
    </div>`
  pokeDiv.appendChild(pokeFrame);
  const pokeContainer = document.getElementById("pokemon-container")
  pokeContainer.appendChild(pokeDiv);
}

function flipPokemon(pokes) {
  const images = document.getElementsByTagName('img');
  Array.from(images).forEach(image => {
      image.addEventListener('click', e => {
      pokes.forEach(poke => {
        if (parseInt(image.getAttribute('data-id')) === poke.id) {
          if (image.src === poke.sprites.front) {
            image.src = poke.sprites.back;
          } else {
            image.src = poke.sprites.front;
          }
        }
      })
    })
  })
}

function searchPokemon() {
  const input = document.getElementById("pokemon-search-input").value;
  const pokeCards = document.getElementsByClassName("pokemon-card");
  Array.from(pokeCards).forEach(card => {
    const name = card.querySelector("h1").innerText;
    if (name.indexOf(input) > -1) {
      card.style.display = ""
    } else {
      card.style.display = "none"
    }
  })
}
