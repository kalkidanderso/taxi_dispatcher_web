import React, { useEffect, useState } from "react";
import classes from "../../Contents/DashboardContent/main.module.css";
import Table from "../../elements/Table/PendingTable";
import { IconButton } from "@material-ui/core";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function PendingDetails(props) {
  const setOfPendingItem = [];
  setOfPendingItem.push(props.pendingItem);

  const [showTable, setShowTable] = useState(true);

  let filtered_history = [];
  //   let { history } = props;
  let history = props.history;
  const filter_history = () => {
    history.map((hist) => {
      if (hist.status === "pending") {
        if (
          setOfPendingItem[0].pickupLocation === hist.pickupLocation &&
          setOfPendingItem[0].destination === hist.destination
        ) {
          let newHist = {
            phoneNumber: hist.phoneNumber,
            vehicleType: hist.vehicleType,
          };
          filtered_history.push(newHist);
        }
      }
    });
  };

  const dispatchVehicleHandler = (data) => {
    props.sendRequestToDrivers(data);
  };
  const pendingDetailColumns = [
    { title: "Location", field: "location" },
    { title: "Vehicle Type", field: "vehicleType" },
  ];
  filter_history();

  // console.log(filtered_history);
  return (
    <div className={classes.mainDivision}>
      <div className={classes.tables}>
        <div className={classes.table}>
          <Table
            TableData={props.history}
            TableColumn={pendingDetailColumns}
            title="Driver in terminal"
            // title={
            //   `${setOfPendingItem[0].pickupLocation}` +
            //   `,          ${setOfPendingItem[0].destination}`
            // }
            // <LocationOnIcon /> +
            // setOfPendingItem[0].pickupLocation +
            // setOfPendingItem[0].destination
            // }
          />
        </div>
      </div>
      <div className={classes.lowerDivsions}>
        <button
          onClick={() => dispatchVehicleHandler(props.history)}
          className={classes.save}
        >
          Send Request to Drivers
        </button>
      </div>
    </div>
  );
}

export default PendingDetails;
