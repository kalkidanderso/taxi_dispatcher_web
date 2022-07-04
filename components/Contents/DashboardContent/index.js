import React, { useEffect, useState, useRef } from "react";
import classes from "./main.module.css";
import { columns } from "../../Data/TableData";
// import mapboxSdk from "@mapbox/mapbox-sdk";
import io from "socket.io-client";
import Pending from "../../Orders/Pending";
import Cancelled from "../../Orders/Cancelled";
import Completed from "../../Orders/Completed";
import Proceeding from "../../Orders/Proceeding";
import { useRouter } from "next/router";
import { ChangeHistory, DataUsage } from "@material-ui/icons";
import Table from "../../elements/Table/PendingTable";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BookingForm from "./BookingForm";

import PendingDetails from "../../Orders/details/pendingDetails";
import ProceedingDetails from "../../Orders/details/proceedingDetails";
import CancelledDetails from "../../Orders/details/cancelledDetails";
import CompletedDetails from "../../Orders/details/completedDetails";
import DispatchDetails from "../../Orders/details/dispatchDetails";
import AcceptedDrivers from "../../Orders/details/AcceptedDrivers";

import useSWR from "swr";

const IndexPage = (props) => {
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR("/api/rides", fetcher);
  const [activeButton, setActiveButton] = useState("pending");
  console.log(data);
  const [demoHistory, setDemoHistory] = useState(props.history);
  console.log("---Demo History----", demoHistory);

  const [pendingItemClicked, setPendingItemClicked] = useState(false);
  const [proceedingItemClicked, setProceedingItemClicked] = useState(false);
  const [completedItemClicked, setCompletedItemClicked] = useState(false);
  const [cancelledItemClicked, setCancelledItemClicked] = useState(false);

  const [dispatchButtonClicked, setDispatchButtonClicked] = useState(false);

  const [newOrder, setNewOrder] = useState(false);
  const [pendingItem, setPendingItem] = useState({});
  const [proceeedingItem, setProceedingItem] = useState({});
  const [cancelledItem, setCancelledItem] = useState({});
  const [completedItem, setCompletedItem] = useState({});
  const [dispatchItem, setDispatchItem] = useState({});
  const [pickupLocation, setPickupLocation] = useState("");

  const [showAcceptedDriverPanel, SetShowAcceptedDriverPanel] = useState(false);
  const [acceptedDriverData, setAccpetedDriverData] = useState();

  const [mainPendingData, setMainPendingData] = useState();

  let socket = io("http://localhost:8000", { transports: ["websocket"] });

  const refreshData = () => {
    // console.log("This is the data-----------");
    router.replace(router.asPath);
    setActiveButton("none");
    setTimeout(() => {
      setActiveButton("pending");
    }, 1000);
    let historiess = [];

    fetch("http://localhost:3000/api/rides")
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        historiess = json.history;
      });
    console.log(historiess);
    if (historiess.length > 0) {
      setDemoHistory(historiess);
    }
  };

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("http://localhost:3000/api/rides");
      const json = await response.json();
      setDemoHistory(json.history);
      console.log(
        "...........inside use effect fetching...........",
        json.history
      );
    }
    fetchBooks();
    socket.on("pp", (ff) => {
      setDemoHistory(ff);
      console.log("99999999999999999999999999");
      console.log(ff);
      setPendingItemClicked(false);
      fetchBooks();
    });
    socket.on("hello", (msg) => {
      console.log("useEffect");
      setAnalysis(msg);
    });
    socket.on("passengerBooked", (dd) => {
      console.log("99999999999999999999999999");
      console.log(dd);
      if (dd.length > 0) {
        setDemoHistory(dd);
        console.log(dd);
        fetchBooks();
      }
      refreshData();
    });

    socket.on("driverPickedPassengers", (datas) => {
      console.log("-----picked........");
      let driver_vehicle_type = datas[0].vehicleType;
      let pickupLocation = datas[1].pickupLocation;
      let destination = datas[1].destination;
      let totalBusPassenger = datas[1].totalBusPassenger;
      let totalVipPassenger = datas[1].totalVipPassenger;

      let bodys = {
        driver_vehicle_type,
        pickupLocation,
        destination,
        totalBusPassenger,
        totalVipPassenger,
      };
      console.log(
        ".......................Driver Picked Successfylly .............."
      );

      fetch("/api/proceedingStatus", {
        method: "POST",
        body: JSON.stringify(bodys),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          fetchBooks();
          refreshData();
        });
      fetchBooks();
      refreshData();
    });
    socket.on("driverDropedPassengers", (datas) => {
      let driver_vehicle_type = datas[0].vehicleType;
      let pickupLocation = datas[1].pickupLocation;
      let destination = datas[1].destination;
      let totalBusPassenger = datas[1].totalBusPassenger;
      let totalVipPassenger = datas[1].totalVipPassenger;

      let bodys = {
        driver_vehicle_type,
        pickupLocation,
        destination,
        totalBusPassenger,
        totalVipPassenger,
      };
      console.log("............Droped successfully..........");

      fetch("/api/completedStatus", {
        method: "POST",
        body: JSON.stringify(bodys),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          fetchBooks();
          refreshData();
        });

      fetchBooks();
      refreshData();
    });

    socket.on("acceptedDriver", (datas) => {
      setPendingItemClicked(false);
      setProceedingItemClicked(false);
      setCompletedItemClicked(false);
      setCancelledItemClicked(false);
      setDispatchButtonClicked(false);
      SetShowAcceptedDriverPanel(true);
      setAccpetedDriverData(datas);

      console.log("TTTTTTTTTTTTTTTT");
      console.log(datas[1]);

      socket.emit("redirectDriver", datas);
    });
  }, []);

  const chagneDemoHistoy = () => {};
  const EmittingSocket = () => {
    console.log("Emmiting..");
    setAnalysis("Emitting");
    // socket.emit("passenger", "Message from dispatcher to passengers");
    socket.emit("inputChange", "Emmiting...");
  };

  let newItem;

  const pendingColumns = [
    { title: "Phone Number", field: "phoneNumber" },
    { title: "Bus Type", field: "type" },
  ];
  const pendingData = [
    { phoneNumber: "565655445", type: "vip" },
    { phoneNumber: "332323", type: "bus" },
    { phoneNumber: "1121212", type: "bus" },
    { phoneNumber: "7878788", type: "vip" },
  ];

  let classname = activeButton;

  const retrievePendingDrivers = (rowData) => {
    // console.log("This is ");
    let filtered_drivers = [];
    let drivers = props.avilableDrivers;
    drivers.map((dr) => {
      if (dr.vehicleType === "bus") {
        if (dr.location === mainPendingData.pickupLocation) {
          filtered_drivers.push(dr);
          setPickupLocation(mainPendingData.pickupLocation);
        }
      }
    });
    setDispatchItem(filtered_drivers);
    // console.log(mainPendingData);

    setDispatchButtonClicked(true);
  };

  const notifyPassengerThatDriverIsOnWay = (datas) => {
    console.log("Tjjjjjjjjjjjjjjjjj");
    let passengers = datas[0];
    let driver = datas[1];
    let socket = io("http://localhost:8000", { transports: ["websocket"] });
    socket.emit("notifyingPassengers", datas);
    console.log(passengers);
  };
  const changeSTatusOfDemoButton = () => {
    let socket = io("http://localhost:8000", { transports: ["websocket"] });
    socket.emit("demoButtonClicked", "Demo Button Clicked");

    // const sth = fetch("http://localhost:3000/api/rides");
    // console.log(sth);

    setActiveButton("none");
    setTimeout(() => {
      setActiveButton("pending");
    }, 1000);
  };

  const retrievePendingDriversVip = (datas) => {
    // console.log(data);
    let filtered_drivers = [];
    let drivers = props.avilableDrivers;
    drivers.map((dr) => {
      if (dr.vehicleType === "vip") {
        if (dr.location === mainPendingData.pickupLocation) {
          filtered_drivers.push(dr);
        }
      }
    });
    setDispatchItem(filtered_drivers);
    setDispatchButtonClicked(true);
  };

  const retrievePendingData = (datas) => {
    setMainPendingData(datas);
    setNewOrder(false);
    setProceedingItemClicked(false);
    setPendingItemClicked(true);
    setCompletedItemClicked(false);
    setCancelledItemClicked(false);
    setDispatchButtonClicked(false);
    SetShowAcceptedDriverPanel(false);

    newItem = {
      pickupLocation: datas.pickupLocation,
      destination: datas.destination,
      totalBusPassenger: datas.totalBusPassenger,
      totalVipPassenger: datas.totalVipPassenger,
    };
    setPendingItem(newItem);
  };
  const retrieveProceedingData = (datas) => {
    setNewOrder(false);
    setPendingItemClicked(false);
    setProceedingItemClicked(true);
    setCompletedItemClicked(false);
    setCancelledItemClicked(false);
    setDispatchButtonClicked(false);
    SetShowAcceptedDriverPanel(false);

    newItem = {
      pickupLocation: datas.pickupLocation,
      destination: datas.destination,
      totalBusPassenger: datas.totalBusPassenger,
      totalVipPassenger: datas.totalVipPassenger,
    };
    setProceedingItem(newItem);
  };
  const retrieveCompletedData = (datas) => {
    setNewOrder(false);
    setPendingItemClicked(false);
    setProceedingItemClicked(false);
    setCompletedItemClicked(true);
    setCancelledItemClicked(false);
    setDispatchButtonClicked(false);
    SetShowAcceptedDriverPanel(false);

    newItem = {
      pickupLocation: datas.pickupLocation,
      destination: datas.destination,
      totalBusPassenger: datas.totalBusPassenger,
      totalVipPassenger: datas.totalVipPassenger,
    };
    setCompletedItem(newItem);
  };

  const retrieveCancelledData = (datas) => {
    setNewOrder(false);
    setPendingItemClicked(false);
    setProceedingItemClicked(false);
    setCompletedItemClicked(false);
    setCancelledItemClicked(true);
    setDispatchButtonClicked(false);
    SetShowAcceptedDriverPanel(false);

    newItem = {
      pickupLocation: datas.pickupLocation,
      destination: datas.destination,
      totalBusPassenger: datas.totalBusPassenger,
      totalVipPassenger: datas.totalVipPassenger,
    };
    setCancelledItem(newItem);
  };

  const changeOrderStatus = () => {
    setPendingItemClicked(false);
    setProceedingItemClicked(false);
    setCompletedItemClicked(false);
    setCancelledItemClicked(false);
    setDispatchButtonClicked(false);
    SetShowAcceptedDriverPanel(false);

    setNewOrder(true);
  };

  const sendRequestToDrivers = (datas) => {
    console.log("Sending Request to Drivers");
    // console.log(datas);
    let dataa = [datas, mainPendingData];
    socket.emit("drivers", dataa);
    // socket.emit("rideData", mainPendingData);
  };

  return (
    <div className={classes.mainContent}>
      <nav className={classes.sidebar}>
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
                <li
                  onClick={() => {
                    setActiveButton("pending");

                    setPendingItemClicked(false);
                    setProceedingItemClicked(false);
                    setCompletedItemClicked(false);
                    setCancelledItemClicked(false);
                    SetShowAcceptedDriverPanel(false);
                  }}
                  className={activeButton === "pending" ? classes.active : ""}
                >
                  Pending
                </li>
                <li
                  onClick={() => {
                    setActiveButton("proceeding");
                    setPendingItemClicked(false);
                    setProceedingItemClicked(false);
                    setCompletedItemClicked(false);
                    setCancelledItemClicked(false);
                    setDispatchButtonClicked(false);
                    SetShowAcceptedDriverPanel(false);
                  }}
                  className={
                    activeButton === "proceeding" ? classes.active : ""
                  }
                >
                  Proceeding
                </li>
                <li
                  onClick={() => {
                    setActiveButton("completed");
                    setPendingItemClicked(false);
                    setProceedingItemClicked(false);
                    setCompletedItemClicked(false);
                    setCancelledItemClicked(false);
                    setDispatchButtonClicked(false);
                    SetShowAcceptedDriverPanel(false);
                  }}
                  className={activeButton === "completed" ? classes.active : ""}
                >
                  Completed
                </li>
                <li
                  onClick={() => {
                    setActiveButton("cancelled");
                    setPendingItemClicked(false);
                    setProceedingItemClicked(false);
                    setCompletedItemClicked(false);
                    setCancelledItemClicked(false);
                    setDispatchButtonClicked(false);
                    SetShowAcceptedDriverPanel(false);
                  }}
                  className={activeButton === "cancelled" ? classes.active : ""}
                >
                  Cancelled
                </li>
              </ul>
            </div>
            <div className={classes.contentDivision}>
              {activeButton === "pending" && (
                <Pending
                  onSetData={retrievePendingData}
                  history={demoHistory}
                  avilableDrivers={props.avilableDrivers}
                />
              )}
              {activeButton === "proceeding" && (
                <Proceeding
                  onSetData={retrieveProceedingData}
                  history={props.history}
                />
              )}
              {activeButton === "completed" && (
                <Completed
                  onSetData={retrieveCompletedData}
                  history={props.history}
                />
              )}
              {activeButton === "cancelled" && (
                <Cancelled
                  onSetData={retrieveCancelledData}
                  history={props.history}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className={classes.Content}>
        {pendingItemClicked && activeButton === "pending" && (
          <PendingDetails
            pendingItem={pendingItem}
            history={demoHistory}
            retrievePendingDrivers={retrievePendingDrivers}
            retrievePendingDriversVip={retrievePendingDriversVip}
          />
        )}
        {proceedingItemClicked && activeButton === "proceeding" && (
          <ProceedingDetails
            pendingItem={proceeedingItem}
            history={props.history}
          />
        )}
        {cancelledItemClicked && activeButton === "cancelled" && (
          <CancelledDetails
            pendingItem={cancelledItem}
            history={props.history}
          />
        )}
        {completedItemClicked && activeButton === "completed" && (
          <CompletedDetails
            pendingItem={completedItem}
            history={props.history}
          />
        )}
        {newOrder && <BookingForm onSetHistory={changeSTatusOfDemoButton} />}
      </div>
      <div className={classes.navigation}>
        <button onClick={changeOrderStatus} className={classes.button}>
          <span>New Order</span>
          <AddCircleOutlineIcon />
        </button>
      </div>
      {dispatchButtonClicked && activeButton === "pending" && (
        <DispatchDetails
          // retrievePendingDrivers={retrievePendingDrivers}
          pendingItem={props.avilableDrivers}
          history={dispatchItem}
          sendRequestToDrivers={sendRequestToDrivers}
        />
      )}

      {showAcceptedDriverPanel && (
        <AcceptedDrivers
          // retrievePendingDrivers={retrievePendingDrivers}
          pendingItem={props.avilableDrivers}
          acceptedDriverData={acceptedDriverData}
          history={dispatchItem}
          sendRequestToDrivers={sendRequestToDrivers}
          notifyPassengers={notifyPassengerThatDriverIsOnWay}
        />
      )}
      {/* <button onClick={changeSTatusOfDemoButton}>
        NEW DEMO BUTTON IS HERE
      </button> */}
    </div>
  );
};

export default IndexPage;
