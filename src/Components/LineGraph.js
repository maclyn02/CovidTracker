import React, { useEffect, useState } from 'react'
import Plot from 'react-plotly.js';
import requests from '../requests'
import { getDifferenceArray } from '../util';
import './LineGraph.css'

function LineGraph({ country, casesType }) {

    const [data, setData] = useState({})

    useEffect(() => {
        const url = country === 'Worldwide' ? `${requests.getTrendData}all` : `${requests.getTrendData}${country}`
        fetch(`${url}?lastdays=120`)
            .then(response => response.ok ? response.json() : null)
            .then(responseData => {
                if (responseData[casesType])
                    setData(responseData[casesType])
                else if (responseData?.timeline[casesType])
                    setData(responseData.timeline[casesType])
                else
                    setData({})
            })
    }, [country, casesType])

    return (
        <div className='lineGraph'>
            {Object.keys(data)?.length > 0 ? (
                <Plot
                    data={[
                        {
                            x: Object.keys(data),
                            y: getDifferenceArray(Object.values(data)),
                            type: 'scatter',
                            mode: 'lines',
                            marker: { color: 'red' },
                        },
                    ]}
                    layout={{
                        width: 300, height: 200, margin: {
                            l: 40,
                            r: 20,
                            t: 30,
                        }
                    }}
                />
            ) : (
                    <h2>No Trend Data</h2>
                )}
        </div>
    )
}

export default LineGraph
