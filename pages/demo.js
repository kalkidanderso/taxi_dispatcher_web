import { LeakAddTwoTone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import classes from "./order.module.css";
import Table from "../elements/Table/DemoTable";

export default function Pending(props) {
  let [pendingPassengers, setPendingPassengers] = useState([]);
  let filtered_pending = [];

  
  useEffect(() => {
    fetch("/api/rides", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //   setPendingPassengers(data.history);
        data.history.map((dd) => {
          if (dd.vehicleType === "bus") {
            let newPending = {
              startingPlace: dd.pickupLocation,
              Destination: dd.destination,
              totalBusPassengers: 1,
              totalVipPassengers: 0,
            };
            if (filtered_pending.length === 0) {
              filtered_pending.push(newPending);
            } else {
              filtered_pending.map((fl) => {
                if (
                  fl.startingPlace.toLowerCase() ===
                  dd.pickupLocation.toLowerCase()
                ) {
                  if (
                    fl.Destination.toLowerCase() ===
                    dd.destination.toLowerCase()
                  ) {
                    newPending.totalBusPassengers += 1;
                    filtered_pending = filtered_pending.filter(
                      (ff) => ff !== fl
                    );
                    filtered_pending.push(newPending);
                  }
                }
              });
              filtered_pending.push(newPending);
            }
          } else if (dd.vehicleType === "vip") {
            let newPending = {
              startingPlace: dd.pickupLocation,
              Destination: dd.destination,
              totalBusPassengers: 0,
              totalVipPassengers: 1,
            };
            if (filtered_pending.length === 0) {
              filtered_pending.push(newPending);
            } else {
              filtered_pending.map((fl) => {
                if (
                  fl.startingPlace.toLowerCase() ===
                  dd.pickupLocation.toLowerCase()
                ) {
                  if (
                    fl.Destination.toLowerCase() ===
                    dd.destination.toLowerCase()
                  ) {
                    newPending.totalVipPassengers += 1;
                    filtered_pending = filtered_pending.filter(
                      (ff) => ff !== fl
                    );
                    filtered_pending.push(newPending);
                  }
                }
              });
              filtered_pending.push(newPending);
            }
          }
        });
      });
  }, []);

  const passengersColumns = [
    { title: "Starting Place", field: "startingPlace" },
    { title: "Destination", field: "Destination" },
    { title: "Bus Passengers", field: "totalBusPassengers" },
    { title: "VIP Passengers", field: "totalVipPassengers" },
  ];

  let passengers = [
    {
      startingPlace: "Megenagna",
      Destination: "Tulu",
      totalBusPassengers: 5,
      totalVipPassengers: 0,
    },
    {
      startingPlace: "Tulu",
      Destination: "Megenagna",
      totalBusPassengers: 10,
      totalVipPassengers: 1,
    },
    {
      startingPlace: "Akakie",
      Destination: "AlemGena",
      totalBusPassengers: 2,
      totalVipPassengers: 0,
    },
    {
      startingPlace: "Bole",
      Destination: "Akakie",
      totalBusPassengers: 7,
      totalVipPassengers: 1,
    },
    {
      startingPlace: "Tulu",
      Destination: "Megenagna",
      totalBusPassengers: 5,
      totalVipPassengers: 0,
    },
  ];
  const drivers = [
    {
      Terminal: "Megenagna",
      Name: "Driver One",
      phoneNumber: "09988778",
      type: "mini",
    },
    {
      Terminal: "Bole",
      Name: "Driver Two",
      phoneNumber: "333333",
      type: "vip",
    },
    {
      Terminal: "Akakie",
      Name: "Driver Three",
      phoneNumber: "44433",
      type: "mini",
    },
  ];

  const getRowData = (data) => {
    props.onSetData(data);
  };

  // console.log(filtered_pending);
  return (
    <div className={classes.pending}>
      <div className={classes.pendingHeader}></div>
      <div className={classes.pendingBody}>
        <Table
          setRowData={getRowData}
          TableData={passengers}
          TableColumn={passengersColumns}
        />
      </div>
    </div>
  );
}






















import { LeakAddTwoTone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import classes from "./order.module.css";
import Table from "../elements/Table/DemoTable";

export default function Pending(props) {
  let [pendingPassengers, setPendingPassengers] = useState([]);
  let pending_bus = [];
  let pending_vip = [];

  let filtered_pending_bus = [];
  let filtered_pending_vip = [];

  useEffect(() => {
    fetch("/api/rides", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //   setPendingPassengers(data.history);
        data.history.map((dd) => {
          if (dd.status === "pending")
            if (dd.vehicleType === "bus") {
              pending_bus.push(dd);
              
              if (filtered_pending_bus.length === 0) {
                filtered_pending_bus.push(dd);
              }
            } else if (dd.vehicleType === "vip") {
              pending_vip.push(dd);
            }
        });
      });
  }, []);

  const passengersColumns = [
    { title: "Starting Place", field: "startingPlace" },
    { title: "Destination", field: "Destination" },
    { title: "Bus Passengers", field: "totalBusPassengers" },
    { title: "VIP Passengers", field: "totalVipPassengers" },
  ];

  let passengers = [
    {
      startingPlace: "Megenagna",
      Destination: "Tulu",
      totalBusPassengers: 5,
      totalVipPassengers: 0,
    },
    {
      startingPlace: "Tulu",
      Destination: "Megenagna",
      totalBusPassengers: 10,
      totalVipPassengers: 1,
    },
    {
      startingPlace: "Akakie",
      Destination: "AlemGena",
      totalBusPassengers: 2,
      totalVipPassengers: 0,
    },
    {
      startingPlace: "Bole",
      Destination: "Akakie",
      totalBusPassengers: 7,
      totalVipPassengers: 1,
    },
    {
      startingPlace: "Tulu",
      Destination: "Megenagna",
      totalBusPassengers: 5,
      totalVipPassengers: 0,
    },
  ];
  const drivers = [
    {
      Terminal: "Megenagna",
      Name: "Driver One",
      phoneNumber: "09988778",
      type: "mini",
    },
    {
      Terminal: "Bole",
      Name: "Driver Two",
      phoneNumber: "333333",
      type: "vip",
    },
    {
      Terminal: "Akakie",
      Name: "Driver Three",
      phoneNumber: "44433",
      type: "mini",
    },
  ];

  const getRowData = (data) => {
    props.onSetData(data);
  };

  // pending_bus.forEach((pending) => {
  //   if (pending.vehicleType === "bus") {
  //     let newPending = {
  //       startingPlace: pending.pickupLocation,
  //       Destination: pending.destination,
  //       totalBusPassengers: 1,
  //       totalVipPassengers: 0,
  //     };
  //     console.log("This This this ");
  //     if (filtered_pending_bus.length === 0) {
  //       filtered_pending_bus.push(newPending);
  //     } else {
  //       filtered_pending_bus.map((pp) => {
  //         if (pp.startingPlace === pending.pickupLocation) {
  //           if (pp.Destination === pending.destination) {
  //             newPending = {
  //               startingPlace: pending.pickupLocation,
  //               Destination: pending.destination,
  //               totalBusPassengers: pp.totalBusPassengers + 1,
  //               totalVipPassengers: pp.totalVipPassengers,
  //             };
  //             filtered_pending_bus.push(newPending);
  //           }
  //         } else {
  //           filtered_pending_bus.push(newPending);
  //         }
  //       });
  //     }
  //   }
  // });

  // console.log(filtered_pending_bus);
  return (
    <div className={classes.pending}>
      <div className={classes.pendingHeader}></div>
      <div className={classes.pendingBody}>
        <Table
          setRowData={getRowData}
          TableData={passengers}
          TableColumn={passengersColumns}
        />
      </div>
    </div>
  );
}












////////////////////////////////////////////////////////////

import { LeakAddTwoTone } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import classes from "./order.module.css";
import Table from "../elements/Table/DemoTable";

export default function Pending(props) {
  let [pendingPassengers, setPendingPassengers] = useState([]);
  let pending_bus = [];
  let pending_vip = [];

  let filtered_pending_bus = [];
  let filtered_pending_vip = [];
  let demo_data = [
    {
      pickupLocation: "Bole, Addis Ababa, Ethiopia",
      destination: "Megenagna, Addis Ababa, Ethiopia",
      phoneNumber: "0917343555",
      vehicleType: "bus",
      status: "pending",
    },
    {
      pickupLocation: "Bole, Addis Ababa, Ethiopia",
      destination: "Megenagna, Addis Ababa, Ethiopia",
      phoneNumber: "0917741963",
      vehicleType: "bus",
      status: "pending",
    },
    {
      pickupLocation: "Bole, Addis Ababa, Ethiopia",
      destination: "Megenagna, Addis Ababa, Ethiopia",
      phoneNumber: "0987878787",
      vehicleType: "bus",
      status: "pending",
    },
    {
      pickupLocation: "Megenagna, Addis Ababa, Ethiopia",
      destination: "Arat Kilo, Addis Ababa, Ethiopia",
      phoneNumber: "0989898989",
      vehicleType: "bus",
      status: "cancelled",
    },
    {
      pickupLocation: "Bole, Addis Ababa, Ethiopia",
      destination: "Ayat, Addis Ababa, Ethiopia",
      phoneNumber: "0912121212",
      vehicleType: "bus",
      status: "cancelled",
    },
    {
      pickupLocation: "Ayat, Addis Ababa, Ethiopia",
      destination: "Bole Ayat, Addis Ababa, Ethiopia",
      phoneNumber: "0954545465",
      vehicleType: "bus",
      status: "completed",
    },
    {
      pickupLocation: "Jemo, Addis Ababa, Ethiopia",
      destination: "Akaki-Kality, Addis Ababa, Ethiopia",
      phoneNumber: "0945342344",
      vehicleType: "bus",
      status: "completed",
    },
    {
      pickupLocation: "Arat Kilo, Addis Ababa, Ethiopia",
      destination: "Mexico, Addis Ababa, Ethiopia",
      phoneNumber: "0988121212",
      vehicleType: "bus",
      status: "proceeding",
    },
    {
      pickupLocation: "Arat Kilo, Addis Ababa, Ethiopia",
      destination: "Mexico, Addis Ababa, Ethiopia",
      phoneNumber: "0999122111",
      vehicleType: "bus",
      status: "proceeding",
    },
    {
      pickupLocation: "Bole, Addis Ababa, Ethiopia",
      destination: "Megenagna, Addis Ababa, Ethiopia",
      phoneNumber: "0912321212",
      vehicleType: "vip",
    },
  ];
  useEffect(() => {
    fetch("/api/rides", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //   setPendingPassengers(data.history);
        // data.history.map((dd) => {
        demo_data.map((dd) => {
          if (dd.status === "pending")
            if (dd.vehicleType === "bus") {
              pending_bus.push(dd);
              let newPending = {
                startingPlace: dd.pickupLocation,
                Destination: dd.destination,
                totalBusPassengers: 1,
                totalVipPassengers: 0,
              };
              if (filtered_pending_bus.length === 0) {
                filtered_pending_bus.push(newPending);
              } else {
                let totalBus = 0;
                // ............................................................
                filtered_pending_bus.map((pen) => {
                  if (
                    pen.startingPlace === dd.pickupLocation &&
                    pen.Destination === dd.destination
                  ) {
                    // newPending.totalBusPassengers = pen.totalBusPassengers + 1;
                    // filtered_pending_bus.push(newPending);
                    // filtered_pending_bus = filtered_pending_bus.filter(
                    //   (filtered) => filtered !== pen
                    // );
                    totalBus += pen.totalBusPassengers;
                    filtered_pending_bus = filtered_pending_bus.filter(
                      (filtered) => filtered !== pen
                    );

                    // console.log(newPending);
                  }
                });
                // newPending.totalBusPassengers = totalBus;
                filtered_pending_bus.push(newPending);
                console.log("This is The pending");
                // ............................................................
              }
            } else if (dd.vehicleType === "vip") {
              pending_vip.push(dd);
            }
        });
      });
  }, []);

  const passengersColumns = [
    { title: "Starting Place", field: "startingPlace" },
    { title: "Destination", field: "Destination" },
    { title: "Bus Passengers", field: "totalBusPassengers" },
    { title: "VIP Passengers", field: "totalVipPassengers" },
  ];

  let passengers = [
    {
      startingPlace: "Megenagna",
      Destination: "Tulu",
      totalBusPassengers: 5,
      totalVipPassengers: 0,
    },
    {
      startingPlace: "Tulu",
      Destination: "Megenagna",
      totalBusPassengers: 10,
      totalVipPassengers: 1,
    },
    {
      startingPlace: "Akakie",
      Destination: "AlemGena",
      totalBusPassengers: 2,
      totalVipPassengers: 0,
    },
    {
      startingPlace: "Bole",
      Destination: "Akakie",
      totalBusPassengers: 7,
      totalVipPassengers: 1,
    },
    {
      startingPlace: "Tulu",
      Destination: "Megenagna",
      totalBusPassengers: 5,
      totalVipPassengers: 0,
    },
  ];
  const drivers = [
    {
      Terminal: "Megenagna",
      Name: "Driver One",
      phoneNumber: "09988778",
      type: "mini",
    },
    {
      Terminal: "Bole",
      Name: "Driver Two",
      phoneNumber: "333333",
      type: "vip",
    },
    {
      Terminal: "Akakie",
      Name: "Driver Three",
      phoneNumber: "44433",
      type: "mini",
    },
  ];

  const getRowData = (data) => {
    props.onSetData(data);
  };

  // pending_bus.forEach((pending) => {
  //   if (pending.vehicleType === "bus") {
  //     let newPending = {
  //       startingPlace: pending.pickupLocation,
  //       Destination: pending.destination,
  //       totalBusPassengers: 1,
  //       totalVipPassengers: 0,
  //     };
  //     console.log("This This this ");
  //     if (filtered_pending_bus.length === 0) {
  //       filtered_pending_bus.push(newPending);
  //     } else {
  //       filtered_pending_bus.map((pp) => {
  //         if (pp.startingPlace === pending.pickupLocation) {
  //           if (pp.Destination === pending.destination) {
  //             newPending = {
  //               startingPlace: pending.pickupLocation,
  //               Destination: pending.destination,
  //               totalBusPassengers: pp.totalBusPassengers + 1,
  //               totalVipPassengers: pp.totalVipPassengers,
  //             };
  //             filtered_pending_bus.push(newPending);
  //           }
  //         } else {
  //           filtered_pending_bus.push(newPending);
  //         }
  //       });
  //     }
  //   }
  // });

  // console.log(filtered_pending_bus);
  return (
    <div className={classes.pending}>
      <div className={classes.pendingHeader}></div>
      <div className={classes.pendingBody}>
        <Table
          setRowData={getRowData}
          TableData={passengers}
          TableColumn={passengersColumns}
        />
      </div>
    </div>
  );
}
