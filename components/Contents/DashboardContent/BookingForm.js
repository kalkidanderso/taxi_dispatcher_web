import React, { useRef, useState, useEffect } from "react";
import classes from "./booking-form.module.css";
import io from "socket.io-client";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { NavigationControl } from "mapbox-gl";
import { ScaleControl } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Select from "react-select";
import PhoneInput from "react-phone-number-input";
import loading from "../../icons/loading.gif";
import Image from "next/image";
import useSWR from "swr";

import { useRouter } from "next/router";

import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function BookingForm(props) {
  const router = useRouter();
  // const { data, error } = useSWR("/api/rides", fetcher);
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
    props.onSetHistory();
  };

  mapboxgl.accessToken =
    "pk.eyJ1Ijoia2Fsa2lkYW5kZXJzbyIsImEiOiJjbDM0c3Z2YnIweWFhM2pwNTBlanZwNTIxIn0.BuXnDWLyi-lzmd-gKKiMDA";
  const geoCoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    style: { width: "100px" },
  });
  const newGeoCoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  });
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(38.7595);
  const [lat, setLat] = useState(9.0234);
  const [zoom, setZoom] = useState(9);

  const [someData, setSomeData] = useState({});
  const [startPlaceName, setStartPlaceName] = useState("");
  const [destinationPlaceName, setDestinationPlaceName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [showLoading, changeLoadingStatus] = useState(false);
  const [showProgress, changeProgress] = useState(false);

  const [successful, setSuccessfull] = useState(false);
  const [notSuccessful, setNotSuccessful] = useState(false);

  const [phoneError, setPhoneError] = useState("");
  const [startingPlaceError, setStartingPlaceError] = useState("");
  const [destinationPlaceError, setDestinationPlaceError] = useState("");

  const carType = [
    { value: "bus", label: "Bus" },
    { value: "vip", label: "VIP" },
  ];
  const [vehicleType, setVehicle] = useState("bus");
  const handleChange = (e) => {
    setVehicle(e.value);
  };

  const phoneValidator = (phone) => {
    const regEx = "^[09][0-9]{8}$";
    let correctBeginning = phone.startsWith("09");
    let correctLength = phone.length === 10;

    if (correctBeginning && correctLength) {
      return true;
    } else {
      return false;
    }
  };
  const placeValidator = (placeName) => {
    if (placeName.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    // map.current.addControl(geoCoder);
    document
      .getElementById("geocoder")
      .appendChild(geoCoder.onAdd(map.current));
    // map.current.addControl(geoCoder);
    document
      .getElementById("newGeocoder")
      .appendChild(newGeoCoder.onAdd(map.current));

    map.current.addControl(new mapboxgl.NavigationControl());

    map.current.on("load", () => {
      map.current.addSource("single-point", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.current.addLayer({
        id: "point",
        source: "single-point",
        type: "circle",
        paint: {
          "circle-radius": 10,
          "circle-color": "#448ee4",
        },
      });

      map.current.addSource("single-points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.current.addLayer({
        id: "points",
        source: "single-points",
        type: "circle",
        paint: {
          "circle-radius": 10,
          "circle-color": "#448ee4",
        },
      });

      // Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
      //  Add a marker at the result's coordinates
      geoCoder.on("result", (event) => {
        map.current.getSource("single-point").setData(event.result.geometry);
        setSomeData(event.result.geometry);
        setStartPlaceName(event.result.place_name);
      });

      newGeoCoder.on("result", (event) => {
        map.current.getSource("single-points").setData(event.result.geometry);
        setDestinationPlaceName(event.result.place_name);
        // setSomeData(event.result.geometry);
      });
    });
  });

  const submitFormHandler = (e) => {
    e.preventDefault();
    // console.log(phoneNumber, vehicleType, startPlaceName, destinationPlaceName);
    // const pickupLocation = req.body.pickupLocation;
    // const destination = req.body.destination;
    // const phoneNumber = req.body.phoneNumber;
    // const vehicleType = req.body.vehicleType;

    if (!phoneValidator(phoneNumber)) {
      setPhoneError("Please input the correct phone Number");
      changeProgress(false);
      setTimeout(() => {
        setPhoneError("");
        // changeProgress(false);
      }, 6000);
    } else if (!placeValidator(startPlaceName)) {
      setStartingPlaceError("Select Pick up Location");
      setTimeout(() => {
        setStartingPlaceError("");
      }, 6000);
    } else if (!placeValidator(destinationPlaceName)) {
      setDestinationPlaceError("Select Drop off Location");
      setTimeout(() => {
        setDestinationPlaceError("");
      }, 6000);
    } else {
      changeLoadingStatus(true);
      const reqBody = {
        pickupLocation: startPlaceName,
        destination: destinationPlaceName,
        phoneNumber: phoneNumber,
        vehicleType: vehicleType,
      };

      //  console.log(address);
      changeProgress(true);
      fetch("/api/rides", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((datass) => {
          if (datass.stat === "OK") {
            changeProgress(false);
            setSuccessfull(true);
            setNotSuccessful(false);
            setStartPlaceName("");
            setDestinationPlaceName("");
            setPhoneNumber("");
            console.log("It's Ok");
            refreshData();
            setTimeout(() => {
              setSuccessfull(false);
            }, 1000);
          } else if (datass.stat === "NOT_OK") {
            changeProgress(false);
            console.log("It's not Ok");
            setSuccessfull(false);
            setNotSuccessful(true);
          }
        });

      changeLoadingStatus(false);
    }
    setTimeout(() => {
      setSuccessfull(false);
      setNotSuccessful(false);
    }, 1000);

    let socket = io("http://localhost:8000", { transports: ["websocket"] });
    socket.emit("demoButtonClicked", "Demo Button Clicked");
  };
  return (
    <div className={classes.mainContent}>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css"
        rel="stylesheet"
      ></link>
      <script src="https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.js"></script>
      <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
      <link
        rel="stylesheet"
        href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css"
        type="text/css"
      ></link>
      <link
        href="https://fonts.googleapis.com/css?family=Open+Sans"
        rel="stylesheet"
      ></link>
      <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.js"></script>
      <link
        href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css"
        rel="stylesheet"
      />

      <div className={classes.titleDivision}>
        <p className={classes.labler}>Manual Booking</p>
        {successful && (
          <p className={classes.lablers}>Ride is Successfully booked!</p>
        )}
        {notSuccessful && (
          <p className={classes.lable}>Ride is already booked!</p>
        )}
      </div>
      {/* <button onClick={() => Router.push("/drivers/add_drivers")} className={classes.addPassenger}>Manua</button>     */}
      <div className={classes.otherDivision}>
        <div className={classes.contentDiv}>
          <form onSubmit={submitFormHandler} className={classes.form}>
            <div className={classes.controller}>
              <div className={classes.formControl}>
                <label className={classes.label} htmlFor="phoneNumber">
                  Phone Number:{" "}
                  <span className={classes.alert}>*{phoneError}</span>
                </label>
                <input
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  className={classes.input}
                  type="text"
                  id="phoneNumber"
                />
              </div>
              <div className={classes.formControl}>
                <label className={classes.label} htmlFor="carType">
                  Car Type: <span className={classes.alert}>*</span>
                </label>
                <Select
                  options={carType}
                  className={classes.input}
                  value={carType.find((obj) => obj.value === vehicleType)}
                  // onInputChange={handleChange}
                  // isOptionSelected={handleChange}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={classes.geoCoderFormControl}>
              <div className={classes.formControl}>
                <label className={classes.label} htmlFor="startingPlace">
                  Starting Place:
                  <span className={classes.alert}>*{startingPlaceError}</span>
                </label>
                <div id="geocoder" className={classes.geocoder}>
                  <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.min.js"></script>
                </div>
              </div>
              <div className={classes.formControl}>
                <label className={classes.label} htmlFor="destination">
                  Destination:
                  <span className={classes.alert}>
                    *{destinationPlaceError}
                  </span>
                </label>
                <div id="newGeocoder" className={classes.geocoder}></div>
              </div>
            </div>
            {showProgress && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <CircularProgress size={100} />
              </Box>
            )}

            <div className={classes.buttons}>
              <button
                // onClick={(e) => changeLoadingStatus(true)}
                type="submit"
                className={classes.save}
              >
                Book
              </button>
              <button type="reset" className={classes.save}>
                Cancel
              </button>
            </div>
          </form>
          <div className={classes.loadingImage}>
            {showLoading && <Image src={loading} />}
          </div>
        </div>
        <div className={classes.mapDiv}>
          <div className={classes.map}>
            <div className={classes.mapsidebar}>
              Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className={classes.mapContainer} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
