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



function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

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

            const sortedData = sortData(data);
            setTableData(sortedData);
            setCountries(countries); 

          });
      };

      getDataFromCountries();
    }, []);

    const OnCountryNameChange = async (event) => {
      const countryDetail = event.target.value;
      setCountry(countryDetail);

      const url = countryDetail === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : 
      `https://disease.sh/v3/covid-19/countries/${countryDetail}`;

      await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryDetail);

        //Get the data from the countries response
        setCountryInfo(data);

      })
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
     <Map/>

      </div>
      <Card ClassName="right_position ">
      <CardContent>
        <h3>Live Cases by Country</h3>
        <Table countries={tableData}/>
        {/** Table */}
        <h3>WorldWide New Cases</h3>
        <LineGraph />
        {/** Graph */}
      </CardContent>
      </Card>

     
    </div>
  );
}

export default App;
