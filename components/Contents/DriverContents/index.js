import React, {useEffect, useState} from 'react'
import classes from "./main.module.css";
import Table from "../../elements/Table/Table";

import { columns } from '../../Data/TableData';
// import AddPassenger from "./AddPassenger/index";
import Router from "next/router";


export default function index() {

  return (
    
    <div className={classes.mainContent}>

     

     <div className={classes.titleDivision}>
       <p className={classes.labler}>Drivers</p>
       </div>      
       <button onClick={() => Router.push("/drivers/add_drivers")} className={classes.addPassenger}>Add Driver</button>    
       <div className={classes.otherDivision}>
        <Table caption="Drivers" title ="Passengers" Tablelocation="/api/drivers"  TableColumn={columns.DriversColumns}/>
       </div>
       {/* <AddPassenger /> */}
    </div>
  )
}
