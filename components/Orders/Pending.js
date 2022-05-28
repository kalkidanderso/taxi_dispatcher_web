import React from "react";
import classes from "./order.module.css";

export default function Pending(){
    return (
        <div className={classes.pending}>
            <div className={classes.pendingHeader}>
                <ul className={classes.pendingItems}>
                <li>Terminals</li>
                <li>VIP Taxi</li>
                <li>Mini Bus</li>
                </ul>
            </div>
            <div className={classes.pendingBody}>
                <p>This is the body</p>
            </div>
        </div>
    );
}