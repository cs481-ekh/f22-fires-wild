import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import axios from 'axios'; 
import "./Data.css";
import "./../styles.css";

const Home = () => {

    const [heatMapData, setHeatMapData] = useState([]);

    useEffect(() => {
        // heatmap data will not change between page loads, don't reload it
        if(heatMapData.length == 0){
            refreshHeatMap();
        }
    },
    /* This makes sure we run this once */
    []
    );

    async function refreshHeatMap() {
        try{
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
        <div className="center">
            <MapContainer center={[35, -100]} zoom={4}scrollWheelZoom={true}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
        </div>
    );
}

export default Home;