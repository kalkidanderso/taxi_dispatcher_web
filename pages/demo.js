import React, { Component, useState } from "react";
import { render } from "react-dom";
import ReactMapGL, { Source, Layer } from "react-map-gl";
// import ReactMapGL, {Source, Layer} from "mapbox-gl"
export default function Appex() {
         const [viewport, setViewport] = useState(
      {
        latitude: 38.63738602787579,
        longitude: -121.23576311149986,
        zoom: 6.8,
        bearing: 0,
        pitch: 0,
        dragPan: true,
        width: 600,
        height: 600
      })
     

    // const MAPBOX_TOKEN =
    //   "pk.eyJ1Ijoic21peWFrYXdhIiwiYSI6ImNqcGM0d3U4bTB6dWwzcW04ZHRsbHl0ZWoifQ.X9cvdajtPbs9JDMG-CMDsA";
      const MAPBOX_TOKEN = 'pk.eyJ1Ijoia2Fsa2lkYW5kZXJzbyIsImEiOiJjbDM0c3Z2YnIweWFhM2pwNTBlanZwNTIxIn0.BuXnDWLyi-lzmd-gKKiMDA';
    //   mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fsa2lkYW5kZXJzbyIsImEiOiJjbDM0c3Z2YnIweWFhM2pwNTBlanZwNTIxIn0.BuXnDWLyi-lzmd-gKKiMDA';
    const dataOne = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [-122.41510269913951, 37.77909036739809],
          [39.5423, -77.0564]
        ]
      }
    };
    return (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        onViewportChange={(newViewport) => {
          setViewport(newViewport );
        }}
      >
        <Source id="polylineLayer" type="geojson" data={dataOne}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              "line-join": "round",
              "line-cap": "round"
            }}
            paint={{
              "line-color": "rgba(3, 170, 238, 0.5)",
              "line-width": 5
            }}
          />
        </Source>
      </ReactMapGL>
    );
  }













// import React, { useState, useEffect, useRef } from "react";
// // import mnDistricts from "./data/mn/mn-districts.geojson";
// import ReactDOM from 'react-dom';
// import mapboxgl from 'mapbox-gl';

// function Districts(props) {
//     mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fsa2lkYW5kZXJzbyIsImEiOiJjbDM0c3Z2YnIweWFhM2pwNTBlanZwNTIxIn0.BuXnDWLyi-lzmd-gKKiMDA';
//     const mapContainer = useRef(null);
//     const [long, setLong] = useState(-94.503809);
//     const [lat, setLat] = useState(46.443226);
//     const [zoom, setZoom] = useState(4.5);
//     const [hoveredDistrict, _setHoveredDistrict] = useState(null);
//     const hoveredDistrictRef = useRef(hoveredDistrict);

//     const setHoveredDistrict = data => {
//         hoveredDistrictRef.current = data;
//         _setHoveredDistrict(data);
//     };

//     useEffect(() => {

//         let map = new mapboxgl.Map({
//             container: mapContainer.current,
//             style: "mapbox://styles/mapbox/light-v10",
//             center: [long, lat],
//             zoom: zoom
//         });


//             // Add zoom and rotation controls to the map.
//             map.addControl(new mapboxgl.NavigationControl());
//         map.once("load", function () {

//             map.addSource('district-source', {
//                 'type': 'geojson',
//                 'data': mnDistricts
//             });

//             map.addLayer({
//                 'id': 'district-layer',
//                 'type': 'fill',
//                 'source': 'district-source',
//                 'layout': {},
//                 'paint': {
//                     'fill-color': [
//                         'match',
//                         ['get', 'CD116FP'],
//                         '01',
//                         '#5AA5D7',
//                         '02',
//                         '#02735E',
//                         '03',
//                         '#00E0EF',
//                         '04',
//                         '#84D0D9',
//                         '05',
//                         '#202359',
//                         '06',
//                         '#CE7529',
//                         '07',
//                         '#00AE6C',
//                         '08',
//                         '#0056A3',
//                         /* other */ '#ffffff'
//                     ],
//                     'fill-opacity': [
//                         'case',
//                         ['boolean', ['feature-state', 'hover'], false],
//                         .8,
//                         0.5
//                     ]
//                 }
//             });

//             map.on('mousemove', 'district-layer', function (e) {
//                 if (e.features.length > 0) {
//                     if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {

//                         map.setFeatureState(
//                             { source: 'district-source', id: hoveredDistrictRef.current },
//                             { hover: false }
//                         );
//                     }

//                     let _hoveredDistrict = e.features[0].id;

//                     map.setFeatureState(
//                         { source: 'district-source', id: _hoveredDistrict },
//                         { hover: true }
//                     );

//                     setHoveredDistrict(_hoveredDistrict);
//                 }

//             });

//             // When the mouse leaves the state-fill layer, update the feature state of the
//             // previously hovered feature.
//             map.on('mouseleave', 'district-layer', function () {
//                 if (hoveredDistrictRef.current) {
//                     map.setFeatureState(
//                         { source: 'district-source', id: hoveredDistrictRef.current },
//                         { hover: false }
//                     );
//                 }
//                 setHoveredDistrict(null);
//             });

//         });

//     }, []);

//     return (
//         <div className="district-map-wrapper">
//             <div id="districtDetailMap" className="map">
//                 <div style={{ height: "100%" }} ref={mapContainer}>

//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Districts;