
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {NavigationControl,}  from "mapbox-gl";
import { ScaleControl } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import classes from "../components/Map/map.module.css";
// import geojson from "../components/icons/chicago-parks.geojson";
function Map(props) {
  mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fsa2lkYW5kZXJzbyIsImEiOiJjbDM0c3Z2YnIweWFhM2pwNTBlanZwNTIxIn0.BuXnDWLyi-lzmd-gKKiMDA';

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(38.7728);
  const [lat, setLat] = useState(8.9659);
  const [zoom, setZoom] = useState(9);
 const [demo, setDemo] = useState("");
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
    const marker1 = new mapboxgl.Marker({color: "red"})
    .setLngLat([38.7728, 8.9659])
    .addTo(map.current);
    const marker2 = new mapboxgl.Marker({ color: 'red', rotation: 10})
.setLngLat([38.4735, 7.0669])
.addTo(map.current);

    map.current.on('load', function() {

 
      map.current.addSource('route', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        'coordinates': [
        // [-122.483696, 37.833818],
        // [-122.483482, 37.833174],
        // [-122.483396, 37.8327],
        // [-122.483568, 37.832056],
        // [-122.48404, 37.831141],
        // [-122.48404, 37.830497],
        // [-122.483482, 37.82992],
        // [-122.483568, 37.829548],
        // [-122.48507, 37.829446],
        // [-122.4861, 37.828802],
        // [-122.486958, 37.82931],
        // [-122.487001, 37.830802],
        // [-122.487516, 37.831683],
        // [-122.488031, 37.832158],
        // [-122.488889, 37.832971],
        // [-122.489876, 37.832632],
        // [-122.490434, 37.832937],
        // [-122.49125, 37.832429],
        // [-122.491636, 37.832564],
        // [-122.492237, 37.833378],
        // [-122.493782, 37.833683]
        [38.7728, 8.9659],
        [38.4735, 7.0669]
        ]
        }
        }
        });
        map.current.addLayer({
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

      // map.current.addSource('route', {
      //     'type': 'geojson',
      //     'data': {
      //         'type': 'Feature',
      //         'properties': {},
      //         'geometry': {
      //             'type': 'LineString',
      //             'coordinates': [
      //                 [38.7728, 8.9659],
      //                 [38.4735, 7.0669]
      //             ]
      //         },
      //         style: {
      //           fill: 'red',
      //           strokewidth: '10',
      //           fillOpacity: 0.6,
      //         },
      //         paint:{
      //           'fill-color':'#088',
      //           'fill-opacity': 0.8,
      //         },
      //     }
      // });
      // map.current.addLayer({
      //     'id': 'route',
      //     'type': 'line',
      //     'source': 'route',
      //     'layout': {
      //         'line-join': 'round',
      //         'line-cap': 'round'
      //     },
      //     'paint': {
      //         'line-color': 'red',
      //         'line-width': 8
      //     }
      // });
  });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      });
    map.current.addControl(
      new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
      }));
      map.current.addControl(new mapboxgl.NavigationControl());
  });

  

  return (
    <div className={classes.map}>
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
      <div ref={mapContainer} className={classes.mapContainer} />
    </div>
  );
}

export default Map;
