import React, {useState} from 'react'
import classes from "./order.module.css";
import { DataUsage } from "@material-ui/icons";
import Link from "next/link";
import Pending from "./Pending";
import Cancelled from "./Cancelled";
import Completed from "./Completed"
import Proceeding from "./Proceeding"


export default function index() {
  const [activeButton, setActiveButton] = useState("pending");

  let classname = activeButton;
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
              <li onClick={() => setActiveButton("pending")} className={activeButton === "pending" ? classes.active : ""}> 
                  Pending
              </li>
              <li onClick={() => setActiveButton("proceeding")} className={activeButton === "proceeding" ? classes.active : ""}>
                Proceeding
              </li>
              <li onClick={() => setActiveButton("completed")} className={activeButton === "completed" ? classes.active : ""}>
                Completed
              </li>
              <li onClick={() => setActiveButton("cancelled")} className={activeButton === "cancelled" ? classes.active : ""}>
                Cancelled
              </li>
              </ul> 
          </div>
          <div className={classes.contentDivision}>
            {activeButton === "pending" && (
            <Pending />
            )}
             {activeButton === "proceeding" && (
              <Proceeding />
            )}
             {activeButton === "completed" && (
             <Completed />
            )}
             {activeButton === "cancelled" && (
             <Cancelled />
            )}
          </div>
      </div>
    </div>
  )
}
