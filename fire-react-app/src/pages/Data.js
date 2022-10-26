import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Select from "react-select";
//import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import axios from "axios";
import "./../styles.css";


const Data = () => {
  const [stateChoice, setStateChoice] = useState({});
  const [county, setCounty] = useState(null);
  const [countyList, setCountyList] = useState([]);
  const [stateList, setList] = useState([]);

  useEffect(
    () => {
      // data will not change between page loads, don't reload it
      if (stateList.length === 0) {
        refreshList(stateList, "distinct_states_list/", "s");
      }
    },
    /* This makes sure we run this once */
    []
  );

  async function refreshList(alist, aroute, w) {
    try {
      // django could return html if it wanted, request json specifically
      const headers = {
        Accept: "application/json",
      };
      //Axios to send and receive HTTP requests
      console.log("requesting variable list");
      const response = await axios.get(
        process.env.REACT_APP_DJANGO_API_URL + aroute,
        { headers }
      );
      alist=[];
      let names = await response.data;
    names.forEach((item) => {
      alist.push(item);
    });
    
    //s indicates we want a state list to update
    if (w==="s") {
      const sList = alist.map((item) => {
        var nitem={
          label: item,
          value: item
        }
      return nitem})
      setList(sList);
    }
    //county list update
    else {
      const sList = alist.map((item) => {
        var nitem={
          label: item,
          value: item
        }
      return nitem})
      setCountyList(sList);
    }
    //why is useState showing one state change behind in console???
    ///HELP??
    console.log(stateList);
    console.log(countyList);

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
    refreshList(stateList, "distinct_counties_list/?STATE="+obj.label, "c");
    console.log(stateChoice);
    console.log(stateList);
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
          options={stateList}
          onChange={handleStateChange}
          getOptionLabel={x => x.label}
          getOptionValue={x => x.value}
        />
        <br />
        <Select
          placeholder="-Select County-"
          value={county}
          options={countyList}
          onChange={handleCountyChange}
          getOptionLabel={x => x.label}
          getOptionValue={x => x.value}
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
