/* ===== GET HTML ELEMENTS ===== */
const app = document.querySelector('.app')
const search = document.querySelector('.app__search')
const appContainer = document.querySelector('.app__container')

/* ===== VARIABLES ===== */
const URL = 'https://pokeapi.co/api/v2/pokemon'
let nextURL = ''
let prevURL = ''

/* ===== FUNCTIONS ===== */
const getData = async (url) => {
  const res = await window.fetch(url)
  const { results, next, previous } = await res.json()
  
  nextURL = next
  prevURL = previous

  console.log(nextURL)
  console.log(prevURL)
  console.log(results)
  printPokemons(results)
}

const showError = (err) => window.alert(err) 

const btnPrev = () => prevURL ? getData(prevURL) : showError('No hay pokemons en este espacio')

const btnNext = () => nextURL ? getData(nextURL) : showError('No hay pokemons en este espacio')

getData(URL)

/*========PRINT ALL POKEMONS========*/

const printPokemons = (data) => {
  let html = ''
  for (const {url} of data) {

       window.fetch(url)
      .then(res => res.json())
      .then(({name, sprites})=> {
        
        html += `
        <div class="app__item">
          <img class="app__item--img" src="${sprites.other['official-artwork'].front_default}" alt="${name}">
          <h2 class="app__item--name">${name}</h2>
        </div>        
        `
        appContainer.innerHTML = html
      })
      .catch(err => console.log(err))
  }
}


/*========PRINT ONE POKEMON========*/
const printPokemon = async ({ value }) => {
let html = ''
try {
  const url = URL + `/${value}`
  const res = await window.fetch(url)
  const {name, sprites} = await res.json()

  html += `
  <div class="app__item">
    <img class="app__item--img" src="${sprites.other['official-artwork'].front_default}" alt="${name}">
    <h2 class="app__item--name">${name}</h2>
  </div>        
  `

} catch (err) {
  html += '<h2>Este pokemon no se encontró</h2>'
  console.log(err)
}

return  html
}

/* ===== LISTENERS BUTTONS ===== */
app.addEventListener('click', ({ target }) => {
  if (target.classList.contains('button--prev')) btnPrev()
  if (target.classList.contains('button--next')) btnNext()
  if (target.classList.contains('button--initial')) getData(URL)
})

search.addEventListener('change', async ({target}) => {
  if (target.value !== '')
   {
     const html = await printPokemon(target)
      appContainer.innerHTML = html
  } else {
    getData(URL)
  }
})
