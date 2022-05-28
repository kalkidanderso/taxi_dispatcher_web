import React from 'react'
import classes from "./order.module.css";
import { DataUsage } from "@material-ui/icons";

export default function index() {
  return (
    <div className={classes.orders}>
         <div className={classes.titleDivision}>
         <div className={classes.titleIcon}>
         <DataUsage />
         </div>

        <p className={classes.title}>Orders</p>
      </div>
      <div className={classes.bodyDivision}>
          <div className={classes.headerDivision}>
              <ul className={classes.orderLists}>
              <li>Pending</li>
              <li>Procceding</li>
              <li>Completed</li>
              <li>Cancelled</li>
              </ul> 
          </div>
      </div>
    </div>
  )
}
