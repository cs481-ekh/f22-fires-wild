import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import Select from "react-select";
//import Select from '@mui/material/Select'
import Slider from '@mui/material/Slider'
import NumericInput from "react-numeric-input";
//import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import axios from "axios";
import "./../styles.css";
import logo from "./../components/sdp_logo_fire.png";
import { Link } from "react-router-dom";
import JSPopup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';




const Data = () => {
  const [stateChoice, setStateChoice] = useState();
  const [countyChoice, setCountyChoice] = useState();
  const [yearChoice, setYearChoice] = useState();
  const [countyList, setCountyList] = useState([]);
  const [stateList, setList] = useState([]);
  const [variableList, setVariableList] = useState([]);
  const [yearsList, setYearsList] = useState([]);
  const [viewType, setViewType] = useState([]);
  const [doyChoiceLTE, setDoyChoiceLTE] = useState(366);
  const [doyChoiceGTE, setDoyChoiceGTE] = useState(1);
  const [sizeChoiceLTE, setSizeChoiceLTE] = useState();
  const [sizeChoiceGTE, setSizeChoiceGTE] = useState();
  const [results, setResults] = useState([]);
  const [isWarningExpanded, setWarningExpanded] = useState(false);

  const Input = styled(MuiInput)`
  width: 42px;
  `;
  const [value, setValue] = React.useState(1);
  const [valueLTE, setValueLTE] = React.useState(1);
  const [doubleValue, setDoubleValue] = React.useState([1,366])
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSliderChangeGTE = (event, newValue) => {
    setValue(newValue);
    setDoyChoiceGTE(Number(event.target.value));
  };
  const handleSliderChangeLTE = (event, newValue) => {
    setValueLTE(newValue);
    setDoyChoiceLTE(Number(event.target.value));
  };
  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 366) {
      setValue(366);
    }
  };
  const testSliderChange = (event, newValue) => {
    setDoubleValue(handleSliderChangeGTE, handleInputChangeLTE);
  };
  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };
  const handleInputChangeGTE = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    setDoyChoiceGTE(Number(event.target.value));
  };

  const handleInputChangeLTE = (event) => {
    setValueLTE(event.target.value === '' ? '' : Number(event.target.value));
    setDoyChoiceLTE(Number(event.target.value));
  };

  const [searchCount, setSearchCount] = useState(0);
  const [searchTime, setSearchTime] = useState(0);

  useEffect(
    () => {
      // data will not change between page loads, don't reload it
      if (stateList.length === 0) {
        refreshList(stateList, "distinct_states_list/", "s");
      }
      if (yearsList.length === 0) {
        refreshList(yearsList, "distinct_years_list/", "y");
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
      alist = [];
      let names = await response.data;
      names.forEach((item) => {
        alist.push(item);
      });

      //s indicates we want a state list to update
      if (w === "s") {
        const sList = alist.map((item) => {
          var nitem = {
            label: item,
            value: item,
          };
          return nitem;
        });
        setList(sList);
      }
      //county list update
      else if (w === "c") {
        const sList = alist.map((item) => {
          var nitem = {
            label: item,
            value: item,
          };
          return nitem;
        });
        setCountyList(sList);
      }
      //years list update
      else if (w === "y") {
        const sList = alist.map((item) => {
          var nitem = {
            label: item,
            value: item,
          };
          return nitem;
        });
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

  async function refreshVariableList(alist, aroute) {
    try {
      const headers = {
        Accept: "application/json",
      };
      console.log("requesting variable list");
      const response = await axios.get(
        process.env.REACT_APP_DJANGO_API_URL + aroute,
        { headers }
      );
      alist = [];
      let names = await response.data;
      for (const [key, description] of Object.entries(names)) {
        var item = { label: key, value: description };
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
    refreshList(stateList, "distinct_counties_list/?STATE=" + obj.label, "c");
    console.log(stateChoice);
    console.log(stateList);
  };

  // handle change event of the language dropdown
  const handleCountyChange = (obj) => {
    setCountyChoice(obj);
  };

  const handleYearChoiceChange = (obj) => {
    setYearChoice(obj);
  };

  const acresToMetersRadius = (acres) => {
    //r = √(A / π)
    return Math.sqrt(
      // acres to sq meters (approx)
      (acres * 4046) / 3
    );
  };

  async function handleSearch() {
    setSearchTime(0);
    var startTime = performance.now();
    try {
      // django could return html if it wanted, request json specifically
      const headers = {
        Accept: "application/json",
      };
      const params = {
        ...(yearChoice && { FIRE_YEAR: yearChoice.value }),
        ...(doyChoiceGTE && { DISCOVERY_DOY__gte: doyChoiceGTE }),
        ...(doyChoiceLTE && { DISCOVERY_DOY__lte: doyChoiceLTE }),
        ...(stateChoice && { STATE: stateChoice.value }),
        ...(countyChoice && { COUNTY: countyChoice.value }),
        ...(sizeChoiceGTE && { FIRE_SIZE__gte: sizeChoiceGTE }),
        ...(sizeChoiceLTE && { FIRE_SIZE__lte: sizeChoiceLTE }),
      };
      console.log("params:");
      console.log(params);
      //Axios to send and receive HTTP requests
      const response = await axios.get(
        process.env.REACT_APP_DJANGO_API_URL + "search/",
        { params: params, headers: headers }
      );
      console.log("requesting");
      const data = await response.data;
      console.log(response);
      console.log(data);
      setSearchCount(data.length);
      setResults(data);
    } catch (e) {
      console.log(e);
    }
    var endTime = performance.now();
    var timeDiff = (endTime-startTime)/1000;
    setSearchTime(timeDiff);
  }

  const toggleWarning = () => {
    setWarningExpanded(!isWarningExpanded);
  };

  return (
    <div className="data_container">
      <div className="data_sidebar">
        {/* <a onClick={toggleWarning}></a> */}
        <JSPopup
          trigger={<Link>⚠️ A Word of Warning ⚠️</Link>}
          position="bottom center"
        >
          <div>
            Results with more than 10,000 fires on the map at a time causes poor
            browser performance.
            <br />
            For the best experience, filter your search to be as detailed as
            possible.
          </div>
        </JSPopup>
        <br />
        <br />
        <div title="Calendar year in which the fire was discovered or confirmed to exist">
          YEAR:
        </div>
        <Select
          placeholder="-Select Year-"
          isClearable={true}
          value={yearChoice}
          options={yearsList}
          onChange={handleYearChoiceChange}
          getOptionLabel={(x) => x.label}
          getOptionValue={(x) => x.value}
        />
        <br />
        <div title="Two-letter alphabetic code for the state in which the fire burned (or originated), based on the nominal designation in the fire report">
          STATE:
        </div>
        <Select
          placeholder="-Select State-"
          isClearable={true}
          value={stateChoice}
          options={stateList}
          onChange={handleStateChange}
          getOptionLabel={(x) => x.label}
          getOptionValue={(x) => x.value}
        />
        <br />
        <div title="County, or equivalent, in which the fire burned (or originated), based on nominal designation in the fire report">
          COUNTY:
        </div>
        <Select
          placeholder="-Select County-"
          isClearable={true}
          value={countyChoice}
          options={countyList}
          onChange={handleCountyChange}
          getOptionLabel={(x) => x.label}
          getOptionValue={(x) => x.value}
        />
        <br />
        <div title="Day of year on which the fire was discovered or confirmed to exist">
          DISCOVERY DAY OF YEAR:
        </div>
{/*        Greater than or Equal to:
        <NumericInput
          min={1}
          max={doyChoiceLTE ? doyChoiceLTE : 366} //leap years?
          value={doyChoiceGTE ? doyChoiceGTE : 1}
          onChange={(n) => {
            setDoyChoiceGTE(n);
          }}
        />*/}
{/*        <Slider
          aria-label="DOY"
          defaultValue={1}
          min={1}
          max={366}
        />*/}



    <div>
      Greater than or equal to:
    </div>
    <Box sx={{ width: 400 }}>
{/*      <Typography id="input-slider" gutterBottom>
        DDOY Greater than or equal to
      </Typography> */}
      <Grid container spacing={2} alignItems="center">
        <Grid item>

        </Grid>
        <Grid item xs>
          <Slider
            value={doyChoiceGTE ? doyChoiceGTE : 1}
            onChange={handleSliderChangeGTE}
            min={1}
            max={doyChoiceLTE ? doyChoiceLTE : 366}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChangeGTE}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 1,
              max: doyChoiceLTE ? doyChoiceLTE : 366,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>

    <div>
      Less than or equal to:
    </div>
    <Box sx={{ width: 400 }}>
{/*      <Typography id="input-slider" gutterBottom>
        DDOY Greater than or equal to
      </Typography> */}

{/*      <Grid test>
        <Slider
          getAriaLabel={() => 'Minimum distance'}
          value={[doyChoiceLTE ? doyChoiceLTE : 366, doyChoiceGTE ? doyChoiceGTE : 1]}
          onChange={testSliderChange}
          max={366}
          min={1}
          valueLabelDisplay="auto"
          disableSwap
          />
    </Grid>*/}

      <Grid container spacing={2} alignItems="center">
        <Grid item>
        </Grid>
        <Grid item xs>
          <Slider
            value={doyChoiceLTE ? doyChoiceLTE : 366}
            onChange={handleSliderChangeLTE}
            min={doyChoiceGTE ? doyChoiceGTE : 1}
            max={366}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={doyChoiceLTE ? doyChoiceLTE : 366}
            size="small"
            onChange={handleInputChangeLTE}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: doyChoiceGTE ? doyChoiceGTE : 1,
              max: 366,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>






{/*        Less than or Equal to:
        <NumericInput
          min={doyChoiceGTE ? doyChoiceGTE : 1}
          max={366} //leap years?
          value={doyChoiceLTE ? doyChoiceLTE : 366}
          onChange={(n) => {
            setDoyChoiceLTE(n);
          }}
        />*/}
        <br />
        <br />
        <div title="The estimate of acres within the final perimeter of the fire">
          FIRE SIZE:
        </div>
        Greater than or Equal to:
        <TextField
          type="number"
          size="small"
          variant="outlined"
          min={0}
          max={sizeChoiceLTE ? sizeChoiceLTE : 99999999}
          value={sizeChoiceGTE ? sizeChoiceGTE : 0}
          onChange={(n) => {
            setSizeChoiceGTE(n);
          }}
        />
        Less than or Equal to:
        <NumericInput
          min={sizeChoiceGTE ? sizeChoiceGTE : 0}
          value={sizeChoiceLTE ? sizeChoiceLTE : 0}
          onChange={(n) => {
            setSizeChoiceLTE(n);
          }}
        />
        <br />
        <br />
        <button onClick={handleSearch}>Search</button>
        <br />
        <div>Showing {searchCount} results ({searchTime} seconds)</div>
        <Link to={"/"}>
          <img alt="[LOGO]" className="sdpLogoLeft" src={logo} />
        </Link>
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
        {results.map((fire) => (
          <Circle
            center={[fire.LATITUDE, fire.LONGITUDE]}
            key={fire.FOD_ID}
            color={"#ed2626"}
            radius={acresToMetersRadius(fire.FIRE_SIZE)}
          >
            <Popup>
              FOD ID: {fire.FOD_ID}
              <br />
              FPA ID: {fire.FPA_ID}
              <br />
              FIRE NAME: {fire.FIRE_NAME}
              <br />
              <Link to={"/"}>details (coming soon)</Link>
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
};

export default Data;
