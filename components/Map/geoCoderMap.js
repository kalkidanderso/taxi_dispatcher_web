import React, {useEffect, useState, useRef} from 'react'
import classes from "./map.module.css";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { columns } from '../../Data/TableData';
import Button from "@material-table/core"
import Router from "next/router";
import axios from "axios";
// import mapboxSdk from "@mapbox/mapbox-sdk";
import mapboxSdk from '@mapbox/mapbox-sdk/services/geocoding';

import dynamic from "next/dynamic";
const Map =  dynamic(() => import("../../Map"));

export default function index() {
  mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fsa2lkYW5kZXJzbyIsImEiOiJjbDM0c3Z2YnIweWFhM2pwNTBlanZwNTIxIn0.BuXnDWLyi-lzmd-gKKiMDA';

  const newMapContainer = useRef(null);
  const newMap = useRef(null);
  const [lng, setLng] = useState(38.7595);
  const [lat, setLat] = useState( 8.0234);
  const [zoom, setZoom] = useState(1.2);
  const [cordinateHandler, setCordinateHandler] = useState([]);
  const [startingCordinate, setStartingCordinte] = useState([]);
  const [destinationCordinate, setDestinationCordinate] = useState([]);

  const image = useRef();

  const [startingPlace, setStartingPlace] = useState("");
  const [destination, setDestination] = useState("");
  const [email, setEmail] = useState("");
  const [isStartLoading, setIsStartLoading] = useState(false);
  const [isDestinationLoading, setIsDestinationLoading] = useState(false);
 
  const [startResults, setStartResults] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);
  

 let number = 0;
  const [passwordError, setPasswordError] = useState("");
  const [conPasswordError, setConPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cityError, setCityError] = useState("");
  
  const [showLoading, changeLoadingStatus] = useState(false);
  let marker1;
  let marker2;
  useEffect(() => {
    if (newMap.current) return; // initialize map only once
    newMap.current = new mapboxgl.Map({
      container: newMapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
   

    newMap.current.on('load', function() {

 
      newMap.current.addSource('route', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        'coordinates': [
      
        [38.7728, 8.9659],
        [38.4735, 7.0669]
        ]
        }
        }
        });
        newMap.current.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': 'red',
        'line-width': 8
        }
        });

     
  });

    newMap.current.on('move', () => {
      setLng(newMap.current.getCenter().lng.toFixed(4));
      setLat(newMap.current.getCenter().lat.toFixed(4));
      setZoom(newMap.current.getZoom().toFixed(2));
      });
//     map.current.addControl(
//       new MapboxGeocoder({
//       accessToken: mapboxgl.accessToken,
//       mapboxgl: mapboxgl
//       }));
     newMap.current.addControl(new mapboxgl.FullscreenControl());
      newMap.current.addControl(new mapboxgl.NavigationControl());

  }, [startingCordinate, destinationCordinate, number]);
// }
   function setCordinates(place, placeType){
     let center;
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fsa2lkYW5kZXJzbyIsImEiOiJjbDM0c3Z2YnIweWFhM2pwNTBlanZwNTIxIn0.BuXnDWLyi-lzmd-gKKiMDA';
    const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    mapboxClient.forwardGeocode({
    query: place,
    autocomplete: false,
    limit: 1
    })
    .send()
    .then((response) => {
    if (
    !response ||
    !response.body ||
    !response.body.features ||
    !response.body.features.length
        ) {
        console.error('Invalid response:');
        console.error(response);
        return;
        }
        const feature = response.body.features[0];
        if(placeType === "start"){
          setStartingCordinte(feature.center);
         let marker1 = new mapboxgl.Marker({color: "red"}).setLngLat(feature.center).addTo(newMap.current);
         
        }
        if(placeType === "destination"){
          setDestinationCordinate(feature.center)
          let marker2 = new mapboxgl.Marker({color: "green"}).setLngLat(feature.center).addTo(newMap.current);
        }
   });
  }
   
  const submitFormHandler = () => {

  }
  function handleItemClicked(place) {
      setStartingPlace(place.place_name);
      setResults([]);
    
  }
 function performSearch(place) {
   if(place === "start"){
    if (startingPlace === "") {
      setStartResults([]);
      setIsStartLoading(false);
      return;
    }
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${startingPlace}.json?access_token=${mapboxgl.accessToken}`)
      .then(response => {
          setStartResults(response.data.features),
          setIsStartLoading(false)
        })
    }
    if(place === "destination"){
      if (destination === "") {
        setDestinationResults([]);
        setIsDestinationLoading(false);
        return;
      }
      axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${destination}.json?access_token=${mapboxgl.accessToken}`)
        .then(response => {
          setDestinationResults(response.data.features),
          setIsDestinationLoading(false)
          })
    }
      }
  return (
    
    <div className={classes.mainContent}>


     <div className={classes.titleDivision}>
       <p className={classes.labler}>Manual Booking</p>
       </div>      
       {/* <button onClick={() => Router.push("/drivers/add_drivers")} className={classes.addPassenger}>Manua</button>     */}
       <div className={classes.otherDivision}>
           <div className={classes.contentDiv}>
           <form onSubmit={submitFormHandler} className={classes.form}>
              
                
                <div className={classes.formControl}>
                  <label className={classes.label} htmlFor="email">Email: <span className={classes.alert}>*</span></label>
                  <input value={email} onChange={(e) =>{
                     setEmail(e.target.value)}
                    }
                      className={classes.input} type="email" id='email' required />
                </div>
               
                <div className={classes.formControl}>
                  <label className={classes.label}
                   htmlFor="startingPlace">Starting Place:
                    <span className={classes.alert}>*</span></label>
                  <input
                   value={startingPlace} 
                  onChange={(e) =>{
                     setStartingPlace(e.target.value)
                      setIsStartLoading(true)
                      clearTimeout(timeoutId);  
                      const timeoutId = setTimeout(() => {
                        performSearch("start")
                      }, 1000)     
                    }
                    }

                      className={classes.input} type="text" id='startingPlace' required/>
                  <ul className={classes.AutocompletePlaceResults}>
                  {startResults.map(place => (
                    <li
                      key={place.id}
                      className={classes.AutocompletePlaceItems}
                      onClick={() => {
                        setStartingPlace(place.place_name);
                        setStartResults([]);
                        setCordinates(place.place_name, "start");
                      }}
                    >
                      {place.place_name}
                    </li>
                  ))}
                  {isStartLoading && <li className="AutocompletePlace-items">Loading...</li>}
                </ul>
                </div>
                <div className={classes.formControl}>
                  <label className={classes.label}
                   htmlFor="destination">Destination:
                    <span className={classes.alert}>*</span></label>
                  <input
                   value={destination}
                    onChange={(e) => {
                      setDestination(e.target.value)
                      setIsDestinationLoading(false)
                      clearTimeout(timeoutId);  
                      const timeoutId = setTimeout(() => {
                        performSearch("destination")
                      }, 1000)  
                    }}
                     className={classes.input} type="text"
                      id='destination' required/>

                       <ul className={classes.AutocompletePlaceResults}>
                  {destinationResults.map(place => (
                    <li
                      key={place.id}
                      className={classes.AutocompletePlaceItems}
                      onClick={() => {
                        setDestination(place.place_name);
                        setDestinationResults([]);
                        setCordinates(place.place_name, "destination");
                      }}
                    >
                      {place.place_name}
                    </li>
                  ))}
                  {isDestinationLoading && <li className="AutocompletePlace-items">Loading...</li>}
                </ul>
                </div>

               
                <div className={classes.buttons}>
                <button type='submit' className={classes.save}>Save</button>    
                <button type='reset' className={classes.save}>Reset</button>    
                </div>
              </form>
           </div>
           <div className={classes.mapDiv}>
           <link href="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css" rel="stylesheet"></link>
          <script src="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js"></script>

          <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
          <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css"></link>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"></link>
        <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.js'></script>
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
          <div className={classes.mapsidebar}>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
          </div>
          <div ref={newMapContainer} className={classes.mapContainer} />
           </div>
        
       </div>
       <h1>{startingCordinate}</h1>
       <h1>{destinationCordinate}</h1>
    </div>
  )
}



// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import {NavigationControl,}  from "mapbox-gl";
// import { ScaleControl } from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
// import classes from "./map.module.css";

// function Map(props) {
//   mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fsa2lkYW5kZXJzbyIsImEiOiJjbDM0c3Z2YnIweWFhM2pwNTBlanZwNTIxIn0.BuXnDWLyi-lzmd-gKKiMDA';
//   const geoCoder = new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken,
//     mapboxgl: mapboxgl
//     })
//     const newGeoCoder = new MapboxGeocoder({
//       accessToken: mapboxgl.accessToken,
//       mapboxgl: mapboxgl
//       })
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(38.7595);
//   const [lat, setLat] = useState( 9.0234);
//   const [zoom, setZoom] = useState(9);

//   const [someData, setSomeData] = useState({});
//   const [startPlaceName, setStartPlaceName] = useState("");
//   const [destinationPlaceName, setDestinationPlaceName] = useState("");
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     if (map.current) return; // initialize map only once
//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: 'mapbox://styles/mapbox/streets-v11',
//       center: [lng, lat],
//       zoom: zoom
//     });
//     map.current.on('move', () => {
//       setLng(map.current.getCenter().lng.toFixed(4));
//       setLat(map.current.getCenter().lat.toFixed(4));
//       setZoom(map.current.getZoom().toFixed(2));
//       });
    
//     // map.current.addControl(geoCoder);
//     document.getElementById('geocoder').appendChild(geoCoder.onAdd(map.current));
//     // map.current.addControl(geoCoder);
//     document.getElementById('newGeocoder').appendChild(newGeoCoder.onAdd(map.current));
    
//       map.current.addControl(new mapboxgl.NavigationControl());

//       map.current.on('load', () => {
//         map.current.addSource('single-point', {
//         'type': 'geojson',
//         'data': {
//         'type': 'FeatureCollection',
//         'features': []
//         }
//         });
         
//         map.current.addLayer({
//         'id': 'point',
//         'source': 'single-point',
//         'type': 'circle',
//         'paint': {
//         'circle-radius': 10,
//         'circle-color': '#448ee4'
//         }
//         });


//         map.current.addSource('single-points', {
//           'type': 'geojson',
//           'data': {
//           'type': 'FeatureCollection',
//           'features': []
//           }
//           });
           
//           map.current.addLayer({
//           'id': 'points',
//           'source': 'single-points',
//           'type': 'circle',
//           'paint': {
//           'circle-radius': 10,
//           'circle-color': '#448ee4'
//           }
//           });
         
//         // Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
//         //  Add a marker at the result's coordinates
//         geoCoder.on('result', (event) => {
//         map.current.getSource('single-point').setData(event.result.geometry);
//         setSomeData(event.result.geometry);
//         setStartPlaceName(event.result.place_name);
       
//       });

//       newGeoCoder.on('result', (event) => {
//         map.current.getSource('single-points').setData(event.result.geometry);
//         setDestinationPlaceName(event.result.place_name);
//         // setSomeData(event.result.geometry);
//       });

//     });
//   });

//   const submitFormHandler = () => {

//   }

//   return (
//     <div>
//     <div className={classes.map}>
//       <link href="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css" rel="stylesheet"></link>
//     	<script src="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js"></script>

//       <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
// 	    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css"></link>
	
//       <div className={classes.mapsidebar}>
//         Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//       </div>
//       <div ref={mapContainer} className={classes.mapContainer} />
//       <div id="geocoder" className={classes.geocoder}></div>
//       <div id="newGeocoder" className={classes.geocoder}></div>
      
//     </div>
//    {/* <ul style={{marginTop: "60px", fontSize:"20px"}}>
//      {someData.map(d => (
//        <li>{d}</li>
//      ))}
//      </ul> */}
//      <button onClick={() => props.onSettingPlace(startPlaceName)}>Send The Data</button>
//      <h1>{startPlaceName}</h1>
//      <h1>{destinationPlaceName}</h1>
     
//     </div>

//   );
// }

// export default Map;
