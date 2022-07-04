import React, { useEffect, useState } from "react";
import classes from "./order.module.css";
import Table from "../elements/Table/DemoTable";

function Pending(props) {
  const passengersColumns = [
    { title: "Pickup Location", field: "pickupLocation" },
    { title: "Destination", field: "destination" },
    { title: "Bus Passengers", field: "totalBusPassenger" },
    { title: "VIP Passengers", field: "totalVipPassenger" },
  ];

  const getRowData = (data) => {
    props.onSetData(data);
  };
  const checkAvailablity = (pending, pen) => {
    let condition = false;

    pending.map((pens) => {
      if (pens.pickupLocation === pens.destination) {
        condition = true;
      }
    });
    return condition;
  };
  const totalBus = (pendingRi, pen) => {
    let totalBus = 0;
    pendingRi.map((pens) => {
      if (
        pens.pickupLocation === pen.pickupLocation &&
        pens.destination === pen.destination
      ) {
        totalBus += pens.totalBusPassenger;
      }
    });
    return totalBus;
  };
  const totalVip = (pendingRi, pen) => {
    let totalVip = 0;
    pendingRi.map((pens) => {
      if (
        pens.pickupLocation === pen.pickupLocation &&
        pens.destination === pen.destination
      ) {
        totalVip += pens.totalVipPassenger;
      }
    });
    return totalVip;
  };

  // console.log(props.history[1]);
  // let totalBusPassenger = 0;
  // let totalVipPassenger = 0;
  let pendingRides = [];
  props.history.map((hist) => {
    if (hist.status === "pending") {
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
  let newFiltered = [];
  for (var i = 0; i < filtered_pending_two.length; i++) {
    if (filtered_pending_two[i].totalBusPassenger > 10) {
      let first = {
        pickupLocation: filtered_pending_two[i].pickupLocation,
        destination: filtered_pending_two[i].destination,
        totalBusPassenger: 10,
        totalVipPassenger: filtered_pending_two[i].totalVipPassenger,
      };
      let second = {
        pickupLocation: filtered_pending_two[i].pickupLocation,
        destination: filtered_pending_two[i].destination,
        totalBusPassenger: filtered_pending_two[i].totalBusPassenger - 10,
        totalVipPassenger: 0,
      };
      newFiltered.push(first);
      newFiltered.push(second);
    } else {
      newFiltered.push(filtered_pending_two[i]);
    }
  }

  console.log(filtered_pending_two);
  return (
    <div className={classes.pending}>
      <div className={classes.pendingHeader}></div>
      <div className={classes.pendingBody}>
        <Table
          title="Pending Rides"
          setRowData={getRowData}
          TableData={newFiltered}
          TableColumn={passengersColumns}
        />
      </div>
    </div>
  );
}

export default Pending;
