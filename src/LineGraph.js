import React, {useState, useEffect} from 'react';
import {Line} from "react-chartjs-2";


function LineGraph(){
    const [data, setData] = useState({});

    

    useEffect(() =>{
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response => response.json())
        .then(data => {
            console.log(data);

        })
    }, []);

    const createChartData = (data, casesType='cases') => {
        const chartData = [];
        let chartEndpoint;

        data.[casesType].forEach(date => {
            if(chartEndpoint){
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - chartEndpoint
            }
            chartData.push(newDataPoint);
            }
            chartEndpoint = data[casesType][data];
        })
        return chartData;

    }



    return(
        <div>
            <h1>This is a graph</h1>
        <Line 
       // data
       // options 
        />
        </div>
    )
}

export default LineGraph 