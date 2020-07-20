/**
 * Estado da aplicação ( state )
 */
let tabCountries = null
let tabFavorites = null

let allCountries = []
let favoriteCountries = []

let countCountries = 0
let countFavorites = 0

let totalPopulationList = 0
let totalPopulationFavorites = 0

let numberFormat = null

window.addEventListener('load', () => {
  tabCountries = document.querySelector('#tab-countries')
  tabFavorites = document.querySelector('#tab-favorites')
  countCountries = document.querySelector('#count-contries')
  countFavorites = document.querySelector('#count-favorites')

  totalPopulationList = document.querySelector('#total-population-list')
  totalPopulationFavorites = document.querySelector('#total-population-favorites')

  numberFormat = Intl.NumberFormat('pt-BR')

  fetchCountries()
})

async function fetchCountries() {
  const res = await fetch('https://restcountries.eu/rest/v2/all')
  const json = await res.json()

  allCountries = json.map(country => {
    const { numericCode, translations, population, flag } = country
    return {
      id: numericCode,
      name: translations.pt,
      population,
      flag
    }
  })
  render()
}

function render() {
  renderCountryList()
  renderFavorites()
  renderSummary()

  handleCountryButtons()
}

function renderCountryList() {
  let countriesHTML = '<div>'

  allCountries.forEach(country => {
    const { name, flag, id, population } = country

    const countryHTML = `
      <div class='country'>
        <div>
          <a id="${id}" class="waves-effect waves-light btn"><i class="material-icons">send</i></a>
        </div>
        <div>
          <img src="${flag}" alt="${name}">
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${population}</li>
          </ul>
        </div>
      </div>
    `
    countriesHTML += countryHTML
  })
  countriesHTML += '</div>'
  tabCountries.innerHTML = countriesHTML
}


function renderFavorites() {
  let favoritesHTML = '<div>'

  favoriteCountries.forEach(country => {
    const { name, flag, id, population } = country

    const favoriteCountryHTML = `
      <div class='country'>
        <div>
          <a id="${id}" class="waves-effect waves-light btn red darken-4"><i class="material-icons">delete</i></a>
        </div>
        <div>
          <img src="${flag}" alt="${name}">
        </div>
        <div>
          <ul>
            <li>${name}</li>
            <li>${population}</li>
          </ul>
        </div>
      </div>
    `
    favoritesHTML += favoriteCountryHTML
  })

  favoritesHTML += '</div>'
  tabFavorites.innerHTML = favoritesHTML
}



function renderSummary() {
  countCountries.textContent = allCountries.length
  countFavorites.textContent = favoriteCountries.length

  const totalPopulation = allCountries.reduce((accumulator, current) => {
    return accumulator + current.population
  }, 0)
  const totalFavorites = favoriteCountries.reduce((accumulator, current) => {
    return accumulator + current.population
  }, 0)

  totalPopulationList.textContent = totalPopulation
  totalPopulationFavorites.textContent = totalFavorites
}
function handleCountryButtons() { }
