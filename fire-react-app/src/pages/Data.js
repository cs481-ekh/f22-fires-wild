import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
//import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import axios from 'axios';
import "./../styles.css";


const Data = () => {

    const [MapData, setMapData] = useState([]);
    //dropdown usestate and state change
    const [dd_state, setdd_state] = React.useState('none');

    useEffect(() => {
        // data will not change between page loads, don't reload it
        if (MapData.length === 0) {
            refreshList();
        }
    },
        /* This makes sure we run this once */
        []
    );

    async function refreshList() {
        try {
            // django could return html if it wanted, request json specifically
            const headers = {
                'Accept': 'application/json',
            };
            //Axios to send and receive HTTP requests
            console.log("requesting variable list");
            const response = await axios.get(process.env.REACT_APP_API_URL+"/variable_list/", { headers });
            const data = await response.data;
            //DEBUG            
            console.log("variable_list:");
            console.log(data);
            setMapData(data);

        }
        catch (e) {
            //DEBUG
            console.log("error requesting variable list");
            console.log(e);
        }

    };

    //handle state selection of "State" Dropdown
    const handleddStateSelection = (event) => {
        setdd_state(event.target.value);
    };

    return (
        <div className="data_container">
            <div className="data_sidebar">
                <Dropdown
                    label="Pick a State"
                    options={[
                        { label: 'Alabama', value: 'alabama' },
                        { label: 'Arkansas', value: 'arkansas' },
                        { label: 'Xyxyxyxyxyxyxyxyx', value: 'test' },
                    ]}
                    value={dd_state}
                    onChange={handleddStateSelection}
                />

            </div>
            <MapContainer
                style={
                    {
                        width: "85vw",
                        margin: "auto",
                        float: "right"
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
//user defined Dropdown component
const Dropdown = ({ label, value, options, onChange }) => {
    return (
        <label>
            {label}
            <select value={value} onChange={onChange}>
                {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
};
export default Data;