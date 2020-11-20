import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';

function InfoBox({title, cases, total }){
    return(
        <Card ClassName="InfoBox">
            <CardContent>
                {/**Title */}
                <Typography ClassName="InfoBox_title" color="textSecondary">
                    {title}
                </Typography>
    <h2 ClassName="InfoBox_cases">{cases}</h2>
    <Typography ClassName="InfoBox_total" color="textSecondary">
        {total} Total
    </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox