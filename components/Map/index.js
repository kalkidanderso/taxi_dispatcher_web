
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import {NavigationControl,}  from "mapbox-gl";
import { ScaleControl } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import classes from "./map.module.css";

function Map(props) {
  mapboxgl.accessToken ="pk.eyJ1Ijoia2Fsa2lkYW5kZXJzbyIsImEiOiJjbDM0c3Z2YnIweWFhM2pwNTBlanZwNTIxIn0.BuXnDWLyi-lzmd-gKKiMDA";
  const geoCoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
    })
   
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(38.7595);
  const [lat, setLat] = useState( 9.0234);
  const [zoom, setZoom] = useState(9);

  const [someData, setSomeData] = useState({});
  const [address, setAddress] = useState("Africa");

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
      });
    
    map.current.addControl(geoCoder);
    map.current.addControl(new mapboxgl.FullscreenControl());
    map.current.addControl(new mapboxgl.NavigationControl());

      map.current.on('load', () => {
        map.current.addSource('single-point', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': []
        }
        });
         
        map.current.addLayer({
        'id': 'point',
        'source': 'single-point',
        'type': 'circle',
        'paint': {
        'circle-radius': 10,
        'circle-color': '#448ee4'
        }
        });

         
        geoCoder.on('result', (event) => {
        map.current.getSource('single-point').setData(event.result.geometry);
        setSomeData(event.result.geometry);
        setAddress(event.result.place_name);
        props.onSettingPlace(event.result.place_name)
      });


    });
  });


  return (
    <div>
    <div className={classes.map}>
      <link href="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css" rel="stylesheet"></link>
    	<script src="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js"></script>

      <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
	    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css"></link>
	
      <div className={classes.mapsidebar}>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className={classes.mapContainer} />
      <div id="geocoder" className={classes.geocoder}></div>
      <div id="newGeocoder" className={classes.geocoder}></div>
      
    </div>
    </div>

  );
}

export default Map;
