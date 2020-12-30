const baseUrl = 'https://disease.sh'

const requests = {
    getCases: `${baseUrl}/v3/covid-19/all`,
    getCountries: `${baseUrl}/v3/covid-19/countries`,
    getCasesForCountry: `${baseUrl}/v3/covid-19/countries/`,
    getTrendData: `${baseUrl}/v3/covid-19/historical/`
}

export default requests