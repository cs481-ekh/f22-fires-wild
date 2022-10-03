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
            const response = await axios.get("http://localhost:8000/api/heatmap/", {headers});
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
                    //fitBoundsOnLoad
                    max={5}
                    radius={20}
                    useLocalExtrema
                    fitBoundsOnUpdate
                    points={heatMapData}
                    longitudeExtractor={point => point.LONGITUDE}
                    latitudeExtractor={point => point.LATITUDE}
                    // using intensity of 1 per point as we don't have an aggregate or "badness" number
                    // could change to size or amount of time burned maybe?
                    intensityExtractor={point => 1} 
                />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
       </div>
    );
}

export default Home;