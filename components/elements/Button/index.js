import React from "react";
import classes from "./button.module.css";
import account from "../../icons/account.png";
import taxi from "../../../public/taxi_1.jpeg";
// import Image from "next/image";

import dynamic from 'next/dynamic'
const Image =  dynamic(() => import ("next/image"));


export default function index(props) {
  const incoming = props.type;

 
  switch (incoming) {
    case "index":
      return (
        <div className={classes["home"]} title={incoming}>
          <Image className={classes["indexier"]} src={taxi} alt="Image here"/>
        </div>
      );
      break;
   
    case "account":
      return (
        <div className={classes["account-div"]} title={incoming}>
          <Image className={classes["account-image"]} src={account} />
        </div>
      );
      break;
    
      }

}
