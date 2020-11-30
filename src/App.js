import React, {useEffect, useState} from "react";
import { MenuItem,FormControl, Select, Card, CardContent } 
from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import {sortData} from "./util";
import LineGraph from "./LineGraph";
import numeral from "numeral";
import './App.css';
import "leaflet/dist/leaflet.css";



function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {

    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

    //get the api call
    useEffect(() => {

      const getDataFromCountries = async () => {
        await fetch ("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data)=> {
          const countries = data.map((country) => (
            {
              name: country.country, // US, UK
              value: country.countryInfo.iso2 // UK, US, FR
            }));

            let sortedData = sortData(data);
            setTableData(sortedData);
            setMapCountries(data);
            setCountries(countries); 

          });
      };

      getDataFromCountries();
    }, []);

    const OnCountryNameChange = async (event) => {
      const countryDetail = event.target.value;
      setCountry(countryDetail);

      const url = countryDetail === 'worldwide' ? 
      'https://disease.sh/v3/covid-19/all' : 
      `https://disease.sh/v3/covid-19/countries/${countryDetail}`;



      await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryDetail);

        //Get the data from the countries response
        setCountryInfo(data);

        const maplocation = countryDetail === "worldwide" ? { lat: 34.80746, lng: -40.4796 } :
         { lat: data.countryInfo.lat, lng: data.countryInfo.long };

       setMapCenter(maplocation);
       setMapZoom(4);
       // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        

      //  setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        

      });
    };

    console.log('country Info >>>', countryInfo );


  return (
    <div className="app">
      <div className="left_position">
      <div className="app__header">
      <h1>Covid 19 Database</h1>
      <FormControl className="app_dropdown">
      <Select variant="outlined" onChange={OnCountryNameChange} value={country}>
      <MenuItem value="worldwide"> worldwide</MenuItem>
        {
          countries.map(country =>(
            <MenuItem value={country.value}>{ country.name}</MenuItem>
            
          ))
        }

       {/* { 
        
        <MenuItem value="worldwide"> option 2</MenuItem>
        <MenuItem value="worldwide"> option 3</MenuItem>
      } */}
      </Select>
      </FormControl>
      </div>
      <div className="app_stats">
        <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>

        <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>

        <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total ={countryInfo.deaths}/>

      </div>
      
     <Map
     center={mapCenter}
     zoom={mapZoom}
     countries={mapCountries}
     />

      </div>
      <Card ClassName="right_position ">
      <CardContent>
        <h3>Live Cases by Country</h3>
        <Table countries={tableData}/>
        {/** Table */}
        <h3>WorldWide New Cases</h3>
        <LineGraph/>
      </CardContent>
      </Card>

     
    </div>
  );
}

export default App;
