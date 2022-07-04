import React, { useEffect, useState } from "react";
import classes from "./order.module.css";
import Table from "../elements/Table/DemoTable";

function Completed(props) {
  const completedColumns = [
    { title: "Pickup Location", field: "pickupLocation" },
    { title: "Destination", field: "destination" },
    { title: "Bus Passengers", field: "totalBusPassenger" },
    { title: "VIP Passengers", field: "totalVipPassenger" },
  ];

  const getRowData = (data) => {
    props.onSetData(data);
  };

  let pendingRides = [];
  props.history.map((hist) => {
    if (hist.status === "completed") {
      if (hist.vehicleType === "bus") {
        let newRides = {
          pickupLocation: hist.pickupLocation,
          destination: hist.destination,
          totalBusPassenger: 1,
          totalVipPassenger: 0,
        };
        pendingRides.push(newRides);
      } else {
        let newRides = {
          pickupLocation: hist.pickupLocation,
          destination: hist.destination,
          totalBusPassenger: 0,
          totalVipPassenger: 1,
        };
        pendingRides.push(newRides);
      }
    }
  });
  let filtered_pending = [];
  pendingRides.map((pens) => {
    if (filtered_pending.length === 0) {
      filtered_pending.push(pens);
    } else {
      let conditions = false;
      let totalBus = 0;
      let totalVip = 0;
      let av;
      filtered_pending.map((filtered) => {
        if (
          filtered.pickupLocation === pens.pickupLocation &&
          filtered.destination === pens.destination
        ) {
          totalBus = filtered.totalBusPassenger + pens.totalBusPassenger;
          totalVip = filtered.totalVipPassenger + pens.totalVipPassenger;

          conditions = true;
        }
      });
      if (conditions === true) {
        let newRide = {
          pickupLocation: pens.pickupLocation,
          destination: pens.destination,
          totalBusPassenger: totalBus,
          totalVipPassenger: totalVip,
        };
        filtered_pending.push(newRide);
      }
      if (conditions === false) {
        filtered_pending.push(pens);
      }
    }
  });
  // console.log(filtered_pending);
  let filtered_pending_two = [];
  for (var i = 0; i < filtered_pending.length; i++) {
    if (filtered_pending_two.length === 0) {
      filtered_pending_two.push(filtered_pending[i]);
    } else {
      let con = true;
      let totalBus = 0;
      let totalVip = 0;

      for (var j = 0; j < filtered_pending_two.length; j++) {
        if (
          filtered_pending[i].pickupLocation ===
            filtered_pending_two[j].pickupLocation &&
          filtered_pending[i].destination ===
            filtered_pending_two[j].destination
        ) {
          con = false;
          totalBus =
            filtered_pending[i].totalBusPassenger >
            filtered_pending_two[j].totalBusPassenger
              ? filtered_pending[i].totalBusPassenger
              : filtered_pending_two[j].totalBusPassenger;
          filtered_pending_two[j].totalBusPassenger = totalBus;

          totalVip =
            filtered_pending[i].totalVipPassenger >
            filtered_pending_two[j].totalVipPassenger
              ? filtered_pending[i].totalVipPassenger
              : filtered_pending_two[j].totalVipPassenger;
          filtered_pending_two[j].totalVipPassenger = totalVip;
        }
      }
      if (con === true) {
        filtered_pending_two.push(filtered_pending[i]);
      } else if (con === false) {
      }
    }
  }

  return (
    <div className={classes.pending}>
      <div className={classes.pendingHeader}></div>
      <div className={classes.pendingBody}>
        <Table
          title="Completed Rides"
          setRowData={getRowData}
          TableData={filtered_pending_two}
          TableColumn={completedColumns}
        />
      </div>
    </div>
  );
}

export default Completed;
