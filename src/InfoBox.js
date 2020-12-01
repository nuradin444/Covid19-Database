import React from 'react';
import "./Infobox.css";
import {Card, CardContent, Typography} from '@material-ui/core';

function InfoBox({title, cases, active, redColor, total, ...props }){
    return(
        <Card 
        onClick={props.onClick}
        className={`InfoBox ${active &&  'InfoBox--Selected'} ${redColor && 'InfoBox--red'}`}>
            <CardContent>
                {/**Title */}
                <Typography className="InfoBox_title" color="textSecondary">
                    {title}
                </Typography>
    <h2 className={`InfoBox_cases ${!redColor && "infoBox_green"}`}>{cases}</h2>
    <Typography className="InfoBox_total" color="textSecondary">
        {total} Total
    </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox