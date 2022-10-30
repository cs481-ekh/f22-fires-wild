import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import axios from 'axios'; 
import "./../styles.css";

const Home = () => {
    
    const [heatMapData, setHeatMapData] = useState([]);

    useEffect(() => {
        // heatmap data will not change between page loads, don't reload it
        if(heatMapData.length === 0){
            refreshHeatMap();
        }
    },
    /* This makes sure we run this once */
    []
    );

    async function refreshHeatMap() {
        try{
            // django could return html if it wanted, request json specifically
            const headers = {
                'Accept': 'application/json',
            };
            //Axios to send and receive HTTP requests
            const response = await axios.get(
                process.env.REACT_APP_DJANGO_API_URL+"heatmap/",
                {headers}
            );
            console.log("requesting");
            const data = await response.data;
            console.log(data);
            setHeatMapData(data);
            
        }
        catch(e){
            console.log(e);
        }
    };

    return (
        <div className="home_map">
            <MapContainer 
                style={
                    {
                        width:'90%',
                        //height:'99%',
                        margin: "auto"
                    }
                }
                center={[39, -98]} 
                zoom={4.5} 
                zoomSnap={0.5}
                scrollWheelZoom={true}
            >
                <HeatmapLayer
                    //our intensity is fire size which can be far larger than default of 30 i think
                    max={Number.MAX_SAFE_INTEGER}
                    // mess with radius for how detailed / full the heatmap will look
                    radius={25}
                    // this makes sure you always see more detail as you zoom
                    useLocalExtrema
                    fitBoundsOnUpdate
                    points={heatMapData}
                    longitudeExtractor={point => point.LONGITUDE}
                    latitudeExtractor={point => point.LATITUDE}
                    intensityExtractor={point => parseFloat(point.FIRE_SIZE)} 
                />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
       </div>
    );
}