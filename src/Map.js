import React from 'react';
import "./Map.css";
import { MapContainer  as MapLeaflet , TileLayer } from "react-leaflet";
import { showDataonMap } from './util'


function Map({countries, casesType, center, zoom}){
    return (
        <div className="map">
            <MapLeaflet center={center} zoom={zoom}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {showDataonMap(countries, casesType)}
            </MapLeaflet>
            

        </div>
    );
}

export default Map;