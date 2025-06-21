const countriesContainer = document.querySelector('.countries-container');
const search = document.querySelector('.search-container input');
const filterByRegion = document.querySelector('.filter-by-region');
const themeChanger = document.querySelector('.theme-changer');

for( let i = 0; i < 8; i++) {
    countriesContainer.innerHTML += `
            <div class="country-card">
                <img class="skeleton" >
                <div class="card-text">
                    <h3 class="card-title skeleton skeleton-text" style="margin: 30px 0 30px 0;"><h3></h3>
                    <p class="skeleton skeleton-text"></p>
                    <p class="skeleton skeleton-text"></p>
                    <p class="skeleton skeleton-text"></p>
                </div>
            </div>        
    `
}

// Fetch All Countries
function fetchAllCountries() {
    fetch("https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags")
        .then((res) => res.json())
        .then((data) => {
            renderCountries(data)
        })
}

fetchAllCountries()

// Filter Countries
filterByRegion.addEventListener('change', (e) => {
    const region = e.target.value;

    if (region === "All") {
        fetchAllCountries();
    } else {
        fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
            .then((res) => res.json())
            .then((data) => {
                renderCountries(data)
            })
    }
})

// Render Countries Card Function
function renderCountries(data) {
    countriesContainer.innerHTML = ""

    data.forEach((country) => {
        const countryCard = document.createElement('a');
        countryCard.classList.add('country-card');
        countryCard.href = `country.html?name=${country.name.common}`

        countryCard.innerHTML = `
            <img src=${country.flags.svg} alt="">
            <div class="card-text">
                <h3 class="card-title"><h3>${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital}</p>
            </div>
        `
        countriesContainer.append(countryCard)
    })
}

let debounceTimeout;

search.addEventListener('input', (e) => {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        const value = e.target.value.trim();
        
        if (value === "") {
            fetchAllCountries()
        } else {
            fetch(`https://restcountries.com/v3.1/name/${value}`)
            .then(res => res.json())
            .then(data => renderCountries(data))
        }
    }, 300);
})

// Load Saved Theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark')
}

// Toggle Theme
themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
})
