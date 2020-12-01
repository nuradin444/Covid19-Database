import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import { popup } from "leaflet";

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 300,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 300,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 300,
    },
  };



export const sortData = (data) => {

    const sortedData = [...data];

    sortedData.sort((a, b) =>{
        if(a.cases > b.cases){
            return -1;
        } else{
            return 1;
        }
    });

    return sortedData;
};

export const displayStat = (stat) => stat ? `+${numeral(stat).format("0.0a")}` : "+0";
//Draw circles on the map
export const showDataonMap = (data, casesType='cases') => (
    data.map(country => (
    <Circle
    center={[country.countryInfo.lat, country.countryInfo.long]}
    fillOpacity={0.4}
    color={casesTypeColors[casesType].hex}
    fillColor={casesTypeColors[casesType].hex}
    radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
    <Popup>
        <div className="info-popup">
            <div className="flag_info"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            />

           
            <div className="country-info">{country.country}</div>
            <div className="cases-info">Cases: {numeral(country.cases).format("0,0")}</div>
            <div className="recovered-info">Recovered: {numeral(country.recovered).format("0,0")}</div>
            <div className="deaths-info">Deaths: {numeral(country.deaths).format("0,0")}</div>
        </div>

    </Popup>
    </Circle>


    ))
);