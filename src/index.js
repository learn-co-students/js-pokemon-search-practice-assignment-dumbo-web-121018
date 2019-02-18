const pokeURL = 'http://localhost:3000/pokemon'

document.addEventListener('DOMContentLoaded', () => {
  const landing = document.getElementById('pokemon-container')
  const search = document.getElementById('pokemon-search-input')

  loadPokemon(POKEMON, landing)
  search.addEventListener('input', event => {
    const pokemon = POKEMON.filter(poke => poke.name.includes(search.value))
    loadPokemon(pokemon, landing)
  })

  landing.addEventListener('click', event => {
    let clickedPoke = POKEMON.find(poke => poke.id === parseInt(event.target.dataset.id))
    let front = clickedPoke.sprites.front
    let back = clickedPoke.sprites.back
    if (event.target.className === 'toggle-sprite') {
      event.target.src === front ? event.target.src = back : event.target.src = front
    }
  })
})

function loadPokemon (pokemon, where) {
  where.innerHTML = ''
  pokemon.forEach(poke => {
    where.innerHTML +=
      `<div class='pokemon-card'>
        <div class='pokemon-frame'>
          <h1 class='center-text'>${poke.name}</h1>
          <div class='pokemon-image'>
            <img data-id='${poke.id}' data-action='flip' class='toggle-sprite' src='${poke.sprites.front}'>
          </div>
        </div>
      </div>`
  })
}

function arrayToList (arr) {
  let out = ''
  let i = 0
  for (i; i < arr.length - 2; i++) {
    out += arr[i] + ', '
  }
  out += arr[i]
  return out
}
