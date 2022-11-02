import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import Select from "react-select";
import NumericInput from 'react-numeric-input';
//import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import axios from "axios";
import "./../styles.css";
import logo from "./../components/sdp_logo_fire.png";

const Data = () => {
  const [stateChoice, setStateChoice] = useState();
  const [county, setCounty] = useState();
  const [yearChoice, setYearChoice] = useState();
  const [countyList, setCountyList] = useState([]);
  const [stateList, setList] = useState([]);
  const [variableList, setVariableList] = useState([]);
  const [yearsList, setYearsList] = useState([]);
  const [viewType, setViewType] = useState([]);
  const [doyChoiceLTE, setDoyChoiceLTE] = useState(366);
  const [doyChoiceGTE, setDoyChoiceGTE] = useState(1);
  const [results, setResults] = useState([]);

  useEffect(
    () => {
      // data will not change between page loads, don't reload it
      if (stateList.length === 0) {
        refreshList(stateList, "distinct_states_list/", "s");
      }
      if (yearsList.length === 0){
        refreshList(yearsList, "distinct_years_list/", "y")
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
	  console.log("requesting list");
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
    else if (w==="c") {
      const sList = alist.map((item) => {
        var nitem={
          label: item,
          value: item
        }
      return nitem})
      setCountyList(sList);
    }
    //years list update
    else if (w==="y") {
      const sList = alist.map((item) => {
        var nitem={
          label: item,
          value: item
        }
      return nitem})
      setYearsList(sList);
    }
    //why is useState showing one state change behind in console???
    ///HELP??
    // console.log(stateList);
    // console.log(countyList);

    } catch (e) {
      //DEBUG
      console.log("error requesting state/county list");
      console.log(e);
    }
  }

  async function refreshVariableList(alist, aroute){
	try {
	  const headers = {
		Accept: "application/json",  
	  };
	  console.log("requesting variable list");
	  const response = await axios.get(
        process.env.REACT_APP_DJANGO_API_URL + aroute,
        { headers }
      );
	  alist=[];
      let names = await response.data;
	  for(const [key, description] of Object.entries(names)){
		var item = {label: key, value: description}
		alist.push(item);
	  }
	  const vList = alist;
	  console.log(vList);
	  setVariableList(vList);
	} catch (e) {
	  console.log("error requesting variable list");
      console.log(e);
	}
  }

  const handleStateChange = (obj) => {
    setStateChoice(obj);
    setCountyList(obj);
    //setCounty(null);
    refreshList(stateList, "distinct_counties_list/?STATE="+obj.label, "c");
    console.log(stateChoice);
    console.log(stateList);
  };
 
  // handle change event of the language dropdown
  const handleCountyChange = (obj) => {
    setCounty(obj);
  };

  const handleYearChoiceChange = (obj) => {
    setYearChoice(obj);
  };

  const acresToMetersRadius = (acres) => {
    //r = √(A / π)
    return Math.sqrt(
      // acres to sq meters (approx)
      (acres*4046)
      /3
    );
  }

  async function handleSearch() {
    try{
      // django could return html if it wanted, request json specifically
      const headers = {
          'Accept': 'application/json',
      };
      const params = {
        // FIRE_YEAR: yearChoice.value,
        // DISCOVERY_DOY__lte: doyChoiceLTE,
        // DISCOVERY_DOY__gte: doyChoiceGTE,
        // STATE: stateChoice.value
        ...(yearChoice && {FIRE_YEAR: yearChoice.value}),
        ...(doyChoiceGTE && {DISCOVERY_DOY__gte: doyChoiceGTE}),
        ...(doyChoiceLTE && {DISCOVERY_DOY__lte: doyChoiceLTE}),
        ...(stateChoice && {STATE: stateChoice.value})
        //(someCondition && {b: 5})
      }
      console.log("params:");
      console.log(params);
      //Axios to send and receive HTTP requests
      const response = await axios.get(
          process.env.REACT_APP_DJANGO_API_URL+"search/",
          { params: params,
            headers: headers
          },
      );
      console.log("requesting");
      const data = await response.data;
      console.log(response);
      console.log(data);
      setResults(data);
  }
  catch(e){
      console.log(e);
  }
  }
  
  return (
    <div className="data_container">
      <div className="data_sidebar">
	    <div title="Calendar year in which the fire was discovered or confirmed to exist">
		  YEAR:
		  </div>
		<Select
		  placeholder="-Select Year-"
      value={yearChoice}
      options={yearsList}
      onChange={handleYearChoiceChange}
      getOptionLabel={x => x.label}
      getOptionValue={x => x.value}
		/>
    <br />
    <div title="Day of year on which the fire was discovered or confirmed to exist">
		  DISCOVERY DAY OF YEAR:
		</div>
      {/* <div onChange={e => {
        setDoyEqChoice(e.target.value);
      }}>
        <input type="radio" value="gte" name="doyEQ" /> Greater Than or Equal to
        <br/>
        <input type="radio" value="lte" name="doyEQ" /> Less Than or Equal to
      </div> */}
        GREATER THAN OR EQUAL TO:
        <NumericInput
          min={1}
          max={doyChoiceLTE ? doyChoiceLTE : 366} //leap years?
          value={doyChoiceGTE ? doyChoiceGTE: 1}
          onChange={n => {
            setDoyChoiceGTE(n);
          }
        }
        />
        LESS THAN OR EQUAL TO:
        <NumericInput
          min={doyChoiceGTE ? doyChoiceGTE : 1}
          max={366} //leap years?
          value={doyChoiceLTE ? doyChoiceLTE: 366}
          onChange={n => {
            setDoyChoiceLTE(n);
          }
        }
        />
		<br />
		<div title="Two-letter alphabetic code for the state in which the fire burned (or originated), based on the nominal designation in the fire report">
		  STATE: 
		</div>
        <Select
          placeholder="-Select State-"
          value={stateChoice}
          options={stateList}
          onChange={handleStateChange}
          getOptionLabel={x => x.label}
          getOptionValue={x => x.value}
        />
        <br />
		<div title="County, or equivalent, in which the fire burned (or originated), based on nominal designation in the fire report"> 
		  COUNTY: 
		</div>
        <Select
          placeholder="-Select County-"
          value={county}
          options={countyList}
          onChange={handleCountyChange}
          getOptionLabel={x => x.label}
          getOptionValue={x => x.value}
        />
    <button onClick={handleSearch}>
      Search
    </button>
		<img
			alt="[LOGO]"
			className="sdpLogoLeft"
			src={logo}
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
        {results.map(
          (fire) => (
            <Circle
              center={[fire.LATITUDE, fire.LONGITUDE]}
              key={fire.FOD_ID}
              color={"#ed2626"}
              radius={acresToMetersRadius(fire.FIRE_SIZE)}
            >
              <Popup>
                FOD ID: {fire.FOD_ID}
                <br />
                FIRE NAME: {fire.FIRE_NAME}
              </Popup>
            </Circle>
          )
        )}
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