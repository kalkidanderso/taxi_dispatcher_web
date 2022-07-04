import React, {useEffect, useState} from 'react'
import classes from "./main.module.css";
import Table from "../../elements/Table/Table";

import { columns } from '../../Data/TableData';
import AddPassenger from "./AddPassenger/index";
import Router from "next/router";


export default function index() {

  return (
    
    <div className={classes.mainContent}>

     

     <div className={classes.titleDivision}>
       <p className={classes.labler}>Passengers</p>
       </div>      
       <button onClick={() => Router.push("/passengers/add_passengers")} className={classes.addPassenger}>Add Passenger</button>    
       <div className={classes.otherDivision}>
        <Table caption="Passengers" title ="Passengers" Tablelocation="/api/passengers"  TableColumn={columns.PassengersColumns}/>
       </div>
       {/* <AddPassenger /> */}
    </div>
  )
}
