

import React, {useEffect, useState, useRef} from 'react'
import classes from "./main.module.css";
import { DataUsage } from "@material-ui/icons";
import account from "../../../icons/account.png";
import {Button} from "@material-ui/core";
import upload from "../../../icons/upload.png";
import Image from "next/image";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import loading from "../../../icons/loading.gif";


import dynamic from 'next/dynamic'
const Map =  dynamic(() => import ('../../../Map'));

export default function index() {
  mapboxgl.accessToken = 'pk.eyJ1Ijoia2Fsa2lkYW5kZXJzbyIsImEiOiJjbDM0c3Z2YnIweWFhM2pwNTBlanZwNTIxIn0.BuXnDWLyi-lzmd-gKKiMDA';

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(38.7595);
  const [lat, setLat] = useState( 9.0234);
  const [zoom, setZoom] = useState(9);


  // const firstName = useRef();
  // const lastName = useRef();
  // const email = useRef();
  // const password = useRef();
  // const conPassword = useRef();
  const image = useRef();
  // const phoneNumber = useRef();
  // const city = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");



  const [passwordError, setPasswordError] = useState("");
  const [conPasswordError, setConPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cityError, setCityError] = useState("");
  
  const [showLoading, changeLoadingStatus] = useState(false);
  

  // const address = useRef("Addis Ababa");


  const geocoder =  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
    });
  
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
    
    map.current.addControl(geocoder);
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
        // map.current.addLayer({
        //   'id': 'point',
        //   'source': 'single-point',
        //   'type': 'circle',
        //   'paint': {
        //   'circle-radius': 10,
        //   'circle-color': '#448ee4'
        //   }
        //   });
          geocoder.on('result', (event) => {
            map.current.getSource('single-point').setData(event.result.geometry);
            });
      });

  });
  
  const passwordValidator = (password) => {
    var strongRegex = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");
    const conditions = strongRegex.test(password);
     return conditions;
      }
  

  const submitFormHandler = (e) => {
      e.preventDefault();
      
      if(password !== conPassword){
              setConPasswordError("Password should be similar");
              setTimeout(() => {
                setConPasswordError("");
              }, 6000)
      }
      else{

        if(!passwordValidator(password)){
          setPasswordError("Password Should contains letter, number & character and minimum of length 6");
          setTimeout(() => {
            setPasswordError("");
          }, 6000);
        }else {
          changeLoadingStatus(true);
      const name = firstName + ' ' + lastName;
      const address =   map.current.getCenter();
      

      const reqBody = {name: name, email:email, password: password,
         phoneNumber: phoneNumber, profileImage: image.current.value, city: city, address: address};

       console.log(address);
      fetch("/api/passengers", {
         method: "POST", 
         body: JSON.stringify(reqBody),
         headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
         }
       })
       .then((response )=> {
         return  response.json()
        })
       .then(data => {
        //  console.log(data.message);
         if(data.stat === "OK"){
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConPassword("");
          setPhoneNumber("");
          setCity("");

          // setLng();
          // setLat();
          map.current.setLng(38.7595);
          map.current.setLng(9.0234);

        }
         changeLoadingStatus(false);
       })
       .catch((error) =>{

      //  console.log(error);
       changeLoadingStatus(false);
       })
  }
  }}

  
  return (
    
    <div className={classes.mainContent}>



     <div className={classes.titleDivision}>
       <p className={classes.labler}>Adding New Passenger</p>
       </div>      
       <div className={classes.otherDivision}>
         
            <div className={classes.formDiv}>

             <div className={classes.titleDivisions}>
               <div className={classes.insider}></div>
              <div className={classes.titleIcon}>
              <DataUsage />
             </div>
        <p className={classes.title}>Adding Passenger</p>
      </div>
              <form onSubmit={submitFormHandler} className={classes.form}>
                <div className={classes.formControl}>
                  <label className={classes.label} htmlFor="firstName">First Name: <span className={classes.alert}>*</span></label>
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className={classes.input} type="text" id='firstName' required/>
                </div>
                <div className={classes.formControl}>
                  <label className={classes.label} htmlFor="lastName">Last Name: <span className={classes.alert}>*</span></label>
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} className={classes.input} type="text" id='lastName' required/>
                </div>
                <div className={classes.formControl}>
                  <label className={classes.label} htmlFor="email">Email: <span className={classes.alert}>*</span></label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} className={classes.input} type="email" id='email' required />
                </div>
                <div className={classes.formControl}>
                  <label className={classes.label} htmlFor="password">Password: <span className={classes.alert}>* {passwordError}</span></label>
                  <input value={password} onChange={(e) => setPassword(e.target.value)} className={classes.input} type="password" id='password' required />
                </div>
                <div className={classes.formControl}>
                  <label className={classes.label} htmlFor="conPassword">Confirm Password: <span className={classes.alert}>* {conPasswordError}</span></label>
                  <input value={conPassword} onChange={(e) => setConPassword(e.target.value)} className={classes.input} type="password" id='conPassword' required />
                </div>
                <div className={classes.formControls}>
                  <label className={classes.label} htmlFor="profileImage">profile Image:</label>
                 
                  {/* <input ref={image} className={classes.input} type="file" id='upload' /> */}
                  <div  className={classes.inputDivision}>
                  <input
                    accept="image/*"
                    className={classes.inputer}
                    style={{ display: 'none'}}
                    id="raised-button-file"
                    multiple
                    type="file"
                    ref={image}
                  />
                  <label className={classes.uploadLabel} htmlFor="raised-button-file">
                    <Button height="200px" variant="raised" component="span" className={classes.buttoner}>
                      
                    </Button>
                  </label> 
                  </div>
                 
                </div>

                <div className={classes.formControl}>
                  <label className={classes.label} htmlFor="phoneNumber">Phone Number: <span className={classes.alert}>* {phoneError}</span></label>
                  <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className={classes.input} type="text" id='phoneNumber' required/>
                </div>
                <div className={classes.formControl}>
                  <label className={classes.label} htmlFor="city">City: <span className={classes.alert}>* {cityError}</span></label>
                  <input value={city} onChange={(e) => setCity(e.target.value)} className={classes.input} type="text" id='city' required/>
                </div>
                <div className={classes.formControl}>
                  <label className={classes.label} htmlFor="adress">Address: <span className={classes.alert}>* </span></label>
                  {geocoder.getCountries}
                  <div className='mapDivision'>
                    {/* <Map city={geoCoder}/> */}
                    <div className={classes.map}>
                      <link href="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css" rel="stylesheet"></link>
                      <script src="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js"></script>
                      

                      <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
                      <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css"></link>
                      {/* <link rel="stylesheet" href="mapbox://styles/kalkidanderso/cl38c4bf9000k14o4ff81n0ni" type="text/css"></link> */}
                  
                      <div className={classes.mapsidebar}>
                        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                      </div>
                      <div ref={mapContainer} className={classes.mapContainer} />
                    </div>
                  </div>
                </div>
                <div className={classes.buttons}>
                <button type='submit' className={classes.save}>Save</button>    
                <button type='reset' className={classes.save}>Reset</button>    
                </div>
              </form>
              <div className={classes.loadingImage}>
              {showLoading && <Image src={loading} />}
              </div>
            </div>
       </div>
    </div>
  )
}




