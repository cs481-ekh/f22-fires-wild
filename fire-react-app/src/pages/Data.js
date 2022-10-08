import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
//import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import axios from 'axios'; 
import "./../styles.css";

const Data = () => {

    const [MapData, setMapData] = useState([]);

    useEffect(() => {
        // data will not change between page loads, don't reload it
        if(MapData.length === 0){
            refreshList();
        }
    },
    /* This makes sure we run this once */
    []
    );

    async function refreshList() {
        try{
            // django could return html if it wanted, request json specifically
            const headers = {
                'Accept': 'application/json',
            };
            //Axios to send and receive HTTP requests
            console.log("requesting variable list");
            const response = await axios.get("http://localhost:8000/api/variable_list/", {headers});
            const data = await response.data;
            //DEBUG            
            console.log("variable_list:");
            console.log(data);
            setMapData(data);
            
        }
        catch(e){
            //DEBUG
            console.log("error requesting variable list");
            console.log(e);
        }
    };

    return (
        <div className="data_map">
            <MapContainer 
                style={
                    {
                        width: "auto",
                        margin: "auto"
                    }
                }
                center={[39, -98]} 
                zoom={4.5} 
                zoomSnap={0.5}
                scrollWheelZoom={true}
            >

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
       </div>
    );
}

export default Data;