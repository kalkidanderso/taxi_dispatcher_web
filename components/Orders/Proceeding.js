import React, { useEffect, useState } from "react";
import classes from "./order.module.css";
import Table from "../elements/Table/DemoTable";

export default function Proceeding(props) {
  const proceedingColumns = [
    { title: "Pickup Location", field: "pickupLocation" },
    { title: "Destination", field: "destination" },
    { title: "Bus Passengers", field: "totalBusPassenger" },
    { title: "VIP Passengers", field: "totalVipPassenger" },
  ];

  const getRowData = (data) => {
    props.onSetData(data);
  };

  let proceedingRides = [];
  props.history.map((hist) => {
    if (hist.status === "proceeding") {
      if (hist.vehicleType === "bus") {
        let newRides = {
          pickupLocation: hist.pickupLocation,
          destination: hist.destination,
          totalBusPassenger: 1,
          totalVipPassenger: 0,
        };
        proceedingRides.push(newRides);
      } else {
        let newRides = {
          pickupLocation: hist.pickupLocation,
          destination: hist.destination,
          totalBusPassenger: 0,
          totalVipPassenger: 1,
        };
        proceedingRides.push(newRides);
      }
    }
  });
  let filtered_proceeding = [];
  proceedingRides.map((pens) => {
    if (filtered_proceeding.length === 0) {
      filtered_proceeding.push(pens);
    } else {
      let conditions = false;
      let totalBus = 0;
      let totalVip = 0;
      let av;
      filtered_proceeding.map((filtered) => {
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
        filtered_proceeding.push(newRide);
      }
      if (conditions === false) {
        filtered_proceeding.push(pens);
      }
    }
  });
  // console.log(filtered_pending);
  let filtered_proceeding_two = [];
  for (var i = 0; i < filtered_proceeding.length; i++) {
    if (filtered_proceeding_two.length === 0) {
      filtered_proceeding_two.push(filtered_proceeding[i]);
    } else {
      let con = true;
      let totalBus = 0;
      let totalVip = 0;

      for (var j = 0; j < filtered_proceeding_two.length; j++) {
        if (
          filtered_proceeding[i].pickupLocation ===
            filtered_proceeding_two[j].pickupLocation &&
          filtered_proceeding[i].destination ===
            filtered_proceeding_two[j].destination
        ) {
          con = false;
          totalBus =
            filtered_proceeding[i].totalBusPassenger >
            filtered_proceeding_two[j].totalBusPassenger
              ? filtered_proceeding[i].totalBusPassenger
              : filtered_proceeding_two[j].totalBusPassenger;
          filtered_proceeding_two[j].totalBusPassenger = totalBus;

          totalVip =
            filtered_proceeding[i].totalVipPassenger >
            filtered_proceeding_two[j].totalVipPassenger
              ? filtered_proceeding[i].totalVipPassenger
              : filtered_proceeding_two[j].totalVipPassenger;
          filtered_proceeding_two[j].totalVipPassenger = totalVip;
        }
      }
      if (con === true) {
        filtered_proceeding_two.push(filtered_proceeding[i]);
      } else if (con === false) {
      }
    }
  }

  console.log(filtered_proceeding_two);

  return (
    <div className={classes.pending}>
      <div className={classes.pendingHeader}></div>
      <div className={classes.pendingBody}>
        <Table
          title="Proceeding Rides"
          setRowData={getRowData}
          TableData={filtered_proceeding_two}
          TableColumn={proceedingColumns}
        />
      </div>
    </div>
  );
}
