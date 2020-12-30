export const sortData = (data) => {
    const sortedData = [...data]
    sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
    return sortedData
}

export const getDifferenceArray = (data) => {
    let chartData = []
    let lastDataPoint = -1
    data.forEach(value => {
        if (lastDataPoint > -1) {
            chartData.push(value - lastDataPoint)
        }
        lastDataPoint = value
    })
    return chartData
}