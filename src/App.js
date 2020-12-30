import './App.css'
import FormControl from '@material-ui/core/FormControl'
import { Card, CardContent, MenuItem, Select } from '@material-ui/core'
import { useEffect, useState } from 'react'
import requests from './requests'
import InfoTab from './Components/InfoTab'
import Map from './Components/Map'
import Table from './Components/Table'
import LineGraph from './Components/LineGraph'

function App() {

  const [countries, setCountries] = useState([])
  const [tableData, setTableData] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('Worldwide')
  const [selectedCountryCases, setSelectedCountryCases] = useState([])
  const [mapCenter, setMapCenter] = useState([9.1021, 18.2812])
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState('cases')

  useEffect(() => {
    const getCountries = () => {
      fetch(requests.getCountries)
        .then(response => response.json())
        .then(data => {
          const countries = data.map(item => ({
            name: item.country,
            value: item.countryInfo.iso3,
          }))
          setMapCountries(data)
          setTableData(data)
          setCountries(countries)
        })
    }
    getCases(requests.getCases)
    getCountries()
  }, [])

  const handleCountryChange = (event) => {
    const currentCountry = event.target.value
    setSelectedCountry(currentCountry)
    const url = (currentCountry === 'Worldwide') ? requests.getCases : `${requests.getCasesForCountry}${event.target.value}`
    getCases(url)
  }

  const getCases = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setSelectedCountryCases(data)
        if (url.includes('all')) {
          setMapCenter([9.1021, 18.2812])
          // setMapZoom(1.5)
        }
        else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long])
          // setMapZoom(5)
        }
      })
  }
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h2>Covid-19 tracker</h2>
          <FormControl className='app__dropdown'>
            <Select variant='outlined' value={selectedCountry} onChange={event => handleCountryChange(event)}>
              <MenuItem value='Worldwide'>Worldwide</MenuItem>
              {countries.map((country, index) =>
                <MenuItem value={country.name} key={index}>{country.name}</MenuItem>
              )}
            </Select>
          </FormControl>
        </div>

        <div className="app__infoTabs">
          <div onClick={event => setCasesType('cases')}>
            <InfoTab active={casesType === 'cases'} title='Cases' total={selectedCountryCases.cases} today={selectedCountryCases.todayCases} key='cases'></InfoTab>
          </div>
          <div onClick={event => setCasesType('recovered')}>
            <InfoTab active={casesType === 'recovered'} title='Recovered' total={selectedCountryCases.recovered} today={selectedCountryCases.todayRecovered} key='recovered'></InfoTab>
          </div>
          <div onClick={event => setCasesType('deaths')}>
            <InfoTab active={casesType === 'deaths'} title='Deaths' total={selectedCountryCases.deaths} today={selectedCountryCases.todayDeaths} key='deaths'></InfoTab>
          </div>
        </div>

        <div className="app__mapContainer">
          <Map countries={mapCountries} casesType={casesType} center={mapCenter} />
        </div>
      </div>

      <Card className="app__right">
        <CardContent className='app__rightContent'>

          <h3>Active Cases By Country</h3>
          <Table countriesData={tableData} />
          <h3>Worldwide Trend</h3>

          <LineGraph country={selectedCountry} casesType={casesType} />

        </CardContent>
      </Card>
    </div>
  )
}

export default App;
