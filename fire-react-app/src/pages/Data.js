import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Select from "react-select";
//import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import axios from "axios";
import "./../styles.css";


const Data = () => {
  const [stateChoice, setStateChoice] = useState(null);
  const [county, setCounty] = useState(null);
  const [countyList, setCountyList] = useState([]);
  const [list, setList] = useState([]);

  useEffect(
    () => {
      // data will not change between page loads, don't reload it
      if (list.length === 0) {
        refreshList(list);
      }
    },
    /* This makes sure we run this once */
    []
  );

  async function refreshList(alist) {
    try {
      // django could return html if it wanted, request json specifically
      const headers = {
        Accept: "application/json",
      };
      //Axios to send and receive HTTP requests
      console.log("requesting variable list");
      const response = await axios.get(
        process.env.REACT_APP_DJANGO_API_URL + "distinct_states_list/",
        { headers }
      );
      
      let names = await response.data;
    names.forEach((item) => {
      alist.push(item);
    });
    
    const mList = alist.map((item) => {
      var newm = <li
                  label={item}
                  value={item}
                  />
      return newm});
    console.log(mList);
    setList(mList);
    console.log(list);

    } catch (e) {
      //DEBUG
      console.log("error requesting variable list");
      console.log(e);
    }
  }

  const handleStateChange = (obj) => {
    setStateChoice(obj);
    setCountyList(obj);
    setCounty(null);
  };
 
  // handle change event of the language dropdown
  const handleCountyChange = (obj) => {
    setCounty(obj);
  };

  return (
    <div className="data_container">
      <div className="data_sidebar">
        <Select
          placeholder="-Select State-"
          value={stateChoice}
          options={list}
          onChange={handleStateChange}
          //getOptionLabel={x => x.label}
          //getOptionValue={x => x.value}
        />
        <br />
        <Select
          placeholder="-Select County-"
          value={county}
          options={countyList}
          onChange={handleCountyChange}
         // getOptionLabel={x => x.name}
          //getOptionValue={x => x.code}
        />
      </div>
      <MapContainer
        style={{
          width: "85vw",
          margin: "auto",
          float: "right",
        }}
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
};
//user defined Dropdown component
const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <label>
      {label}
      <select
        value={value}
        onChange={onChange}
        data-cy="state-selection-sidebar"
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};
export default Data;
