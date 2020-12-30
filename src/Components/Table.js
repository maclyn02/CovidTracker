import React from 'react'
import './Table.css'
import { sortData } from '../util'
import numeral from 'numeral'

function Table({ countriesData }) {
    const sortedData = sortData(countriesData)
    return (
        <div className='table'>
            <tr>
                <th>Country</th>
                <th>Total Cases</th>
            </tr>
            {sortedData.map(({ country, countryInfo, cases }, index) => (
                <tr key={countryInfo.iso3 || country}>
                    <td>{country}</td>
                    <td>{numeral(cases).format('0,0')}</td>
                </tr>
            ))}
        </div>
    )
}

export default Table
