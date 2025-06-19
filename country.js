const countryName = new URLSearchParams(location.search).get('name');
const flagImage = document.querySelector('.details-content img');
const countryNameH1 = document.querySelector('.details-text h1');
const nativeName = document.querySelector('.country-info .native-name');
const population = document.querySelector('.country-info .population');
const region = document.querySelector('.country-info .region');
const subRegion = document.querySelector('.country-info .sub-region');
const capital = document.querySelector('.country-info .capital');
const topLevelDomain = document.querySelector('.country-info .top-level-domain');
const currencies = document.querySelector('.country-info .currencies');
const languages = document.querySelector('.country-info .languages');
const bordersCountries = document.querySelector('.border-names');
const themeChanger = document.querySelector('.theme-changer');

// Fetch Countries Details
fetch(`https://restcountries.com/v3.1/name/${countryName}`)
.then((res) => res.json())
.then(([country]) => {
    console.log(country)
    flagImage.src = country.flags.svg
    countryNameH1.innerText = country.name.common
    if (country.name.nativeName) {
        nativeName.innerText = Object.values(country.name.nativeName)[0].common
    } else {
        nativeName.innerText = country.name.common
    }
    population.innerText = country.population.toLocaleString('en-IN')
    region.innerText = country.region
    subRegion.innerText = country.subregion
    capital.innerText = country.capital ? country.capital[0] : "N/A"
    topLevelDomain.innerText = country.tld.join(', ')
    currencies.innerText = Object.values(country.currencies)[0].name
    languages.innerText = Object.values(country.languages).join(', ')
    if (country.borders) {
        country.borders.forEach((code) => {
            fetch(`https://restcountries.com/v3.1/alpha/${code}`)
            .then((res) => res.json())
            .then(([borderCountry]) => {
                console.log(borderCountry)
                const borderCountryTag = document.createElement('a')
                borderCountryTag.innerText = borderCountry.name.common
                borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                bordersCountries.append(borderCountryTag)
            })
        })
    } else {
        bordersCountries.innerText = "N/A"
    }
})

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
}

// Toggle theme
themeChanger.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});
