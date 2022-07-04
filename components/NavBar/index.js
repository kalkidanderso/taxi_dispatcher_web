import React, { useState, useEffect } from "react";
import classes from "./Navbar.module.css";
import Button from "../elements/Button";
import socketIoClient from "socket.io-client";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import io from "socket.io-client";
// import io from "socket.io-client";
// let socket;

// const socket = Socket("http://192.168.8.103:3001", { origins: "*:*" });

const Index = (props) => {
  const [analysis, setAnalysis] = useState("");
  const ChangeStatus = () => {};
  const headers = {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "*",
  };

  let socket = io("http://localhost:8000", { transports: ["websocket"] });

  useEffect(() => {
    socket.on("hello", (msg) => {
      console.log("useEffect");
      alert("This is emmiited");
      setAnalysis(msg);
    });
  }, []);
  const EmittingSocket = () => {
    console.log("Emmiting..");
    setAnalysis("Emitting");
    // socket.emit("passenger", "Message from dispatcher to passengers");
    socket.emit("inputChange", "Emmiting...");
  };

  return (
    <div className={classes["navigation"]}>
      <label className={classes["dispatcher"]}>Dispatcher</label>

      <div className={classes["accountName"]}>
        <label
          style={{
            background: "#555",
            color: " white",
            // border: none;
            /* padding: 0.8rem 1.5rem; */
            borderRadius: "5px",
            transition: "all 0.4s",
            // marginLeft: "200px",
            fontSize: "30px",
            padding: "10px",
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            background: "transparent",
            color: "black",
          }}
          htmlFor="some"
        >
          {props.name}
          <AccountCircleIcon className={classes["accountIcon"]} />
        </label>
      </div>
    </div>
  );
};

export default Index;
