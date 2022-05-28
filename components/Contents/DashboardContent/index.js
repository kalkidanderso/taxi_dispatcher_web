import React, {useEffect, useState, useRef} from 'react'
import classes from "./main.module.css";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { columns } from '../../Data/TableData';
import Button from "@material-table/core"
import Router from "next/router";
import axios from "axios";
// import mapboxSdk from "@mapbox/mapbox-sdk";
import mapboxSdk from '@mapbox/mapbox-sdk/services/geocoding';


export default function index() {

  

  return (
    
    <div className={classes.mainContent}>
     
      </div>
  )
}
