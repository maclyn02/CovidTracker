import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import './InfoTab.css'
import numeral from 'numeral'

function InfoTab({ title, today, total, active }) {
    return (
        <Card className={`infoTab ${active && 'infoTab--selected'}`}>
            <CardContent>
                <Typography color="textSecondary" className='infoTab__header'>
                    {title}
                </Typography>
                <h3 className={`infoTab__${title}`}>Today's Cases: +{numeral(today).format('0.0a')}</h3>
                <Typography color="textSecondary" className='infoTab__total'>
                    {numeral(total).format('0.0a')} total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoTab
