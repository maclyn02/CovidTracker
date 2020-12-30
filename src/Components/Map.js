import './Map.css'
import { Circle, MapContainer, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import numeral from 'numeral'
import { useEffect, useState } from 'react'

const casesTypeColors = {
    cases: {
        hex: "red",
        multiplier: 500
    },
    recovered: {
        hex: "green",
        multiplier: 500
    },
    deaths: {
        hex: "red",
        multiplier: 3000
    }
}

function Map({ countries, casesType, center, zoom = 1.5 }) {

    const [mapCountries, setMapCountries] = useState(countries)
    const [mapCasesType, setMapCasesType] = useState(casesType)

    useEffect(() => {
        setMapCountries(countries)
        setMapCasesType(casesType)
    }, [countries, casesType])

    return (
        <div className='map'>
            <MapContainer
                center={center} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {mapCountries.map((country, index) => (
                    <Circle
                        key={index}
                        center={[country.countryInfo.lat, country.countryInfo.long]}
                        fillOpacity={0.4}
                        color={casesTypeColors[mapCasesType].hex}
                        fillColor={casesTypeColors[mapCasesType].hex}
                        radius={
                            Math.sqrt(country[mapCasesType]) * casesTypeColors[mapCasesType].multiplier
                        }
                    >
                        <Popup>
                            <div className='map__popup'>
                                <img src={country.countryInfo.flag} alt='Flag' />
                                <h6>{country.country}</h6>
                                <div className='map__popupCases'>Cases: {numeral(country.cases).format('0,0')}</div>
                                <div className='map__popupRecovered'>Deaths: {numeral(country.deaths).format('0,0')}</div>
                                <div className='map__popupDeaths'>Recovered: {numeral(country.recovered).format('0,0')}</div>
                            </div>
                        </Popup>
                    </Circle>
                ))}
            </MapContainer>
        </div>
    )
}

export default Map
